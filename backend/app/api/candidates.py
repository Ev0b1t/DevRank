from fastapi import APIRouter, Depends, UploadFile, File, Form, BackgroundTasks, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional

from app.db.session import get_db
from app.db.models import Candidate, Analysis
from app.schemas.candidate import CandidateCreate, CandidateSchema, UploadResponse
from app.services.cv_service import CVService
from app.services.analysis_service import AnalysisService
from loguru import logger

router = APIRouter(prefix="/candidates", tags=["candidates"])

@router.post("/upload", response_model=UploadResponse)
async def upload_candidate(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    github_url: Optional[str] = Form(None),
    cv_text: Optional[str] = Form(None),
    cv_file: Optional[UploadFile] = File(None),
    vacancy_description: Optional[str] = Form(None),
    db: AsyncSession = Depends(get_db)
):
    logger.info("Upload request received: name='{}' has_github={} has_cv_text={} has_cv_file={}", name, bool(github_url), bool(cv_text), bool(cv_file))
    cv_service = CVService()
    
    # Process CV
    final_cv_text = ""
    if cv_text:
        final_cv_text = cv_text
    elif cv_file:
        file_content = await cv_file.read()
        final_cv_text = await cv_service.get_cv_text(file_content=file_content)
    
    if not final_cv_text:
        logger.warning("Upload rejected: missing CV text and file for name='{}'", name)
        raise HTTPException(status_code=400, detail="CV text or file is required")

    # Create candidate
    candidate = Candidate(
        name=name,
        github_url=github_url,
        cv_text=final_cv_text,
        vacancy_description=vacancy_description
    )
    db.add(candidate)
    await db.commit()
    await db.refresh(candidate)

    # Start background analysis
    analysis_service = AnalysisService(db)
    background_tasks.add_task(analysis_service.run_full_analysis, candidate.id)
    logger.info("Candidate created and analysis queued: candidate_id={}", candidate.id)

    return UploadResponse(candidate_id=candidate.id)

@router.get("/", response_model=List[CandidateSchema])
async def list_candidates(db: AsyncSession = Depends(get_db)):
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(Candidate).options(selectinload(Candidate.analysis)).order_by(Candidate.created_at.desc())
    )
    return result.scalars().all()

@router.get("/{candidate_id}", response_model=CandidateSchema)
async def get_candidate(candidate_id: int, db: AsyncSession = Depends(get_db)):
    from sqlalchemy.orm import selectinload
    result = await db.execute(
        select(Candidate).options(selectinload(Candidate.analysis)).where(Candidate.id == candidate_id)
    )
    candidate = result.scalar_one_or_none()
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate
