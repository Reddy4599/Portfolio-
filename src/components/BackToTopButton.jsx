import { useEffect, useState } from "react";

function BackToTopButton({ onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-cyan-300/30 bg-cosmic-850/80 p-3 text-cyan-200 shadow-neon transition duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default BackToTopButton;
