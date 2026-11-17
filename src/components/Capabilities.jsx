import Reveal from './Reveal.jsx';
import SkillIcon from './SkillIcon.jsx';
import { capabilities, skills } from '../data/portfolio.js';

export default function Capabilities() {
  return (
    <section id="what-i-can-do" className="capabilities">
      <div className="container capabilities-grid">
        <Reveal>
          <span className="eyebrow">My Capabilities</span>
          <h2>What I Can Do</h2>
          <span className="grow-line" aria-hidden="true" />
          <p className="capabilities-intro">
            I combine development, design and systems skills to build reliable, usable digital
            solutions and keep them running smoothly.
          </p>
          <div className="skill-tiles">
            {skills.map((s) => (
              <div
                key={s.label}
                className="skill-tile"
                style={s.color && { color: s.color }}
                title={s.name}
                aria-label={s.name}
                role="img"
              >
                <SkillIcon name={s.icon} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="capability-cards">
          {capabilities.map((c, i) => (
            <Reveal key={c.number} as="article" className="capability-card" delay={150 + 120 * i}>
              <div className="capability-top">
                <span className="capability-number">{c.number}</span>
                <span className="mono">{c.title}</span>
              </div>
              <div className="capability-icon">{c.icon}</div>
              <p>{c.description}</p>
              <div className="pills">
                {c.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
