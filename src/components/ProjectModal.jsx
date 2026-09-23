import { useEffect, useRef } from "react";
import Icon from "./Icon";
import SystemDiagram from "./SystemDiagram";
import { projectStories } from "../assets/studioData";

export default function ProjectModal({ project, onClose }) {
  const ref = useRef();
  const story = projectStories[project.id];
  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement)
        trigger.focus({ preventScroll: true });
    };
  }, [project.id]);
  const dismissOutside = (event) => {
    if (event.target !== ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      onClose();
  };
  return (
    <dialog
      ref={ref}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={dismissOutside}
      style={{ "--project-color": story.color }}
    >
      <div className="modal-toolbar">
        <span className="mono">PROJECT EXPLORER / {story.category}</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close project details"
          autoFocus
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-content">
        <div className="modal-hero">
          <div>
            <p className="eyebrow">Inside the system</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <p>{project.description}</p>
          </div>
          <SystemDiagram kind={story.kind} />
        </div>
        <div className="modal-two-column">
          <div>
            <h3>The problem</h3>
            <p>{story.problem}</p>
          </div>
          <div>
            <h3>The solution</h3>
            <p>{project.details}</p>
          </div>
        </div>
        <h3 className="modal-label">Architecture</h3>
        <ol className="architecture-flow">
          {story.architecture.map((step, index) => (
            <li key={step}>
              <span className="mono">0{index + 1}</span>
              {step}
              {index !== story.architecture.length - 1 && (
                <Icon name="arrow" size={14} />
              )}
            </li>
          ))}
        </ol>
        <h3 className="modal-label">Implementation & outcomes</h3>
        <ul className="project-points">
          {project.detailsPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <div className="modal-result">
          <strong>{story.result}</strong>
          <span>{story.resultLabel}</span>
        </div>
        <div className="tech-tags">
          {project.tech.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="modal-links">
          {story.repository && (
            <a
              className="button button-primary"
              href={story.repository}
              target="_blank"
              rel="noreferrer"
            >
              View source <Icon name="external" size={17} />
            </a>
          )}
          {story.liveDemo && (
            <a
              className="button button-quiet"
              href={story.liveDemo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <Icon name="external" size={17} />
            </a>
          )}
          <button className="text-link" onClick={onClose}>
            Back to portfolio <Icon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </dialog>
  );
}
