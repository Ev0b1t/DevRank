from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartHire AI (DevRank)"
    VERSION: str = "0.2.0"

    DB_URL: str = "sqlite+aiosqlite:///./devrank.db"

    LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    GITHUB_TOKEN: str = ""
    MAX_CV_CHARS: int = 8000
    MAX_VACANCY_CHARS: int = 2000
    MAX_GITHUB_REPOS: int = 6
    GITHUB_FOCUS_REPOS: int = 3
    MAX_REPO_DESC_CHARS: int = 280
    MAX_README_CHARS: int = 1000
    MAX_CODE_SAMPLE_CHARS: int = 700
    MAX_CODE_SAMPLES_PER_REPO: int = 2
    MAX_COMMITS_ANALYZED: int = 20
    MAX_PRS_ANALYZED: int = 20
    MAX_GITHUB_PAYLOAD_CHARS: int = 12000
    ENABLE_EXTERNAL_CODE_SIGNALS: bool = False
    SONAR_TOKEN: str = ""
    SONAR_ORGANIZATION: str = ""
    SONAR_PROJECT_KEY_TEMPLATE: str = "{owner}_{repo}"
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
