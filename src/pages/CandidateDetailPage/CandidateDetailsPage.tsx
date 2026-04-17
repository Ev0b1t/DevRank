import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLink } from '@/src/shared/ui/ProtectedLink';
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

  if (loading) return (
    <main className="min-h-screen flex items-start justify-center py-16 px-5 bg-gradient-radial from-blue-500/20 to-transparent">
      <div className="w-full max-w-4xl px-14 py-14 border border-slate-700 rounded-3xl bg-slate-900/50 shadow-2xl flex items-center justify-center min-h-60 text-slate-400 text-sm">Loading analysis...</div>
    </main>
  );

  if (!candidate) return (
    <main className="min-h-screen flex items-start justify-center py-16 px-5 bg-gradient-radial from-blue-500/20 to-transparent">
      <div className="w-full max-w-4xl px-14 py-14 border border-slate-700 rounded-3xl bg-slate-900/50 shadow-2xl flex items-center justify-center min-h-60 text-slate-400 text-sm">Candidate not found</div>
    </main>
  );

  const analysis = candidate.analysis;

  return (
    <main className="min-h-screen flex items-start justify-center py-16 px-5 bg-gradient-radial from-blue-500/20 to-transparent">
      <div className="w-full max-w-4xl px-14 py-14 border border-slate-700 rounded-3xl bg-slate-900/50 shadow-2xl">

        <ProtectedLink to="/candidates" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-slate-200 no-underline mb-10 transition-colors duration-200">
          <ArrowLeft size={16} /> Back to Candidates
        </ProtectedLink>

        {/* Hero row */}
        <div className="flex justify-between items-start gap-8 mb-10 md:flex-col md:items-start">
          <div>
            <span className="inline-block mb-3.5 text-sm font-bold tracking-wider uppercase text-slate-400">Candidate profile</span>
            <h1 className="m-0 text-5xl md:text-4xl font-bold leading-tight tracking-tight text-blue-50">{candidate.name}</h1>
            <p className="m-0 text-sm text-slate-400 leading-relaxed">
              Analysis completed on {new Date(candidate.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex flex-col items-center px-10 py-7 border border-slate-700 rounded-2xl bg-white/2 shrink-0 md:flex-row md:items-center md:gap-5 md:p-7">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2 md:m-0">Final Score</span>
            <span className="text-6xl font-bold tracking-tight text-blue-50">{analysis?.final_score ?? '…'}</span>
          </div>
        </div>

        {/* Analysis pending */}
        {!analysis ? (
          <div className="px-7.5 py-9 border border-slate-700 rounded-2xl bg-white/2 text-center">
            <h3 className="text-base font-bold text-blue-200 m-0 mb-2.5">Analysis in progress</h3>
            <p className="text-sm text-slate-400 leading-relaxed m-0">
              Our AI agents are evaluating the CV and GitHub data. Refresh in a few seconds.
            </p>
          </div>
        ) : (
          <>
            {/* Score grid */}
            <div className="grid grid-cols-5 gap-3.5 mb-10 lg:grid-cols-3 sm:grid-cols-2">
              <div className="p-6 border border-slate-700 rounded-2xl bg-white/2 hover:bg-white/4 transition-colors duration-150">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 mb-3.5">
                  <Shield size={15} />
                  <span>Trust Score</span>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-200 mb-3.5 leading-none">{analysis.trust_score}%</div>
                <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-600 ease-out bg-green-500" style={{ width: `${analysis.trust_score}%` }} />
                </div>
              </div>

              <div className="p-6 border border-slate-700 rounded-2xl bg-white/2 hover:bg-white/4 transition-colors duration-150">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 mb-3.5">
                  <Code size={15} />
                  <span>Code Quality</span>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-200 mb-3.5 leading-none">{analysis.code_quality_score}%</div>
                <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-600 ease-out bg-blue-400" style={{ width: `${analysis.code_quality_score}%` }} />
                </div>
              </div>

              <div className="p-6 border border-slate-700 rounded-2xl bg-white/2 hover:bg-white/4 transition-colors duration-150">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 mb-3.5">
                  <Activity size={15} />
                  <span>Activity</span>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-200 mb-3.5 leading-none">{analysis.activity_score}%</div>
                <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-600 ease-out bg-purple-400" style={{ width: `${analysis.activity_score}%` }} />
                </div>
              </div>

              <div className="p-6 border border-slate-700 rounded-2xl bg-white/2 hover:bg-white/4 transition-colors duration-150">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 mb-3.5">
                  <BarChart3 size={15} />
                  <span>CV Quality</span>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-200 mb-3.5 leading-none">{analysis.cv_quality_score}%</div>
                <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-600 ease-out bg-emerald-400" style={{ width: `${analysis.cv_quality_score}%` }} />
                </div>
              </div>

              <div className="p-6 border border-slate-700 rounded-2xl bg-white/2 hover:bg-white/4 transition-colors duration-150">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 mb-3.5">
                  <BarChart3 size={15} />
                  <span>Vacancy Match</span>
                </div>
                <div className="text-2xl font-bold tracking-tight text-blue-200 mb-3.5 leading-none">{analysis.vacancy_match_score}%</div>
                <div className="h-1 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-600 ease-out bg-amber-400" style={{ width: `${analysis.vacancy_match_score}%` }} />
                </div>
              </div>
            </div>

            {/* Summary + Risks */}
            <div className="flex flex-col gap-4.5">
              <section className="p-7.5 border border-slate-700 rounded-2xl bg-white/2">
                <h2 className="flex items-center gap-2.5 text-base font-bold text-blue-200 m-0 mb-4.5">
                  <BarChart3 size={18} /> Professional Summary
                </h2>
                <p className="m-0 text-sm text-slate-400 leading-relaxed">{analysis.summary}</p>
              </section>

              <section className="p-7.5 border border-red-500/20 rounded-2xl bg-red-500/5">
                <h2 className="flex items-center gap-2.5 text-base font-bold text-red-400 m-0 mb-4.5">
                  <AlertTriangle size={18} /> Risks &amp; Warnings
                </h2>
                <ul className="list-none m-0 p-0 flex flex-col gap-3">
                  <li className="flex items-start gap-3 text-xs font-normal text-slate-400 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.75" />
                    Verification required for recent project claims.
                  </li>
                  {!candidate.github_url && (
                    <li className="flex items-start gap-3 text-xs font-normal text-slate-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.75" />
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