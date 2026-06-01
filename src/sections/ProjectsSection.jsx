import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function TiltProjectCard({ project, index, onOpenProject }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14;
    const rotateX = (0.5 - py) * 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const reset = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <article
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.01,1.01,1.01)`
        }}
        className="relative h-full min-h-[280px] rounded-2xl border border-slate-700/70 bg-cosmic-900/85 p-5 transition-transform duration-200 [transform-style:preserve-3d]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-300/40 via-violet-300/45 to-cyan-300/40 blur-sm" />
            <span className="absolute -left-1/2 top-0 h-full w-1/3 rotate-[20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:animate-sweep group-hover:opacity-100" />
          </div>
        </div>

        <h3 className="relative z-10 font-heading text-xl text-cyan-100">{project.title}</h3>

        <p className="relative z-10 mt-3 h-[3.1rem] overflow-hidden text-sm text-slate-300">{project.description}</p>

        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs text-violet-100"
            >
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={() => onOpenProject(project)}
          className="relative z-10 mt-6 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
        >
          View Details
        </button>
      </article>
    </motion.div>
  );
}

function ProjectsSection({ projects, onOpenProject }) {
  return (
    <section id="projects" className="px-4 py-24" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="Selected Projects" subtitle="Work Showcase" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
