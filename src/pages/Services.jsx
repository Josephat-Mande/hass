import React, { useState, useEffect, useRef } from 'react';
import { Wrench, Clock, Truck, Headphones, Shield, Zap, CheckCircle2, ArrowRight, MapPin, ChevronRight, Phone, Mail } from 'lucide-react';
import PageLayout from '../components/PageLayout';

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const brandBlue = '#1a3a6b';
const brandRed = '#c41e3a';

const mainServices = [
  {
    icon: Wrench,
    title: "Full Equipment Maintenance",
    tagline: "Zero downtime. Maximum output.",
    description: "24/7 on-site maintenance by fully trained engineers and application specialists. Our preventive care programmes keep diagnostic systems at peak performance, year-round.",
    features: ["Preventive maintenance programmes", "Emergency repair services", "Calibration & validation", "Performance optimisation"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
    accent: brandBlue,
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
    accent: brandRed,
    stat: "24/7", statLabel: "support availability"
  }
];

const whyUs = [
  { icon: Clock,        title: "Rapid Response",  desc: "Field engineers dispatched within hours, not days" },
  { icon: Zap,          title: "Quality Results", desc: "Calibrated equipment ensures diagnostic accuracy" },
  { icon: CheckCircle2, title: "Compliance",      desc: "ISO 15189 & international quality standards met" }
];

const locations = [
  { city: "Kampala", sites: ["International Hospital Kampala (IHK)", "Nakasero Hospital"], machines: ["Sysmex XN-1000", "VITEK® 2 Compact", "VIDAS® 30", "ERBA XL300", "BioFire FilmArray"], x: 49, y: 62, featured: true },
  { city: "Mbale",   sites: ["Mbale Regional Referral Hospital"],        machines: ["Sysmex XN-550", "BACT/ALERT® 3D", "ERBA XL 200"],            x: 72, y: 48, featured: false },
  { city: "Mbarara", sites: ["Mbarara University Teaching Hospital"],     machines: ["Sysmex XN-350", "CA-101 Coagulation", "ERBA LYTE"],          x: 38, y: 78, featured: false },
  { city: "Lira",    sites: ["Lira Regional Referral Hospital"],          machines: ["Sysmex XP-300", "ERBA XL 200", "UC-1000 Urinalysis"],        x: 55, y: 33, featured: false },
  { city: "Gulu",    sites: ["Gulu Regional Referral Hospital"],          machines: ["Sysmex XN-450", "BACT/ALERT® 3D", "mini VIDAS®"],           x: 50, y: 22, featured: false },
  { city: "Arua",    sites: ["Arua Regional Referral Hospital"],          machines: ["Sysmex XP-300", "ERBA XL 200", "CA-101 Coagulation"],        x: 24, y: 18, featured: false }
];

/* ─── HOOK ──────────────────────────────────────────────────────────────── */
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

/* ─── SERVICE STRIP ─────────────────────────────────────────────────────── */
function ServiceStrip({ service, index }) {
  const [ref, inView] = useInView(0.08);
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="relative flex flex-col lg:flex-row min-h-[480px] overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-xl hover:border-slate-300"
      style={{
        flexDirection: isEven ? undefined : 'row-reverse',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease',
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Image pane */}
      <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Subtle tint — lighter on the page */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${service.accent}bb 0%, ${service.accent}33 100%)` }} />

        {/* Big stat */}
        <div className="absolute bottom-6 left-6">
          <div className="text-white text-5xl font-black leading-none drop-shadow-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {service.stat}
          </div>
          <div className="text-white/80 text-xs uppercase tracking-widest mt-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            {service.statLabel}
          </div>
        </div>

        {/* Icon circle */}
        <div
          className="absolute top-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Content pane */}
      <div className="lg:w-1/2 p-10 flex flex-col justify-center gap-5">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="h-px w-8" style={{ background: service.accent }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: service.accent, fontFamily: "'Rajdhani', sans-serif" }}>
            {service.tagline}
          </span>
        </div>

        <h3 className="text-3xl font-black leading-tight text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          {service.title}
        </h3>

        <p className="text-base leading-relaxed text-slate-500" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          {service.description}
        </p>

        {/* Feature list */}
        <ul className="space-y-3">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 group">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                style={{ background: service.accent }}
              />
              <span className="text-sm text-slate-600" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href="https://hasscientific.com/enquiry/"
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:gap-4 hover:scale-105 hover:shadow-lg"
          style={{ background: service.accent, fontFamily: "'Rajdhani', sans-serif" }}
        >
          Get This Service <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Services = () => {
  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [heroRef, heroInView] = useInView(0.1);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  return (
    <PageLayout>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight{ from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ping-slow { 0%{transform:scale(1);opacity:.8} 70%{transform:scale(2.2);opacity:0} 100%{transform:scale(1);opacity:0} }
      `}</style>

      <div className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Rajdhani', sans-serif" }}>

        {/* ── HERO — light with biomedical image ───────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: '75vh' }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
              alt="Lab background"
              className="w-full h-full object-cover"
              style={{ transform: 'scale(1.05)' }}
            />
            {/* Light wash — matches Hero & About */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.93) 0%, rgba(240,245,255,0.88) 45%, rgba(255,248,248,0.82) 100%)' }} />
          </div>

          {/* Mouse-reactive color orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full blur-3xl" style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: `rgba(26,58,107,0.08)`, transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }} />
            <div className="absolute rounded-full blur-3xl" style={{ width: 400, height: 400, bottom: '0%', right: '-5%', background: `rgba(196,30,58,0.07)`, transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)` }} />
          </div>

          <div
            ref={heroRef}
            className="relative z-10 max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center"
            style={{ minHeight: '75vh' }}
          >
            {/* Left copy */}
            <div style={{ animation: heroInView ? 'slideRight .8s ease forwards' : 'none', opacity: heroInView ? 1 : 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-semibold" style={{ borderColor: `${brandRed}30`, background: `${brandRed}08`, color: brandRed }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
                Hass Scientific · Service & Support
              </div>

              <h1 className="font-black leading-none mb-6 text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}>
                SERVICE &<br />
                <span style={{ color: brandBlue }}>SUPPORT</span><br />
                <span style={{ color: brandRed }}>SOLUTIONS</span>
              </h1>

              <p className="text-slate-500 text-lg leading-relaxed max-w-lg mb-10">
                Keeping Uganda's diagnostic laboratories running at peak performance — from Kampala to Arua. Expert engineers. Guaranteed uptime. Real support.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="tel:+256414250655"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${brandRed}, #9b1527)`, boxShadow: `0 8px 24px ${brandRed}30` }}>
                  <Phone className="w-4 h-4" />
                  Call Support
                </a>
                <a href="mailto:cservice@hasscientific.com"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-blue-800 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-2 gap-4" style={{ animation: heroInView ? 'fadeUp .8s .2s ease both' : 'none' }}>
              {[
                { n: "99.2%", label: "Equipment Uptime", sub: "across all sites", color: brandBlue },
                { n: "4 hrs", label: "Max Response",      sub: "guaranteed SLA",  color: brandRed },
                { n: "6",     label: "Regions",           sub: "Uganda-wide",     color: "#059669" },
                { n: "24/7",  label: "Support",           sub: "phone, remote & on-site", color: "#7c3aed" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${.1 * i + .3}s` }}
                >
                  <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Orbitron', sans-serif", color: s.color }}>{s.n}</div>
                  <div className="font-bold text-sm text-slate-700">{s.label}</div>
                  <div className="text-xs mt-0.5 text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICE STRIPS ────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-8 py-24 space-y-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: brandRed }}>What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Comprehensive Support
            </h2>
          </div>
          {mainServices.map((svc, i) => (
            <ServiceStrip key={i} service={svc} index={i} />
          ))}
        </section>

        {/* ── WHY US — dark navy strip (matches About location strip) ──── */}
        <section className="relative py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}>
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
          {/* Glow blob */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: brandRed }} />

          <div className="relative z-10 max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: brandRed }}>Our Advantage</span>
              <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Why Choose Hass?
              </h2>
              <p className="text-blue-200 text-lg mt-3">Trusted by Uganda's leading health institutions</p>
            </div>

            {/* Value props */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {whyUs.map((w, i) => {
                const Icon = w.icon;
                return (
                  <div
                    key={i}
                    className="group p-8 rounded-3xl border border-white/10 hover:border-white/30 hover:-translate-y-2 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: 'rgba(255,255,255,0.12)' }}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{w.title}</h4>
                    <p className="text-blue-200 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Client strip */}
            <div className="border-t border-white/10 pt-10 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Our clients across Uganda</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["IHK Kampala", "Nakasero Hospital", "Mbale RRH", "Mbarara UUTH", "Lira RRH", "Gulu RRH", "Arua RRH"].map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs font-medium"
                    style={{ background: 'rgba(255,255,255,0.06)' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOCATIONS ─────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-8 py-24">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: brandRed }}>Installation Bases</span>
            <h2 className="font-black text-slate-800" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
              Uganda Coverage<br />
              <span style={{ color: brandRed }}>Network</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 items-start">
            {/* Map panel */}
            <div className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100" style={{ minHeight: 500 }}>
              <img
                src="./uganda.png"
                alt="Uganda map"
                className="absolute inset-0 w-full h-full object-cover opacity-15"
              />
              {/* Light overlay */}
              <div className="absolute inset-0 bg-slate-50/75" />

              {/* Grid lines */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {[20,40,60,80].map(v => (
                  <React.Fragment key={v}>
                    <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
                    <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(0,0,0,0.04)" strokeWidth="0.3" />
                  </React.Fragment>
                ))}
                {/* Connection lines from Kampala */}
                {locations.filter(l => l.city !== 'Kampala').map((loc) => (
                  <line key={loc.city}
                    x1={`${locations[0].x}%`} y1={`${locations[0].y}%`}
                    x2={`${loc.x}%`} y2={`${loc.y}%`}
                    stroke={`${brandRed}25`} strokeWidth="0.7" strokeDasharray="2,2" />
                ))}
              </svg>

              {/* HTML pins */}
              <div className="absolute inset-0">
                {locations.map((loc) => {
                  const isActive = activeLocation.city === loc.city;
                  return (
                    <button
                      key={loc.city}
                      onClick={() => setActiveLocation(loc)}
                      title={loc.city}
                      style={{ position: 'absolute', left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}
                      className="group focus:outline-none"
                    >
                      {/* Pulse ring */}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full opacity-60"
                          style={{
                            background: loc.featured ? brandRed : brandBlue,
                            animation: 'ping-slow 1.8s ease-out infinite',
                            transform: 'scale(2.2)'
                          }}
                        />
                      )}
                      <div
                        className="relative flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-300"
                        style={{
                          width:  loc.featured ? 26 : 20,
                          height: loc.featured ? 26 : 20,
                          background: loc.featured ? brandRed : brandBlue,
                          transform: isActive ? 'scale(1.3)' : 'scale(1)',
                          boxShadow: isActive ? `0 0 18px ${loc.featured ? brandRed : brandBlue}70` : '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                      >
                        <span className="bg-white rounded-full" style={{ width: loc.featured ? 9 : 7, height: loc.featured ? 9 : 7 }} />
                      </div>
                      {/* City label */}
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap text-xs font-bold px-2 py-0.5 rounded-lg bg-white text-slate-700 shadow-sm border border-slate-200 transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        style={{ fontSize: 10 }}
                      >{loc.city}</span>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="absolute bottom-5 left-5 flex flex-col gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-xs text-slate-600 shadow-sm">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: brandRed }} /> Flagship base</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: brandBlue }} /> Regional base</div>
              </div>

              {/* Uganda label */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest bg-white text-slate-400 border border-slate-200 shadow-sm">
                Uganda
              </div>
            </div>

            {/* Location cards */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {locations.map((loc) => {
                const isActive = activeLocation.city === loc.city;
                return (
                  <button
                    key={loc.city}
                    onClick={() => setActiveLocation(loc)}
                    className="w-full text-left rounded-2xl border overflow-hidden transition-all duration-300 bg-white"
                    style={{
                      borderColor: isActive ? (loc.featured ? `${brandRed}50` : `${brandBlue}50`) : '#e2e8f0',
                      boxShadow: isActive ? `0 4px 20px ${loc.featured ? brandRed : brandBlue}12` : '0 1px 4px rgba(0,0,0,0.04)',
                      transform: isActive ? 'translateX(4px)' : 'none',
                    }}
                  >
                    <div className="flex items-stretch">
                      {/* Colour bar */}
                      <div className="w-1 flex-shrink-0 rounded-l-2xl transition-all duration-300"
                        style={{ background: isActive ? (loc.featured ? brandRed : brandBlue) : 'transparent' }} />

                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: loc.featured ? brandRed : brandBlue }} />
                            <span className="font-bold text-slate-800">{loc.city}</span>
                            {loc.featured && (
                              <span className="px-2 py-0.5 text-white text-xs rounded-full font-bold" style={{ background: brandRed }}>HQ</span>
                            )}
                          </div>
                          <ChevronRight className={`w-4 h-4 transition-transform text-slate-400 ${isActive ? 'rotate-90' : ''}`} />
                        </div>

                        <div className="text-xs text-slate-400 mb-1">{loc.sites.join(' · ')}</div>

                        {isActive && (
                          <div className="mt-3 pt-3 border-t border-slate-100">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-slate-400">Installed Equipment</p>
                            <div className="flex flex-wrap gap-1.5">
                              {loc.machines.map((m) => (
                                <span key={m} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600">{m}</span>
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

        {/* ── FINAL CTA — dark with image (same pattern as About) ───────── */}
        <section className="relative overflow-hidden mx-8 mb-16 rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop"
            alt="Lab"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 opacity-10" style={{ background: brandBlue }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${brandBlue}f0, #0f2549f0)` }} />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: brandRed }} />

          <div className="relative z-10 max-w-3xl mx-auto px-8 py-20 text-center">
            <span className="text-xs font-bold uppercase tracking-widest mb-4 block" style={{ color: brandRed }}>Ready to get started?</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Let's Keep Your<br />Lab Running
            </h2>
            <p className="text-blue-200 text-lg mb-10 leading-relaxed">
              Reach out for a custom maintenance contract, installation quote, or immediate technical assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+256414250655"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ background: `linear-gradient(135deg, ${brandRed}, #9b1527)`, boxShadow: `0 8px 24px ${brandRed}40` }}
              >
                <Phone className="w-4 h-4" />
                +256 (0)414 250 655
              </a>
              <a
                href="mailto:cservice@hasscientific.com"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Email Our Team
              </a>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Services;