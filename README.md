# DevRank (SmartHire AI MVP)

DevRank is an MVP of an AI-assisted recruiter tool that analyzes candidate CV + GitHub profile and returns objective scoring metrics for HR triage.

## MVP outcome

Current implementation supports:

- upload candidate CV (text or PDF)
- optional GitHub URL input
- background analysis flow
- candidate list with sorting
- candidate details page with key scores
- final scoring with confidence penalty when GitHub is missing

Core value: the system separates strong candidates from generic or "inflated" CVs using `Trust Score`, `CV Quality`, and GitHub-based metrics.

## Architecture (LLM-agnostic)

Backend is organized by layers:

- `app/api` - HTTP endpoints (FastAPI)
- `app/services` - business logic (`cv_service`, `github_service`, `analysis_service`, `scoring_service`)
- `app/llm` - provider abstraction and adapters
- `app/core/llm_factory.py` - provider selection by config (`LLM_PROVIDER`)
- `app/db` - SQLAlchemy models/session
- `app/schemas` - pydantic schemas

LLM integration is provider-based:

- `GeminiProvider`
- `OpenAIProvider`
- `MockProvider` fallback (used when API keys are absent, so MVP still works end-to-end)

## API endpoints

- `POST /api/candidates/upload`
- `GET /api/candidates/`
- `GET /api/candidates/{id}`
- `GET /`

## Verified test/build status

Latest local checks:

- backend tests: `11 passed`
- frontend lint: `passed`
- frontend build: `passed`
- API smoke flow: `passed`

Smoke flow validated:

1. upload candidate
2. wait for background analysis
3. retrieve list/details with computed scores

Observed behavior:

- strong CV + active GitHub -> high final score
- no GitHub -> lower final score via confidence factor
- generic CV -> lower trust score

## Run locally

### 1) Backend

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

If `asyncpg`/`psycopg2` build fails on your Python version, use this MVP-compatible install:

```bash
.venv/bin/python -m pip install fastapi==0.115.0 uvicorn==0.30.6 sqlalchemy==2.0.35 pydantic==2.9.2 pydantic-settings==2.5.2 alembic==1.13.3 httpx==0.27.2 pytest==8.3.3 pytest-asyncio==0.24.0 google-genai==0.3.0 openai==1.50.0 PyPDF2==3.0.1 python-multipart==0.0.12 aiosqlite==0.20.0 greenlet
```

Run API:

```bash
PYTHONPATH=. .venv/bin/python -m uvicorn app.main:app --reload
```

Run backend tests:

```bash
PYTHONPATH=. .venv/bin/python -m pytest -q
```

### 2) Frontend

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Environment variables

Backend reads from `.env`:

```env
DB_URL=sqlite+aiosqlite:///./devrank.db
LLM_PROVIDER=gemini
GEMINI_API_KEY=
OPENAI_API_KEY=
GITHUB_TOKEN=
```

## Known MVP gaps

- no frontend e2e tests yet
- `risks` are not fully rendered from backend structured output in details page
- no production auth/roles/multi-user
- no external recruiting source integrations (HH/LinkedIn/Enbek) in this MVP slice
