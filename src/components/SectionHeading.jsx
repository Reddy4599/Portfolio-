import { motion } from "framer-motion";

function SectionHeading({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="font-heading text-xs uppercase tracking-[0.32em] text-cyan-300/90">{subtitle}</p>
      <h2 className="mt-3 font-heading text-3xl text-white sm:text-4xl">{title}</h2>
    </motion.div>
  );
}

export default SectionHeading;
