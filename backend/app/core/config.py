from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartHire AI (DevRank)"
    VERSION: str = "0.2.0"

    DB_URL: str = "sqlite+aiosqlite:///./devrank.db"

    LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str = "AIzaSyDpkd5Z8ro-iNcXmNOrw0hkY8WHCg1wQoc"
    OPENAI_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    MAX_CV_CHARS: int = 8000
    MAX_VACANCY_CHARS: int = 2000
    MAX_GITHUB_REPOS: int = 6
    MAX_REPO_DESC_CHARS: int = 280
    MAX_GITHUB_PAYLOAD_CHARS: int = 12000
    LOG_LEVEL: str = "INFO"
    LOG_DIR: str = "logs"
    LOG_FILE: str = "devrank.log"
    LOG_ROTATION: str = "10 MB"
    LOG_RETENTION: str = "14 days"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
