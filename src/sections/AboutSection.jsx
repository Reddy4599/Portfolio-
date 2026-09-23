import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";

export default function AboutSection({ data }) {
  return (
    <section
      id="about"
      className="section about-section"
      data-section
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionHeading
          number="01"
          subtitle="The person behind the systems"
          title={<span id="about-title">Curiosity, made practical.</span>}
        />
        <div className="about-grid">
          <Reveal className="portrait-card">
            <div className="portrait-frame">
              <img
                src={data.profilePhoto}
                width="503"
                height="900"
                loading="lazy"
                alt="Manjunadha Reddy outdoors"
              />
              <div className="portrait-caption">
                <span>MANJUNADHA REDDY</span>
                <Icon name="cube" size={22} />
              </div>
            </div>
            <p className="mono">BASED IN HYDERABAD, INDIA</p>
          </Reveal>
          <div className="about-story">
            <p className="large-copy">
              I like understanding how things work.
              <br />
              <span>Then making them work better.</span>
            </p>
            <p>{data.heroStatement}</p>
            <p>{data.shortBio}</p>
            <div className="stats-strip">
              {data.quickStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <details className="profile-code">
              <summary>
                <span className="mono">profile.json</span>
                <span className="mono">Inspect profile +</span>
              </summary>
              <pre>
                <code>
                  {Object.entries(data.statsObject).map(([key, value]) => (
                    <span className="code-line" key={key}>
                      <span className="code-key">"{key}"</span>:{" "}
                      <span className="code-value">
                        {JSON.stringify(value)}
                      </span>
                      {"\n"}
                    </span>
                  ))}
                </code>
              </pre>
            </details>
          </div>
        </div>
        <div className="highlights-grid">
          {data.highlights.map((item, i) => (
            <Reveal className="highlight" key={item} delay={i * 0.06}>
              <span className="mono">0{i + 1}</span>
              <p>{item}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
