from app.llm.parser import parse_llm_response
from app.schemas.llm import CVAnalysisResult


def test_parse_llm_response_valid_json():
    raw = '{"skills":["Python"],"level":"Middle","cv_quality_score":80,"trust_score":70,"vacancy_match_score":75,"risks":["generic"],"summary":"ok"}'
    parsed = parse_llm_response(raw, CVAnalysisResult)
    assert parsed["skills"] == ["Python"]
    assert parsed["cv_quality_score"] == 80


def test_parse_llm_response_json_in_markdown_code_block():
    raw = """Here is output:
```json
{"skills":["FastAPI"],"level":"Junior","cv_quality_score":61,"trust_score":55,"vacancy_match_score":60,"risks":[],"summary":"baseline"}
```
"""
    parsed = parse_llm_response(raw, CVAnalysisResult)
    assert parsed["skills"] == ["FastAPI"]
    assert parsed["level"] == "Junior"


def test_parse_llm_response_returns_fallback_on_invalid_payload():
    raw = "not-a-json-response"
    parsed = parse_llm_response(raw, CVAnalysisResult)
    assert parsed["skills"] == []
    assert parsed["cv_quality_score"] == 0
