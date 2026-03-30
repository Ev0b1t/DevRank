from typing import Any, Dict, List


def trim_text(value: str, max_chars: int) -> str:
    text = (value or "").strip()
    if len(text) <= max_chars:
        return text
    return text[:max_chars] + "... [truncated]"


def trim_github_payload(
    github_data: Dict[str, Any],
    max_repos: int,
    max_repo_desc_chars: int,
    max_payload_chars: int,
) -> Dict[str, Any]:
    repos: List[Dict[str, Any]] = list(github_data.get("repos", []))[:max_repos]
    normalized_repos: List[Dict[str, Any]] = []

    for repo in repos:
        normalized_repos.append(
            {
                "name": repo.get("name"),
                "language": repo.get("language"),
                "stars": repo.get("stars", 0),
                "description": trim_text(repo.get("description") or "", max_repo_desc_chars),
                "updated_at": repo.get("updated_at"),
            }
        )

    payload = {
        "username": github_data.get("username"),
        "total_repos": github_data.get("total_repos", len(normalized_repos)),
        "repos": normalized_repos,
    }

    # Final safety guard for model context budget.
    serialized = str(payload)
    if len(serialized) <= max_payload_chars:
        return payload

    # If still too large, keep only lightweight fields.
    lightweight_repos = [
        {
            "name": repo.get("name"),
            "language": repo.get("language"),
            "stars": repo.get("stars", 0),
        }
        for repo in normalized_repos
    ]
    return {
        "username": github_data.get("username"),
        "total_repos": github_data.get("total_repos", len(lightweight_repos)),
        "repos": lightweight_repos,
    }
