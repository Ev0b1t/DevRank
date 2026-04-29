from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Any
from datetime import datetime

class AnalysisSchema(BaseModel):
    id: int
    cv_quality_score: float
    trust_score: float
    code_quality_score: float
    activity_score: float
    vacancy_match_score: float
    final_score: float
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True

class CandidateBase(BaseModel):
    name: str
    github_url: Optional[str] = None
    vacancy_description: Optional[str] = None

class CandidateCreate(CandidateBase):
    cv_text: Optional[str] = None

class CandidateSchema(CandidateBase):
    id: int
    created_at: datetime
    analysis: Optional[AnalysisSchema] = None

    class Config:
        from_attributes = True

class UploadResponse(BaseModel):
    candidate_id: int
    status: str = "Analysis started in background"
