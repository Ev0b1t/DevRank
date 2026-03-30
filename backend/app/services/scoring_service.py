from typing import Dict, Any

class ScoringService:
    @staticmethod
    def calculate_final_score(data: Dict[str, Any]) -> float:
        """
        final_score = weighted_sum * confidence_factor
        """
        # Weights (MVP version)
        weights = {
            "vacancy_match": 0.4,
            "cv_quality": 0.15,
            "trust": 0.15,
            "code_quality": 0.2,
            "activity": 0.1
        }

        cv_score = data.get("cv_quality_score", 0)
        trust_score = data.get("trust_score", 0)
        vacancy_score = data.get("vacancy_match_score", 0)
        code_score = data.get("code_quality_score", 0)
        activity_score = data.get("activity_score", 0)

        weighted_sum = (
            vacancy_score * weights["vacancy_match"] +
            cv_score * weights["cv_quality"] +
            trust_score * weights["trust"] +
            code_score * weights["code_quality"] +
            activity_score * weights["activity"]
        )

        # confidence_factor ↓ if no github or thin data
        confidence_factor = 1.0
        if not data.get("has_github"):
            confidence_factor *= 0.7  # Penalty for no github validation
        
        # Additional logic could go here
        
        return round(weighted_sum * confidence_factor, 2)
