import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

export default function TimelineSection({ entries }) {
  return (
    <section
      id="timeline"
      className="section timeline-section"
      data-section
      aria-labelledby="journey-title"
    >
      <div className="container">
        <SectionHeading
          number="04"
          subtitle="Experience & education"
          title={<span id="journey-title">Built one layer at a time.</span>}
          description="Academic foundations, practical experience, and a growing interest in what software can make possible."
        />
        <div className="journey-grid">
          <div className="journey-aside">
            <div className="layer-sculpture" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <div
                  className="sculpture-layer"
                  key={i}
                  style={{ "--layer": i }}
                />
              ))}
            </div>
            <p className="mono">FOUNDATIONS → APPLICATION</p>
            <h3>Learning by building.</h3>
            <p>From core computing concepts to software for real operations.</p>
          </div>
          <div className="timeline-path">
            {entries.map((entry, index) => (
              <Reveal
                key={entry.title}
                className={`timeline-entry ${entry.type}`}
                delay={index * 0.04}
              >
                <span className="timeline-node" aria-hidden="true" />
                <div className="timeline-meta">
                  <span className="mono">{entry.date}</span>
                  <span className="entry-type">{entry.type}</span>
                </div>
                <h3>{entry.title}</h3>
                <p className="timeline-location">{entry.location}</p>
                <p>{entry.description}</p>
                {entry.document && (
                  <div className="document-links">
                    <a
                      className="text-link"
                      href={entry.document}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View certificate <Icon name="external" size={16} />
                    </a>
                    <a className="text-link" href={entry.document} download>
                      Download <Icon name="download" size={16} />
                    </a>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
