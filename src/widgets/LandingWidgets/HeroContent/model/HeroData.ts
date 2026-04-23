import type { Variants } from "framer-motion";

export const heroVariants: Variants = {
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

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export const HeroCards = [
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
];
