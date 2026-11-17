import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { currently, profile, stats, traits } from '../data/portfolio.js';

export default function About() {
  const [traitIndex, setTraitIndex] = useState(0);

  return (
    <section id="about" className="about">
      <div className="container">
        <Reveal>
          <span className="eyebrow">About Me</span>
          <h2>Builder. Designer. Learner.</h2>
        </Reveal>

        <Reveal delay={100}>
        <div className="profile">
          <img className="avatar" src="/images/avatar.webp" alt={profile.firstName} />
          <div>
            <div className="profile-name">
              {profile.fullName} <span className="verified">✓</span>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <span className="mono">{s.label}</span>
                  <b>{s.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p>
          I’m a fourth-year BSIT student at {profile.school} in La Paz, Iloilo City, focused on web
          development, UI/UX design and systems administration. I enjoy turning ideas and
          real-world problems into practical digital solutions.
        </p>
        <p>
          From a 3D educational game for my capstone to Figma prototypes and Windows Server labs, I
          like projects that teach me something new each time.
        </p>

        </Reveal>

        <Reveal delay={200}>
        <div className="currently">
          <div className="currently-list">
            <span className="mono">Currently</span>
            {currently.map((c) => (
              <div key={c.label}>
                <b>{c.label}</b>
                <span>{c.value}</span>
              </div>
            ))}
          </div>
          <button
            className="trait-card"
            onClick={() => setTraitIndex((i) => (i + 1) % traits.length)}
            aria-label="Show another trait"
          >
            <span className="mono">Trait</span>
            <span>{traits[traitIndex]}</span>
          </button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
