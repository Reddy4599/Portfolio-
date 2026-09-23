import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { portfolioData } from "../assets/portfolioData";
import { ExperienceProvider, useExperience } from "./ExperienceContext";
import Navbar from "./Navbar";
import BackToTopButton from "./BackToTopButton";
import Toast from "./Toast";
import Icon from "./Icon";
import AboutSection from "../sections/AboutSection";
import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import TimelineSection from "../sections/TimelineSection";
import PatentSection from "../sections/PatentSection";
import CertificationsSection from "../sections/CertificationsSection";
import ContactSection from "../sections/ContactSection";

const ProjectModal = lazy(() => import("./ProjectModal"));
const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Toolkit" },
  { id: "projects", label: "Work" },
  { id: "timeline", label: "Journey" },
  { id: "patents", label: "Patent" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

function Studio() {
  const { motionEnabled } = useExperience();
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const progressBar = useRef();
  const scrollToSection = useCallback(
    (id) => {
      const section = document.getElementById(id);
      if (!section) return;
      section.focus({ preventScroll: true });
      section.scrollIntoView({
        behavior: motionEnabled ? "smooth" : "instant",
        block: "start",
      });
    },
    [motionEnabled],
  );
  const closeProject = useCallback(() => setSelectedProject(null), []);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.32;
        let current = "home";
        for (const item of navItems) {
          if (
            document.getElementById(item.id)?.getBoundingClientRect().top <=
            threshold
          )
            current = item.id;
        }
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 8
        )
          current = "contact";
        setActiveSection(current);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar.current)
          progressBar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    document
      .querySelectorAll("[data-section]")
      .forEach((section) => section.setAttribute("tabindex", "-1"));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 4500);
    return () => clearTimeout(timer);
  }, [toastMessage]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        Skip to content
      </a>
      <div className="reading-progress" ref={progressBar} aria-hidden="true" />
      <Navbar
        items={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <aside className="section-rail" aria-label="Section position">
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            aria-label={`Go to ${item.label}`}
            aria-current={item.id === activeSection ? "location" : undefined}
          >
            <span>{String(i).padStart(2, "0")}</span>
            <i />
          </button>
        ))}
      </aside>
      <main id="main-content" tabIndex={-1}>
        <HeroSection data={portfolioData} onNavigate={scrollToSection} />
        <AboutSection data={portfolioData} />
        <SkillsSection
          data={portfolioData}
          onOpenProject={setSelectedProject}
          onNavigate={scrollToSection}
        />
        <ProjectsSection
          projects={portfolioData.projects}
          onOpenProject={setSelectedProject}
          github={portfolioData.contact.github}
        />
        <TimelineSection entries={portfolioData.timeline} />
        <PatentSection
          patents={portfolioData.patents}
          onExplore={() => setSelectedProject(portfolioData.projects[1])}
        />
        <CertificationsSection certifications={portfolioData.certifications} />
        <ContactSection
          contact={portfolioData.contact}
          onNotify={setToastMessage}
        />
      </main>
      <footer className="container site-footer">
        <button
          className="brand"
          onClick={() => scrollToSection("home")}
          aria-label="Back to home"
        >
          <Icon name="cube" /> mr.
        </button>
        <p>
          Medagam V S Manjunadha Reddy <span>/</span> {new Date().getFullYear()}
        </p>
        <span>Built with intent.</span>
      </footer>
      <BackToTopButton
        visible={activeSection !== "home"}
        onClick={() => scrollToSection("home")}
      />
      {selectedProject && (
        <Suspense
          fallback={
            <div role="status" className="toast">
              Opening project...
            </div>
          }
        >
          <ProjectModal project={selectedProject} onClose={closeProject} />
        </Suspense>
      )}
      <Toast message={toastMessage} />
    </>
  );
}

export default function PortfolioShell() {
  return (
    <ExperienceProvider>
      <Studio />
    </ExperienceProvider>
  );
}
