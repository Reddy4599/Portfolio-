import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const getLinkLabel = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace("www.", "") + parsed.pathname;
  } catch {
    return url;
  }
};

function ContactSection({ contact, onMessageSent }) {
  const [burst, setBurst] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setBurst(true);
    onMessageSent();
    event.currentTarget.reset();
    setTimeout(() => setBurst(false), 650);
  };

  return (
    <section id="contact" className="px-4 pb-24 pt-20" data-section>
      <div className="mx-auto w-[min(1120px,94vw)]">
        <SectionHeading title="Contact" subtitle="Open Channel" />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-700/80 bg-cosmic-900/70 p-6"
          >
            <h3 className="font-heading text-2xl text-cyan-100">Let's Build Something Bold</h3>
            <p className="mt-4 text-slate-300">
              Open to Software Engineering and AI/ML opportunities where robust backend architecture,
              automation, and data-driven systems create measurable impact.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100 transition hover:bg-cyan-300/20"
              >
                GitHub: {getLinkLabel(contact.github)}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-violet-100 transition hover:bg-violet-300/20"
              >
                LinkedIn: {getLinkLabel(contact.linkedin)}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="block rounded-lg border border-slate-400/25 bg-slate-500/10 px-4 py-2 text-slate-200 transition hover:border-cyan-300/35 hover:text-cyan-100"
              >
                Email: {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="block rounded-lg border border-slate-400/25 bg-slate-500/10 px-4 py-2 text-slate-200 transition hover:border-cyan-300/35 hover:text-cyan-100"
              >
                Phone: {contact.phone}
              </a>
              <p className="rounded-lg border border-slate-400/20 bg-slate-500/5 px-4 py-2 text-slate-300">
                Location: {contact.location}
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-violet-300/20 bg-cosmic-900/75 p-6"
          >
            <div className="space-y-4">
              <label className="block text-sm text-slate-300">
                Name
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-slate-600/70 bg-cosmic-850 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,243,255,0.15)]"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Email
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-slate-600/70 bg-cosmic-850 px-3 py-2 text-slate-100 outline-none transition focus:border-violet-300/60 focus:shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Message
                <textarea
                  rows={5}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-600/70 bg-cosmic-850 px-3 py-2 text-slate-100 outline-none transition focus:border-cyan-300/60 focus:shadow-[0_0_0_3px_rgba(34,243,255,0.15)]"
                />
              </label>
            </div>

            <button
              type="submit"
              className={`send-btn relative mt-6 inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 px-6 py-3 font-medium text-cyan-100 transition hover:bg-cyan-300/20 ${
                burst ? "is-bursting" : ""
              }`}
            >
              <span className="relative z-10">Send Message</span>
              <span className="particle particle-a" />
              <span className="particle particle-b" />
              <span className="particle particle-c" />
              <span className="particle particle-d" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
