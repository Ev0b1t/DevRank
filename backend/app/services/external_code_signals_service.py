from typing import Any, Dict
import httpx
from loguru import logger
from app.core.config import settings


class ExternalCodeSignalsService:
    async def fetch_repo_signals(self, client: httpx.AsyncClient, owner: str, repo: str) -> Dict[str, Any]:
        signals: Dict[str, Any] = {}
        sonar = await self._fetch_sonar_signals(client, owner, repo)
        if sonar:
            signals["sonar"] = sonar
        return signals

    async def _fetch_sonar_signals(self, client: httpx.AsyncClient, owner: str, repo: str) -> Dict[str, float]:
        if not settings.SONAR_TOKEN or not settings.SONAR_ORGANIZATION:
            return {}

        project_key = settings.SONAR_PROJECT_KEY_TEMPLATE.format(owner=owner, repo=repo)
        url = "https://sonarcloud.io/api/measures/component"
        params = {
            "component": project_key,
            "metricKeys": "coverage,bugs,code_smells,vulnerabilities,duplicated_lines_density",
        }
        try:
            response = await client.get(url, headers={"Authorization": f"Bearer {settings.SONAR_TOKEN}"}, params=params)
            response.raise_for_status()
            measures = response.json().get("component", {}).get("measures", [])
            mapped: Dict[str, float] = {}
            for item in measures:
                metric = item.get("metric")
                value = item.get("value")
                if metric and value is not None:
                    try:
                        mapped[metric] = float(value)
                    except (TypeError, ValueError):
                        continue
            return mapped
        except Exception as exc:
            logger.warning("Sonar signals fetch failed for {}/{}: {}", owner, repo, exc)
            return {}
