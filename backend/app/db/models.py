import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    cv_text = Column(Text, nullable=True)
    github_url = Column(String, nullable=True)
    vacancy_description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    analysis = relationship("Analysis", back_populates="candidate", uselist=False)

class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), unique=True, index=True)
    
    cv_quality_score = Column(Float, nullable=True)
    trust_score = Column(Float, nullable=True)
    code_quality_score = Column(Float, nullable=True)
    activity_score = Column(Float, nullable=True)
    vacancy_match_score = Column(Float, nullable=True)
    final_score = Column(Float, nullable=True)
    
    summary = Column(Text, nullable=True)
    raw_llm_response = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    candidate = relationship("Candidate", back_populates="analysis")
