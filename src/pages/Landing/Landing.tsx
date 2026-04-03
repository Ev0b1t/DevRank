import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#060e1e] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-white/5 bg-[rgba(6,14,30,0.8)] backdrop-blur-xl">
        <span className="font-display text-xl font-extrabold tracking-[-0.04em]">
          Dev<span className="bg-gradient-to-r from-[#5b9cf6] to-[#a8c8ff] bg-clip-text text-transparent">Rank</span>
        </span>
        <div className="flex items-center gap-8">
          <a href="#how" className="text-sm text-slate-400 hover:text-white transition-colors">How it works</a>
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a
            href="#contact"
            className="inline-flex items-center h-9 px-5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            Request demo
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-32 px-10 flex flex-col items-center text-center overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(91,156,246,0.18)_0%,transparent_65%)]" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(120,80,220,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(91,156,246,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-[rgba(91,156,246,0.08)] border border-[rgba(91,156,246,0.2)] text-xs font-semibold uppercase tracking-[0.18em] text-[#89b8fc]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5b9cf6] shadow-[0_0_8px_rgba(91,156,246,0.9)] animate-pulse" />
            SmartHire AI — MVP
          </span>

          <h1 className="font-display text-[clamp(4.5rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-white mb-8">
            Dev<span className="bg-gradient-to-br from-[#a8c8ff] via-[#5b9cf6] to-[#c8a8ff] bg-clip-text text-transparent">Rank</span>
          </h1>

          <p className="text-xl leading-[1.75] text-[#8eaad8] font-light max-w-2xl mx-auto mb-12">
            AI assistant for HR teams that analyzes CV&nbsp;+&nbsp;GitHub and
            ranks candidates by objective technical signals — trust, code
            quality, activity, and vacancy match.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-semibold text-base transition-all duration-200 bg-blue-500 text-slate-900 hover:bg-blue-400 hover:-translate-y-0.5 shadow-[0_8px_32px_rgba(91,156,246,0.35)] hover:shadow-[0_12px_40px_rgba(91,156,246,0.5)]"
              href="#contact"
            >
              Request demo
            </a>
            <Link
              className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-medium text-base transition-all duration-200 bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 hover:border-white/20"
              to="/candidates"
            >
              Dashboard
            </Link>
            <Link
              className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-medium text-base transition-all duration-200 text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-500 hover:-translate-y-0.5"
              to="/upload"
            >
              Analyze CV
            </Link>
          </div>
        </div>

        {/* Score cards row */}
        <div className="relative z-10 flex gap-4 mt-20 flex-wrap justify-center">
          {[
            { label: "Trust Score", sub: "CV credibility", val: 82, color: "from-[#3a7bd5] to-[#5b9cf6]" },
            { label: "GitHub Score", sub: "Code activity", val: 74, color: "from-[#7b4fd8] to-[#a57bf8]" },
            { label: "Final Score", sub: "Overall rank", val: 91, color: "from-[#1d9e75] to-[#5dcaa5]" },
          ].map(({ label, sub, val, color }) => (
            <div key={label} className="w-56 p-5 rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">{label}</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs text-slate-500">{sub}</span>
                <span className="font-display text-3xl font-bold text-white">{val}</span>
              </div>
              <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid grid-cols-4">
          {[
            ["5,000+", "Profiles evaluated per month"],
            ["30+", "Enterprise team integrations"],
            ["99.8%", "Uptime for scoring pipeline"],
            ["20+", "Key hiring metrics tracked"],
          ].map(([num, desc]) => (
            <div key={num} className="py-14 px-10 border-r border-white/6 last:border-r-0 hover:bg-white/[0.02] transition-colors group">
              <p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-white mb-2 group-hover:text-blue-300 transition-colors">{num}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-24 px-10 text-center max-w-5xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4">Trusted by teams</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white tracking-[-0.03em] mb-6">
          Used where hiring decisions matter
        </h2>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          DevRank helps teams reduce manual CV screening by 80% and speed up shortlisting significantly.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          {["💼 FinTech", "🛠️ DevOps", "🌐 SaaS", "🏥 HealthTech"].map((tag) => (
            <span key={tag} className="px-5 py-2.5 rounded-xl border border-white/8 text-slate-300 text-sm hover:border-blue-500/30 hover:text-slate-100 transition-all">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 px-10 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center">Process</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.03em] mb-16 text-center">How DevRank works</h2>

          <div className="grid grid-cols-3 gap-px bg-white/6 rounded-3xl overflow-hidden">
            {[
              ["01", "Upload", "HR uploads a CV and adds an optional GitHub URL to start analysis."],
              ["02", "Analyze", "The system runs CV + GitHub scoring in the background with structured parsing and fallback logic."],
              ["03", "Rank", "Returns ranked candidates with clear, auditable metrics and confidence scores."],
            ].map(([num, title, desc]) => (
              <div key={num} className="p-10 bg-[#060e1e] hover:bg-[rgba(14,22,46,0.98)] transition-colors">
                <span className="font-display text-6xl font-extrabold text-white/6 leading-none block mb-6">{num}</span>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-10 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center">Features</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.03em] mb-16 text-center">Built for technical hiring</h2>

          <div className="grid grid-cols-3 gap-5">
            {[
              ["🧠", "Candidate profile intelligence", "Summarizes strengths, risk signals, and confidence level in one card."],
              ["⚙️", "Objective technical signal", "Uses GitHub metadata and activity to validate real-world experience."],
              ["⚡", "Faster hiring decisions", "Compares candidates by score and opens details for quick shortlisting."],
            ].map(([icon, title, desc]) => (
              <article key={title} className="p-8 border border-white/6 rounded-2xl bg-white/[0.015] hover:bg-white/[0.04] hover:border-blue-500/20 transition-all group">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="py-32 px-10 border-t border-white/6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(91,156,246,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-6">Get started</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.95]">
            AI-assisted recruiting with transparent scoring.
          </h2>
          <p className="text-lg text-slate-400 font-light mb-12 max-w-xl mx-auto">
            Join teams already using DevRank to make faster, fairer hiring decisions.
          </p>
          <a
            className="inline-flex items-center justify-center h-14 px-10 rounded-2xl no-underline font-bold text-base bg-blue-500 text-slate-900 hover:bg-blue-400 transition-all duration-200 hover:-translate-y-1 shadow-[0_8px_40px_rgba(91,156,246,0.4)] hover:shadow-[0_16px_48px_rgba(91,156,246,0.55)]"
            href="mailto:team@devrank.ai"
          >
            Get early access
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 py-8 px-10 flex items-center justify-between">
        <span className="font-display text-lg font-extrabold tracking-[-0.04em] text-slate-600">
          Dev<span className="text-slate-500">Rank</span>
        </span>
        <p className="text-xs text-slate-600">© 2025 DevRank. All rights reserved.</p>
      </footer>
    </div>
  );
}