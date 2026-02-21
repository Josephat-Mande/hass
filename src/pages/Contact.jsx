import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, CheckCircle, Building2, Loader2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import emailjs from '@emailjs/browser';

// ─── EMAILJS CONFIG ───────────────────────────────────────────────────────────
// Replace these with your actual EmailJS credentials:
//   1. Go to https://www.emailjs.com/ and sign up / log in
//   2. Create a Service (Gmail, Outlook, etc.) → copy the Service ID
//   3. Create an Email Template → copy the Template ID
//   4. Copy your Public Key from Account → API Keys
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'abc123XYZ'

// EmailJS template variables expected:
//   {{from_name}}, {{from_email}}, {{phone}}, {{organization}}, {{subject}}, {{message}}
// ─────────────────────────────────────────────────────────────────────────────

const brandBlue = '#1a3a6b';
const brandRed  = '#c41e3a';

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Uganda Office",
    details: ["Plot 2236, Tank Hill Road,", "Muyenga – Kampala", "P.O Box 1735, Kampala"],
    color: brandBlue,
    href: "https://maps.google.com/?q=Muyenga+Kampala+Uganda",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Call Us",
    details: ["+256 (0)414 250 655", "+256 (0)753 250 655", "Mon–Fri  9:00 AM – 6:00 PM"],
    color: brandRed,
    href: "tel:+256414250655",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    details: ["info@hassuganda.co.ug", "sales@hassuganda.co.ug", "support@hassuganda.co.ug"],
    color: "#059669",
    href: "mailto:info@hassuganda.co.ug",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Business Hours",
    details: ["Mon – Fri: 8:00 AM – 5:00 PM", "Sat: 9:00 AM – 1:00 PM", "Emergency: 24/7"],
    color: "#7c3aed",
    href: null,
  },
];

const quickLinks = [
  { icon: <Globe className="w-5 h-5" />,     text: "Visit Website",   href: "https://www.hassuganda.co.ug/" },
  { icon: <Building2 className="w-5 h-5" />, text: "Request Catalog", href: "mailto:sales@hassuganda.co.ug?subject=Catalog%20Request" },
  { icon: <CheckCircle className="w-5 h-5" />,text: "Schedule Demo",  href: "mailto:sales@hassuganda.co.ug?subject=Demo%20Request" },
];

/* ─── FIELD COMPONENT ───────────────────────────────────────────────────── */
function Field({ label, required, focusedField, name, children }) {
  return (
    <div className="relative">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
        {label} {required && <span style={{ color: brandRed }}>*</span>}
      </label>
      {children}
      {/* Animated focus underline */}
      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300"
        style={{
          width: focusedField === name ? '100%' : '0%',
          background: `linear-gradient(90deg, ${brandBlue}, ${brandRed})`,
        }}
      />
    </div>
  );
}

const inputClass = (focused, name) =>
  `w-full px-4 py-3.5 rounded-xl border bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 focus:outline-none transition-all duration-300 text-sm ${
    focused === name
      ? 'border-slate-300 shadow-md'
      : 'border-slate-200 hover:border-slate-300'
  }`;

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '', from_email: '', phone: '', organization: '', subject: '', message: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ from_name: '', from_email: '', phone: '', organization: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <PageLayout>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${brandBlue}04 0%, transparent 60%)` }} />
          {/* Ghost watermark */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.025] overflow-hidden">
            <span className="font-black" style={{ fontSize: 220, fontFamily: "'Orbitron', sans-serif", color: brandBlue, lineHeight: 1 }}>@</span>
          </div>

          <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-semibold" style={{ borderColor: `${brandRed}30`, background: `${brandRed}08`, color: brandRed }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
              Get In Touch
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1
                  className="font-black leading-none mb-5 text-slate-800"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  Let's Start a<br />
                  <span style={{ color: brandBlue }}>Conversation</span>
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                  Contact us today to discuss your laboratory equipment needs. Our team is ready to assist.
                </p>
              </div>

              {/* Contact info quick stats */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.slice(0,4).map((info, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ color: info.color }}>
                      {info.icon}
                    </div>
                    <div className="font-bold text-slate-700 text-sm">{info.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{info.details[0]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACT INFO CARDS ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-8 py-14">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ borderLeft: `3px solid ${info.color}` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-white"
                  style={{ background: `linear-gradient(135deg, ${info.color}, ${info.color}cc)` }}
                >
                  {info.icon}
                </div>
                <h3 className="font-black text-slate-800 mb-3" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.9rem' }}>
                  {info.title}
                </h3>
                <div className="space-y-1.5 text-black">
                  {info.details.map((d, di) => (
                    info.href
                      ? <a key={di} href={info.href} className="block text-sm text-slate-500 hover:text-slate-700 transition-colors">{d}</a>
                      : <p key={di} className="text-lg text-slate-500">{d}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── MAIN GRID ─────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-5 gap-8">

            {/* CONTACT FORM */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: brandRed }}>Send a Message</span>
                  <h3 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    How Can We Help?
                  </h3>
                </div>

                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: `${brandBlue}10` }}>
                      <CheckCircle className="w-10 h-10" style={{ color: brandBlue }} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif" }}>Message Sent!</h4>
                    <p className="text-slate-500 max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <Field label="Full Name" name="from_name" required focusedField={focusedField}>
                        <input
                          type="text" name="from_name" value={formData.from_name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('from_name')}
                          onBlur={() => setFocusedField(null)}
                          required placeholder="Dr. Jane Mwangi"
                          className={inputClass(focusedField, 'from_name')}
                        />
                      </Field>

                      <Field label="Email Address" name="from_email" required focusedField={focusedField}>
                        <input
                          type="email" name="from_email" value={formData.from_email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('from_email')}
                          onBlur={() => setFocusedField(null)}
                          required placeholder="jane@hospital.org"
                          className={inputClass(focusedField, 'from_email')}
                        />
                      </Field>

                      <Field label="Phone Number" name="phone" focusedField={focusedField}>
                        <input
                          type="tel" name="phone" value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="+256 700 000 000"
                          className={inputClass(focusedField, 'phone')}
                        />
                      </Field>

                      <Field label="Organization" name="organization" focusedField={focusedField}>
                        <input
                          type="text" name="organization" value={formData.organization}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('organization')}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Hospital / Laboratory Name"
                          className={inputClass(focusedField, 'organization')}
                        />
                      </Field>
                    </div>

                    <Field label="Subject" name="subject" required focusedField={focusedField}>
                      <input
                        type="text" name="subject" value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        required placeholder="How can we help you?"
                        className={inputClass(focusedField, 'subject')}
                      />
                    </Field>

                    <Field label="Message" name="message" required focusedField={focusedField}>
                      <textarea
                        name="message" value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required rows={5}
                        placeholder="Tell us about your laboratory equipment needs..."
                        className={`${inputClass(focusedField, 'message')} resize-none`}
                      />
                    </Field>

                    {status === 'error' && (
                      <div className="px-4 py-3 rounded-xl text-sm font-semibold text-red-700 border border-red-200" style={{ background: '#fff5f5' }}>
                        Something went wrong. Please try again or email us directly at info@hassuganda.co.ug
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
                      style={{
                        background: status === 'sending'
                          ? '#94a3b8'
                          : `linear-gradient(135deg, ${brandBlue}, #0f2549)`,
                        boxShadow: status === 'sending' ? 'none' : `0 8px 24px ${brandBlue}30`,
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 space-y-5">

              {/* Quick actions */}
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-800 mb-5" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem' }}>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-md hover:-translate-x-0.5 transition-all duration-300"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white group-hover:scale-110 transition-transform"
                        style={{ background: i === 0 ? brandBlue : i === 1 ? brandRed : '#059669' }}
                      >
                        {link.icon}
                      </div>
                      <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors text-sm">{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Map embed */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 pt-5 pb-3">
                  <h3 className="font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1rem' }}>Our Location</h3>
                  <p className="text-xs text-slate-400 mt-1">Hass Biotechnology Centre, Muyenga, Kampala</p>
                </div>
                <div className="h-52 relative">
                  <iframe
                    title="Hass Scientific Location"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://maps.google.com/maps?q=Muyenga,+Kampala,+Uganda&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
                <div className="px-6 py-4">
                  <a
                    href="https://maps.google.com/?q=Muyenga+Kampala+Uganda"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold flex items-center gap-1.5 transition-colors hover:underline underline-offset-4"
                    style={{ color: brandBlue }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* 24/7 support badge */}
              <div className="rounded-3xl p-7 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}>
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ background: brandRed }} />
                <Clock className="w-10 h-10 mb-4 opacity-90" />
                <h3 className="text-lg font-black mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>24/7 Support</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Our technical team is available round the clock for emergency assistance.
                </p>
                <a
                  href="tel:+256414250655"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                  style={{ background: `${brandRed}`, boxShadow: `0 4px 14px ${brandRed}50` }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default Contact;