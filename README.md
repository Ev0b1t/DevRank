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

- backend tests: `19 passed`
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

## Quick start (full local run)

### 1) Install and prepare PostgreSQL

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql
```

Create DB user and DB:

```bash
sudo -u postgres psql -c "CREATE USER devrank_user WITH PASSWORD 'devrank_password';"
sudo -u postgres psql -c "CREATE DATABASE devrank_db OWNER devrank_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE devrank_db TO devrank_user;"
```

Validate connection:

```bash
PGPASSWORD="devrank_password" psql -h localhost -U devrank_user -d devrank_db -c "SELECT 1;"
```

Fix schema permissions (required for table creation):

```bash
sudo -u postgres psql -d devrank_db -c "GRANT USAGE, CREATE ON SCHEMA public TO devrank_user;"
```

If `public` schema permissions are restricted by policy, create and use a dedicated schema:

```bash
PGPASSWORD="devrank_password" psql -h localhost -U devrank_user -d devrank_db -c "CREATE SCHEMA IF NOT EXISTS devrank AUTHORIZATION devrank_user;"
PGPASSWORD="devrank_password" psql -h localhost -U devrank_user -d devrank_db -c "ALTER ROLE devrank_user IN DATABASE devrank_db SET search_path TO devrank;"
```

### 2) Backend setup and run

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
cp .env.example .env
```

Ensure `DB_URL` in `backend/.env`:

```env
DB_URL=postgresql+asyncpg://devrank_user:devrank_password@localhost:5432/devrank_db
```

Run API:

```bash
PYTHONPATH=. .venv/bin/python -m uvicorn app.main:app --reload
```

Run backend tests:

```bash
PYTHONPATH=. .venv/bin/python -m pytest -q
```

### 3) Frontend setup and run

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Environment variables

Backend reads from `.env`:

```env
DB_URL=postgresql+asyncpg://devrank_user:devrank_password@localhost:5432/devrank_db
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
