import { motion } from "motion/react";
import { fadeIn, fadeUp, lineReveal, Section } from "@/src/shared/Animations";
import { MainButton } from "@/src/shared/ui/MainButton";

export const CTA = () => {
  return (
    <Section id="contact" className="py-32 px-10 border-t border-white/6 relative overflow-hidden">
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

        <MainButton text="Get early access"/>

      </div>
    </Section>
  );
};
