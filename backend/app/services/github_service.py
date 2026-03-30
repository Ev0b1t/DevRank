import httpx
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
        username = github_url.rstrip("/").split("/")[-1]
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

            processed_repos = []
            for repo in repos:
                processed_repos.append({
                    "name": repo["name"],
                    "language": repo["language"],
                    "stars": repo["stargazers_count"],
                    "description": (repo["description"] or "")[: settings.MAX_REPO_DESC_CHARS],
                    "updated_at": repo["updated_at"],
                    # Optional: fetch README for better analysis
                })

            return {
                "username": username,
                "repos": processed_repos,
                "total_repos": len(repos)
            }
