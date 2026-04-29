import json
from typing import Any, Dict
from openai import OpenAI
from app.llm.base import LLMProvider
from app.core.config import settings
from app.llm.parser import parse_llm_response
from app.schemas.llm import CVAnalysisResult, GitHubAnalysisResult
from app.llm.payload import trim_text, trim_github_payload
from loguru import logger

class OpenAIProvider(LLMProvider):
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model_id = "gpt-4o"

    async def analyze_cv(self, cv_text: str, vacancy_description: str = "") -> Dict[str, Any]:
        safe_cv_text = trim_text(cv_text, settings.MAX_CV_CHARS)
        safe_vacancy_description = trim_text(vacancy_description, settings.MAX_VACANCY_CHARS)
        prompt = (
            "Analyze this CV text against the vacancy description and return JSON only. "
            f"Vacancy: {safe_vacancy_description}\nCV: {safe_cv_text}"
        )
        # Simplified for now, real implementation would mirror Gemini's structure
        logger.info(
            "OpenAI CV analysis request: cv_chars={} vacancy_chars={} (trimmed)",
            len(safe_cv_text),
            len(safe_vacancy_description),
        )
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[
                {"role": "system", "content": "You are a technical recruiter. Respond ONLY with JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        logger.info("OpenAI CV analysis response received")
        return parse_llm_response(response.choices[0].message.content, CVAnalysisResult)

    async def analyze_github(self, github_data: Dict[str, Any]) -> Dict[str, Any]:
        safe_github_data = trim_github_payload(
            github_data=github_data,
            max_repos=settings.MAX_GITHUB_REPOS,
            max_repo_desc_chars=settings.MAX_REPO_DESC_CHARS,
            max_payload_chars=settings.MAX_GITHUB_PAYLOAD_CHARS,
        )
        logger.info(
            "OpenAI GitHub analysis request: repos_sent={} total_repos={}",
            len(safe_github_data.get("repos", [])),
            safe_github_data.get("total_repos", 0),
        )
        prompt = f"Analyze this GitHub JSON data and return assessment JSON: {json.dumps(safe_github_data)}"
        response = self.client.chat.completions.create(
            model=self.model_id,
            messages=[
                {"role": "system", "content": "You are a senior developer. Respond ONLY with JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        logger.info("OpenAI GitHub analysis response received")
        return parse_llm_response(response.choices[0].message.content, GitHubAnalysisResult)
