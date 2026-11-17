import { siCss3, siFigma, siGithub, siHtml5, siJavascript } from 'simple-icons';
import { Accessibility, Lock, Server, Sparkles, SquareTerminal } from 'lucide-react';

// Brand logos (Simple Icons): filled single-path SVGs.
const brands = {
  html: siHtml5,
  css: siCss3,
  javascript: siJavascript,
  figma: siFigma,
  github: siGithub,
};

// Generic outline icons (Lucide) for skills without an available logo.
const generic = {
  accessibility: Accessibility,
  powershell: SquareTerminal,
  windowsServer: Server,
  ai: Sparkles,
  security: Lock,
};

export default function SkillIcon({ name, size = 28 }) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = generic[name];
  return Icon ? <Icon size={size} strokeWidth={1.8} aria-hidden="true" /> : null;
}
