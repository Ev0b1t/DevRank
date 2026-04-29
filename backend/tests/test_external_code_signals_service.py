import pytest

from app.services.external_code_signals_service import ExternalCodeSignalsService


class _MockResponse:
    def __init__(self, payload, status_code=200):
        self._payload = payload
        self.status_code = status_code

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError("http error")

    def json(self):
        return self._payload


class _MockClient:
    async def get(self, url, headers=None, params=None):
        if "sonarcloud.io" in url:
            return _MockResponse(
                {
                    "component": {
                        "measures": [
                            {"metric": "coverage", "value": "82.1"},
                            {"metric": "bugs", "value": "4"},
                            {"metric": "code_smells", "value": "12"},
                        ]
                    }
                }
            )
        return _MockResponse({}, status_code=404)


@pytest.mark.asyncio
async def test_fetch_repo_signals_returns_empty_when_not_configured(monkeypatch):
    monkeypatch.setattr("app.services.external_code_signals_service.settings.SONAR_TOKEN", "")
    monkeypatch.setattr("app.services.external_code_signals_service.settings.SONAR_ORGANIZATION", "")
    service = ExternalCodeSignalsService()
    out = await service.fetch_repo_signals(_MockClient(), "foo", "bar")
    assert out == {}


@pytest.mark.asyncio
async def test_fetch_repo_signals_maps_sonar_metrics(monkeypatch):
    monkeypatch.setattr("app.services.external_code_signals_service.settings.SONAR_TOKEN", "token")
    monkeypatch.setattr("app.services.external_code_signals_service.settings.SONAR_ORGANIZATION", "org")
    monkeypatch.setattr("app.services.external_code_signals_service.settings.SONAR_PROJECT_KEY_TEMPLATE", "{owner}_{repo}")
    service = ExternalCodeSignalsService()
    out = await service.fetch_repo_signals(_MockClient(), "foo", "bar")
    assert out["sonar"]["coverage"] == 82.1
    assert out["sonar"]["bugs"] == 4.0
