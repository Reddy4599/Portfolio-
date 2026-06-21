import { useEffect, useMemo, useState } from "react";
import { portfolioData } from "../assets/portfolioData";
import BackToTopButton from "./BackToTopButton";
import Navbar from "./Navbar";
import ProjectModal from "./ProjectModal";
import Toast from "./Toast";
import AboutSection from "../sections/AboutSection";
import CertificationsSection from "../sections/CertificationsSection";
import ContactSection from "../sections/ContactSection";
import HeroSection from "../sections/HeroSection";
import PatentSection from "../sections/PatentSection";
import ProjectsSection from "../sections/ProjectsSection";
import TimelineSection from "../sections/TimelineSection";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "timeline", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "patents", label: "Patent" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" }
];

function PortfolioShell() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.7],
        rootMargin: "-15% 0px -45% 0px"
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cosmic-950 font-body text-slate-100">
      <div className="pointer-events-none fixed inset-0 z-0 bg-radialGrid opacity-70" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(120deg,rgba(34,243,255,0.06),transparent_40%,rgba(168,85,247,0.06))]" />

      <Navbar items={navItems} activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="relative z-10">
        <HeroSection
          name={portfolioData.name}
          roles={portfolioData.roleCycle}
          statement={portfolioData.heroStatement}
          quickStats={portfolioData.quickStats}
          contact={portfolioData.contact}
          profilePhoto={portfolioData.profilePhoto}
          onViewWork={() => scrollToSection("projects")}
        />
        <AboutSection data={portfolioData} />
        <TimelineSection entries={portfolioData.timeline} />
        <ProjectsSection
          projects={portfolioData.projects}
          onOpenProject={(project) => setSelectedProject(project)}
        />
        <PatentSection patents={portfolioData.patents} />
        <CertificationsSection certifications={portfolioData.certifications} />
        <ContactSection
          contact={portfolioData.contact}
          onMessageSent={() => setToastMessage("Message sent!")}
        />
      </main>

      <BackToTopButton onClick={() => scrollToSection("home")} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default PortfolioShell;
