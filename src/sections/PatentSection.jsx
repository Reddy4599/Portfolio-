import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

export default function PatentSection({ patents, onExplore }) {
  return (
    <section
      id="patents"
      className="section patent-section"
      data-section
      aria-labelledby="patent-title"
    >
      <div className="container">
        <SectionHeading
          number="05"
          subtitle="Research & innovation"
          title={
            <span id="patent-title">Intelligence you can understand.</span>
          }
        />
        {patents.map((patent) => (
          <Reveal key={patent.title} className="patent-card">
            <div className="patent-art" aria-hidden="true">
              <div className="patent-orbit orbit-one" />
              <div className="patent-orbit orbit-two" />
              <div className="patent-core">
                <Icon name="layers" size={58} />
              </div>
              <span className="patent-art-label label-clinical">
                CLINICAL DATA
              </span>
              <span className="patent-art-label label-inference">
                EXPLAINABLE AI
              </span>
              <span className="patent-art-label label-human">
                HUMAN INSIGHT
              </span>
              <span className="patent-number">01</span>
            </div>
            <div className="patent-copy">
              <p className="eyebrow">
                <span className="tiny-dot" />
                {patent.status}
              </p>
              <h3>{patent.title}</h3>
              <p>{patent.description}</p>
              <p>{patent.impact}</p>
              <button className="text-link" onClick={onExplore}>
                Explore the related XAI project <Icon name="arrow" size={18} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
