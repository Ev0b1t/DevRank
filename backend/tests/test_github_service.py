import pytest

from app.services.github_service import GitHubService


class _MockResponse:
    def __init__(self, payload):
        self._payload = payload

    def raise_for_status(self):
        return None

    def json(self):
        return self._payload


class _MockClient:
    def __init__(self, payload):
        self._payload = payload
        self.last_url = None

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return None

    async def get(self, url, headers=None):
        self.last_url = url
        return _MockResponse(self._payload)


@pytest.mark.asyncio
async def test_get_user_data_extracts_username_and_maps_repos(monkeypatch):
    payload = [
        {
            "name": "repo-1",
            "language": "Python",
            "stargazers_count": 10,
            "description": "desc",
            "updated_at": "2025-01-01T00:00:00Z",
        }
    ]
    mock_client = _MockClient(payload)
    monkeypatch.setattr("app.services.github_service.httpx.AsyncClient", lambda: mock_client)

    service = GitHubService()
    result = await service.get_user_data("https://github.com/example-user/")

    assert result["username"] == "example-user"
    assert result["total_repos"] == 1
    assert result["repos"][0]["name"] == "repo-1"
