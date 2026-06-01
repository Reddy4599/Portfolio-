import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function TimelineSection({ entries }) {
  return (
    <section id="timeline" className="px-4 py-24" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="Experience & Education" subtitle="Timeline" />

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-300 via-violet-400 to-cyan-300 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-10">
            {entries.map((entry, index) => {
              const rightAligned = index % 2 === 0;
              return (
                <motion.article
                  key={entry.title}
                  initial={{ opacity: 0, x: rightAligned ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative rounded-2xl border bg-cosmic-900/80 p-5 backdrop-blur-sm md:w-[calc(50%-2rem)] ${
                    rightAligned
                      ? "ml-10 border-cyan-300/25 md:ml-auto md:pl-7"
                      : "ml-10 border-violet-300/25 md:ml-0 md:pr-7"
                  }`}
                >
                  <span
                    className={`absolute top-6 h-4 w-4 rounded-full border border-cyan-100/80 bg-cyan-300 shadow-[0_0_24px_rgba(34,243,255,0.9)] ${
                      rightAligned
                        ? "-left-[2.95rem] md:-left-[2.55rem]"
                        : "-left-[2.95rem] md:-right-[2.55rem] md:left-auto"
                    }`}
                  />

                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{entry.date}</p>
                  <h3 className="mt-2 font-heading text-xl text-cyan-100">{entry.title}</h3>
                  {entry.location && (
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-violet-200">{entry.location}</p>
                  )}
                  <p className="mt-3 text-slate-300">{entry.description}</p>

                  <span
                    className={`mt-4 inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                      entry.type === "experience"
                        ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                        : entry.type === "volunteering"
                          ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                          : "border-violet-300/30 bg-violet-300/10 text-violet-100"
                    }`}
                  >
                    {entry.type}
                  </span>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
