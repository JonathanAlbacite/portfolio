import { useCallback, useState } from 'react';
import Reveal from './Reveal.jsx';
import ContactModal from './ContactModal.jsx';
import { contacts, profile } from '../data/portfolio.js';

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false);
  const closeForm = useCallback(() => setFormOpen(false), []);

  return (
    <section id="contact">
      <div className="container contact">
        <div>
          <Reveal><span className="eyebrow">Get in touch</span></Reveal>
          <Reveal delay={100}><h2>Let’s work together</h2></Reveal>
          <Reveal delay={200}><h5>Looking for the next problem worth solving.</h5></Reveal>
          <Reveal delay={300}>
          <p>
            I’m open to opportunities where I can contribute to web development, UI/UX design, IT
            operations and digital workflows.
          </p>
          </Reveal>
          <Reveal delay={400}>
            <a className="btn" href={profile.resumeUrl} download="Jonathan_Albacite_Resume.pdf">
              Download Resume →
            </a>
          </Reveal>
        </div>

        <div>
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={200 + 80 * i}>
            <a
              className="contact-link"
              href={c.href}
              {...(c.external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span className="contact-icon">{c.icon}</span>
              <div>
                <span className="mono">{c.label}</span>
                <b>{c.value}</b>
              </div>
              <em>{String(i + 1).padStart(2, '0')}</em>
            </a>
            </Reveal>
          ))}
          <Reveal delay={440}>
            <button className="btn btn-outline btn-block" onClick={() => setFormOpen(true)} aria-expanded={formOpen}>
              SEND ME A MESSAGE →
            </button>
          </Reveal>
        </div>
      </div>
      <ContactModal open={formOpen} onClose={closeForm} />
    </section>
  );
}
