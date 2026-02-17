import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Clock, Truck, Headphones, Shield, Zap, CheckCircle2, ArrowRight, MapPin, ChevronRight, Phone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/PageLayout';

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const mainServices = [
  {
    icon: Wrench,
    title: "Full Equipment Maintenance",
    tagline: "Zero downtime. Maximum output.",
    description: "24/7 on-site maintenance by fully trained engineers and application specialists. Our preventive care programmes keep diagnostic systems at peak performance, year-round.",
    features: ["Preventive maintenance programmes", "Emergency repair services", "Calibration & validation", "Performance optimisation"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
    accent: "#2563eb",
    stat: "99.2%", statLabel: "avg. uptime rate"
  },
  {
    icon: Shield,
    title: "Guaranteed Uptime",
    tagline: "Contractual peace of mind.",
    description: "Comprehensive service contracts with guaranteed response times for critical diagnostic equipment. We're on call so your lab never has to stop.",
    features: ["24-hour uptime guarantee", "Priority support access", "Spare parts availability", "Extended warranty options"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1400&auto=format&fit=crop",
    accent: "#059669",
    stat: "4hr", statLabel: "max response time"
  },
  {
    icon: Truck,
    title: "Installation & Commissioning",
    tagline: "From delivery to diagnostic-ready.",
    description: "Professional installation, commissioning, and relocation by local field specialists who know Uganda's laboratory landscape — from Kampala to Arua.",
    features: ["Site assessment & preparation", "Equipment installation", "Staff training programmes", "Documentation & certification"],
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1400&auto=format&fit=crop",
    accent: "#7c3aed",
    stat: "6", statLabel: "regions covered"
  },
  {
    icon: Headphones,
    title: "Technical Support",
    tagline: "Expert help, whenever you need it.",
    description: "Round-the-clock technical assistance from experienced application specialists. Remote diagnostics to on-site troubleshooting — we resolve issues fast.",
    features: ["Phone & email support", "Remote diagnostics", "On-site troubleshooting", "Software updates & training"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1400&auto=format&fit=crop",
    accent: "#c41e3a",
    stat: "24/7", statLabel: "support availability"
  }
];

const whyUs = [
  { icon: Clock,  title: "Rapid Response",    desc: "Field engineers dispatched within hours, not days" },
  { icon: Zap,    title: "Quality Results",   desc: "Calibrated equipment ensures diagnostic accuracy" },
  { icon: CheckCircle2, title: "Compliance",  desc: "ISO 15189 & international quality standards met" }
];

const locations = [
  {
    city: "Kampala",
    sites: ["International Hospital Kampala (IHK)", "Nakasero Hospital"],
    machines: ["Sysmex XN-1000", "VITEK® 2 Compact", "VIDAS® 30", "ERBA XL300", "BioFire FilmArray"],
    x: 49, y: 62,
    featured: true,
    image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Mbale",
    sites: ["Mbale Regional Referral Hospital"],
    machines: ["Sysmex XN-550", "BACT/ALERT® 3D", "ERBA XL 200"],
    x: 72, y: 48,
    featured: false,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Mbarara",
    sites: ["Mbarara University Teaching Hospital"],
    machines: ["Sysmex XN-350", "CA-101 Coagulation", "ERBA LYTE"],
    x: 38, y: 78,
    featured: false,
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Lira",
    sites: ["Lira Regional Referral Hospital"],
    machines: ["Sysmex XP-300", "ERBA XL 200", "UC-1000 Urinalysis"],
    x: 55, y: 33,
    featured: false,
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Gulu",
    sites: ["Gulu Regional Referral Hospital"],
    machines: ["Sysmex XN-450", "BACT/ALERT® 3D", "mini VIDAS®"],
    x: 50, y: 22,
    featured: false,
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop"
  },
  {
    city: "Arua",
    sites: ["Arua Regional Referral Hospital"],
    machines: ["Sysmex XP-300", "ERBA XL 200", "CA-101 Coagulation"],
    x: 24, y: 18,
    featured: false,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop"
  }
];

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── COMPONENTS ────────────────────────────────────────────────────────── */

// Big editorial service card (alternating layout)
function ServiceStrip({ service, index, isDarkMode }) {
  const [ref, inView] = useInView(0.1);
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-[520px] overflow-hidden rounded-3xl border transition-shadow duration-500 hover:shadow-2xl ${
        isDarkMode ? 'border-gray-800 bg-gray-900/60' : 'border-gray-100 bg-white/80'
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: `${index * 0.1}s`,
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Image pane */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Colour tint overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${service.accent}cc 0%, ${service.accent}40 100%)` }} />

        {/* Big stat */}
        <div className="absolute bottom-6 left-6">
          <div className="text-white text-5xl font-black leading-none drop-shadow-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>
            {service.stat}
          </div>
          <div className="text-white/80 text-xs uppercase tracking-widest mt-1">{service.statLabel}</div>
        </div>

        {/* Icon circle */}
        <div
          className="absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content pane */}
      <div className="lg:w-1/2 p-10 flex flex-col justify-center gap-6">
        {/* Tag */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: service.accent }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: service.accent }}>
            {service.tagline}
          </span>
        </div>

        <h3 className={`text-3xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Syne', sans-serif" }}>
          {service.title}
        </h3>

        <p className={`text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {service.description}
        </p>

        {/* Feature list with animated bars */}
        <ul className="space-y-3">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 group">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                style={{ background: service.accent }}
              />
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://hasscientific.com/enquiry/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:gap-4 hover:shadow-xl"
          style={{ background: service.accent }}
        >
          Get This Service <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// Location pin for SVG map
function MapPin2({ loc, isActive, onClick }) {
  return (
    <g
      onClick={() => onClick(loc)}
      style={{ cursor: 'pointer' }}
      transform={`translate(${loc.x}%, ${loc.y}%)`}
    >
      <circle r={loc.featured ? 10 : 7} fill={loc.featured ? '#c41e3a' : '#2563eb'} opacity={isActive ? 1 : 0.75}
        style={{ transition: 'all .2s', transform: isActive ? 'scale(1.4)' : 'scale(1)' }} />
      <circle r={loc.featured ? 4 : 3} fill="white" />
      {isActive && (
        <circle r={loc.featured ? 16 : 12} fill="none" stroke={loc.featured ? '#c41e3a' : '#2563eb'} strokeWidth={2} opacity={0.5}>
          <animate attributeName="r" values={`${loc.featured ? 10 : 7};${loc.featured ? 22 : 18};${loc.featured ? 10 : 7}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Services = () => {
  const { isDarkMode } = useTheme();
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [heroRef, heroInView] = useInView(0.1);

  const bg = isDarkMode ? 'bg-gray-950' : 'bg-slate-50';
  const cardBg = isDarkMode ? 'bg-gray-900/70 border-gray-800' : 'bg-white/80 border-gray-200';

  return (
    <PageLayout>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes grain {
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-2%,-2%)}
          30%{transform:translate(2%,2%)}
          50%{transform:translate(-1%,1%)}
          70%{transform:translate(1%,-1%)}
          90%{transform:translate(-2%,1%)}
        }
      `}</style>

      <div className={`${bg} transition-colors duration-300`} style={{ fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Full-bleed background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
              alt="Lab background"
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isDarkMode
              ? 'bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/40'
              : 'bg-gradient-to-r from-slate-900/92 via-slate-900/70 to-slate-800/30'
            }`} />
            {/* Grain texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              animation: 'grain 8s steps(10) infinite'
            }} />
          </div>

          <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
            <div style={{ animation: heroInView ? 'fadeUp .8s ease forwards' : 'none', opacity: heroInView ? 1 : 0 }}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-red-500" />
                <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Hass Scientific · Uganda</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
                SERVICE &<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>SUPPORT</span><br />
                <span className="text-red-500">SOLUTIONS</span>
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
                Keeping Uganda's diagnostic laboratories running at peak performance — from Kampala to Arua. Expert engineers. Guaranteed uptime. Real support.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="tel:+256414250655"
                  className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-600/40">
                  <Phone className="w-4 h-4" />
                  Call Support
                </a>
                <a href="mailto:cservice@hasscientific.com"
                  className="flex items-center gap-2 px-6 py-3.5 border border-white/30 hover:border-white/60 text-white rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white/10">
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>

            {/* Stats block */}
            <div className="grid grid-cols-2 gap-4" style={{ animation: heroInView ? 'fadeUp .8s .2s ease both' : 'none' }}>
              {[
                { n: "99.2%", label: "Equipment Uptime", sub: "across all sites" },
                { n: "4 hrs", label: "Max Response", sub: "guaranteed SLA" },
                { n: "6", label: "Regions", sub: "Uganda-wide coverage" },
                { n: "24/7", label: "Support", sub: "phone, remote & on-site" }
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/10 backdrop-blur-md"
                  style={{ background: 'rgba(255,255,255,0.06)', animation: `fadeUp .8s ${.15 * i + .3}s ease both` }}>
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</div>
                  <div className="text-white/90 font-semibold text-sm">{s.label}</div>
                  <div className="text-white/50 text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES STRIPS ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
          <div className="text-center mb-14">
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>What We Offer</p>
            <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Syne', sans-serif" }}>
              Comprehensive Support
            </h2>
          </div>
          {mainServices.map((svc, i) => (
            <ServiceStrip key={i} service={svc} index={i} isDarkMode={isDarkMode} />
          ))}
        </section>

        {/* ── WHY US — diagonal stripe ─────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          {/* Angled background */}
          <div className="absolute inset-0"
            style={{ background: isDarkMode ? 'linear-gradient(160deg, #1e3a5f 0%, #0f172a 100%)' : 'linear-gradient(160deg, #1e40af 0%, #1e3a8a 100%)' }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                Why Choose Hass?
              </h2>
              <p className="text-blue-200 text-lg">Trusted by Uganda's leading health institutions</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {whyUs.map((w, i) => {
                const Icon = w.icon;
                return (
                  <div key={i} className="group p-8 rounded-2xl border border-white/15 backdrop-blur-sm hover:border-white/40 transition-all duration-300 hover:-translate-y-2"
                    style={{ background: 'rgba(255,255,255,0.07)', animationDelay: `${i * .1}s` }}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{w.title}</h4>
                    <p className="text-blue-200 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Trusted clients strip */}
            <div className="border-t border-white/10 pt-10 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Our clients across Uganda</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["IHK Kampala", "Nakasero Hospital", "Mbale RRH", "Mbarara UUTH", "Lira RRH", "Gulu RRH", "Arua RRH"].map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-xs font-medium backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="mb-12">
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Installation Bases</p>
            <h2 className={`text-4xl md:text-5xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Syne', sans-serif" }}>
              Uganda Coverage<br />
              <span className="text-red-600">Network</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Map — schematic SVG */}
            <div className={`lg:col-span-3 relative rounded-3xl overflow-hidden border ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-100'}`}
              style={{ minHeight: 480 }}>
              {/* Map bg image */}
              <img
                src="./uganda.png"
                alt="Uganda map background"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900/70' : 'bg-slate-100/70'}`} />

              {/* SVG overlay for pins */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full"
                style={{ cursor: 'default' }}
                preserveAspectRatio="none"
              >
                {/* Soft grid lines */}
                {[20,40,60,80].map(v => (
                  <React.Fragment key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke={isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} strokeWidth="0.3" />
                    <line x1="0" y1={v} x2="100" y2={v} stroke={isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} strokeWidth="0.3" />
                  </React.Fragment>
                ))}
                {/* Connection lines from Kampala */}
                {locations.filter(l => l.city !== 'Kampala').map((loc) => {
                  const kampala = locations[0];
                  return (
                    <line key={loc.city}
                      x1={`${kampala.x}%`} y1={`${kampala.y}%`}
                      x2={`${loc.x}%`} y2={`${loc.y}%`}
                      stroke="rgba(196,30,58,0.25)" strokeWidth="0.6" strokeDasharray="2,2" />
                  );
                })}
                {/* Pins (rendered in HTML below for click handling) */}
              </svg>

              {/* HTML pins overlaid */}
              <div className="absolute inset-0">
                {locations.map((loc) => (
                  <button
                    key={loc.city}
                    onClick={() => setActiveLocation(loc)}
                    style={{ position: 'absolute', left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}
                    className="group focus:outline-none"
                    title={loc.city}
                  >
                    {/* Pulse */}
                    {activeLocation.city === loc.city && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-60"
                        style={{ background: loc.featured ? '#c41e3a' : '#2563eb', scale: '2' }} />
                    )}
                    <div
                      className={`relative flex items-center justify-center rounded-full border-2 border-white transition-all duration-300 ${
                        activeLocation.city === loc.city ? 'scale-125 shadow-xl' : 'group-hover:scale-110'
                      }`}
                      style={{
                        width: loc.featured ? 24 : 18,
                        height: loc.featured ? 24 : 18,
                        background: loc.featured ? '#c41e3a' : '#2563eb',
                        boxShadow: activeLocation.city === loc.city ? `0 0 20px ${loc.featured ? '#c41e3a' : '#2563eb'}80` : undefined
                      }}
                    >
                      <span className="bg-white rounded-full" style={{ width: loc.featured ? 8 : 6, height: loc.featured ? 8 : 6 }} />
                    </div>
                    {/* City label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-xs font-bold px-2 py-0.5 rounded-md transition-all duration-200 ${
                        activeLocation.city === loc.city ? 'opacity-100 top-full' : 'opacity-0 group-hover:opacity-100 top-full'
                      } ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-md border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ fontSize: 10, fontFamily: "'DM Sans', sans-serif" }}
                    >{loc.city}</span>
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className={`absolute bottom-4 left-4 flex flex-col gap-2 px-4 py-3 rounded-xl border text-xs ${isDarkMode ? 'bg-gray-900/90 border-gray-700 text-gray-300' : 'bg-white/90 border-gray-200 text-gray-600'}`}>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0" /> Flagship base</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0" /> Regional base</div>
              </div>

              {/* Uganda label */}
              <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Uganda
              </div>
            </div>

            {/* Location detail panel */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Location cards list */}
              {locations.map((loc) => {
                const isActive = activeLocation.city === loc.city;
                return (
                  <button
                    key={loc.city}
                    onClick={() => setActiveLocation(loc)}
                    className={`group w-full text-left rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isActive
                        ? isDarkMode ? 'border-red-800 bg-gray-800' : 'border-red-200 bg-red-50 shadow-lg'
                        : isDarkMode ? 'border-gray-800 bg-gray-900/60 hover:border-gray-700' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-stretch">
                      {/* Colour accent bar */}
                      <div className="w-1 flex-shrink-0 rounded-l-2xl"
                        style={{ background: isActive ? (loc.featured ? '#c41e3a' : '#2563eb') : 'transparent' }} />

                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: loc.featured ? '#c41e3a' : '#2563eb' }} />
                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{loc.city}</span>
                            {loc.featured && <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full font-bold">HQ</span>}
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''} ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>

                        {/* Sites */}
                        <div className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {loc.sites.join(' · ')}
                        </div>

                        {/* Machines — only on active */}
                        {isActive && (
                          <div className="mt-3 pt-3 border-t" style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              Installed Equipment
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {loc.machines.map((m) => (
                                <span key={m}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                    isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
                                  }`}>
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="relative py-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop"
            alt="Lab"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/85" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-4">Ready to get started?</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
              Let's Keep Your Lab Running
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              Reach out to our service team for a custom maintenance contract, installation quote, or immediate technical assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+256414250655"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/40"
              >
                <Phone className="w-4 h-4" />
                +256 (0)414 250 655
              </a>
              {/* <a
                href="/service-guide.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-xl font-bold transition-all duration-300 hover:bg-white/10"
              >
                Download Service Guide
              </a> */}
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Services;