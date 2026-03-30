import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import type { Candidate } from '../api';
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

  if (loading) return <div className="app-page flex items-center justify-center">Loading analysis...</div>;
  if (!candidate) return <div className="app-page flex items-center justify-center">Candidate not found</div>;

  const analysis = candidate.analysis;

  return (
    <div className="app-page">
      <div className="app-container" style={{ maxWidth: 1000 }}>
        <Link to="/candidates" className="app-back">
          <ArrowLeft size={20} /> Back to Candidates
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-black mb-2">{candidate.name}</h1>
            <p className="app-subtitle">Analysis completed on {new Date(candidate.created_at).toLocaleDateString()}</p>
          </div>
          <div className="app-card p-6 rounded-2xl flex flex-col items-center">
            <span className="text-[var(--text-muted)] uppercase text-xs font-bold tracking-widest mb-1">Final Score</span>
            <span className="text-6xl font-black text-white">{analysis?.final_score || '...'}</span>
          </div>
        </div>

        {!analysis ? (
          <div className="p-8 rounded-xl text-center border border-[var(--warning)]/30 bg-[var(--warning)]/10">
            <h3 className="text-[var(--warning)] font-bold mb-2">Analysis in progress</h3>
            <p className="app-subtitle">Our AI agents are evaluating the CV and GitHub data. Refresh in a few seconds.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="app-card p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--text-muted)]">
                <Shield size={20} /> <span className="font-bold text-sm uppercase">Trust Score</span>
              </div>
              <div className="text-4xl font-bold">{analysis.trust_score}%</div>
              <div className="mt-4 h-2 bg-[#0d1526] rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${analysis.trust_score}%` }}></div>
              </div>
            </div>
            <div className="app-card p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--text-muted)]">
                <Code size={20} /> <span className="font-bold text-sm uppercase">Code Quality</span>
              </div>
              <div className="text-4xl font-bold">{analysis.code_quality_score}%</div>
              <div className="mt-4 h-2 bg-[#0d1526] rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${analysis.code_quality_score}%` }}></div>
              </div>
            </div>
            <div className="app-card p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--text-muted)]">
                <Activity size={20} /> <span className="font-bold text-sm uppercase">Activity</span>
              </div>
              <div className="text-4xl font-bold">{analysis.activity_score}%</div>
              <div className="mt-4 h-2 bg-[#0d1526] rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${analysis.activity_score}%` }}></div>
              </div>
            </div>
            <div className="app-card p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--text-muted)]">
                <BarChart3 size={20} /> <span className="font-bold text-sm uppercase">CV Quality</span>
              </div>
              <div className="text-4xl font-bold">{analysis.cv_quality_score}%</div>
              <div className="mt-4 h-2 bg-[#0d1526] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${analysis.cv_quality_score}%` }}></div>
              </div>
            </div>
            <div className="app-card p-8">
              <div className="flex items-center gap-3 mb-4 text-[var(--text-muted)]">
                <BarChart3 size={20} /> <span className="font-bold text-sm uppercase">Vacancy Match</span>
              </div>
              <div className="text-4xl font-bold">{analysis.vacancy_match_score}%</div>
              <div className="mt-4 h-2 bg-[#0d1526] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${analysis.vacancy_match_score}%` }}></div>
              </div>
            </div>
          </div>
        )}

        {analysis && (
          <div className="space-y-8">
            <section className="app-card p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <BarChart3 className="text-[var(--text-muted)]" /> Professional Summary
              </h2>
              <p className="text-[#d1def7] leading-relaxed text-lg">
                {analysis.summary}
              </p>
            </section>

            <section className="p-8 rounded-xl border border-[var(--danger)]/25 bg-[var(--danger)]/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-[var(--danger)]">
                <AlertTriangle /> Risks & Warnings
              </h2>
              <ul className="space-y-4">
                {/* Normally we would parse this from raw_llm_response, but for MVP we use a placeholder if empty */}
                <li className="text-[var(--text-muted)] flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0"></span>
                  Verification required for recent project claims.
                </li>
                {!candidate.github_url && (
                  <li className="text-[var(--text-muted)] flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5 shrink-0"></span>
                    Lack of GitHub profile reduces confidence in technical skill claims.
                  </li>
                )}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
