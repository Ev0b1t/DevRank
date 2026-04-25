import httpx
import base64
from typing import Any, Dict, List, Optional
from app.core.config import settings
from loguru import logger

class GitHubService:
    def __init__(self):
        self.headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        if settings.GITHUB_TOKEN:
            self.headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    async def get_user_data(self, github_url: str) -> Dict[str, Any]:
        # Extract username from URL: https://github.com/username
        username = self._extract_username(github_url)
        logger.info("Fetching GitHub metadata for username={}", username)
        
        async with httpx.AsyncClient() as client:
            # 1. Fetch repos
            repos_url = (
                f"https://api.github.com/users/{username}/repos"
                f"?sort=updated&per_page={settings.MAX_GITHUB_REPOS}"
            )
            repos_resp = await client.get(repos_url, headers=self.headers)
            repos_resp.raise_for_status()
            repos = repos_resp.json()
            focus_repos = self._select_focus_repos(repos, settings.GITHUB_FOCUS_REPOS)

            processed_repos = []
            for repo in focus_repos:
                owner = repo.get("owner", {}).get("login", username)
                repo_name = repo["name"]
                default_branch = repo.get("default_branch") or "main"

                languages_full = await self._fetch_repo_languages(client, owner, repo_name)
                tree_paths = await self._fetch_repo_tree_paths(client, owner, repo_name, default_branch)
                signals = self._detect_repo_signals(tree_paths)
                readme_excerpt = await self._fetch_readme_excerpt(client, owner, repo_name)
                code_paths = self._pick_code_sample_paths(tree_paths, settings.MAX_CODE_SAMPLES_PER_REPO)
                code_samples = await self._fetch_code_samples(client, owner, repo_name, code_paths)

                processed_repos.append({
                    "name": repo_name,
                    "language": repo["language"],
                    "stars": repo["stargazers_count"],
                    "description": (repo["description"] or "")[: settings.MAX_REPO_DESC_CHARS],
                    "updated_at": repo["updated_at"],
                    "languages_full": languages_full,
                    "readme_excerpt": readme_excerpt,
                    "code_samples": code_samples,
                    **signals,
                })

            return {
                "username": username,
                "repos": processed_repos,
                "total_repos": len(repos),
                "analysis_scope": {
                    "repos_discovered": len(repos),
                    "repos_analyzed": len(processed_repos),
                },
            }

    @staticmethod
    def _extract_username(github_url: str) -> str:
        return github_url.rstrip("/").split("/")[-1]

    @staticmethod
    def _select_focus_repos(repos: List[Dict[str, Any]], limit: int) -> List[Dict[str, Any]]:
        non_forks = [repo for repo in repos if not repo.get("fork", False)]

        def repo_rank(repo: Dict[str, Any]):
            stars = repo.get("stargazers_count", 0)
            pushed_at = repo.get("pushed_at") or repo.get("updated_at") or ""
            return (
                stars,
                pushed_at,
            )

        sorted_repos = sorted(non_forks, key=repo_rank, reverse=True)
        return sorted_repos[:limit]

    @staticmethod
    def _detect_repo_signals(paths: List[str]) -> Dict[str, bool]:
        lower_paths = [path.lower() for path in paths]
        return {
            "has_tests": any(
                "/test" in p or p.startswith("test") or "/spec" in p or p.startswith("spec") for p in lower_paths
            ),
            "has_ci": any(p.startswith(".github/workflows/") or "gitlab-ci" in p for p in lower_paths),
            "has_readme": any(p == "readme.md" or p.endswith("/readme.md") for p in lower_paths),
            "has_docker": any(p == "dockerfile" or p.endswith("/dockerfile") for p in lower_paths),
        }

    @staticmethod
    def _pick_code_sample_paths(paths: List[str], limit: int) -> List[str]:
        allowed_ext = (".py", ".ts", ".tsx", ".js", ".go", ".java", ".rs", ".kt", ".rb", ".php", ".cpp", ".c")
        blocked_markers = ("test", "spec", "dist/", "build/", "node_modules/")
        code_paths = []
        for path in paths:
            lower = path.lower()
            if any(marker in lower for marker in blocked_markers):
                continue
            if lower.endswith(allowed_ext):
                code_paths.append(path)
            if len(code_paths) >= limit:
                break
        return code_paths

    async def _fetch_repo_languages(self, client: httpx.AsyncClient, owner: str, repo: str) -> Dict[str, int]:
        try:
            url = f"https://api.github.com/repos/{owner}/{repo}/languages"
            response = await client.get(url, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as exc:
            logger.warning("Failed to fetch languages for {}/{}: {}", owner, repo, exc)
            return {}

    async def _fetch_repo_tree_paths(
        self, client: httpx.AsyncClient, owner: str, repo: str, default_branch: str
    ) -> List[str]:
        try:
            url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{default_branch}?recursive=1"
            response = await client.get(url, headers=self.headers)
            response.raise_for_status()
            tree = response.json().get("tree", [])
            return [entry.get("path", "") for entry in tree if entry.get("type") in (None, "blob")]
        except Exception as exc:
            logger.warning("Failed to fetch tree for {}/{}: {}", owner, repo, exc)
            return []

    async def _fetch_readme_excerpt(self, client: httpx.AsyncClient, owner: str, repo: str) -> str:
        try:
            url = f"https://api.github.com/repos/{owner}/{repo}/readme"
            response = await client.get(url, headers=self.headers)
            response.raise_for_status()
            payload = response.json()
            if payload.get("encoding") == "base64":
                decoded = base64.b64decode(payload.get("content", "")).decode("utf-8", errors="ignore")
                return decoded[: settings.MAX_README_CHARS]
            return ""
        except Exception as exc:
            logger.debug("README not available for {}/{}: {}", owner, repo, exc)
            return ""

    async def _fetch_code_samples(
        self, client: httpx.AsyncClient, owner: str, repo: str, paths: List[str]
    ) -> List[Dict[str, str]]:
        samples: List[Dict[str, str]] = []
        for path in paths:
            try:
                url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}"
                response = await client.get(url, headers=self.headers)
                response.raise_for_status()
                payload = response.json()
                if payload.get("encoding") == "base64":
                    decoded = base64.b64decode(payload.get("content", "")).decode("utf-8", errors="ignore")
                    snippet = decoded[: settings.MAX_CODE_SAMPLE_CHARS]
                    samples.append({"path": path, "snippet": snippet})
            except Exception as exc:
                logger.debug("Failed to fetch code sample {}/{} {}: {}", owner, repo, path, exc)
        return samples
