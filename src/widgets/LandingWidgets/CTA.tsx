import { motion } from "motion/react";
import { fadeIn, fadeUp, lineReveal, Section } from "../../shared/Animations";

export const CTA = () => {
  return (
    <Section className="py-32 px-10 border-t border-white/6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(91,156,246,0.12)_0%,transparent_70%)]" />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-6"
          variants={fadeUp}
        >
          Get started
        </motion.p>

        <motion.h2
          className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[0.95]"
          variants={fadeUp}
        >
          AI-assisted recruiting with transparent scoring.
        </motion.h2>

        <motion.div
          variants={lineReveal}
          className="w-24 h-px bg-linear-to-r from-blue-500/0 via-blue-400 to-blue-500/0 mx-auto mb-10"
        />

        <motion.p
          className="text-lg text-slate-400 font-light mb-12 max-w-xl mx-auto"
          variants={fadeUp}
        >
          Join teams already using DevRank to make faster, fairer hiring
          decisions.
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
  );
};
