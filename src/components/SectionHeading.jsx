import Reveal from "./Reveal";
export default function SectionHeading({
  title,
  subtitle,
  number,
  description,
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span>
          {subtitle}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
