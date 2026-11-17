import { useEffect, useRef } from 'react';
import { profile } from '../data/portfolio.js';

export default function Hero() {
  const heroRef = useRef(null);
  const trackRef = useRef(null);
  const visualRef = useRef(null);

  // Keep the marquee speed constant (≈ 1/8 of the viewport per second) whatever the screen size.
  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      const pxPerSec = window.innerWidth / 8;
      const loopWidth = track.scrollWidth / 2;
      heroRef.current.style.setProperty('--marquee-duration', `${loopWidth / pxPerSec}s`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Subtle parallax: the portrait drifts slightly with the cursor.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const hero = heroRef.current;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      visualRef.current.style.transform = `translate(${x * -10}px, ${y * -6}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const name = profile.firstName.toUpperCase();

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="name-marquee" aria-hidden="true">
        <div className="name-track" ref={trackRef}>
          {/* Two identical halves so the -50% loop is seamless; each half holds the name twice
              so it is always wider than the screen. */}
          {[0, 1, 2, 3].map((i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>

      <div className="hero-text">
        <span className="status-tag fade-up" style={{ animationDelay: '0.3s' }}>
          <i />Open to internships &amp; opportunities
        </span>
        <h1 className="fade-up" style={{ animationDelay: '0.5s' }}>
          {profile.firstName}
          <span>{profile.lastName}</span>
        </h1>
        <p className="fade-up" style={{ animationDelay: '0.7s' }}>
          BSIT student at {profile.school}, building web experiences, designing accessible
          interfaces and keeping systems running.
        </p>
        <div className="hero-buttons fade-up" style={{ animationDelay: '0.85s' }}>
          <a className="btn" href="#work">View my work ↓</a>
          <a className="btn btn-outline" href="#contact">Hire me</a>
        </div>
      </div>

      <div className="hero-visual fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="hero-parallax" ref={visualRef}>
          <span className="float-chip chip-a">🎓 BSIT · {profile.schoolShort}</span>
          <span className="float-chip chip-b">📍 {profile.location}</span>
          <img src="/images/photo.webp" alt={`Portrait of ${profile.firstName} in a black suit`} />
        </div>
      </div>

      <div className="scroll-indicator fade-up" style={{ animationDelay: '1s' }} aria-hidden="true">
        <span className="mono">Scroll</span>
        <span className="scroll-line" />
      </div>
    </header>
  );
}
