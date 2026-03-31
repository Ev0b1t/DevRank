import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Candidate } from '../api';
import { ArrowRight, Code, ExternalLink, ShieldCheck } from 'lucide-react';
import './candidates.css';
 
export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
 
  useEffect(() => {
    loadCandidates();
  }, []);
 
  const loadCandidates = async () => {
    try {
      const data = await api.listCandidates();
      setCandidates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'score--high';
    if (score >= 50) return 'score--mid';
    return 'score--low';
  };
 
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Strong';
    if (score >= 50) return 'Average';
    return 'Weak';
  };
 
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    const scoreA = a.analysis?.final_score ?? -1;
    const scoreB = b.analysis?.final_score ?? -1;
    return scoreB - scoreA;
  });
 
  return (
    <main className="candidates">
      <div className="candidates__container">
 
        <header className="candidates__header">
          <div>
            <span className="candidates__eyebrow">AI Screening</span>
            <h1 className="candidates__title">Candidates</h1>
            <p className="candidates__subtitle">
              Ranked by AI score and repository evidence
            </p>
          </div>
          <Link to="/upload" className="button button_primary">
            + New Analysis
          </Link>
        </header>
 
        <div className="sort-bar">
          <span className="sort-bar__label">Sort:</span>
          <button
            type="button"
            onClick={() => setSortBy('score')}
            className={`sort-btn ${sortBy === 'score' ? 'sort-btn--active' : ''}`}
          >
            Final score
          </button>
          <button
            type="button"
            onClick={() => setSortBy('date')}
            className={`sort-btn ${sortBy === 'date' ? 'sort-btn--active' : ''}`}
          >
            Date added
          </button>
        </div>
 
        <div className="table-card">
          <table className="cand-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Final Score</th>
                <th>Trust Score</th>
                <th>GitHub</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="table-empty">
                    Loading candidates...
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="table-empty">
                    <span>No candidates analyzed yet.</span>
                    <Link to="/upload" className="table-empty__link">
                      Run your first analysis →
                    </Link>
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((c) => {
                  const finalScore = c.analysis?.final_score ?? null;
                  const trustScore = c.analysis?.trust_score ?? null;
                  return (
                    <tr key={c.id} className="cand-row">
                      <td>
                        <span className="cand-name">{c.name}</span>
                        <span className="cand-date">
                          {new Date(c.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </span>
                      </td>
 
                      <td>
                        {finalScore !== null ? (
                          <div className="score-cell">
                            <span className={`score-number ${getScoreClass(finalScore)}`}>
                              {finalScore}
                            </span>
                            <span className={`score-badge ${getScoreClass(finalScore)}`}>
                              {getScoreLabel(finalScore)}
                            </span>
                          </div>
                        ) : (
                          <span className="cell-empty">—</span>
                        )}
                      </td>
 
                      <td>
                        {trustScore !== null ? (
                          <div className="trust-cell">
                            <ShieldCheck size={14} className={`trust-icon ${getScoreClass(trustScore)}`} />
                            <span className="trust-value">{trustScore}%</span>
                          </div>
                        ) : (
                          <span className="cell-empty">—</span>
                        )}
                      </td>
 
                      <td>
                        {c.github_url ? (
                          <a
                            href={c.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="github-link"
                          >
                            <Code size={13} />
                            Connected
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="cell-empty">Not linked</span>
                        )}
                      </td>
 
                      <td className="action-cell">
                        <Link to={`/candidates/${c.id}`} className="action-link">
                          View details <ArrowRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
 
          {!loading && candidates.length > 0 && (
            <div className="table-footer">
              {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} total
            </div>
          )}
        </div>
 
      </div>
    </main>
  );
}