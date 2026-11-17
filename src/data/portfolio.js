// All site content lives here so it can be edited without touching components.

export const profile = {
  firstName: 'Jonathan',
  lastName: 'Albacite',
  fullName: 'Jonathan C. Albacite',
  location: 'Iloilo City, PH',
  school: 'Iloilo Science and Technology University',
  schoolShort: 'ISATU',
  resumeUrl: '/resume/Jonathan_Albacite_Resume.pdf',
};

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#what-i-can-do', label: 'What I Can Do' },
  { href: '#about', label: 'About' },
];

export const projects = [
  {
    title: 'Vertex Sports Club',
    description:
      'A landing page for an all-in-one sports facilities center, with facility showcases, member testimonials, a newsletter sign-up and booking calls to action.',
    image: '/images/projects/vertex-mockup.webp',
  },
  {
    title: 'Jason Photography',
    description:
      'A bold personal brand site for a photographer, mixing oversized type, a script signature and social proof to drive session bookings.',
    image: '/images/projects/jason-mockup.webp',
  },
  {
    title: 'The Canvas Blog',
    description:
      'A dark, editorial blog layout about art, music and design, built around big headline typography and a featured-article card.',
    image: '/images/projects/canvas-blog-mockup.webp',
  },
  {
    title: 'Pixel Rise',
    description:
      'A digital agency landing page with pixel-art display type, a playful 3D retro computer hero and growth stats that highlight results.',
    image: '/images/projects/pixel-rise-mockup.webp',
  },
  {
    title: 'Kavian Interiors',
    description:
      'A clean Scandinavian interior design landing page with layered room photography, featured collections and a simple call to action.',
    image: '/images/projects/kavian-mockup.webp',
  },
];

// `icon` keys map to components/SkillIcon.jsx
export const skills = [
  { label: 'HTML', name: 'HTML', icon: 'html', color: '#e44d26' },
  { label: 'CSS', name: 'CSS', icon: 'css', color: '#2965f1' },
  { label: 'JS', name: 'JavaScript', icon: 'javascript', color: '#d9a400' },
  { label: 'Figma', name: 'Figma', icon: 'figma', color: '#a259ff' },
  { label: 'A11y', name: 'Accessibility', icon: 'accessibility', color: '#0a8f6a' },
  { label: 'PowerShell', name: 'PowerShell', icon: 'powershell', color: '#2671be' },
  { label: 'Win Server', name: 'Windows Server', icon: 'windowsServer', color: '#0078d4' },
  { label: 'AI', name: 'AI', icon: 'ai' },
  { label: 'Security', name: 'Security', icon: 'security', color: '#c0392b' },
  { label: 'GitHub', name: 'GitHub', icon: 'github' },
];

export const capabilities = [
  {
    number: '01',
    title: 'Web Dev & Design',
    icon: '</>',
    description:
      'Building and designing functional digital experiences, from 3D web games to accessible Figma prototypes, with a focus on usability and clarity.',
    tags: ['Front-end', 'UI/UX', 'Prototyping', 'Accessibility', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    number: '02',
    title: 'Systems & Security',
    icon: '🛡️',
    description:
      'Setting up and maintaining Windows Server environments with file sharing, group policies and access control, backed by information assurance fundamentals.',
    tags: ['Sysad', 'AGDLP', 'PowerShell', 'File Server', 'Printer Deploy', 'Security'],
  },
];

export const stats = [
  { label: 'Projects', value: '11+' },
  { label: 'Year Level', value: '4th' },
  { label: 'Expected Grad', value: '2027' },
];

export const currently = [
  { label: 'Building', value: 'Capstone game' },
  { label: 'Exploring', value: 'AI-powered features' },
  { label: 'Learning', value: 'Full-stack & security' },
];

export const traits = ['Detail-Oriented', 'Curious', 'Reliable', 'Open to Feedback', 'Problem Solver'];

export const contacts = [
  { label: 'Email', value: 'jonathanalbacite12@gmail.com', href: 'mailto:jonathanalbacite12@gmail.com', icon: '✉' },
  {
    label: 'GitHub',
    value: 'github.com/JonathanAlbacite',
    href: 'https://github.com/JonathanAlbacite',
    icon: '⌥',
    external: true,
  },
];
