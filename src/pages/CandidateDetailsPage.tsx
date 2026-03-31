import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import type { Candidate } from '../api';
import { ArrowLeft, Shield, Code, Activity, BarChart3, AlertTriangle } from 'lucide-react';
import './candidate-details.css';

export default function CandidateDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadCandidate(id);
  }, [id]);

  const loadCandidate = async (cid: string) => {
    try {
      const data = await api.getCandidate(cid);
      setCandidate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <main className="detail">
      <div className="detail__container detail__state">Loading analysis...</div>
    </main>
  );

  if (!candidate) return (
    <main className="detail">
      <div className="detail__container detail__state">Candidate not found</div>
    </main>
  );

  const analysis = candidate.analysis;

  return (
    <main className="detail">
      <div className="detail__container">

        <Link to="/candidates" className="detail__back">
          <ArrowLeft size={16} /> Back to Candidates
        </Link>

        {/* Hero row */}
        <div className="detail__hero">
          <div>
            <span className="detail__eyebrow">Candidate profile</span>
            <h1 className="detail__name">{candidate.name}</h1>
            <p className="detail__meta">
              Analysis completed on {new Date(candidate.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>
          <div className="final-score-card">
            <span className="final-score-card__label">Final Score</span>
            <span className="final-score-card__value">{analysis?.final_score ?? '…'}</span>
          </div>
        </div>

        {/* Analysis pending */}
        {!analysis ? (
          <div className="detail__pending">
            <h3 className="detail__pending-title">Analysis in progress</h3>
            <p className="detail__pending-body">
              Our AI agents are evaluating the CV and GitHub data. Refresh in a few seconds.
            </p>
          </div>
        ) : (
          <>
            {/* Score grid */}
            <div className="score-grid">
              <div className="score-card">
                <div className="score-card__header">
                  <Shield size={15} />
                  <span>Trust Score</span>
                </div>
                <div className="score-card__value">{analysis.trust_score}%</div>
                <div className="score-card__bar">
                  <div className="score-card__fill score-card__fill--green" style={{ width: `${analysis.trust_score}%` }} />
                </div>
              </div>

              <div className="score-card">
                <div className="score-card__header">
                  <Code size={15} />
                  <span>Code Quality</span>
                </div>
                <div className="score-card__value">{analysis.code_quality_score}%</div>
                <div className="score-card__bar">
                  <div className="score-card__fill score-card__fill--blue" style={{ width: `${analysis.code_quality_score}%` }} />
                </div>
              </div>

              <div className="score-card">
                <div className="score-card__header">
                  <Activity size={15} />
                  <span>Activity</span>
                </div>
                <div className="score-card__value">{analysis.activity_score}%</div>
                <div className="score-card__bar">
                  <div className="score-card__fill score-card__fill--purple" style={{ width: `${analysis.activity_score}%` }} />
                </div>
              </div>

              <div className="score-card">
                <div className="score-card__header">
                  <BarChart3 size={15} />
                  <span>CV Quality</span>
                </div>
                <div className="score-card__value">{analysis.cv_quality_score}%</div>
                <div className="score-card__bar">
                  <div className="score-card__fill score-card__fill--emerald" style={{ width: `${analysis.cv_quality_score}%` }} />
                </div>
              </div>

              <div className="score-card">
                <div className="score-card__header">
                  <BarChart3 size={15} />
                  <span>Vacancy Match</span>
                </div>
                <div className="score-card__value">{analysis.vacancy_match_score}%</div>
                <div className="score-card__bar">
                  <div className="score-card__fill score-card__fill--amber" style={{ width: `${analysis.vacancy_match_score}%` }} />
                </div>
              </div>
            </div>

            {/* Summary + Risks */}
            <div className="detail__sections">
              <section className="detail__section">
                <h2 className="detail__section-title">
                  <BarChart3 size={18} /> Professional Summary
                </h2>
                <p className="detail__summary">{analysis.summary}</p>
              </section>

              <section className="detail__risks">
                <h2 className="detail__risks-title">
                  <AlertTriangle size={18} /> Risks &amp; Warnings
                </h2>
                <ul className="detail__risk-list">
                  <li className="detail__risk-item">
                    <span className="detail__risk-dot" />
                    Verification required for recent project claims.
                  </li>
                  {!candidate.github_url && (
                    <li className="detail__risk-item">
                      <span className="detail__risk-dot" />
                      Lack of GitHub profile reduces confidence in technical skill claims.
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </>
        )}

      </div>
    </main>
  );
}