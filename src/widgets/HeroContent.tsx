import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";


const heroVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const HeroContent = () => {

  return (
    <motion.section
      className="relative pt-40 pb-32 px-10 flex flex-col items-center text-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 bg-[radial-gradient(ellipse_at_top,rgba(91,156,246,0.18)_0%,transparent_65%)]" />
        <div className="absolute top-1/3 left-1/4 w-100 h-100 bg-[radial-gradient(circle,rgba(120,80,220,0.08)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 right-1/4 w-75 h-75 bg-[radial-gradient(circle,rgba(91,156,246,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          className="inline-flex items-center t gap-2 mb-8 px-4 py-1.5 rounded-full bg-[rgba(91,156,246,0.08)] border border-[rgba(91,156,246,0.2)] text-xs font-semibold uppercase tracking-[0.18em] text-[#89b8fc]"
          variants={itemVariants}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b9cf6] shadow-[0_0_8px_rgba(91,156,246,0.9)] animate-pulse" />
          SmartHire AI
        </motion.span>

        <motion.h1
          className="font-display text-[clamp(4.5rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-white mb-8"
          variants={itemVariants}
        >
          Dev
          <span className="bg-linear-to-br from-[#a8c8ff] via-[#5b9cf6] to-[#c8a8ff] bg-clip-text text-transparent">
            Rank
          </span>
        </motion.h1>

        <motion.p
          className="text-xl leading-[1.75] text-[#8eaad8] font-light max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          AI assistant for HR teams that analyzes CV&nbsp;+&nbsp;GitHub and
          ranks candidates by objective technical signals — trust, code quality,
          activity, and vacancy match.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={itemVariants}
        >
          <motion.a
            className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-semibold text-base transition-all duration-200 bg-blue-500 text-slate-900 hover:bg-blue-400 shadow-[0_8px_32px_rgba(91,156,246,0.35)] hover:shadow-[0_12px_40px_rgba(91,156,246,0.5)]"
            href="#contact"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            Request demo
          </motion.a>

          <motion.div
            className="inline-flex"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          >
            <Link
              className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-medium text-base bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              to="/candidates"
            >
              Dashboard
            </Link>
          </motion.div>

          <motion.div
            className="inline-flex"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
          >
            <Link
              className="inline-flex items-center justify-center h-13 px-8 rounded-2xl no-underline font-medium text-base text-slate-400 border border-slate-700 hover:text-slate-200 hover:border-slate-500 transition-all duration-200"
              to="/upload"
            >
              Analyze CV
            </Link>
          </motion.div>
        </motion.div>

        {/* Score cards row */}
        <motion.div
          className="flex gap-4 mt-20 flex-wrap justify-center"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            {
              label: "Trust Score",
              sub: "CV credibility",
              val: 82,
              color: "from-[#3a7bd5] to-[#5b9cf6]",
            },
            {
              label: "GitHub Score",
              sub: "Code activity",
              val: 74,
              color: "from-[#7b4fd8] to-[#a57bf8]",
            },
            {
              label: "Final Score",
              sub: "Overall rank",
              val: 91,
              color: "from-[#1d9e75] to-[#5dcaa5]",
            },
          ].map(({ label, sub, val, color }) => (
            <motion.div
              key={label}
              className="w-56 p-5 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm"
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">
                {label}
              </p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-xs text-slate-500">{sub}</span>
                <span className="font-display text-3xl font-bold text-white">
                  {val}
                </span>
              </div>
              <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-linear-to-r ${color}`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
