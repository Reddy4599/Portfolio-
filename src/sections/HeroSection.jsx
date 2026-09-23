import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { systemModules } from "../assets/studioData";
import Icon from "../components/Icon";
import SceneBoundary from "../components/SceneBoundary";
import SystemDiagram from "../components/SystemDiagram";
import {
  useExperience,
  useSceneVisibility,
} from "../components/ExperienceContext";

const HeroScene = lazy(() => import("../components/HeroScene"));

export default function HeroSection({ data, onNavigate }) {
  const { motionEnabled } = useExperience();
  const { ref, active } = useSceneVisibility();
  const [exploded, setExploded] = useState(false);
  const [selected, setSelected] = useState("backend");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [entered, setEntered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setReady(false);
    setFailed(true);
  }, []);
  useEffect(() => {
    if (active) setEntered(true);
  }, [active]);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        progress.current = Math.min(1, window.scrollY / window.innerHeight);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  const move = (event) => {
    if (!motionEnabled || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
    };
  };
  const module = systemModules.find((item) => item.id === selected);
  return (
    <section
      id="home"
      className="hero section"
      data-section
      aria-labelledby="hero-name"
    >
      <div className="container hero-topline">
        <span className="eyebrow">
          Independent thinking. Connected systems.
        </span>
        <span className="mono hero-location">
          {data.contact.location} <span className="tiny-dot" />
        </span>
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-intro">
            <span className="tiny-dot" /> Software engineer / AI & backend
          </p>
          <h1 id="hero-name">
            <span className="hero-greeting">Hi, I'm Manjunadha.</span>
            Engineering
            <br />
            what's <em>next.</em>
          </h1>
          <p className="hero-name">{data.name}</p>
          <p className="hero-description">
            I turn complex problems into connected systems.
            <br className="desktop-break" /> From reliable banking APIs to AI
            that explains itself.
          </p>
          <div className="button-row">
            <button
              className="button button-primary"
              onClick={() => onNavigate("projects")}
            >
              Explore my work <Icon name="external" />
            </button>
            <a
              href="/resume.pdf"
              download="Manjunadha-Reddy-Resume.pdf"
              className="button button-quiet"
            >
              Download resume <Icon name="download" size={17} />
            </a>
          </div>
          <div className="hero-person">
            <img
              src={data.profilePhoto}
              width="48"
              height="48"
              alt="Manjunadha Reddy"
            />
            <div>
              <span>B.Tech CSE graduate</span>
              <p>
                SRM IST <span className="text-separator">/</span> Class of 2026
              </p>
            </div>
            <a
              href={data.contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Manjunadha Reddy on GitHub"
            >
              GitHub <Icon name="external" size={16} />
            </a>
          </div>
        </div>
        <div
          className="hero-world"
          ref={ref}
          onPointerMove={move}
          onPointerLeave={() => {
            pointer.current = { x: 0, y: 0 };
          }}
        >
          <div className="world-top">
            <span className="eyebrow">
              <Icon name="cube" size={15} /> The systems studio
            </span>
            <span className="mono">FIG. 001</span>
          </div>
          <div
            className="world-viewport"
            role="img"
            aria-label={`An isometric system of connected backend, neural-network and edge-vision modules. ${exploded ? "Layers separated." : "Layers assembled."}`}
          >
            <div
              className={`scene-fallback ${ready && motionEnabled && !failed ? "scene-ready" : ""}`}
            >
              <SystemDiagram exploded={exploded} />
            </div>
            {entered && motionEnabled && !failed && (
              <SceneBoundary onFailure={onFailure}>
                <Suspense fallback={null}>
                  <HeroScene
                    active={active}
                    exploded={exploded}
                    selected={selected}
                    pointer={pointer}
                    progress={progress}
                    onReady={onReady}
                    onFailure={onFailure}
                  />
                </Suspense>
              </SceneBoundary>
            )}
            <span className="world-label label-api">01 / API LAYER</span>
            <span className="world-label label-ml">02 / INFERENCE</span>
            <span className="world-label label-edge">03 / EDGE</span>
          </div>
          <div className="world-controls">
            <div>
              <p className="module-description" aria-live="polite">
                {module.detail}
              </p>
              <span className="mono">One system. Many possibilities.</span>
            </div>
            <button
              className="explode-button"
              aria-pressed={exploded}
              onClick={() => setExploded((value) => !value)}
            >
              <Icon name="layers" size={18} />
              {exploded ? "Assemble system" : "Explode system"}
            </button>
          </div>
          <div
            className="module-tabs"
            role="group"
            aria-label="Explore system modules"
          >
            {systemModules.map((item) => (
              <button
                key={item.id}
                aria-pressed={selected === item.id}
                onClick={() => setSelected(item.id)}
                style={{ "--module-color": item.color }}
              >
                <span>{item.number}</span>
                {item.name}
                <span className="module-dot" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <button className="scroll-cue" onClick={() => onNavigate("about")}>
          <span className="scroll-line" />
          <span>Scroll to explore</span>
          <Icon name="down" size={16} />
        </button>
        <p>
          Backend systems <span>/</span> Machine learning <span>/</span> Data
          engineering
        </p>
        <span className="mono">PORTFOLIO / 2026</span>
      </div>
    </section>
  );
}
