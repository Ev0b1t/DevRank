from app.core.config import settings
from app.llm.base import LLMProvider
from app.llm.gemini_provider import GeminiProvider
from app.llm.openai_provider import OpenAIProvider
from app.llm.mock_provider import MockProvider
from loguru import logger

def get_llm_provider() -> LLMProvider:
    if settings.LLM_PROVIDER == "openai":
        if not settings.OPENAI_API_KEY:
            logger.warning("OPENAI_API_KEY is empty. Falling back to MockProvider.")
            return MockProvider()
        logger.info("LLM provider selected: OpenAIProvider")
        return OpenAIProvider()
    if settings.LLM_PROVIDER == "gemini" and not settings.GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY is empty. Falling back to MockProvider.")
        return MockProvider()
    # Default to Gemini provider
    logger.info("LLM provider selected: GeminiProvider")
    return GeminiProvider()
