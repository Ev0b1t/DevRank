# DevRank MVP: Product Problem, Implementation, and Manual Testing

## 1) What problem the product solves (from product passport)

DevRank solves the core recruiting bottleneck from the passport: HR spends too much time on manual CV screening and often gets biased or weak signal from "inflated" resumes.

MVP value:

- reduce manual screening by giving objective score signals
- compare candidates faster using one ranking table
- detect weak credibility via `Trust Score`
- validate technical claims via GitHub activity/quality signals (if provided)

Expected business outcome in MVP:

- faster first-pass shortlisting
- clearer "strong vs weak" differentiation
- lower risk of moving generic candidates to next stage

## 2) How it is implemented under the hood (with code references)

### Frontend flow

- API client: `src/api/index.ts`
  - `api.upload(formData)`
  - `api.listCandidates()`
  - `api.getCandidate(id)`
- Upload page (input and submit): `src/pages/UploadPage.tsx`
  - sends `name`, optional `github_url`, optional `vacancy_description`, and CV (`cv_text` or `cv_file`)
- Candidates list with sorting: `src/pages/CandidatesPage.tsx`
  - sorts by `final_score` or creation date
- Candidate details with key metrics: `src/pages/CandidateDetailsPage.tsx`
  - shows `final_score`, `trust_score`, `code_quality_score`, `activity_score`, `cv_quality_score`, `vacancy_match_score`, `summary`

### Backend flow

- API routes: `backend/app/api/candidates.py`
  - `POST /api/candidates/upload`
  - `GET /api/candidates/`
  - `GET /api/candidates/{id}`
- App startup and router registration: `backend/app/main.py`
- Analysis pipeline: `backend/app/services/analysis_service.py`
  - get candidate
  - analyze CV via LLM provider
  - optional GitHub fetch + analysis
  - final scoring
  - save analysis record
- Scoring formula: `backend/app/services/scoring_service.py`
  - `final_score = weighted_sum * confidence_factor`
  - if no GitHub, confidence factor is reduced (`0.7`)
- GitHub integration: `backend/app/services/github_service.py`
  - fetches user repos metadata from GitHub API
- LLM-agnostic design:
  - interface: `backend/app/llm/base.py` (`LLMProvider`)
  - provider factory: `backend/app/core/llm_factory.py`
  - fallback provider: `backend/app/llm/mock_provider.py` (used when API keys are absent)

## 3) What to expect now (MVP scope) and what not to expect yet

### What to expect

- CV upload and candidate creation works
- background analysis creates metrics
- list and details pages show scoring results
- no GitHub leads to lower final score
- generic CV text leads to lower trust in fallback mode

### What not to expect yet

- full production auth/roles/multi-user
- deep source parsing (HH/LinkedIn/Enbek, ATS integrations)
- full risk extraction/render from structured backend output (details page still has MVP placeholder warnings)
- advanced interview copilot and export workflows

## 4) Manual verification (frontend + backend)

## Prerequisites

1. Start backend:

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
PYTHONPATH=. .venv/bin/python -m uvicorn app.main:app --reload
```

2. Start frontend (new terminal):

```bash
npm install
npm run dev
```

3. Open app in browser:

- `http://localhost:5173`

---

## 5) Manual test cases and sample data

### Case A: Strong candidate with GitHub (should rank high)

Input in UI (`/upload`):

- Name: `Strong Candidate`
- GitHub URL: `https://github.com/torvalds`
- Vacancy description: `Senior systems engineer`
- CV text:
  `Senior Python engineer. Led backend migration. Improved latency by 40% and reliability by 30%.`

Expected:

- status returns to candidates page after submit
- in list/details, `Final Score` should be noticeably high (typically > 70 in current setup)
- `Trust Score` and `Code Quality Score` should be relatively high

### Case B: Generic/inflated CV without GitHub (should rank low)

Input:

- Name: `Generic Candidate`
- GitHub URL: leave empty
- CV text:
  `Motivated team player hardworking fast learner passionate about technology`

Expected:

- lower `Trust Score`
- lower `Final Score` (penalty from missing GitHub)
- warnings in details page include no-GitHub confidence warning

### Case C: CV present, GitHub missing (confidence penalty check)

Input:

- Name: `No GitHub Candidate`
- GitHub URL: empty
- CV text:
  `Senior backend developer with Python and FastAPI. Improved performance by 20%.`

Expected:

- analysis is created
- score is reduced compared to similar candidate with strong GitHub

---

## 6) Backend API manual check (optional, raw HTTP)

### Upload

```bash
curl -X POST http://127.0.0.1:8000/api/candidates/upload \
  -F "name=Strong Candidate" \
  -F "github_url=https://github.com/torvalds" \
  -F "vacancy_description=Senior systems engineer" \
  -F "cv_text=Senior Python engineer. Improved latency by 40%. Led migration."
```

Expected response shape:

```json
{
  "candidate_id": 1,
  "status": "Analysis started in background"
}
```

### List candidates

```bash
curl http://127.0.0.1:8000/api/candidates/
```

### Candidate details

```bash
curl http://127.0.0.1:8000/api/candidates/1
```

Expected detail object includes:

- candidate core fields (`id`, `name`, `github_url`, `created_at`)
- nested `analysis` with:
  - `cv_quality_score`
  - `trust_score`
  - `vacancy_match_score`
  - `code_quality_score`
  - `activity_score`
  - `final_score`
  - `summary`

## 7) Current quality gates and how to run them

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
cd backend
PYTHONPATH=. .venv/bin/python -m pytest -q
```

Current expected state: backend tests pass, frontend lint/build pass.

## 8) Quick troubleshooting

- `Upload failed` in UI:
  - check backend is running on `http://localhost:8000`
- slow/failed GitHub scoring:
  - try candidate without GitHub to verify baseline pipeline
- no LLM keys:
  - system uses `MockProvider` fallback (see `backend/app/core/llm_factory.py` and `backend/app/llm/mock_provider.py`)
