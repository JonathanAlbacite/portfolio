import { profile } from '../data/portfolio.js';

export default function Footer() {
  return (
    <footer className="footer mono">
      © {new Date().getFullYear()} {profile.fullName} · {profile.location}
    </footer>
  );
}
