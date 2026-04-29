import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../../api';
import type { Candidate } from '../../api';
import { ArrowLeft, Shield, Code, Activity, BarChart3, AlertTriangle } from 'lucide-react';

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

  const glassCard = {
    background: 'rgba(255,255,255,0.025)',
    borderColor: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
  };

  const mainBg = {
    background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 60%), #060d1a',
  };

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center p-8" style={mainBg}>
      <div
        className="px-14 py-14 rounded-3xl border text-sm flex items-center justify-center min-h-60"
        style={{ ...glassCard, color: 'rgba(148,163,184,0.5)' }}
      >
        Loading analysis…
      </div>
    </main>
  );

  if (!candidate) return (
    <main className="min-h-screen flex items-center justify-center p-8" style={mainBg}>
      <div
        className="px-14 py-14 rounded-3xl border text-sm flex items-center justify-center min-h-60"
        style={{ ...glassCard, color: 'rgba(148,163,184,0.5)' }}
      >
        Candidate not found
      </div>
    </main>
  );

  const analysis = candidate.analysis;

  const scoreMetrics = [
    { label: 'Trust Score',     value: analysis?.trust_score,        icon: Shield,   color: '#4ade80' },
    { label: 'Code Quality',    value: analysis?.code_quality_score,  icon: Code,     color: '#60a5fa' },
    { label: 'Activity',        value: analysis?.activity_score,      icon: Activity, color: '#c084fc' },
    { label: 'CV Quality',      value: analysis?.cv_quality_score,    icon: BarChart3,color: '#34d399' },
    { label: 'Vacancy Match',   value: analysis?.vacancy_match_score, icon: BarChart3,color: '#fbbf24' },
  ];

  const finalScore = analysis?.final_score ?? null;
  const finalColor = finalScore !== null
    ? finalScore >= 80 ? '#4ade80' : finalScore >= 50 ? '#fbbf24' : '#f87171'
    : '#93c5fd';

  return (
    <main className="min-h-screen flex items-start justify-center p-8 md:p-16" style={mainBg}>

      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-4xl">

        {/* Back */}
        <Link
          to="/candidates"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase no-underline mb-10 transition-colors duration-200"
          style={{ color: 'rgba(148,163,184,0.55)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.55)')}
        >
          <ArrowLeft size={15} /> Back to Candidates
        </Link>

        {/* Hero card */}
        <div
          className="rounded-3xl border p-8 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          style={glassCard}
        >
          <div>
            <span
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase border"
              style={{
                background: 'rgba(59,130,246,0.08)',
                borderColor: 'rgba(59,130,246,0.3)',
                color: '#93c5fd',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              Candidate Profile
            </span>
            <h1
              className="text-4xl font-black leading-none tracking-[-0.04em] mb-2"
              style={{ color: '#f0f6ff' }}
            >
              {candidate.name}
            </h1>
            <p className="text-xs" style={{ color: 'rgba(148,163,184,0.5)' }}>
              Analysis completed on{' '}
              {new Date(candidate.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>

          {/* Final score badge */}
          <div
            className="flex flex-col items-center px-8 py-5 rounded-2xl border shrink-0"
            style={{
              background: `rgba(${finalScore !== null && finalScore >= 80 ? '74,222,128' : finalScore !== null && finalScore >= 50 ? '251,191,36' : '248,113,113'},0.06)`,
              borderColor: `rgba(${finalScore !== null && finalScore >= 80 ? '74,222,128' : finalScore !== null && finalScore >= 50 ? '251,191,36' : '248,113,113'},0.2)`,
            }}
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(148,163,184,0.5)' }}>
              Final Score
            </span>
            <span className="text-6xl font-black leading-none tracking-tight" style={{ color: finalColor }}>
              {finalScore ?? '…'}
            </span>
          </div>
        </div>

        {!analysis ? (
          <div
            className="rounded-3xl border p-10 text-center"
            style={glassCard}
          >
            <h3 className="text-base font-bold mb-2" style={{ color: '#93c5fd' }}>Analysis in progress</h3>
            <p className="text-sm" style={{ color: 'rgba(148,163,184,0.6)' }}>
              Our AI agents are evaluating the CV and GitHub data. Refresh in a few seconds.
            </p>
          </div>
        ) : (
          <>
            {/* Score metrics grid */}
            <div className="grid grid-cols-5 gap-3 mb-5 sm:grid-cols-3 xs:grid-cols-2">
              {scoreMetrics.map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    ...glassCard,
                    boxShadow: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.025)')}
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <Icon size={13} style={{ color: 'rgba(148,163,184,0.5)' }} />
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(148,163,184,0.5)' }}>
                      {label}
                    </span>
                  </div>
                  <div className="text-2xl font-black leading-none tracking-tight mb-3" style={{ color }}>
                    {value ?? '—'}
                    <span className="text-sm font-semibold ml-0.5" style={{ color: 'rgba(148,163,184,0.4)' }}>%</span>
                  </div>
                  <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${value ?? 0}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {/* Summary */}
              <section
                className="p-7 rounded-2xl border"
                style={glassCard}
              >
                <h2
                  className="flex items-center gap-2 text-sm font-bold mb-4"
                  style={{ color: '#93c5fd' }}
                >
                  <BarChart3 size={16} style={{ color: '#3b82f6' }} />
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>
                  {analysis.summary}
                </p>
              </section>

              {/* Risks */}
              <section
                className="p-7 rounded-2xl border"
                style={{
                  background: 'rgba(248,113,113,0.04)',
                  borderColor: 'rgba(248,113,113,0.15)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <h2 className="flex items-center gap-2 text-sm font-bold mb-4" style={{ color: '#f87171' }}>
                  <AlertTriangle size={16} />
                  Risks &amp; Warnings
                </h2>
                <ul className="flex flex-col gap-3 list-none m-0 p-0">
                  <li className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.6)' }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: '#f87171' }} />
                    Verification required for recent project claims.
                  </li>
                  {!candidate.github_url && (
                    <li className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.6)' }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: '#f87171' }} />
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