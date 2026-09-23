import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useExperience } from "./ExperienceContext";

export default function Navbar({ items, activeSection, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef();
  const header = useRef();
  const { motionEnabled, paused, setPaused, prefersReducedMotion } =
    useExperience();
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [menuOpen]);
  const navigate = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };
  return (
    <header className="site-header" ref={header}>
      <nav className="container navbar" aria-label="Main navigation">
        <button
          className="brand"
          onClick={() => navigate("home")}
          aria-label="Manjunadha Reddy, back to home"
        >
          <span className="brand-symbol">
            <Icon name="cube" size={24} />
          </span>
          <span>
            mr<span className="brand-period">.</span>
          </span>
        </button>
        <div
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="main-menu"
        >
          {items
            .filter((item) => item.id !== "home")
            .map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                aria-current={
                  activeSection === item.id ? "location" : undefined
                }
                className={activeSection === item.id ? "is-active" : ""}
              >
                {item.label}
              </button>
            ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button motion-toggle"
            onClick={() => setPaused(!paused)}
            disabled={!!prefersReducedMotion}
            aria-label={
              prefersReducedMotion
                ? "Reduced motion enabled by your device"
                : motionEnabled
                  ? "Pause animations"
                  : "Resume animations"
            }
            title={
              prefersReducedMotion
                ? "Reduced motion enabled by your device"
                : motionEnabled
                  ? "Pause animations"
                  : "Resume animations"
            }
          >
            <Icon name={motionEnabled ? "pause" : "play"} size={15} />
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-resume"
          >
            Resume <Icon name="external" size={15} />
          </a>
          <button
            ref={menuButton}
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </nav>
    </header>
  );
}
