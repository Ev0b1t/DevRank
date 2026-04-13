import { fadeUp, fadeUpStagger, Section } from "../../shared/Animations";
import { motion } from "framer-motion";

export const LandingStats = () => {
  return (
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
            <motion.p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-white mb-2 group-hover:text-blue-300 transition-colors">
              {num}
            </motion.p>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
