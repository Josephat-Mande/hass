import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Microscope, Activity, Timer,  ArrowDown, FileText, Dna, TrendingUp, CheckCircle,  TestTube } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeWord, setActiveWord] = useState(0);
  const [particleOffset, setParticleOffset] = useState(0);

  const brandRed = '#c41e3a';
  const brandBlue = '#1a3a6b';

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const words = ['Innovation', 'Precision', 'Excellence', 'Technology'];
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animation = setInterval(() => {
      setParticleOffset(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(animation);
  }, []);

  const dynamicWords = ['Innovation', 'Precision', 'Excellence', 'Technology'];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, value: "30+", label: "Years Leading" },
    { icon: <Microscope className="w-6 h-6" />, value: "500+", label: "Labs Equipped" },
    { icon: <Activity className="w-6 h-6" />, value: "200+", label: "Hospitals" },
    { icon: <CheckCircle className="w-6 h-6" />, value: "1000+", label: "Happy Clients" }
  ];

  const features = [
    { icon: <TestTube className="w-8 h-8" />, title: "Clinical Chemistry", link: "/products/chemistry", description: "Advanced photometric analyzers" },
    { icon: <Microscope className="w-8 h-8" />, title: "Microbiology", link: "/products/microbiology", description: "Rapid detection systems" },
    { icon: <Dna className="w-8 h-8" />, title: "Immunology", link: "/products/immuno-assay", description: "Disease screening tech" },
    { icon: <Timer className="w-8 h-8" />, title: "24/7 Support", link: "/contact", description: "Guaranteed uptime" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Background Image — biomedical lab / DNA / microscopy */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.05)',
          zIndex: 0
        }}
      />

      {/* Light white wash overlay so text stays readable */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(240,245,255,0.88) 40%, rgba(255,248,248,0.85) 100%)',
          zIndex: 1
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${mousePosition.x * 30}deg, ${brandBlue} 1px, transparent 1px),
                           linear-gradient(${90 + mousePosition.y * 30}deg, ${brandBlue} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          zIndex: 2
        }}
      />

      {/* Soft color orbs */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(196,30,58,0.12) 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
          zIndex: 3
        }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(26,58,107,0.1) 0%, transparent 70%)`,
          transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 25}px)`,
          zIndex: 3
        }}
      />

      {/* Animated DNA dots */}
      {/* <div className="fixed inset-0 opacity-20" style={{ zIndex: 4 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${5 + i * 5}%`,
              top: `${50 + Math.sin((particleOffset + i * 18) * Math.PI / 180) * 35}%`,
              background: i % 2 === 0 ? brandRed : brandBlue,
              transform: `scale(${1 + Math.sin((particleOffset + i * 18) * Math.PI / 180) * 0.5})`,
              transition: 'all 0.05s linear'
            }}
          />
        ))}
      </div> */}

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-red-200 bg-white/80 backdrop-blur-sm shadow-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: brandRed }} />
              <span className="font-semibold text-lg" style={{ color: brandRed, fontFamily: "'Rajdhani', sans-serif" }}>
                Leading East & Central Africa Since 1993
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1
                className="text-6xl md:text-7xl font-black leading-tight"
                style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue }}
              >
                Biomedical
                <br />
                <span className="relative inline-block">
                  <span
                    className="animate-pulse"
                    style={{
                      color: brandRed,
                      WebkitTextStroke: '1px rgba(196,30,58,0.2)'
                    }}
                  >
                    {dynamicWords[activeWord]}
                  </span>
                  <div
                    className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${brandRed}, transparent)` }}
                  />
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl leading-relaxed max-w-xl"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: '#4a5568' }}
              >
                Transforming healthcare through cutting-edge laboratory equipment and unwavering technical excellence
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = '/services'}
                className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${brandBlue}, #0f2549)`,
                  boxShadow: `0 8px 30px rgba(26,58,107,0.25)`,
                  fontFamily: "'Rajdhani', sans-serif"
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${brandRed}, #9b1527)` }} />
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => window.location.href = '/contact'}
                className="group px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm hover:shadow-lg"
                style={{
                  border: `2px solid ${brandBlue}`,
                  color: brandBlue,
                  fontFamily: "'Rajdhani', sans-serif"
                }}
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Request Quote</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="text-center group cursor-pointer bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-white"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300 text-white"
                    style={{ background: idx % 2 === 0 ? brandRed : brandBlue }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: brandBlue, fontSize: '1.1rem' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: '#718096', fontFamily: "'Rajdhani', sans-serif" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Orbiting Cards */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Rings */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `3px solid rgba(26,58,107,0.15)`,
                    animation: 'rotate 20s linear infinite',
                    boxShadow: `0 0 40px rgba(196,30,58,0.08)`
                  }}
                />
                <div
                  className="absolute inset-8 rounded-full"
                  style={{
                    border: `2px solid rgba(196,30,58,0.1)`,
                    animation: 'rotate-reverse 15s linear infinite'
                  }}
                />

                {/* Orbiting Feature Cards */}
                {features.map((feature, idx) => {
                  const angle = (idx * 90 + particleOffset) * (Math.PI / 180);
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        transition: 'transform 0.05s linear'
                      }}
                    >
                      <div onClick={() => window.location.href = feature.link || '/products'}
                        className="group w-32 h-32 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:scale-110 transition-all duration-300 cursor-pointer bg-white shadow-lg border border-gray-100"
                        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      >
                        <div className="mb-2 group-hover:scale-110 transition-transform" style={{ color: idx % 2 === 0 ? brandRed : brandBlue }}>
                          {feature.icon}
                        </div>
                        <div className="font-bold text-lg mb-1" style={{ color: brandBlue, fontFamily: "'Rajdhani', sans-serif" }}>
                          {feature.title}
                        </div>
                        <div className="text-sm" style={{ color: '#718096', fontFamily: "'Rajdhani', sans-serif" }}>
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-12 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${brandBlue}, #0f2549)`,
                      boxShadow: `0 12px 40px rgba(26,58,107,0.3)`
                    }}
                  >
                    <Microscope className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full animate-float"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  background: i % 2 === 0 ? brandRed : brandBlue,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  opacity: 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-lg" style={{ color: '#718096', fontFamily: "'Rajdhani', sans-serif" }}>Scroll to explore</span>
          <ArrowDown className="w-6 h-6" style={{ color: brandBlue }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.5; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-float { animation: float ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;