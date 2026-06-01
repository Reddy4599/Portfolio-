import { AnimatePresence, motion } from "framer-motion";

function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cosmic-850/90 px-5 py-2 text-sm text-cyan-100 shadow-neon"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
