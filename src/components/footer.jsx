import React, { useState } from 'react';
import {
  Facebook, Twitter, Linkedin, Instagram,
  Mail, Phone, MapPin, ChevronRight,
  Award, Shield, Clock, Send, ArrowUp, Heart
} from 'lucide-react';

const brandBlue = '#1a3a6b';
const brandRed  = '#c41e3a';

const Footer = () => {
  const [email, setEmail]           = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [subscribed, setSubscribed]  = useState(false);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = {
    company:  [
      { name: 'About Us',  href: '/about' },
      { name: 'Our Team',  href: '/about' },
    ],
    products: [
      { name: 'Clinical Chemistry', href: '/products/chemistry' },
      { name: 'Microbiology',       href: '/products/microbiology' },
      { name: 'Immunology',         href: '/products/immuno-assay' },
      { name: 'Haematology',        href: '/products/haematology' },
    ],
    services: [
      { name: 'Equipment Maintenance', href: '/services' },
      { name: 'Installation',          href: '/services' },
      { name: 'Technical Support',     href: '/services' },
      { name: 'Training',              href: '/services' },
    ],
    OurLocations: [
      { name: 'Kampala -TANK HILL MUYENGA : Plot 2236,MUYENGA, Uganda P.O BOX 1735', href: 'https://www.hassuganda.co.ug' },
      { name: 'Nairobi- Argwings Kodhek Road, Kenya',  href: 'https://www.hasscientific.com' },
      { name: 'Kigali- Kacyiru: Office A23 Above Planet, Rwanda', href: 'https://www.hassscientific.com' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />,  href: 'https://www.facebook.com/pages/Hass-Scientific-Medical-Supplies', hoverBg: '#1877f2', label: 'Facebook'  },
    { icon: <Twitter className="w-4 h-4" />,   href: 'https://www.twitter.com/HassScientific',                          hoverBg: '#0ea5e9', label: 'Twitter'   },
    { icon: <Linkedin className="w-4 h-4" />,  href: 'https://www.linkedin.com/company/hass-scientific-medical-supplies', hoverBg: '#0a66c2', label: 'LinkedIn'  },
    { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/HassScientific',                        hoverBg: '#e1306c', label: 'Instagram' },
  ];

  const certifications = [
    { icon: <Award className="w-7 h-7" />,  text: 'ISO Certified',   color: brandBlue },
    { icon: <Shield className="w-7 h-7" />, text: 'Quality Assured', color: brandRed  },
    { icon: <Clock className="w-7 h-7" />,  text: '30+ Years',       color: '#059669' },
  ];

  const handleSubscribe = () => {
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="relative overflow-hidden bg-white border-t border-slate-100" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Top accent line — brand gradient */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${brandBlue}, ${brandRed})` }} />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full blur-3xl opacity-[0.04]" style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: brandBlue }} />
        <div className="absolute rounded-full blur-3xl opacity-[0.04]" style={{ width: 400, height: 400, bottom: '-5%', right: '-5%', background: brandRed  }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">

        {/* ── MAIN GRID ───────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-12 pt-16 pb-12">

          {/* Company column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo + name */}
            <div className="flex items-center gap-4">
              <img src="/hass-logo.png" alt="HASS Logo" className="w-14 h-14 object-contain" />
              <div>
                <h3 className="text-2xl font-black leading-none" style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}>HASS</h3>
                <p className="text-sm font-semibold" style={{ color: brandRed }}>Scientific & Medical</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-base max-w-sm">
              Procurement and supply of medical equipment, reagents, and consumables for clinical laboratories across East & Central Africa since 1997.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              <a
                href="mailto:customerservice@hassuganda.co.ug"
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${brandBlue}10`, color: brandBlue }}>
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors leading-relaxed">
                  customerservice@hassuganda.co.ug<br />sales@hassuganda.co.ug
                </span>
              </a>

              <a
                href="tel:+256414250655"
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-300"
              >
                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${brandRed}10`, color: brandRed }}>
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                  +256 (0)414 250 655 / +256 (0)753 250 655
                </span>
              </a>

              <div className="flex items-start gap-3 p-3">
                <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${brandBlue}10`, color: brandBlue }}>
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-500 leading-relaxed">
                  Hass Scientific and Medical Supplies Ltd<br />
                  Plot 2236, Tank Hill Road, Muyenga<br />
                  P.O Box 1735, Kampala – Uganda
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Connect With Us</p>
              <div className="flex gap-2">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    title={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 border border-slate-200 bg-inherit hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ '--hover-bg': s.hoverBg }}
                    onMouseEnter={e => e.currentTarget.style.background = s.hoverBg}
                    onMouseLeave={e => e.currentTarget.style.background = 'blue-600'}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3 text-black">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4
                  className="text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: section === 'products' ? brandRed : brandBlue }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, i) => {
                    const key = `${section}-${i}`;
                    const isHovered = hoveredLink === key;
                    return (
                      <li key={i}>
                        <a
                          href={link.href}
                          onMouseEnter={() => setHoveredLink(key)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-slate-800 transition-all duration-200 group"
                        >
                          <ChevronRight
                            className="w-3.5 h-3.5 transition-all duration-200 flex-shrink-0"
                            style={{ color: brandRed, opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateX(2px)' : 'none' }}
                          />
                          <span style={{ transform: isHovered ? 'translateX(2px)' : 'none', transition: 'transform .2s' }}>
                            {link.name}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── CERTIFICATIONS ──────────────────────────────────────────── */}
        <div className="border-t border-slate-100 py-10">
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
              >
                <div
                  className="p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${cert.color}10`, color: cert.color }}
                >
                  {cert.icon}
                </div>
                <span className="font-bold text-slate-700">{cert.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEWSLETTER — dark panel matching other pages' CTA strips ── */}
        <div className="rounded-3xl mb-10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}>
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10 blur-2xl" style={{ background: brandRed }} />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10 blur-2xl" style={{ background: '#2563eb' }} />

          <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center p-10">
            <div>
              <h4 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>Stay Updated</h4>
              <p className="text-blue-200">Subscribe to receive updates on new products and services.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white font-semibold text-sm">You're subscribed — thank you!</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3.5 rounded-xl text-sm bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/50 transition-all"
                />
                <button
                  onClick={handleSubscribe}
                  className="group px-5 py-3.5 bg-white rounded-xl font-bold text-sm hover:bg-slate-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  style={{ color: brandBlue }}
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="border-t border-slate-100 py-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400 flex items-center gap-2">
            © {currentYear} Hass Scientific & Medical Supplies (U) Ltd.
            <Heart className="w-3.5 h-3.5 animate-pulse" style={{ color: brandRed }} />
            All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t, i) => (
              <a key={i} href={`#${t.toLowerCase().replace(/ /g, '-')}`}
                className="hover:text-slate-700 hover:underline underline-offset-4 transition-colors duration-200">{t}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-to-top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 z-50"
        style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)`, boxShadow: `0 8px 24px ${brandBlue}40` }}
        title="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50%       { transform: translateY(-16px) scale(1.1); opacity: 0.4; }
        }
        .animate-float { animation: float ease-in-out infinite; }
      `}</style>
    </footer>
  );
};

export default Footer;