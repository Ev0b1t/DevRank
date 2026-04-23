import { motion } from "motion/react";
import { fadeUp, fadeUpStagger, Section } from "@/src/shared/Animations";
import { FeaturesData } from "../model/FeaturesData";

export const Features = () => {
  return (
    <Section id="features" className="py-24 px-10 border-t border-white/6">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs font-bold uppercase tracking-[0.22em] text-blue-400 mb-4 text-center"
          variants={fadeUp}
        >
          Features
        </motion.p>
        <motion.h2
          className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-white tracking-[-0.03em] mb-16 text-center"
          variants={fadeUp}
        >
          Built for technical hiring
        </motion.h2>

        <motion.div className="grid grid-cols-3 gap-5" variants={fadeUpStagger}>
          {FeaturesData.map(([icon, title, desc]) => (
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
              <h3 className="font-display text-lg font-bold text-white mb-3">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
