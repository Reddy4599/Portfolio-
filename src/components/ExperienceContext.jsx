import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const ExperienceContext = createContext({ motionEnabled: false });

export function ExperienceProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const motionEnabled = !prefersReducedMotion && !paused;
  return (
    <ExperienceContext.Provider
      value={{ motionEnabled, paused, setPaused, prefersReducedMotion }}
    >
      <MotionConfig reducedMotion={motionEnabled ? "never" : "always"}>
        <div className="experience" data-motion={motionEnabled ? "on" : "off"}>
          {children}
        </div>
      </MotionConfig>
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);

export function useSceneVisibility() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (ref.current) observer.observe(ref.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return { ref, active: inView && pageVisible };
}
