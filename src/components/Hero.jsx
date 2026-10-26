import React, { useState, useEffect } from 'react';
import {
  ChevronRight, Microscope, Activity, Timer, ArrowDown,
  FileText, Dna, TrendingUp, CheckCircle, TestTube, FlaskConical,
  HeartPulse, Users
} from 'lucide-react';

const brandRed  = '#c41e3a';
const brandBlue = '#1a3a6b';

/* ─── FLOATING STAT CARD ─────────────────────────────────────────────────── */
function StatCard({ value, label, position, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="absolute bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/80 px-6 py-5 min-w-[140px]"
      style={{
        ...position,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.96)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        zIndex: 20,
      }}
    >
      <div
        className="text-4xl font-black leading-none mb-1"
        style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}
      >
        {value}
      </div>
      <div className="text-sm text-slate-500 font-semibold">{label}</div>
    </div>
  );
}

/* ─── FEATURE PILL ───────────────────────────────────────────────────────── */
/* Color is handled via inline style + local hover state, matching the rest
   of this file's approach — guarantees the text is always visible instead of
   depending on a Tailwind color utility resolving correctly. */
function FeaturePill({ icon, title, link, accent }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white transition-all duration-200"
      style={{
        border: `1px solid ${hover ? '#94a3b8' : '#e2e8f0'}`,
        color: hover ? '#1e293b' : '#475569',
        fontSize: '0.875rem',
        fontWeight: 600,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? '0 8px 16px rgba(15,23,42,0.08)' : 'none',
      }}
    >
      <span style={{ color: accent }}>{icon}</span>
      {title}
    </a>
  );
}

/* ─── HERO IMAGE (shared glow-ring wrapper) ──────────────────────────────── */
function GlowImage({ className = '', style = {}, imgStyle = {}, children }) {
  return (
    <div className={`relative ${className}`} style={style}>
      {/* pulsing glow ring behind the image */}
      <div
        className="absolute -inset-1.5 rounded-[32px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${brandBlue}, ${brandRed})`,
          opacity: 0.4,
          filter: 'blur(14px)',
          animation: 'heroGlowPulse 3.2s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <div
        className="relative overflow-hidden rounded-[28px]"
        style={{ zIndex: 1, boxShadow: '0 32px 80px rgba(26,58,107,0.18), 0 8px 24px rgba(0,0,0,0.08)', ...imgStyle }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [activeWord, setActiveWord]       = useState(0);
  const [heroVisible, setHeroVisible]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const words = ['in East ', 'in Central' ];
    const interval = setInterval(() => setActiveWord(p => (p + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, []);

  const dynamicWords = ['in East ', 'in Central' ];

  /* Bottom stat strip */
  const stripStats = [
    { icon: <TrendingUp className="w-5 h-5" />,  value: "30+",   label: "Years Leading"  },
    { icon: <FlaskConical className="w-5 h-5" />, value: "500+",  label: "Labs Equipped"  },
    { icon: <HeartPulse className="w-5 h-5" />,   value: "200+",  label: "Hospitals"      },
    { icon: <Users className="w-5 h-5" />,         value: "1000+", label: "Happy Clients"  },
  ];

  /* Quick-link feature pills */
  const features = [
    { icon: <TestTube className="w-4 h-4" />,   title: "Clinical Chemistry", link: "/products/chemistry"   },
    { icon: <Microscope className="w-4 h-4" />, title: "Microbiology",       link: "/products/microbiology" },
    { icon: <Dna className="w-4 h-4" />,        title: "Immunology",         link: "/products/immuno-assay" },
    { icon: <Activity className="w-4 h-4" />,   title: "Haematology",        link: "/products/haematology"  },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#f5f5f7', fontFamily: "'Rajdhani', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Subtle mouse-reactive grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${mousePosition.x * 20}deg, ${brandBlue} 1px, transparent 1px),
                            linear-gradient(${90 + mousePosition.y * 20}deg, ${brandBlue} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
          zIndex: 0,
        }}
      />

      {/* ── MAIN LAYOUT ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 min-h-screen flex flex-col justify-center py-14 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div
            className="space-y-7 sm:space-y-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(-32px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
              style={{ borderColor: `${brandRed}35`, background: `${brandRed}08`, color: brandRed }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
              Leading East & Central Africa Since 1993
            </div>

            {/* Heading — OneForma style: large, one color accent word per line */}
            <div>
              <h1
                className="font-black leading-[1.05] mb-5"
                style={{ fontFamily: "'Orbitron', sans-serif", color: '#0f172a', fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
              >
                Your Leading Diagnostics Partner
                <br />
                <span style={{ color: brandRed }}>{dynamicWords[activeWord]}</span>{' '}
                <span style={{ color: brandBlue, fontSize: '90%' }}>Africa.</span>
              </h1>

              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                World-class laboratory equipment, reagents, and technical support — transforming diagnostic healthcare across East & Central Africa.
              </p>
            </div>

            {/* ── MOBILE / TABLET HERO IMAGE ──────────────────────────────
                Visible below lg. No absolutely-positioned floating cards
                here (those overflow on narrow screens) — instead two compact
                badges sit safely inside the image's own bounds. */}
            <div
              className="lg:hidden"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s',
              }}
            >
              <GlowImage
                className="mx-auto"
                style={{ maxWidth: 440 }}
                imgStyle={{ aspectRatio: '4 / 3' }}
              >
                <img
                  src="./hass-fam.jpeg"
                  alt="Hass Scientific laboratory"
                  className="w-full h-full object-cover"
                />
                {/* contrast overlay so badge text stays readable over any photo */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.55) 0%, transparent 48%)' }}
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}
                  >
                    <Microscope className="w-3.5 h-3.5" />
                    ISO Certified
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-xl bg-white/95 text-xs font-bold shadow-lg"
                    style={{ color: brandBlue }}
                  >
                    30+ yrs experience
                  </div>
                </div>
              </GlowImage>
            </div>

            {/* Feature pills — subtle navigation */}
            <div className="flex flex-wrap gap-2">
              {features.map((f, i) => (
                <FeaturePill
                  key={i}
                  icon={f.icon}
                  title={f.title}
                  link={f.link}
                  accent={i % 2 === 0 ? brandRed : brandBlue}
                />
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.href = '/services'}
                className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${brandBlue}, #0f2549)`,
                  boxShadow: `0 8px 28px rgba(26,58,107,0.25)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${brandRed}, #9b1527)` }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  Explore Solutions
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => window.location.href = '/contact'}
                className="group px-8 py-4 rounded-xl font-bold bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                style={{ border: `2px solid ${brandBlue}`, color: brandBlue }}
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Request Quote
              </button>
            </div>

            {/* Stat strip — mirrors the testimonial card position in OneForma */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
              {stripStats.map((s, i) => (
                <div key={i} className="group cursor-default">
                  <div
                    className="text-2xl font-black leading-none mb-0.5"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: i % 2 === 0 ? brandRed : brandBlue }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — image + floating stat cards (lg and up) ──── */}
          <div
            className="relative hidden lg:flex items-center justify-center"
            style={{
              height: 580,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateX(0)' : 'translateX(32px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}
          >
            {/* Organic decorative blob — the pink shape from OneForma, now brand-tinted */}
            <div
              className="absolute"
              style={{
                width: 480,
                height: 480,
                top: '50%',
                left: '50%',
                transform: 'translate(-48%, -50%)',
                borderRadius: '60% 40% 55% 45% / 45% 55% 45% 55%',
                background: `linear-gradient(135deg, ${brandBlue}12, ${brandRed}0a)`,
                border: `1.5px solid ${brandBlue}15`,
                zIndex: 0,
              }}
            />
            {/* Second offset blob */}
            <div
              className="absolute"
              style={{
                width: 340,
                height: 340,
                bottom: 10,
                right: 0,
                borderRadius: '45% 55% 40% 60% / 55% 45% 55% 45%',
                background: `linear-gradient(225deg, ${brandRed}10, transparent)`,
                zIndex: 0,
              }}
            />

            {/* Main image — fills the centre like the person photo, now with glow ring */}
            <GlowImage style={{ width: 370, height: 430, zIndex: 10 }} imgStyle={{ width: '100%', height: '100%' }}>
              <img
                src="./hass-hero.jpg"
                alt="Hass Scientific laboratory"
                className="w-full h-full object-cover"
                style={{ transform: `scale(1.04) translate(${(mousePosition.x - 0.5) * -6}px, ${(mousePosition.y - 0.5) * -6}px)`, transition: 'transform 0.4s ease' }}
              />
              {/* Subtle gradient foot so the image blends into the page */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: 'linear-gradient(to top, rgba(245,245,247,0.5), transparent)' }}
              />
            </GlowImage>

            {/* ── FLOATING STAT CARDS — matching OneForma 100+, 40+, 830+ ── */}

            {/* Top-right: Years */}
            <StatCard
              value="30+"
              label="Years experience"
              position={{ top: 20, right: -10 }}
              delay={500}
            />

            {/* Mid-right: Labs */}
            <StatCard
              value="500+"
              label="Labs equipped"
              position={{ top: '42%', right: -30 }}
              delay={700}
            />

            {/* Bottom-left: Hospitals */}
            <StatCard
              value="200+"
              label="Hospitals served"
              position={{ bottom: 30, left: -20 }}
              delay={900}
            />

            {/* Floating product category tag — small accent chip */}
            <div
              className="absolute"
              style={{ top: 18, left: 12, zIndex: 20 }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-white text-xs font-bold shadow-lg"
                style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}
              >
                <Microscope className="w-4 h-4" />
                ISO Certified
              </div>
            </div>

            {/* Mouse-reactive soft orb behind image */}
            <div
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: 300,
                height: 300,
                top: '20%',
                left: '20%',
                background: `radial-gradient(circle, ${brandBlue}12, transparent 70%)`,
                transform: `translate(${(mousePosition.x - 0.5) * 30}px, ${(mousePosition.y - 0.5) * 30}px)`,
                transition: 'transform 0.4s ease',
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce flex flex-col items-center gap-1">
        <span className="text-sm text-slate-400" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Scroll to explore</span>
        <ArrowDown className="w-5 h-5" style={{ color: brandBlue }} />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroGlowPulse {
          0%, 100% { opacity: 0.28; filter: blur(14px); }
          50%      { opacity: 0.55; filter: blur(20px); }
        }
      `}</style>
    </div>
  );
};

export default Hero;