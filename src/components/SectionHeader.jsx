import Reveal from './Reveal.jsx';

/** Eyebrow label + heading + optional description, with an optional action on the right. */
export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <Reveal className="section-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}
