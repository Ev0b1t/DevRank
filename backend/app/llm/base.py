from abc import ABC, abstractmethod
from typing import Any, Dict

class LLMProvider(ABC):
    @abstractmethod
    async def analyze_cv(self, cv_text: str, vacancy_description: str = "") -> Dict[str, Any]:
        """Analyzes CV text against a vacancy and returns a JSON-friendly dictionary."""
        pass

    @abstractmethod
    async def analyze_github(self, github_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyzes GitHub data and returns a JSON-friendly dictionary."""
        pass
