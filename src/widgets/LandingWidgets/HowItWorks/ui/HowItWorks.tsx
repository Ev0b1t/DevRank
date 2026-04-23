import { motion } from "motion/react";
import { fadeUp, fadeUpStagger, Section } from "@/src/shared/Animations";
import { HowItWorksData } from "../model/HowItWorkdsData";

export const HowItWorks = () => {
  return (
    <Section id="how" className="px-10 py-24 border-t border-white/6">
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
          className="grid grid-cols-3 gap-px overflow-hidden bg-white/6 rounded-3xl"
          variants={fadeUpStagger}
        >
          {HowItWorksData.map(([num, title, desc]) => (
            <motion.div
              key={num}
              className="p-10 bg-[#060e1e] transition-colors cursor-default"
              variants={fadeUp}
              whileHover={{ backgroundColor: "rgba(14,22,46,0.98)" }}
            >
              <motion.span
                className="block mb-6 text-6xl font-extrabold leading-none font-display text-white/6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {num}
              </motion.span>
              <h3 className="mb-3 text-xl font-bold text-white font-display">
                {title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-slate-400">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
