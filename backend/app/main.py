from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import candidates
from app.core.config import settings
from app.core.logging import setup_logging
from app.db.session import engine
from app.db.models import Base
from loguru import logger

app = FastAPI(title=settings.PROJECT_NAME, version=settings.VERSION)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(candidates.router, prefix="/api")

@app.on_event("startup")
async def startup():
    setup_logging()
    logger.info("Starting API service: {} v{}", settings.PROJECT_NAME, settings.VERSION)
    logger.info("Configured LLM provider: {}", settings.LLM_PROVIDER)
    # Create tables (MVP approach, normally use Alembic)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database schema ensured")

@app.get("/")
def read_root():
    return {"message": "Welcome to SmartHire AI (DevRank) API"}
