import { motion } from "motion/react";
import { fadeUp } from "../Animations";

export interface MainButtonI {
  text: string,
  onClick?: () => void
}

export const MainButton = ({text, onClick}: MainButtonI)  => {
  return (
    <motion.button
      className="cursor-pointer inline-flex items-center justify-center h-14 px-10 rounded-2xl no-underline font-bold text-base bg-blue-500 text-slate-900 hover:bg-blue-400 transition-colors duration-200 shadow-[0_8px_40px_rgba(91,156,246,0.4)]"
      variants={fadeUp}
      onClick={onClick}
      whileHover={{
        y: -3,
        boxShadow: "0 16px 48px rgba(91,156,246,0.55)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      {text}
    </motion.button>
  );
};
