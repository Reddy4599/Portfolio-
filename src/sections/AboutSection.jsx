import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function AnimatedStatsCode({ statsObject }) {
  const lines = [
    <span key="open" className="text-slate-400">
      {"{"}
    </span>,
    <span key="profile">
      <span className="text-cyan-300">  "profile"</span>
      <span className="text-slate-400">: </span>
      <span className="text-violet-300">"{statsObject.profile}"</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="cgpa">
      <span className="text-cyan-300">  "cgpa"</span>
      <span className="text-slate-400">: </span>
      <span className="text-violet-300">"{statsObject.cgpa}"</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="projects">
      <span className="text-cyan-300">  "projectsBuilt"</span>
      <span className="text-slate-400">: </span>
      <span className="text-emerald-300">{statsObject.projectsBuilt}</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="internships">
      <span className="text-cyan-300">  "internships"</span>
      <span className="text-slate-400">: </span>
      <span className="text-emerald-300">{statsObject.internships}</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="patents">
      <span className="text-cyan-300">  "patentsFiled"</span>
      <span className="text-slate-400">: </span>
      <span className="text-emerald-300">{statsObject.patentsFiled}</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="certs">
      <span className="text-cyan-300">  "certifications"</span>
      <span className="text-slate-400">: </span>
      <span className="text-emerald-300">{statsObject.certifications}</span>
      <span className="text-slate-400">,</span>
    </span>,
    <span key="focus">
      <span className="text-cyan-300">  "focus"</span>
      <span className="text-slate-400">: [</span>
      {statsObject.focus.map((item, index) => (
        <span key={item}>
          <span className="text-violet-300">"{item}"</span>
          {index !== statsObject.focus.length - 1 && <span className="text-slate-400">, </span>}
        </span>
      ))}
      <span className="text-slate-400">]</span>
    </span>,
    <span key="close" className="text-slate-400">
      {"}"}
    </span>
  ];

  return (
    <motion.pre
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.2 }
        }
      }}
      className="overflow-x-auto rounded-2xl border border-cyan-300/20 bg-cosmic-900/80 p-5 font-mono text-sm leading-7 shadow-neon"
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, x: -14 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          {line}
        </motion.div>
      ))}
    </motion.pre>
  );
}

function AboutSection({ data }) {
  return (
    <section id="about" className="px-4 py-24" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="About Me" subtitle="Identity Matrix" />

        <div className="grid gap-8 lg:grid-cols-2">
          <AnimatedStatsCode statsObject={data.statsObject} />

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-violet-300/20 bg-cosmic-900/75 p-6"
          >
            <p className="text-slate-300">{data.shortBio}</p>

            <div className="mt-8 space-y-4">
              {data.skills.map((group) => (
                <div
                  key={group.category}
                  className="group rounded-xl border border-slate-700/70 bg-cosmic-850/85 p-4 transition hover:border-cyan-300/35"
                >
                  <h3 className="font-heading text-sm uppercase tracking-[0.18em] text-violet-200">
                    {group.category}
                  </h3>
                  <div className="mt-3 flex max-h-11 flex-wrap gap-2 overflow-hidden transition-all duration-500 group-hover:max-h-32">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100 shadow-[0_0_14px_rgba(34,243,255,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-8 rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-cosmic-900/80 via-cosmic-850/80 to-cosmic-900/80 p-6"
        >
          <h3 className="font-heading text-xl text-cyan-100">Career Highlights</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {data.highlights.map((item, index) => (
              <div
                key={item}
                className="rounded-xl border border-violet-300/20 bg-cosmic-900/60 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-violet-200">Highlight {index + 1}</p>
                <p className="mt-2 text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
