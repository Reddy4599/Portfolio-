import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";
import SystemDiagram from "../components/SystemDiagram";
import { getSkillEvidence, projectStories } from "../assets/studioData";

export default function SkillsSection({ data, onOpenProject, onNavigate }) {
  const [selected, setSelected] = useState("Python");
  const evidence = getSkillEvidence(selected, data);
  const kind = evidence.projects[0]
    ? projectStories[evidence.projects[0].id].kind
    : "studio";
  return (
    <section
      id="skills"
      className="section skills-section"
      data-section
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          number="02"
          subtitle="The connected toolkit"
          title={<span id="skills-title">Tools with a purpose.</span>}
          description="Select a technology to see where it fits in my work."
        />
        <div className="skills-layout">
          <div className="skill-groups">
            {data.skills
              .filter((group) => group.category !== "Languages")
              .map((group, i) => (
                <div className="skill-group" key={group.category}>
                  <h3>
                    <span className="mono">0{i + 1}</span>
                    {group.category}
                  </h3>
                  <div className="skill-buttons">
                    {group.items.map((skill) => (
                      <button
                        key={skill}
                        aria-pressed={selected === skill}
                        aria-controls="skill-evidence"
                        onClick={() => setSelected(skill)}
                      >
                        {skill}
                        <span aria-hidden="true">
                          {selected === skill ? "-" : "+"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            <div className="spoken-languages">
              <span className="mono">ALSO SPEAKING</span>
              <p>
                {data.skills
                  .find((group) => group.category === "Languages")
                  .items.join(" / ")}
              </p>
            </div>
          </div>
          <div className="skill-evidence" id="skill-evidence">
            <div className="evidence-top mono">
              <span>TECHNOLOGY IN CONTEXT</span>
              <Icon name="cube" size={17} />
            </div>
            <SystemDiagram kind={kind} />
            <div className="evidence-copy" aria-live="polite">
              <h3>{selected}</h3>
              <p>{evidence.text}</p>
              <div className="evidence-links">
                {evidence.projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => onOpenProject(project)}
                  >
                    {projectStories[project.id].shortTitle}
                    <Icon name="external" size={17} />
                  </button>
                ))}
                {evidence.section && (
                  <button onClick={() => onNavigate(evidence.section)}>
                    {evidence.label}
                    <Icon name="arrow" size={17} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
