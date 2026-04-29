import { motion } from "motion/react";

export const Footer = () => {
  return (
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
      <p className="text-xs text-slate-600">
        © {new Date().getFullYear()} DevRank. All rights reserved.
      </p>
    </motion.footer>
  );
};