import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Building2, Award, Globe, Handshake, ArrowRight, ExternalLink } from 'lucide-react';

const brandBlue = '#1a3a6b';
const brandRed  = '#c41e3a';

const partners = [
  {
    name: "bioMérieux",
    category: "Clinical Chemistry · Bacteriology · Microbiology · ImmunoAssay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/BioM%C3%A9rieux_logo.svg/2560px-BioM%C3%A9rieux_logo.svg.png",
    logoBg: "#ffffff",
    accent: "#E91E8C",
    accentLight: "#fdf0f7",
    border: "#f9c6e6",
    description: "World leader in in vitro diagnostics, pioneering microbiology and immunoassay solutions for over 60 years.",
    link: "https://www.biomerieux.com",
    hq: "Marcy-l'Étoile, France",
  },
  {
    name: "ERBA Mannheim",
    category: "Clinical Chemistry",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/ERBA_Mannheim_logo.svg/2560px-ERBA_Mannheim_logo.svg.png",
    logoBg: "#ffffff",
    accent: "#1A5F7A",
    accentLight: "#eef6fa",
    border: "#b8dce8",
    description: "Innovative clinical chemistry analyzers and reagents trusted in thousands of laboratories worldwide.",
    link: "https://www.erbamannheim.com",
    hq: "Mannheim, Germany",
  },
  {
    name: "Becton Dickinson",
    category: "CD4 · CD8 Counts · Blood Collection Tubes",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Becton_Dickinson_logo.svg/2560px-Becton_Dickinson_logo.svg.png",
    logoBg: "#ffffff",
    accent: "#0046BE",
    accentLight: "#eef2ff",
    border: "#bfcfee",
    description: "Global medical technology leader advancing the world of health with diagnostics, devices, and data solutions.",
    link: "https://www.bd.com",
    hq: "Franklin Lakes, NJ, USA",
  },
  {
    name: "SFRI",
    category: "Haematology",
    logo: "https://hasscientific.com/wp-content/uploads/2020/05/SFRI-logo.png",
    logoBg: "#ffffff",
    accent: "#FF6B35",
    accentLight: "#fff5f1",
    border: "#ffd0bc",
    description: "Specialized haematology diagnostic solutions with a focus on precision, reliability, and innovation.",
    link: "https://www.sfri.fr",
    hq: "Saint-Jean-d'Illac, France",
  },
  {
    name: "Runlab",
    category: "Laboratory Plastic Consumables",
    logo: "https://hasscientific.com/wp-content/uploads/2020/05/runlab-logo.png",
    logoBg: "#ffffff",
    accent: "#6d7c47",
    accentLight: "#f5f7f0",
    border: "#d4debb",
    description: "High-quality laboratory plastic consumables and pipette tips engineered for precision workflows.",
    link: "https://www.runlab.com",
    hq: "Spain",
  },
  {
    name: "HUMASIS",
    category: "Rapid Diagnostic Test Kits",
    logo: "https://hasscientific.com/wp-content/uploads/2020/05/humasis-logo.png",
    logoBg: "#ffffff",
    accent: "#4A90E2",
    accentLight: "#eef4fd",
    border: "#bcd4f4",
    description: "Pioneering rapid diagnostic test kits with differentiated technology for point-of-care testing.",
    link: "https://www.humasis.com",
    hq: "Gyeonggi-do, South Korea",
  },
];

const stats = [
  { icon: <Building2 className="w-6 h-6" />, value: "6+",   label: "Global Partners",   color: brandBlue },
  { icon: <Award className="w-6 h-6" />,     value: "30+",  label: "Years Experience",  color: brandRed  },
  { icon: <Globe className="w-6 h-6" />,     value: "20+",  label: "Countries Served",  color: "#059669" },
  { icon: <Handshake className="w-6 h-6" />, value: "100%", label: "Satisfaction Rate", color: "#7c3aed" },
];

/* ─── PARTNER CARD ──────────────────────────────────────────────────────── */
function PartnerCard({ partner, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={partner.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-3xl overflow-hidden border bg-white transition-all duration-400 cursor-pointer relative"
      style={{
        borderColor: hovered ? partner.accent + '60' : '#e2e8f0',
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered
          ? `0 24px 60px ${partner.accent}18, 0 8px 20px rgba(0,0,0,0.06)`
          : '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'all 0.4s cubic-bezier(.23,1,.32,1)',
      }}
    >
      {/* Top color band */}
      <div
        className="h-1.5 w-full transition-all duration-400"
        style={{
          background: `linear-gradient(90deg, ${partner.accent}, ${partner.accent}88)`,
          transform: hovered ? 'scaleX(1)' : 'scaleX(0.3)',
          transformOrigin: 'left',
          opacity: hovered ? 1 : 0.5,
        }}
      />

      {/* Logo area */}
      <div
        className="flex items-center justify-center px-10 transition-all duration-400 relative overflow-hidden"
        style={{
          height: 160,
          background: hovered ? partner.accentLight : '#f8fafc',
        }}
      >
        {/* Radial glow on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: `radial-gradient(ellipse at center, ${partner.accent}15 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="max-h-16 max-w-[180px] object-contain relative z-10 transition-all duration-400"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback text logo */}
        <div
          className="absolute inset-0 items-center justify-center text-2xl font-black hidden"
          style={{ color: partner.accent, fontFamily: "'Orbitron', sans-serif" }}
        >
          {partner.name.split(' ')[0]}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3">
        {/* Name + HQ */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="text-xl font-black text-slate-800 leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {partner.name}
            </h3>
            <ExternalLink
              className="w-4 h-4 flex-shrink-0 mt-0.5 transition-all duration-300"
              style={{
                color: partner.accent,
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translate(0, 0)' : 'translate(-4px, 4px)',
              }}
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: partner.accent }}>
            {partner.hq}
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {partner.category.split(' · ').map((cat, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-300"
              style={{
                background: hovered ? `${partner.accent}12` : '#f1f5f9',
                color: hovered ? partner.accent : '#64748b',
                border: `1px solid ${hovered ? partner.accent + '30' : 'transparent'}`,
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          {partner.description}
        </p>

        {/* CTA link */}
        <div
          className="flex items-center gap-2 text-sm font-bold mt-1 transition-all duration-300"
          style={{ color: partner.accent, transform: hovered ? 'translateX(4px)' : 'none' }}
        >
          <span>Visit Website</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300" style={{ transform: hovered ? 'translateX(4px)' : 'none' }} />
        </div>
      </div>

      {/* Bottom border sweep on hover */}
      <div
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0%',
          background: `linear-gradient(90deg, ${partner.accent}, transparent)`,
        }}
      />
    </a>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Partners = () => {
  return (
    <PageLayout>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet" />

      <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-white border-b border-slate-100">
          {/* Biomedical image faint background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.04,
            }}
          />
          {/* Diagonal tint */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${brandBlue}05 0%, transparent 60%)` }} />

          {/* Ghost watermark */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden">
            <span className="font-black opacity-[0.025]" style={{ fontSize: 200, fontFamily: "'Orbitron', sans-serif", color: brandBlue, lineHeight: 1 }}>
              ∞
            </span>
          </div>

          <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-semibold" style={{ borderColor: `${brandRed}30`, background: `${brandRed}08`, color: brandRed }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
              Trusted Global Partnerships
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <h1
                  className="font-black leading-none mb-5 text-slate-800"
                  style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  World-Class<br />
                  <span style={{ color: brandBlue }}>Manufacturer</span><br />
                  <span style={{ color: brandRed }}>Partners</span>
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
                  Collaborating with global leaders in diagnostics to deliver cutting-edge biomedical solutions across East & Central Africa.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2" style={{ color: s.color }}>
                      {s.icon}
                    </div>
                    <div className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif" }}>{s.value}</div>
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── PARTNERS GRID ─────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${brandBlue}40, transparent)` }} />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: brandBlue }} />
              {partners.length} Partners · Click to visit
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${brandRed}40, transparent)` }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <PartnerCard key={i} partner={partner} index={i} />
            ))}
          </div>
        </div>

        {/* ── BECOME A PARTNER — dark CTA ───────────────────────────────── */}
        <div className="mx-8 mb-16 rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}>
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: brandRed }} />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#2563eb' }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

          <div className="relative z-10 max-w-2xl mx-auto px-8 py-20 text-center">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: brandRed }}>
              Expand Our Network
            </span>
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Become a Partner
            </h2>
            <p className="text-blue-200 text-lg mb-10 leading-relaxed">
              Join our network of leading biomedical equipment manufacturers and distributors. Together, we're transforming healthcare across Africa.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${brandRed}, #9b1527)`,
                boxShadow: `0 8px 24px ${brandRed}40`,
                fontFamily: "'Rajdhani', sans-serif",
              }}
            >
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </PageLayout>
  );
};

export default Partners;