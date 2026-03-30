from app.llm.payload import trim_text, trim_github_payload


def test_trim_text_truncates_long_values():
    raw = "a" * 50
    out = trim_text(raw, 10)
    assert out.startswith("a" * 10)
    assert out.endswith("[truncated]")


def test_trim_github_payload_limits_repos_and_description():
    data = {
        "username": "user",
        "total_repos": 99,
        "repos": [
            {"name": f"repo-{i}", "language": "Python", "stars": i, "description": "d" * 500, "updated_at": "x"}
            for i in range(10)
        ],
    }
    out = trim_github_payload(data, max_repos=3, max_repo_desc_chars=40, max_payload_chars=10_000)
    assert len(out["repos"]) == 3
    assert len(out["repos"][0]["description"]) <= 60


def test_trim_github_payload_fallback_to_lightweight_if_too_large():
    data = {
        "username": "user",
        "repos": [{"name": "r", "language": "Python", "stars": 1, "description": "x" * 5000, "updated_at": "x"}],
    }
    out = trim_github_payload(data, max_repos=1, max_repo_desc_chars=1000, max_payload_chars=40)
    assert "description" not in out["repos"][0]
