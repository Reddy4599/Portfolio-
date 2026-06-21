import { motion } from "framer-motion";
import HeroScene from "../components/HeroScene";
import TypewriterName from "../components/TypewriterName";
import RotatingSubtitle from "../components/RotatingSubtitle";

function HeroSection({ name, roles, statement, quickStats, contact, profilePhoto, onViewWork }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24"
      data-section
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,rgba(3,6,15,0.9)_75%)]" />

      <div className="relative z-10 mx-auto w-[min(1120px,94vw)] text-center">
        {profilePhoto && (
          <motion.div
            className="mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border border-cyan-300/40 bg-cosmic-900/70 p-1 shadow-neon sm:h-36 sm:w-36"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={profilePhoto}
              alt={`${name} profile`}
              className="h-full w-full rounded-full object-cover object-top"
            />
          </motion.div>
        )}

        <motion.p
          className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          B.Tech CSE | SRM IST | Class of 2026
        </motion.p>

        <TypewriterName text={name} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-4"
        >
          <RotatingSubtitle roles={roles} />
        </motion.div>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-base text-slate-300 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          {statement}
        </motion.p>
        <motion.p
          className="mx-auto mt-2 max-w-3xl text-sm uppercase tracking-[0.18em] text-violet-200/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          Target Roles: SDE and Data Engineering
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <button
            onClick={onViewWork}
            className="rounded-full border border-cyan-300/35 bg-cyan-400/15 px-6 py-3 font-medium text-cyan-100 shadow-neon transition hover:bg-cyan-300/25"
          >
            View My Work
          </button>
          <a
            href="/resume.pdf"
            className="rounded-full border border-violet-300/35 bg-violet-400/15 px-6 py-3 font-medium text-violet-100 shadow-violet transition hover:bg-violet-300/25"
          >
            Download Resume
          </a>
        </motion.div>

        <motion.div
          className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.55 }}
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-cyan-300/20 bg-cosmic-900/55 px-3 py-2 backdrop-blur-sm"
            >
              <p className="font-heading text-lg text-cyan-200">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.55 }}
        >
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 uppercase tracking-[0.12em] text-cyan-100 transition hover:bg-cyan-300/20"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 uppercase tracking-[0.12em] text-violet-100 transition hover:bg-violet-300/20"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Scroll</span>
          <span className="h-10 w-6 rounded-full border border-cyan-300/30 p-1">
            <span className="block h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
