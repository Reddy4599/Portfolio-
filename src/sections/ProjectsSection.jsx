import { useRef } from "react";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import SystemDiagram from "../components/SystemDiagram";
import { useExperience } from "../components/ExperienceContext";
import { projectStories } from "../assets/studioData";

function ProjectCard({ project, index, onOpenProject }) {
  const ref = useRef();
  const { motionEnabled } = useExperience();
  const story = projectStories[project.id];
  const move = (event) => {
    if (!motionEnabled || event.pointerType === "touch") return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty(
      "--tilt-x",
      `${(-(event.clientY - rect.top - rect.height / 2) / rect.height) * 5}deg`,
    );
    ref.current.style.setProperty(
      "--tilt-y",
      `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 5}deg`,
    );
  };
  const reset = () => {
    ref.current.style.setProperty("--tilt-x", "0deg");
    ref.current.style.setProperty("--tilt-y", "0deg");
  };
  return (
    <Reveal delay={index * 0.08} className="project-wrapper">
      <article
        ref={ref}
        className="project-card"
        style={{ "--project-color": story.color }}
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <button
          className="project-visual"
          onClick={() => onOpenProject(project)}
          aria-label={`Explore ${project.title}`}
        >
          <div className="project-visual-top mono">
            <span>PROJECT / 0{index + 1}</span>
            <Icon name="external" size={20} />
          </div>
          <SystemDiagram kind={story.kind} />
          <span className="visual-caption mono">
            {story.architecture[0]} <span> / </span> {story.architecture.at(-1)}
          </span>
        </button>
        <div className="project-copy">
          <p className="eyebrow">{story.category}</p>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="tech-tags">
            {project.tech.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-result">
            <span className="tiny-dot" />
            <span>{story.result}</span>
          </div>
          <button
            className="text-link project-details"
            onClick={() => onOpenProject(project)}
            aria-label={`View details: ${project.title}`}
          >
            View details <Icon name="arrow" size={19} />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectsSection({ projects, onOpenProject, github }) {
  return (
    <section
      id="projects"
      className="section projects-section"
      data-section
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          number="03"
          subtitle="Selected work"
          title={
            <span id="projects-title">
              Different problems.
              <br />
              Same drive to build.
            </span>
          }
          description="Three systems, from the integrity of a transaction to the intelligence of a device."
        />
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
        <div className="projects-footer">
          <span className="mono">
            A closer look at how I think, design, and build.
          </span>
          <a
            className="text-link"
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub <Icon name="external" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
