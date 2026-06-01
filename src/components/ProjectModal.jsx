import { AnimatePresence, motion } from "framer-motion";

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="w-full max-w-2xl rounded-2xl border border-violet-300/25 bg-cosmic-900 p-6 shadow-violet"
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 12 }}
            transition={{ duration: 0.26 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <h3 className="font-heading text-xl text-cyan-200">{project.title}</h3>
              <button
                onClick={onClose}
                className="rounded-full border border-slate-500/50 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200"
              >
                Close
              </button>
            </div>
            {Array.isArray(project.detailsPoints) && project.detailsPoints.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5 text-left text-slate-300">
                {project.detailsPoints.map((point) => (
                  <li key={point} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-left leading-relaxed text-slate-300">{project.details}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
