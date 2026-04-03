import { useRef } from "react";
import { HeroContent } from "../../widgets/HeroContent";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUpStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#060e1e] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-white/5 bg-[rgba(6,14,30,0.8)] backdrop-blur-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display text-xl font-extrabold tracking-[-0.04em]">
          Dev<span className="bg-linear-to-r from-[#5b9cf6] to-[#a8c8ff] bg-clip-text text-transparent">Rank</span>
        </span>
        <motion.div
          className="flex items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
        >
          {["#how", "#features"].map((href, i) => (
            <motion.a
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
              variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              {i === 0 ? "How it works" : "Features"}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="inline-flex items-center h-9 px-5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
            variants={{ hidden: { opacity: 0, y: -8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Request demo
          </motion.a>
        </motion.div>
      </motion.nav>

      {/* ── HERO ── */}
      <HeroContent />

      {/* ── STATS ── */}
      <Section className="border-y border-white/6 bg-white/2">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-4"
          variants={fadeUpStagger}
        >
          {[
            ["5,000+", "Profiles evaluated per month"],
            ["30+", "Enterprise team integrations"],
            ["99.8%", "Uptime for scoring pipeline"],
            ["20+", "Key hiring metrics tracked"],
          ].map(([num, desc]) => (
            <motion.div
              key={num}
              className="py-14 px-10 border-r border-white/6 last:border-r-0 hover:bg-white/2 transition-colors group cursor-default"
              variants={fadeUp}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
            >
              <motion.p
                className="font-display text-5xl font-extrabold tracking-[-0.04em] text-white mb-2 group-hover:text-blue-300 transition-colors"
              >
                {num}
              </motion.p>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── TRUST ── */}
      <Section className="py-24 px-10 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4" variants={fadeUp}>
            Trusted by teams
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white tracking-[-0.03em] mb-6"
            variants={fadeUp}
          >
            Used where hiring decisions matter
          </motion.h2>
          <motion.p
            className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-12"
            variants={fadeUp}
          >
            DevRank helps teams reduce manual CV screening by 80% and speed up shortlisting significantly.
          </motion.p>
          <motion.div
            className="flex gap-3 flex-wrap justify-center"
            variants={fadeUpStagger}
          >
            {["💼 FinTech", "🛠️ DevOps", "🌐 SaaS", "🏥 HealthTech"].map((tag) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 rounded-xl border border-white/8 text-slate-300 text-sm cursor-default"
                variants={fadeUp}
                whileHover={{ borderColor: "rgba(91,156,246,0.35)", color: "#fff", y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── HOW IT WORKS ── */}
      <Section className="py-24 px-10 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <motion.p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center" variants={fadeUp}>
            Process
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.03em] mb-16 text-center"
            variants={fadeUp}
          >
            How DevRank works
          </motion.h2>

          <motion.div
            className="grid grid-cols-3 gap-px bg-white/6 rounded-3xl overflow-hidden"
            variants={fadeUpStagger}
          >
            {[
              ["01", "Upload", "HR uploads a CV and adds an optional GitHub URL to start analysis."],
              ["02", "Analyze", "The system runs CV + GitHub scoring in the background with structured parsing and fallback logic."],
              ["03", "Rank", "Returns ranked candidates with clear, auditable metrics and confidence scores."],
            ].map(([num, title, desc]) => (
              <motion.div
                key={num}
                className="p-10 bg-[#060e1e] transition-colors cursor-default"
                variants={fadeUp}
                whileHover={{ backgroundColor: "rgba(14,22,46,0.98)" }}
              >
                <motion.span
                  className="font-display text-6xl font-extrabold text-white/6 leading-none block mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {num}
                </motion.span>
                <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <Section className="py-24 px-10 border-t border-white/6">
        <div className="max-w-6xl mx-auto">
          <motion.p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center" variants={fadeUp}>
            Features
          </motion.p>
          <motion.h2
            className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.03em] mb-16 text-center"
            variants={fadeUp}
          >
            Built for technical hiring
          </motion.h2>

          <motion.div className="grid grid-cols-3 gap-5" variants={fadeUpStagger}>
            {[
              ["🧠", "Candidate profile intelligence", "Summarizes strengths, risk signals, and confidence level in one card."],
              ["⚙️", "Objective technical signal", "Uses GitHub metadata and activity to validate real-world experience."],
              ["⚡", "Faster hiring decisions", "Compares candidates by score and opens details for quick shortlisting."],
            ].map(([icon, title, desc]) => (
              <motion.article
                key={title as string}
                className="p-8 border border-white/6 rounded-2xl bg-white/1.5 cursor-default"
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(91,156,246,0.22)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                <motion.div
                  className="text-3xl mb-5 inline-block"
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  {icon}
                </motion.div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-32 px-10 border-t border-white/6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={fadeIn}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(91,156,246,0.12)_0%,transparent_70%)]" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-6" variants={fadeUp}>
            Get started
          </motion.p>

          <motion.h2
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.95]"
            variants={fadeUp}
          >
            AI-assisted recruiting with transparent scoring.
          </motion.h2>

          <motion.div variants={lineReveal} className="w-24 h-px bg-linear-to-r from-blue-500/0 via-blue-400 to-blue-500/0 mx-auto mb-10" />

          <motion.p
            className="text-lg text-slate-400 font-light mb-12 max-w-xl mx-auto"
            variants={fadeUp}
          >
            Join teams already using DevRank to make faster, fairer hiring decisions.
          </motion.p>

          <motion.a
            className="inline-flex items-center justify-center h-14 px-10 rounded-2xl no-underline font-bold text-base bg-blue-500 text-slate-900 hover:bg-blue-400 transition-colors duration-200 shadow-[0_8px_40px_rgba(91,156,246,0.4)]"
            href="mailto:team@devrank.ai"
            variants={fadeUp}
            whileHover={{
              y: -3,
              boxShadow: "0 16px 48px rgba(91,156,246,0.55)",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.97 }}
          >
            Get early access
          </motion.a>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <motion.footer
        className="border-t border-white/6 py-8 px-10 flex items-center justify-between"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-display text-lg font-extrabold tracking-[-0.04em] text-slate-600">
          Dev<span className="text-slate-500">Rank</span>
        </span>
        <p className="text-xs text-slate-600">© {new Date().getFullYear()} DevRank. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}