import { motion } from "motion/react";
import { fadeUp, fadeUpStagger, Section } from "@/src/shared/Animations";
import { TrustData } from "../model/TrustData";

export const TrustWidget = () => {
  return (
    <Section className="px-10 py-24 text-center">
      <div className="max-w-5xl mx-auto">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4"
          variants={fadeUp}
        >
          Trusted by teams
        </motion.p>
        <motion.h2
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-white tracking-[-0.03em] mb-6"
          variants={fadeUp}
        >
          Used where hiring decisions matter
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed text-slate-400"
          variants={fadeUp}
        >
          DevRank helps teams reduce manual CV screening by 80% and speed up
          shortlisting significantly.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={fadeUpStagger}
        >
          {TrustData.map(
            (tag) => (
              <motion.span
                key={tag}
                className="px-5 py-2.5 rounded-xl border border-white/8 text-slate-300 text-sm cursor-default"
                variants={fadeUp}
                whileHover={{
                  borderColor: "rgba(91,156,246,0.35)",
                  color: "#fff",
                  y: -2,
                }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ),
          )}
        </motion.div>
      </div>
    </Section>
  );
};
