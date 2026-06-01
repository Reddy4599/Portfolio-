import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function RotatingSubtitle({ roles }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-8 overflow-hidden font-heading text-lg text-cyan-200 sm:h-10 sm:text-2xl">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default RotatingSubtitle;
