import pytest
from app.services.cv_service import CVService

@pytest.mark.asyncio
async def test_cv_service_clean_text():
    service = CVService()
    raw = "  Hello   World  \n New line "
    cleaned = service.clean_text(raw)
    assert cleaned == "Hello World New line"

@pytest.mark.asyncio
async def test_get_cv_text_raw():
    service = CVService()
    text = await service.get_cv_text(raw_text="Test CV Content")
    assert text == "Test CV Content"
