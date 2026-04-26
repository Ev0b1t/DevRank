import { navItems } from "../model/HeaderData";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5  bg-transparent backdrop-blur-xl">
        <Link to="/" className="no-underline">
          <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-amber-50">
            Dev
            <span className="bg-linear-to-r from-[#5b9cf6] to-[#a8c8ff] bg-clip-text text-transparent">
              Rank
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
