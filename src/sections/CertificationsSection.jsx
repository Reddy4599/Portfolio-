import { useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";
import { useExperience } from "../components/ExperienceContext";

export default function CertificationsSection({ certifications }) {
  const ref = useRef();
  const { motionEnabled } = useExperience();
  const [position, setPosition] = useState(0);
  const move = (direction) => {
    const track = ref.current;
    const step = track.firstElementChild.getBoundingClientRect().width + 20;
    track.scrollBy({
      left: direction * step,
      behavior: motionEnabled ? "smooth" : "instant",
    });
  };
  const update = () => {
    const track = ref.current;
    const max = track.scrollWidth - track.clientWidth;
    setPosition(max > 0 ? track.scrollLeft / max : 0);
  };
  return (
    <section
      id="certifications"
      className="section certifications-section"
      data-section
      aria-labelledby="certs-title"
    >
      <div className="container">
        <SectionHeading
          number="06"
          subtitle="Continuous learning"
          title={
            <span id="certs-title">The credentials behind the craft.</span>
          }
          description="Certifications across cloud, data science, enterprise platforms, and financial awareness."
        />
        <div className="credential-controls">
          <span className="mono">
            06 CREDENTIALS / ORACLE, SERVICENOW & NISM
          </span>
          <div>
            <button
              className="icon-button"
              onClick={() => move(-1)}
              aria-label="Previous certificates"
              disabled={position <= 0.01}
            >
              <Icon style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              className="icon-button"
              onClick={() => move(1)}
              aria-label="Next certificates"
              disabled={position >= 0.99}
            >
              <Icon />
            </button>
          </div>
        </div>
        <div
          className="credential-track"
          ref={ref}
          onScroll={update}
          tabIndex={0}
          role="region"
          aria-label="Certifications. Scroll horizontally for all six credentials."
        >
          {certifications.map((cert, index) => (
            <article key={cert.name} className="credential-card">
              <div className="credential-brand">
                <span className={`issuer issuer-${cert.issuer.toLowerCase()}`}>
                  {cert.issuer === "ServiceNow" ? "servicenow" : cert.issuer}
                </span>
                <span className="mono">0{index + 1}</span>
              </div>
              <div className="credential-emblem" aria-hidden="true">
                <Icon name="layers" size={30} />
              </div>
              <h3>{cert.name}</h3>
              <dl className="credential-meta">
                {cert.issued && (
                  <>
                    <dt>Issued</dt>
                    <dd>{cert.issued}</dd>
                  </>
                )}
                {cert.validUntil && (
                  <>
                    <dt>Valid until</dt>
                    <dd>{cert.validUntil}</dd>
                  </>
                )}
                {cert.credentialId && (
                  <>
                    <dt>Credential</dt>
                    <dd>{cert.credentialId}</dd>
                  </>
                )}
              </dl>
              <div className="document-links">
                {cert.document ? (
                  <>
                    <a
                      className="text-link"
                      href={cert.document}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${cert.name}`}
                    >
                      View <Icon name="external" size={16} />
                    </a>
                    <a
                      className="text-link"
                      href={cert.document}
                      download
                      aria-label={`Download ${cert.name}`}
                    >
                      Download <Icon name="download" size={16} />
                    </a>
                  </>
                ) : (
                  <span className="document-note">
                    Document not uploaded yet
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="credential-progress" aria-hidden="true">
          <span style={{ transform: `translateX(${position * 200}%)` }} />
        </div>
      </div>
    </section>
  );
}
