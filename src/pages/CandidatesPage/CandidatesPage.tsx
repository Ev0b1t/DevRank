import { useEffect, useState } from 'react';
import { ProtectedLink } from '@/src/shared/ui/ProtectedLink';
import { api } from '../../api';
import type { Candidate } from '../../api';
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

  const getScoreColors = (score: number) => {
    if (score >= 80) return { text: 'text-[#4ade80]', bg: 'bg-[rgba(74,222,128,0.12)]', label: 'Strong' };
    if (score >= 50) return { text: 'text-[#fbbf24]', bg: 'bg-[rgba(251,191,36,0.12)]', label: 'Average' };
    return { text: 'text-[#f87171]', bg: 'bg-[rgba(248,113,113,0.12)]', label: 'Weak' };
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
    <main className="min-h-screen flex items-start justify-center p-16 bg-[radial-gradient(circle_at_top,rgba(110,168,255,0.2),transparent_45%)]">
      <div className="w-[min(1120px,100%)] p-14 border border-(--border) rounded-8xl bg-[color-mix(in_srgb,var(--panel)_92%,#05090f)] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">

        <header className="flex justify-between items-start mb-10 gap-6">
          <div>
            <span className="inline-block mb-3.5 text-sm font-bold tracking-[0.26em] uppercase text-(--text-muted)">AI Screening</span>
            <h1 className="m-0 mb-2.5 text-[clamp(2rem,3.5vw,3rem)] leading-[0.95] tracking-[-0.05em] text-[#f3f7ff]">Candidates</h1>
            <p className="m-0 text-[0.95rem] leading-[1.75] text-(--text-muted)">
              Ranked by AI score and repository evidence
            </p>
          </div>
          <ProtectedLink to="/upload" className="inline-flex items-center justify-center gap-1.5 min-h-11 px-5.5 rounded-full no-underline font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 bg-(--brand) text-[#051024] shadow-[0_16px_32px_rgba(0,0,0,0.22)]">
            + New Analysis
          </ProtectedLink>
        </header>

        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-(--text-muted) mr-1">Sort:</span>
          <button
            type="button"
            onClick={() => setSortBy('score')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              sortBy === 'score'
                ? 'bg-[#162643] text-(--text) border border-[#2a426d]'
                : 'border border-(--border) bg-[rgba(255,255,255,0.02)] text-(--text-muted) hover:bg-[rgba(255,255,255,0.05)] hover:text-(--text)'
            }`}
          >
            Final score
          </button>
          <button
            type="button"
            onClick={() => setSortBy('date')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              sortBy === 'date'
                ? 'bg-[#162643] text-(--text) border border-[#2a426d]'
                : 'border border-(--border) bg-[rgba(255,255,255,0.02)] text-(--text-muted) hover:bg-[rgba(255,255,255,0.05)] hover:text-(--text)'
            }`}
          >
            Date added
          </button>
        </div>

        <div className="border border-(--border) rounded-5xl bg-[rgba(255,255,255,0.02)] overflow-hidden">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-(--border)">
                <th className="p-[14px_24px] text-xs font-bold tracking-[0.18em] uppercase text-(--text-muted)">Candidate</th>
                <th className="p-[14px_24px] text-xs font-bold tracking-[0.18em] uppercase text-(--text-muted)">Final Score</th>
                <th className="p-[14px_24px] text-xs font-bold tracking-[0.18em] uppercase text-(--text-muted)">Trust Score</th>
                <th className="p-[14px_24px] text-xs font-bold tracking-[0.18em] uppercase text-(--text-muted)">GitHub</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-14 text-center text-(--text-muted) text-sm opacity-50">
                    Loading candidates...
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-14 text-center text-(--text-muted) text-sm">
                    <span>No candidates analyzed yet.</span>
                    <ProtectedLink to="/upload" className="block mt-3 text-sm text-(--text-muted) no-underline hover:text-(--text) transition-colors">
                      Run your first analysis →
                    </ProtectedLink>
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((c) => {
                  const finalScore = c.analysis?.final_score ?? null;
                  const trustScore = c.analysis?.trust_score ?? null;
                  const scoreColors = finalScore !== null ? getScoreColors(finalScore) : null;
                  return (
                    <tr key={c.id} className="transition-colors hover:bg-[rgba(255,255,255,0.03)]">
                      <td className="p-[18px_24px] align-middle">
                        <span className="block text-sm font-semibold text-[#d7e5ff] leading-[1.3]"> {c.name}</span>
                        <span className="block text-xs text-(--text-muted) mt-0.75">
                          {new Date(c.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </span>
                      </td>

                      <td className="p-[18px_24px] align-middle">
                        {finalScore !== null && scoreColors ? (
                          <div className="flex items-center gap-2.5">
                            <span className={`text-4xl font-bold tracking-[-0.03em] leading-none ${scoreColors.text}`}>
                              {finalScore}
                            </span>
                            <span className={`text-xs font-bold tracking-widest uppercase px-2 py-0.75 rounded-full ${scoreColors.bg} ${scoreColors.text}`}>
                              {scoreColors.label}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-(--text-muted) opacity-50">—</span>
                        )}
                      </td>

                      <td className="p-[18px_24px] align-middle">
                        {trustScore !== null ? (
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className={scoreColors?.text || 'text-(--text-muted)'} />
                            <span className="text-sm font-semibold text-(--text)">{trustScore}%</span>
                          </div>
                        ) : (
                          <span className="text-sm text-(--text-muted) opacity-50">—</span>
                        )}
                      </td>

                      <td className="p-[18px_24px] align-middle">
                        {c.github_url ? (
                          <a
                            href={c.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.25 text-xs text-(--text-muted) no-underline transition-colors hover:text-(--text)"
                          >
                            <Code size={13} />
                            Connected
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-sm text-(--text-muted) opacity-50">Not linked</span>
                        )}
                      </td>

                      <td className="p-[18px_24px] align-middle text-right">
                        <ProtectedLink to={`/candidates/${c.id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--text-muted) no-underline transition-all hover:text-(--text) hover:gap-2">
                          View details <ArrowRight size={13} />
                        </ProtectedLink>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {!loading && candidates.length > 0 && (
            <div className="p-3 border-t border-(--border) text-xs font-bold tracking-[0.12em] uppercase text-(--text-muted)">
              {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} total
            </div>
          )}
        </div>

      </div>
    </main>
  );
}