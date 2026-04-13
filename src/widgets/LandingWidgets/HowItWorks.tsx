import { motion } from "motion/react";
import { fadeUp, fadeUpStagger, Section } from "../../shared/Animations";

export const HowItWorks = () => {
  return (
    <Section className="py-24 px-10 border-t border-white/6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center"
          variants={fadeUp}
        >
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
            [
              "01",
              "Upload",
              "HR uploads a CV and adds an optional GitHub URL to start analysis.",
            ],
            [
              "02",
              "Analyze",
              "The system runs CV + GitHub scoring in the background with structured parsing and fallback logic.",
            ],
            [
              "03",
              "Rank",
              "Returns ranked candidates with clear, auditable metrics and confidence scores.",
            ],
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
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
