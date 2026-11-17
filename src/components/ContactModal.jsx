import { useEffect, useRef, useState } from 'react';
import { contacts } from '../data/portfolio.js';

// Web3Forms access key (https://web3forms.com). It is meant to be public: it only lets this
// form deliver messages to the inbox it was created for. A VITE_WEB3FORMS_KEY in .env overrides it.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '171b66bb-1b6e-43e6-bc7f-0736a3414cd1';
const myEmail = contacts.find((c) => c.label === 'Email').value;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const firstField = useRef(null);

  // Focus the first field on open; close on Escape.
  useEffect(() => {
    if (!open) return;
    firstField.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open && status !== 'sent') return null;

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!emailPattern.test(form.email.trim())) er.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) er.message = 'Please write at least 10 characters.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.botcheck.checked) return; // honeypot: bots tick hidden boxes
    if (!validate()) return;

    // No key configured yet: hand the message to the visitor's email app instead.
    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name || form.email}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
      window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New portfolio message from ${form.name || form.email}`,
          from_name: 'Portfolio contact form',
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      onClose();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="success-overlay" onClick={() => setStatus('idle')}>
        <div className="success-modal" role="alertdialog" aria-labelledby="sent-title" onClick={(e) => e.stopPropagation()}>
          <div className="success-icon">✓</div>
          <h3 id="sent-title">Message sent!</h3>
          <p>Thanks for reaching out. I’ll get back to you as soon as possible.</p>
          <button className="btn" onClick={() => setStatus('idle')} autoFocus>
            Continue browsing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-modal" role="dialog" aria-modal="false" aria-labelledby="contact-title">
      <div className="contact-modal-head">
        <div>
          <span className="mono">Send a message</span>
          <h3 id="contact-title">Let’s talk</h3>
        </div>
        <button className="modal-close" onClick={onClose} aria-label="Close contact form">✕</button>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input type="checkbox" name="botcheck" className="honeypot" tabIndex={-1} autoComplete="off" />

        <label>
          <span className="mono">Name <em>(optional)</em></span>
          <input ref={firstField} type="text" value={form.name} onChange={update('name')} autoComplete="name" placeholder="Your name" />
        </label>

        <label>
          <span className="mono">Your email</span>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>

        <label className="grow">
          <span className="mono">Message</span>
          <textarea
            value={form.message}
            onChange={update('message')}
            placeholder="Tell me about your project or opportunity…"
            aria-invalid={!!errors.message}
            required
          />
          {errors.message && <small className="field-error">{errors.message}</small>}
        </label>

        {status === 'error' && (
          <p className="field-error" role="alert">
            Something went wrong. Please try again or email me directly at {myEmail}.
          </p>
        )}

        <button className="btn btn-block" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message →'}
        </button>
      </form>
    </div>
  );
}
