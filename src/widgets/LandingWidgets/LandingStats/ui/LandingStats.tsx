import { fadeUp, fadeUpStagger, Section } from "@/src/shared/Animations";
import { motion } from "framer-motion";
import { LandingStatsData } from "../model/LandingStatsData";

export const LandingStats = () => {
  return (
    <Section className="border-y border-white/6 bg-white/2">
      <motion.div
        className="grid max-w-6xl grid-cols-4 mx-auto"
        variants={fadeUpStagger}
      >
        {LandingStatsData.map(([num, desc]) => (
          <motion.div
            key={num}
            className="px-10 transition-colors border-r cursor-default py-14 border-white/6 last:border-r-0 hover:bg-white/2 group"
            variants={fadeUp}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
          >
            <motion.p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-white mb-2 group-hover:text-blue-300 transition-colors">
              {num}
            </motion.p>
            <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
