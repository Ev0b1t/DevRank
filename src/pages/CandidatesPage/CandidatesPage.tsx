import { useEffect, useState } from 'react';
import { api } from '../../api';
import type { Candidate } from '../../api';
import { ArrowRight, Code, ExternalLink, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    if (score >= 80) return { text: 'text-[#4ade80]', bg: 'bg-[rgba(74,222,128,0.1)]', border: 'border-[rgba(74,222,128,0.25)]', label: 'Strong' };
    if (score >= 50) return { text: 'text-[#fbbf24]', bg: 'bg-[rgba(251,191,36,0.1)]', border: 'border-[rgba(251,191,36,0.25)]', label: 'Average' };
    return { text: 'text-[#f87171]', bg: 'bg-[rgba(248,113,113,0.1)]', border: 'border-[rgba(248,113,113,0.25)]', label: 'Weak' };
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    const scoreA = a.analysis?.final_score ?? -1;
    const scoreB = b.analysis?.final_score ?? -1;
    return scoreB - scoreA;
  });

  return (
    <main
      className="min-h-screen flex items-start justify-center p-8 md:p-16"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 60%), #060d1a',
      }}
    >
      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-6xl">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
          <div>
            {/* SmartHire badge — mirrors the pill from the landing */}
            <span
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase border"
              style={{
                background: 'rgba(59,130,246,0.08)',
                borderColor: 'rgba(59,130,246,0.3)',
                color: '#93c5fd',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              AI Screening
            </span>

            <h1
              className="text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-none tracking-[-0.06em] mb-2"
              style={{ color: '#f0f6ff' }}
            >
              Dev<span style={{ color: '#3b82f6' }}>Rank</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
              Ranked by AI score and repository evidence
            </p>
          </div>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(59,130,246,0.45)] active:translate-y-0"
            style={{ background: '#3b82f6', color: '#fff', boxShadow: '0 8px 24px rgba(59,130,246,0.3)' }}
          >
            + New Analysis
          </Link>
        </header>

        {/* ── Sort pills ── */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase mr-1" style={{ color: 'rgba(148,163,184,0.5)' }}>
            Sort:
          </span>
          {(['score', 'date'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSortBy(key)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
              style={
                sortBy === key
                  ? { background: 'rgba(59,130,246,0.15)', color: '#93c5fd', borderColor: 'rgba(59,130,246,0.4)' }
                  : { background: 'rgba(255,255,255,0.02)', color: 'rgba(148,163,184,0.6)', borderColor: 'rgba(255,255,255,0.07)' }
              }
            >
              {key === 'score' ? 'Final score' : 'Date added'}
            </button>
          ))}
        </div>

        {/* ── Table card ── */}
        <div
          className="rounded-3xl overflow-hidden border"
          style={{
            background: 'rgba(255,255,255,0.025)',
            borderColor: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Candidate', 'Final Score', 'Trust Score', 'GitHub', ''].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(148,163,184,0.5)' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-sm" style={{ color: 'rgba(148,163,184,0.4)' }}>
                    Loading candidates…
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <Users size={32} className="mx-auto mb-3 opacity-20" style={{ color: '#3b82f6' }} />
                    <span className="block text-sm mb-3" style={{ color: 'rgba(148,163,184,0.5)' }}>
                      No candidates analyzed yet.
                    </span>
                    <Link
                      to="/upload"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-colors"
                      style={{ color: '#3b82f6' }}
                    >
                      Run your first analysis <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((c, i) => {
                  const finalScore = c.analysis?.final_score ?? null;
                  const trustScore = c.analysis?.trust_score ?? null;
                  const sc = finalScore !== null ? getScoreColors(finalScore) : null;

                  return (
                    <tr
                      key={c.id}
                      className="group transition-colors"
                      style={{
                        borderTop: i !== 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.04)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* Name */}
                      <td className="px-6 py-5 align-middle">
                        <span className="block text-sm font-semibold leading-snug" style={{ color: '#e2ecff' }}>
                          {c.name}
                        </span>
                        <span className="block text-xs mt-0.5" style={{ color: 'rgba(148,163,184,0.5)' }}>
                          {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>

                      {/* Final Score */}
                      <td className="px-6 py-5 align-middle">
                        {finalScore !== null && sc ? (
                          <div className="flex items-center gap-2.5">
                            <span className={`text-[2rem] font-black leading-none tracking-tight ${sc.text}`}>
                              {finalScore}
                            </span>
                            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                              {sc.label}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm opacity-30" style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      {/* Trust Score */}
                      <td className="px-6 py-5 align-middle">
                        {trustScore !== null ? (
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className={sc?.text ?? ''} style={!sc ? { color: '#94a3b8' } : undefined} />
                            <span className="text-sm font-semibold" style={{ color: '#e2ecff' }}>{trustScore}%</span>
                          </div>
                        ) : (
                          <span className="text-sm opacity-30" style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      {/* GitHub */}
                      <td className="px-6 py-5 align-middle">
                        {c.github_url ? (
                          <a
                            href={c.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs no-underline transition-colors"
                            style={{ color: 'rgba(148,163,184,0.55)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.55)')}
                          >
                            <Code size={13} />
                            Connected
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <span className="text-xs opacity-30" style={{ color: '#94a3b8' }}>Not linked</span>
                        )}
                      </td>

                      {/* Arrow */}
                      <td className="px-6 py-5 align-middle text-right">
                        <Link to={'/'}></Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {!loading && candidates.length > 0 && (
            <div
              className="px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(148,163,184,0.35)',
              }}
            >
              {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} total
            </div>
          )}
        </div>
      </div>
    </main>
  );
}