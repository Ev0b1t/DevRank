from typing import Any, Dict
from app.llm.base import LLMProvider


class MockProvider(LLMProvider):
    async def analyze_cv(self, cv_text: str, vacancy_description: str = "") -> Dict[str, Any]:
        text = (cv_text or "").lower()
        has_senior = "senior" in text
        has_metrics = any(token in text for token in ["%", "reduced", "increased", "improved", "led"])
        has_generic = any(token in text for token in ["team player", "hardworking", "motivated"])

        cv_quality = 80 if has_metrics else 55
        trust = 75 if has_metrics else 45
        if has_generic:
            trust -= 10
            cv_quality -= 5

        vacancy_match = 70
        if vacancy_description:
            vacancy_match = 78 if any(word in text for word in vacancy_description.lower().split()[:10]) else 60

        return {
            "skills": ["Python"] if "python" in text else [],
            "level": "Senior" if has_senior else "Middle",
            "cv_quality_score": max(0, min(100, cv_quality)),
            "trust_score": max(0, min(100, trust)),
            "vacancy_match_score": max(0, min(100, vacancy_match)),
            "risks": ["generic wording"] if has_generic else [],
            "summary": "Heuristic fallback CV analysis used because external LLM is unavailable.",
        }

    async def analyze_github(self, github_data: Dict[str, Any]) -> Dict[str, Any]:
        repos = github_data.get("repos", [])
        total = len(repos)
        if total == 0:
            return {
                "code_quality_score": 20,
                "activity_score": 20,
                "complexity_score": 15,
                "tech_stack": [],
                "summary": "No public repositories found.",
            }

        stars = sum((repo.get("stars") or 0) for repo in repos)
        has_language = sum(1 for repo in repos if repo.get("language"))
        code_quality = min(90, 30 + stars + has_language * 5)
        activity = min(90, 25 + total * 8)

        return {
            "code_quality_score": code_quality,
            "activity_score": activity,
            "complexity_score": min(85, int((code_quality + activity) / 2)),
            "tech_stack": list({repo.get("language") for repo in repos if repo.get("language")}),
            "summary": "Heuristic fallback GitHub analysis used because external LLM is unavailable.",
        }
