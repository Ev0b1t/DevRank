from app.services.scoring_service import ScoringService

def test_calculate_final_score_full_data():
    data = {
        "cv_quality_score": 80,
        "trust_score": 70,
        "vacancy_match_score": 85,
        "code_quality_score": 90,
        "activity_score": 60,
        "has_github": True
    }
    # (85*0.4 + 80*0.15 + 70*0.15 + 90*0.2 + 60*0.1) * 1.0
    # (34 + 12 + 10.5 + 18 + 6) = 80.5
    score = ScoringService.calculate_final_score(data)
    assert score == 80.5

def test_calculate_final_score_no_github():
    data = {
        "cv_quality_score": 100,
        "trust_score": 100,
        "vacancy_match_score": 100,
        "code_quality_score": 0,
        "activity_score": 0,
        "has_github": False
    }
    # (100*0.4 + 100*0.15 + 100*0.15 + 0 + 0) * 0.7 = 70 * 0.7 = 49.0
    score = ScoringService.calculate_final_score(data)
    assert score == 49.0

