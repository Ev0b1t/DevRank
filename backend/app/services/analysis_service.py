from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import Candidate, Analysis
from app.services.cv_service import CVService
from app.services.github_service import GitHubService
from app.services.scoring_service import ScoringService
from app.core.llm_factory import get_llm_provider
from app.llm.mock_provider import MockProvider
import json
from loguru import logger

class AnalysisService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.cv_service = CVService()
        self.github_service = GitHubService()
        self.scoring_service = ScoringService()
        self.llm = get_llm_provider()

    async def run_full_analysis(self, candidate_id: int):
        logger.info("Analysis started for candidate_id={}", candidate_id)
        # 1. Fetch candidate
        candidate = await self.db.get(Candidate, candidate_id)
        if not candidate:
            logger.warning("Candidate not found for analysis: candidate_id={}", candidate_id)
            return

        cv_text = candidate.cv_text
        github_url = candidate.github_url
        vacancy_description = candidate.vacancy_description or ""

        # 2. LLM CV Analysis
        cv_result = {}
        llm_provider = self.llm
        try:
            cv_result = await llm_provider.analyze_cv(cv_text, vacancy_description)
        except Exception as e:
            # Quota/rate-limit/network errors should not break the pipeline.
            logger.exception("Primary LLM CV analysis failed, switching to MockProvider: {}", e)
            llm_provider = MockProvider()
            cv_result = await llm_provider.analyze_cv(cv_text, vacancy_description)

        # 3. GitHub Analysis (if available)
        github_result = {}
        has_github = False
        if github_url:
            try:
                github_data = await self.github_service.get_user_data(github_url)
                try:
                    github_result = await llm_provider.analyze_github(github_data)
                except Exception as e:
                    logger.exception("Primary LLM GitHub analysis failed, switching to MockProvider: {}", e)
                    github_result = await MockProvider().analyze_github(github_data)
                has_github = True
            except Exception as e:
                logger.exception("GitHub fetch failed for candidate_id={}: {}", candidate_id, e)

        # 4. Scoring
        combined_data = {
            "cv_quality_score": cv_result.get("cv_quality_score", 0),
            "trust_score": cv_result.get("trust_score", 0),
            "vacancy_match_score": cv_result.get("vacancy_match_score", 0),
            "code_quality_score": github_result.get("code_quality_score", 0),
            "activity_score": github_result.get("activity_score", 0),
            "has_github": has_github
        }

        final_score = self.scoring_service.calculate_final_score(combined_data)

        # 5. Save results
        analysis = Analysis(
            candidate_id=candidate.id,
            cv_quality_score=combined_data["cv_quality_score"],
            trust_score=combined_data["trust_score"],
            vacancy_match_score=combined_data["vacancy_match_score"],
            code_quality_score=combined_data["code_quality_score"],
            activity_score=combined_data["activity_score"],
            final_score=final_score,
            summary=cv_result.get("summary", ""),
            raw_llm_response=json.dumps({"cv": cv_result, "github": github_result})
        )
        self.db.add(analysis)
        await self.db.commit()
        logger.info(
            "Analysis completed for candidate_id={} final_score={} has_github={}",
            candidate_id,
            final_score,
            has_github,
        )
