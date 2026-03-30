import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import type { Candidate } from '../api';
import { ArrowRight, Code, ExternalLink, ShieldCheck } from 'lucide-react';

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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
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
    <div className="app-page">
      <div className="app-container">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="app-title">Candidates</h1>
            <p className="app-subtitle">Ranked by AI intelligence and repository evidence.</p>
          </div>
          <Link to="/upload" className="app-btn app-btn-primary">
            + New Analysis
          </Link>
        </header>

        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-[var(--text-muted)]">Sort by:</span>
          <button
            type="button"
            onClick={() => setSortBy('score')}
            className={`app-btn text-sm ${sortBy === 'score' ? 'app-btn-primary' : 'app-btn-secondary'}`}
          >
            Final score
          </button>
          <button
            type="button"
            onClick={() => setSortBy('date')}
            className={`app-btn text-sm ${sortBy === 'date' ? 'app-btn-primary' : 'app-btn-secondary'}`}
          >
            Created date
          </button>
        </div>

        <div className="app-card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--border)] text-sm text-[var(--text-muted)]">
                <th className="p-6 font-medium">Candidate</th>
                <th className="p-6 font-medium">Final Score</th>
                <th className="p-6 font-medium">Trust Score</th>
                <th className="p-6 font-medium">GitHub Status</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr><td colSpan={5} className="p-12 text-center text-[var(--text-muted)]">Loading candidates...</td></tr>
              ) : candidates.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-[var(--text-muted)]">No candidates analyzed yet.</td></tr>
              ) : (
                sortedCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-[#17233a] transition-colors group">
                    <td className="p-6">
                      <div className="font-bold text-lg">{c.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{new Date(c.created_at).toLocaleDateString()}</div>
                    </td>
                    <td className="p-6">
                      <div className={`text-2xl font-black ${getScoreColor(c.analysis?.final_score || 0)}`}>
                        {c.analysis ? c.analysis.final_score : '—'}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className={getScoreColor(c.analysis?.trust_score || 0)} />
                        {c.analysis ? `${c.analysis.trust_score}%` : '—'}
                      </div>
                    </td>
                    <td className="p-6">
                      {c.github_url ? (
                        <a href={c.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors">
                          <Code size={16} /> Connected <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-[var(--text-muted)]">No GitHub</span>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      <Link to={`/candidates/${c.id}`} className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white font-medium group-hover:translate-x-1 transition-transform">
                        Details <ArrowRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
