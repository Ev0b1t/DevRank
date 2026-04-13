import { motion } from "motion/react";

export const Header = () => {
  return (
    <header>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-white/5 bg-[rgba(6,14,30,0.8)] backdrop-blur-xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-display text-xl font-extrabold tracking-[-0.04em]">
          Dev
          <span className="bg-linear-to-r from-[#5b9cf6] to-[#a8c8ff] bg-clip-text text-transparent">
            Rank
          </span>
        </span>
        <motion.div
          className="flex items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            },
          }}
        >
          {["#how", "#features"].map((href, i) => (
            <motion.a
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              {i === 0 ? "How it works" : "Features"}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="inline-flex items-center h-9 px-5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-medium hover:bg-blue-500/20 hover:border-blue-500/40 transition-all"
            variants={{
              hidden: { opacity: 0, y: -8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Request demo
          </motion.a>
        </motion.div>
      </motion.nav>
    </header>
  );
};
