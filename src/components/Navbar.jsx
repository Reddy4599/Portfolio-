import { useState } from "react";

function Navbar({ items, activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-400/15 bg-cosmic-900/60 backdrop-blur-lg">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <nav className="mx-auto flex h-16 w-[min(1120px,92vw)] items-center justify-between">
        <button
          onClick={() => handleNavigate("home")}
          className="group flex items-center gap-2 font-heading text-sm tracking-[0.24em] text-cyan-300 transition hover:text-cyan-200"
        >
          <span className="rounded-md border border-cyan-300/35 bg-cyan-300/10 px-2 py-1 text-[11px] tracking-[0.18em] text-cyan-100">
            MVMR
          </span>
          <span className="hidden sm:inline">PORTFOLIO</span>
        </button>

        <button
          className="inline-flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="h-0.5 w-6 bg-cyan-300" />
          <span className="h-0.5 w-6 bg-violet-300" />
        </button>

        <ul
          className={`absolute left-4 right-4 top-20 rounded-2xl border border-violet-300/20 bg-cosmic-900/95 p-4 shadow-neon transition md:static md:flex md:items-center md:gap-2 md:border-none md:bg-transparent md:p-0 md:shadow-none ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_rgba(34,243,255,0.28)]"
                    : "text-slate-300 hover:bg-violet-400/10 hover:text-violet-200"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
