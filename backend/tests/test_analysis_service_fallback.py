import pytest

from app.db.models import Candidate
from app.services.analysis_service import AnalysisService


class _FailingLLM:
    async def analyze_cv(self, cv_text: str, vacancy_description: str = ""):
        raise RuntimeError("quota exceeded")

    async def analyze_github(self, github_data):
        raise RuntimeError("quota exceeded")


class _FakeDB:
    def __init__(self, candidate: Candidate):
        self._candidate = candidate
        self.saved = None

    async def get(self, model, candidate_id):
        return self._candidate if self._candidate.id == candidate_id else None

    def add(self, instance):
        self.saved = instance

    async def commit(self):
        return None


@pytest.mark.asyncio
async def test_analysis_service_falls_back_when_primary_llm_fails():
    candidate = Candidate(
        id=42,
        name="Fallback Test",
        cv_text="Senior Python developer improved latency by 20%",
        github_url=None,
        vacancy_description="Senior Python Engineer",
    )
    db = _FakeDB(candidate)
    service = AnalysisService(db)
    service.llm = _FailingLLM()

    await service.run_full_analysis(candidate.id)

    assert db.saved is not None
    assert db.saved.candidate_id == 42
    assert db.saved.summary
    assert db.saved.trust_score >= 0
