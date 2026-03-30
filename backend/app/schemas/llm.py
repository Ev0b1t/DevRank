from typing import Any, Dict, List
from pydantic import BaseModel, Field


class CVAnalysisResult(BaseModel):
    skills: List[str] = Field(default_factory=list)
    level: str = "Unknown"
    cv_quality_score: float = 0
    trust_score: float = 0
    vacancy_match_score: float = 0
    risks: List[str] = Field(default_factory=list)
    summary: str = ""


class GitHubAnalysisResult(BaseModel):
    code_quality_score: float = 0
    activity_score: float = 0
    complexity_score: float = 0
    tech_stack: List[str] = Field(default_factory=list)
    summary: str = ""


def to_json_dict(model: BaseModel) -> Dict[str, Any]:
    return model.model_dump()
