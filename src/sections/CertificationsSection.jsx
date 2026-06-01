import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

function CertificationsSection({ certifications }) {
  const carouselItems = [...certifications, ...certifications];

  return (
    <section id="certifications" className="px-4 py-24" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="Certifications" subtitle="Credentials" />

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-violet-300/20 bg-cosmic-900/70 p-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-cosmic-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-cosmic-900 to-transparent" />

          <div className="carousel-track flex w-max gap-4">
            {carouselItems.map((cert, index) => (
              <article
                key={`${cert.name}-${index}`}
                className="group relative w-72 shrink-0 overflow-hidden rounded-xl border border-slate-700/70 bg-cosmic-850/85 p-4"
              >
                <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-[18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition group-hover:translate-x-[280%] group-hover:opacity-100 group-hover:duration-700" />

                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-heading text-xs text-cyan-100">
                    {cert.issuer.toUpperCase().slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-violet-200">{cert.issuer}</p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-100">{cert.name}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CertificationsSection;
