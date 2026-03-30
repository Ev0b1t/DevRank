import json
from typing import Any, Dict
from google import genai
from google.genai import types
from app.llm.base import LLMProvider
from app.core.config import settings
from app.llm.parser import parse_llm_response
from app.schemas.llm import CVAnalysisResult, GitHubAnalysisResult
from app.llm.payload import trim_text, trim_github_payload
from loguru import logger

class GeminiProvider(LLMProvider):
    def __init__(self):
        self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        self.model_id = "gemini-3-flash-preview"  # or setting.GEMINI_MODEL

    async def analyze_cv(self, cv_text: str, vacancy_description: str = "") -> Dict[str, Any]:
        safe_cv_text = trim_text(cv_text, settings.MAX_CV_CHARS)
        safe_vacancy_description = trim_text(vacancy_description, settings.MAX_VACANCY_CHARS)
        logger.info(
            "Gemini CV analysis request: cv_chars={} vacancy_chars={} (trimmed)",
            len(safe_cv_text),
            len(safe_vacancy_description),
        )
        prompt = f"""
        Analyze the following CV text against the provided job description and provide a structured assessment in JSON format.
        
        Job Description OR Target Role:
        {safe_vacancy_description}

        CV Text:
        {safe_cv_text}
        
        Required JSON format:
        {{
          "skills": ["list of skills"],
          "level": "Junior/Middle/Senior",
          "cv_quality_score": 0-100,
          "trust_score": 0-100,
          "vacancy_match_score": 0-100,
          "risks": ["list of risks or missing info"],
          "summary": "Short professional summary reflecting how well they fit the role"
        }}
        """
        response = await self.client.aio.models.generate_content(
            model=self.model_id,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        logger.info("Gemini CV analysis response received")
        return parse_llm_response(response.text, CVAnalysisResult)

    async def analyze_github(self, github_data: Dict[str, Any]) -> Dict[str, Any]:
        safe_github_data = trim_github_payload(
            github_data=github_data,
            max_repos=settings.MAX_GITHUB_REPOS,
            max_repo_desc_chars=settings.MAX_REPO_DESC_CHARS,
            max_payload_chars=settings.MAX_GITHUB_PAYLOAD_CHARS,
        )
        logger.info(
            "Gemini GitHub analysis request: repos_sent={} total_repos={}",
            len(safe_github_data.get("repos", [])),
            safe_github_data.get("total_repos", 0),
        )
        prompt = f"""
        Analyze the following GitHub data and provide a structured assessment in JSON format.
        
        GitHub Data:
        {json.dumps(safe_github_data)}
        
        Required JSON format:
        {{
          "code_quality_score": 0-100,
          "activity_score": 0-100,
          "complexity_score": 0-100,
          "tech_stack": ["detected technologies"],
          "summary": "Short technical assessment of their GitHub presence"
        }}
        """
        response = await self.client.aio.models.generate_content(
            model=self.model_id,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        logger.info("Gemini GitHub analysis response received")
        return parse_llm_response(response.text, GitHubAnalysisResult)
