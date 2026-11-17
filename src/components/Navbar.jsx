import useTheme from '../hooks/useTheme.js';
import { navLinks, profile } from '../data/portfolio.js';

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="navbar">
      <a className="logo" href="#top">
        <i>{profile.firstName[0]}</i>
        {profile.firstName}
      </a>
      <div className="nav-links">
        {navLinks.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle light and dark mode">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <a className="btn btn-sm" href="#contact">Hire Me</a>
      </div>
    </nav>
  );
}
