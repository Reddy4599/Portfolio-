import { motion } from "framer-motion";
import { useExperience } from "./ExperienceContext";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  ...props
}) {
  const { motionEnabled } = useExperience();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={motionEnabled ? { y: [18, 0] } : { y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
