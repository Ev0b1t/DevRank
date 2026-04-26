import pytest

from app.services.github_service import GitHubService


class _MockResponse:
    def __init__(self, payload, status_code=200):
        self._payload = payload
        self.status_code = status_code

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP {self.status_code}")
        return None

    def json(self):
        return self._payload


class _MockClient:
    def __init__(self):
        self.last_url = None

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return None

    async def get(self, url, headers=None):
        self.last_url = url
        if "/users/example-user/repos" in url:
            return _MockResponse(
                [
                    {
                        "name": "repo-1",
                        "language": "Python",
                        "stargazers_count": 10,
                        "description": "desc",
                        "updated_at": "2025-01-01T00:00:00Z",
                        "pushed_at": "2025-01-01T00:00:00Z",
                        "fork": False,
                        "owner": {"login": "example-user"},
                        "default_branch": "main",
                    }
                ]
            )
        if "/repos/example-user/repo-1/languages" in url:
            return _MockResponse({"Python": 1200})
        if "/repos/example-user/repo-1/git/trees/main" in url:
            return _MockResponse(
                {"tree": [{"path": "app/main.py"}, {"path": "tests/test_main.py"}, {"path": ".github/workflows/ci.yml"}]}
            )
        if "/repos/example-user/repo-1/readme" in url:
            return _MockResponse({"content": "IyBSRUFETUU=\n", "encoding": "base64"})  # README
        if "/repos/example-user/repo-1/contents/app/main.py" in url:
            return _MockResponse({"content": "cHJpbnQoJ2hlbGxvJyk=\n", "encoding": "base64"})  # print('hello')
        if "/repos/example-user/repo-1/commits" in url:
            return _MockResponse(
                [
                    {"commit": {"message": "feat: add parser"}},
                    {"commit": {"message": "fix(api): handle timeout"}},
                    {"commit": {"message": "update stuff"}},
                ]
            )
        if "/repos/example-user/repo-1/pulls" in url:
            return _MockResponse(
                [
                    {"state": "closed", "merged_at": "2025-01-10T00:00:00Z"},
                    {"state": "closed", "merged_at": None},
                    {"state": "open", "merged_at": None},
                ]
            )
        return _MockResponse({})


@pytest.mark.asyncio
async def test_get_user_data_extracts_username_and_maps_repos(monkeypatch):
    mock_client = _MockClient()
    monkeypatch.setattr("app.services.github_service.httpx.AsyncClient", lambda: mock_client)
    monkeypatch.setattr("app.services.github_service.settings.MAX_GITHUB_REPOS", 6)
    monkeypatch.setattr("app.services.github_service.settings.GITHUB_FOCUS_REPOS", 3)
    monkeypatch.setattr("app.services.github_service.settings.ENABLE_EXTERNAL_CODE_SIGNALS", False)

    service = GitHubService()
    result = await service.get_user_data("https://github.com/example-user/")

    assert result["username"] == "example-user"
    assert result["total_repos"] == 1
    assert result["repos"][0]["name"] == "repo-1"
    assert result["repos"][0]["languages_full"]["Python"] == 1200
    assert result["repos"][0]["has_tests"] is True
    assert result["repos"][0]["has_ci"] is True
    assert len(result["repos"][0]["code_samples"]) >= 1
    assert result["repos"][0]["commit_signals"]["recent_commit_count"] == 3
    assert result["repos"][0]["pr_signals"]["recent_pr_count"] == 3
    assert result["repos"][0]["pr_signals"]["merged_pr_count"] == 1
    assert result["repos"][0]["external_quality_signals"] == {}


def test_select_focus_repos_prioritizes_popularity_and_recent_activity():
    repos = [
        {"name": "small-old", "stargazers_count": 1, "pushed_at": "2021-01-01T00:00:00Z", "fork": False},
        {"name": "popular", "stargazers_count": 100, "pushed_at": "2022-01-01T00:00:00Z", "fork": False},
        {"name": "recent", "stargazers_count": 50, "pushed_at": "2025-01-01T00:00:00Z", "fork": False},
        {"name": "forked", "stargazers_count": 999, "pushed_at": "2025-01-01T00:00:00Z", "fork": True},
    ]
    selected = GitHubService._select_focus_repos(repos, limit=2)
    assert [r["name"] for r in selected] == ["popular", "recent"]


def test_detect_repo_signals_from_tree_paths():
    paths = [
        "src/app.py",
        "tests/test_app.py",
        ".github/workflows/ci.yml",
        "README.md",
        "Dockerfile",
    ]
    signals = GitHubService._detect_repo_signals(paths)
    assert signals["has_tests"] is True
    assert signals["has_ci"] is True
    assert signals["has_readme"] is True
    assert signals["has_docker"] is True
