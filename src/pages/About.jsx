import React, { useState, useEffect, useRef } from 'react';
import { Building2, MapPin, Award, TrendingUp, CheckCircle, Users, Globe, Target, Lightbulb, ArrowRight, Zap, FlaskConical, Microscope, HeartPulse } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counterValues, setCounterValues] = useState({ years: 0, labs: 0, hospitals: 0, clients: 0 });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  const brandRed = '#c41e3a';
  const brandBlue = '#1a3a6b';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    const handleMouse = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('mousemove', handleMouse); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const targets = { years: 30, labs: 500, hospitals: 200, clients: 1000 };
    const steps = 60;
    let current = { years: 0, labs: 0, hospitals: 0, clients: 0 };
    const timer = setInterval(() => {
      current = {
        years: Math.min(current.years + targets.years / steps, targets.years),
        labs: Math.min(current.labs + targets.labs / steps, targets.labs),
        hospitals: Math.min(current.hospitals + targets.hospitals / steps, targets.hospitals),
        clients: Math.min(current.clients + targets.clients / steps, targets.clients),
      };
      setCounterValues({ years: Math.floor(current.years), labs: Math.floor(current.labs), hospitals: Math.floor(current.hospitals), clients: Math.floor(current.clients) });
      if (current.years >= targets.years) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isVisible]);

  const services = [
    "Medical Equipment Procurement & Supply",
    "Clinical Chemistry Analyzers",
    "Microbiology Detection Systems",
    "Immunology Testing Equipment",
    "Laboratory Reagents & Consumables",
    "Full Equipment Maintenance & Support",
  ];

  const values = [
    { icon: <Target className="w-7 h-7" />, title: "Quality First", description: "We never compromise on equipment quality or service excellence" },
    { icon: <Lightbulb className="w-7 h-7" />, title: "Innovation", description: "Bringing the latest diagnostic technology to African healthcare" },
    { icon: <Users className="w-7 h-7" />, title: "Partnership", description: "Building lasting relationships with healthcare providers" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-gray-200">
        <div className="h-full transition-all duration-200" style={{ width: `${scrollProgress}%`, background: `linear-gradient(90deg, ${brandRed}, ${brandBlue})` }} />
      </div>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute rounded-full blur-3xl opacity-10" style={{ width: 600, height: 600, top: '-10%', left: '-5%', background: brandBlue, transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }} />
        <div className="absolute rounded-full blur-3xl opacity-10" style={{ width: 500, height: 500, bottom: '5%', right: '-5%', background: brandRed, transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)` }} />
      </div>

      <section ref={sectionRef} className="relative" style={{ zIndex: 1 }}>

        {/* ── HERO HEADER — full-width diagonal split ── */}
        <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
          {/* Image panel — right side */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=2000&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 30% 100%)',
              opacity: 0.18,
            }}
          />
          {/* Diagonal color block */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #f8fafc 55%, rgba(26,58,107,0.07) 100%)` }} />

          {/* Decorative vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px opacity-10" style={{ background: `linear-gradient(180deg, transparent, ${brandBlue}, transparent)` }} />

          <div className="max-w-7xl mx-auto px-8 py-24 relative">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border text-sm font-semibold" style={{ borderColor: `${brandRed}30`, background: `${brandRed}08`, color: brandRed }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
                About Hass Scientific
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-end">
                <div>
                  <h1 className="font-black leading-none mb-6" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: brandBlue }}>
                    Your Leading
                    <br />
                    <span style={{ color: brandRed }}>Diagnostics</span>
                    <br />
                    Partner
                  </h1>
                  <p className="text-xl text-slate-500 max-w-lg leading-relaxed">
                    in East & Central Africa — supplying world-class medical laboratory equipment since 1997.
                  </p>
                </div>

                {/* Stat strip — overlapping the header */}
                <div className="grid grid-cols-2 gap-4 lg:self-end pb-2">
                  {[
                    { value: `${counterValues.years}+`, label: 'Years Experience', icon: <TrendingUp className="w-5 h-5" /> },
                    { value: `${counterValues.labs}+`, label: 'Laboratories', icon: <FlaskConical className="w-5 h-5" /> },
                    { value: `${counterValues.hospitals}+`, label: 'Hospitals', icon: <HeartPulse className="w-5 h-5" /> },
                    { value: `${counterValues.clients}+`, label: 'Happy Clients', icon: <Users className="w-5 h-5" /> },
                  ].map((s, i) => (
                    <div key={i} className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2" style={{ color: i % 2 === 0 ? brandBlue : brandRed }}>
                        {s.icon}
                      </div>
                      <div className="text-3xl font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}>{s.value}</div>
                      <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STORY — asymmetric two-column with pull quote ── */}
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className={`grid lg:grid-cols-12 gap-12 items-start transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Sticky left label */}
            <div className="lg:col-span-2 lg:pt-2">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start">
                <div className="w-8 h-px lg:w-px lg:h-16" style={{ background: brandRed }} />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: brandRed, writingMode: 'horizontal-lr' }}>Our Story</span>
              </div>
            </div>

            {/* Main copy */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                Hass Scientific & Medical Supplies (U) Ltd was incorporated in <strong className="text-slate-800">1997</strong>. Our head office is located in the upmarket Hurlingham area along Argwings Kodhek Road at <strong className="text-slate-800">Hass Biotechnology Centre</strong> in Nairobi, Kenya — an ultra-modern facility with coldrooms, conference & demonstration rooms that support effective promotion of diagnostic products and internal trainings.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We maintain an East African regional business network with branches in <strong className="text-slate-800">Kampala, Uganda</strong> and <strong className="text-slate-800">Kigali, Rwanda</strong>.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our core functions include marketing, delivery of supplies, services, and maintenance of a vast range of laboratory equipment — ensuring every healthcare facility we serve operates at its highest potential.
              </p>
            </div>

            {/* Pull-quote card — overlapping effect */}
            <div className="lg:col-span-4 relative">
              <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)` }}>
                {/* decorative circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 border-2" style={{ borderColor: 'white' }} />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: brandRed }} />

                <div className="text-5xl mb-4 opacity-30 text-white font-serif">"</div>
                <p className="text-white text-xl font-semibold leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  To supply world-class diagnostic reagents and equipment across Africa.
                </p>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-blue-200 text-sm font-bold tracking-widest uppercase">Our Mission</p>
                </div>
              </div>

              {/* Floating tag */}
              <div className="absolute -top-4 -left-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg" style={{ background: brandRed }}>
                Est. 1997
              </div>
            </div>
          </div>
        </div>

        {/* ── WHAT WE DO — horizontal scrolling pills + icon grid ── */}
        <div className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f4ff 0%, #fff5f5 100%)' }}>
          {/* Decorative large text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-black opacity-[0.03] whitespace-nowrap" style={{ fontSize: '15vw', fontFamily: "'Orbitron', sans-serif", color: brandBlue }}>SOLUTIONS</span>
          </div>

          <div className="max-w-7xl mx-auto px-8 relative">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: brandRed }}>What We Offer</span>
                  <h2 className="text-4xl font-black leading-tight" style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}>
                    Services &<br />Solutions
                  </h2>
                </div>
                <p className="text-slate-500 text-lg max-w-sm">
                  Comprehensive laboratory solutions tailored to the highest standards of medical diagnostics.
                </p>
              </div>

              {/* Services — masonry-ish pill layout */}
              <div className="flex flex-wrap gap-4 mb-16">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default"
                    style={{ borderLeft: `3px solid ${i % 2 === 0 ? brandBlue : brandRed}` }}
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: i % 2 === 0 ? brandBlue : brandRed }} />
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{service}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${brandBlue}, #0f2549)`, boxShadow: `0 8px 30px rgba(26,58,107,0.2)` }}
                >
                  <span>Learn More About Our Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── CORE VALUES — staggered diagonal cards ── */}
        <div className="max-w-7xl mx-auto px-8 py-28">
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-20">
              <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: brandRed }}>What Drives Us</span>
              <h2 className="text-4xl font-black" style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}>Core Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-0 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${brandBlue}20, transparent)` }} />

              {values.map((value, i) => (
                <div
                  key={i}
                  className="relative group"
                  style={{ marginTop: i === 1 ? 60 : 0 }}
                >
                  {/* Card */}
                  <div className="mx-4 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                    {/* Number */}
                    <div className="text-8xl font-black absolute top-4 right-6 leading-none pointer-events-none select-none" style={{ color: `${brandBlue}05`, fontFamily: "'Orbitron', sans-serif" }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ background: i % 2 === 0 ? `linear-gradient(135deg, ${brandBlue}, #0f2549)` : `linear-gradient(135deg, ${brandRed}, #9b1527)` }}>
                      {value.icon}
                    </div>

                    <h3 className="text-2xl font-black mb-3" style={{ color: brandBlue }}>{value.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{value.description}</p>

                    {/* Bottom accent */}
                    <div className="mt-8 h-0.5 rounded-full transition-all duration-500 group-hover:w-full w-12" style={{ background: i % 2 === 0 ? brandBlue : brandRed }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── LOCATION STRIP — full-width editorial ── */}
        <div
          className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${brandBlue} 0%, #0f2549 100%)` }}
        >
          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1614935151651-0bea6508db6b?q=80&w=2000&auto=format&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: brandRed, transform: 'translate(30%, -30%)' }} />

          <div className="relative max-w-7xl mx-auto px-8 py-20">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-2">
                <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: `${brandRed}` }}>Where To Find Us</span>
                <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Strategically<br />Located
                </h2>
                <p className="text-blue-200 text-lg leading-relaxed max-w-xl">
                  Headquartered at Hass Biotechnology Centre, Hurlingham, Nairobi — with regional branches in Kampala, Uganda and Kigali, Rwanda to serve all of East & Central Africa.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { city: 'Nairobi, Kenya', role: 'Headquarters', flag: '🇰🇪' },
                  { city: 'Kampala, Uganda', role: 'Regional Branch', flag: '🇺🇬' },
                  { city: 'Kigali, Rwanda', role: 'Regional Branch', flag: '🇷🇼' },
                ].map((loc, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <span className="text-2xl">{loc.flag}</span>
                    <div>
                      <div className="text-white font-bold">{loc.city}</div>
                      <div className="text-blue-300 text-sm">{loc.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.4; }
        }
        .animate-float { animation: float ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default About;