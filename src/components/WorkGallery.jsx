import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { projects } from '../data/portfolio.js';

/** Signed distance from the active card, wrapped so the carousel loops. */
function offset(index, current, total) {
  let d = index - current;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

export default function WorkGallery() {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);
  const stageRef = useRef(null);
  const total = projects.length;

  useEffect(() => {
    const el = stageRef.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (i) => setCurrent((i + total) % total);
  const project = projects[current];

  return (
    <section id="work">
      <div className="container">
        <SectionHeader
          eyebrow="Selected Work"
          title="Work Gallery"
          description="A collection of systems, designs and technical work I’ve built."
          action={<a className="btn btn-sm" href="#contact">View More Projects ↗</a>}
        />

        <Reveal delay={100}>
        <div className="carousel" ref={stageRef}>
          {projects.map((p, i) => {
            const d = offset(i, current, total);
            const a = Math.abs(d);
            const hidden = a > 2;
            return (
              <button
                key={p.title}
                className="carousel-card"
                aria-label={p.title}
                aria-current={d === 0}
                tabIndex={hidden ? -1 : 0}
                onClick={() => go(i)}
                style={{
                  transform: `translateX(${d * width * 0.2}px) translateZ(${-a * 140}px) rotateY(${-d * 32}deg)`,
                  opacity: hidden ? 0 : 1 - a * 0.28,
                  zIndex: 10 - a,
                  pointerEvents: hidden ? 'none' : 'auto',
                }}
              >
                <img
                  className="card-image"
                  src={p.image}
                  alt={`${p.title} website mockup`}
                  draggable="false"
                />
              </button>
            );
          })}
        </div>

        </Reveal>

        <Reveal delay={200}>
        <div className="carousel-detail" aria-live="polite" key={current}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href="#contact">View Project →</a>
        </div>

        <div className="carousel-nav">
          <button onClick={() => go(current - 1)} aria-label="Previous project">←</button>
          <button onClick={() => go(current + 1)} aria-label="Next project">→</button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
