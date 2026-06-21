import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function PatentSection({ patents }) {
  return (
    <section id="patents" className="px-4 py-24" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="Patent" subtitle="Innovation Record" />

        <div className="grid gap-5">
          {patents.map((patent) => (
            <motion.article
              key={patent.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 }}
              className="relative overflow-hidden rounded-2xl border border-cyan-300/25 bg-cosmic-900/75 p-6 shadow-neon"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-3 inline-flex rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-100">
                    {patent.status}
                  </p>
                  <h3 className="font-heading text-2xl leading-snug text-cyan-100">{patent.title}</h3>
                  <p className="mt-4 text-slate-300">{patent.description}</p>
                  <p className="mt-3 text-slate-300">{patent.impact}</p>
                </div>

                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-4 text-center lg:min-w-44">
                  <p className="font-heading text-3xl text-cyan-100">01</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">Patent Filed</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PatentSection;
