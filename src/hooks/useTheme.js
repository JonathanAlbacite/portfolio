import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const query = '(prefers-color-scheme: dark)';

function readTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit;
  return window.matchMedia(query).matches ? 'dark' : 'light';
}

/**
 * Tracks the active theme (saved choice, or the OS preference) and lets the user toggle it.
 * The toggle reveals the new theme with a circular wipe from the clicked button.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(readTheme);

  // Follow OS changes while the user hasn't picked a theme explicitly.
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setTheme(readTheme());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback((event) => {
    const root = document.documentElement;
    const next = readTheme() === 'dark' ? 'light' : 'dark';

    const apply = () => {
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* storage unavailable */
      }
      flushSync(() => setTheme(next));
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || !event || reduceMotion) {
      apply();
      return;
    }

    // Circle grows from the button's centre to the farthest corner of the viewport.
    const r = event.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${radius}px`);
    root.classList.add('vt-wipe-active');

    document
      .startViewTransition(apply)
      .finished.finally(() => root.classList.remove('vt-wipe-active'));
  }, []);

  return { theme, toggle };
}
