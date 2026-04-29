from app.core.llm_factory import get_llm_provider
from app.llm.gemini_provider import GeminiProvider
from app.llm.openai_provider import OpenAIProvider


def test_get_llm_provider_openai(monkeypatch):
    monkeypatch.setattr("app.core.llm_factory.settings.LLM_PROVIDER", "openai")
    monkeypatch.setattr("app.core.llm_factory.settings.OPENAI_API_KEY", "x")
    monkeypatch.setattr("app.core.llm_factory.OpenAIProvider", lambda: "openai_provider")
    provider = get_llm_provider()
    assert provider == "openai_provider"


def test_get_llm_provider_default_gemini(monkeypatch):
    monkeypatch.setattr("app.core.llm_factory.settings.LLM_PROVIDER", "unknown")
    monkeypatch.setattr("app.core.llm_factory.GeminiProvider", lambda: "gemini_provider")
    provider = get_llm_provider()
    assert provider == "gemini_provider"


def test_get_llm_provider_fallback_without_keys(monkeypatch):
    monkeypatch.setattr("app.core.llm_factory.settings.LLM_PROVIDER", "gemini")
    monkeypatch.setattr("app.core.llm_factory.settings.GEMINI_API_KEY", "")
    provider = get_llm_provider()
    assert provider.__class__.__name__ == "MockProvider"
