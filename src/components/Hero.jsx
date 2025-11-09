import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Microscope, Activity, Zap, Shield, ArrowDown, Play, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDarkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeWord, setActiveWord] = useState(0);
  const heroRef = useRef(null);
  const [particleOffset, setParticleOffset] = useState(0);

  // Brand colors from Hass Uganda 
  const brandRed = '#c41e3a';
  const brandGray = '#2c3e50';

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
    const animate = () => {
      setParticleOffset(prev => (prev + 0.5) % 360);
    };
    const animation = setInterval(animate, 50);
    return () => clearInterval(animation);
  }, []);

  const dynamicWords = ['Innovation', 'Precision', 'Excellence', 'Technology'];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, value: "30+", label: "Years Leading", color: "from-red-500 to-red-700" },
    { icon: <Microscope className="w-6 h-6" />, value: "500+", label: "Labs Equipped", color: "from-gray-600 to-gray-800" },
    { icon: <Activity className="w-6 h-6" />, value: "200+", label: "Hospitals", color: "from-red-600 to-red-800" },
    { icon: <CheckCircle className="w-6 h-6" />, value: "1000+", label: "Happy Clients", color: "from-gray-700 to-gray-900" }
  ];

  const features = [
    {
      icon: <Microscope className="w-8 h-8" />,
      title: "Clinical Chemistry",
      description: "Advanced photometric analyzers",
      color: "from-red-500 to-red-700"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Microbiology",
      description: "Rapid detection systems",
      color: "from-gray-600 to-gray-800"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Immunology",
      description: "Disease screening tech",
      color: "from-red-600 to-red-800"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Guaranteed uptime",
      color: "from-gray-700 to-gray-900"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated DNA Helix Background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${5 + i * 5}%`,
              top: `${50 + Math.sin((particleOffset + i * 18) * Math.PI / 180) * 40}%`,
              background: i % 2 === 0 ? brandRed : brandGray,
              transform: `scale(${1 + Math.sin((particleOffset + i * 18) * Math.PI / 180) * 0.5})`,
              transition: 'all 0.05s linear'
            }}
          />
        ))}
      </div>

      {/* Dynamic Grid with Mouse Movement */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${mousePosition.x * 30}deg, rgba(196, 30, 58, 0.3) 1px, transparent 1px),
                           linear-gradient(${90 + mousePosition.y * 30}deg, rgba(196, 30, 58, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      />

      {/* Floating Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${brandRed} 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
        style={{
          background: `radial-gradient(circle, ${brandGray} 0%, transparent 70%)`,
          transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`
        }}
      />


      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-[calc(100vh-100px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-xl rounded-full border border-red-500/30 animate-fade-in"
            >
              
              <span className="text-red-200 font-semibold text-sm">Leading East & Central Africa Since 1993</span>
            </div>

            {/* Main Heading with Dynamic Word */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-white leading-tight">
                Biomedical
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 animate-pulse">
                    {dynamicWords[activeWord]}
                  </span>
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                Transforming healthcare through cutting-edge laboratory equipment and unwavering technical excellence
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50">
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Explore Solutions</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </button>
              
              <button className="group px-8 py-4 border-2 border-gray-600 rounded-xl font-bold text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8">
              {stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="text-center group cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D Interactive Display */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Central Hologram Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-96 h-96">
                {/* Rotating Ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-red-600/30"
                  style={{
                    animation: 'rotate 20s linear infinite',
                    boxShadow: `0 0 60px rgba(196, 30, 58, 0.3)`
                  }}
                />
                <div 
                  className="absolute inset-8 rounded-full border-2 border-gray-600/30"
                  style={{
                    animation: 'rotate-reverse 15s linear infinite',
                    boxShadow: `0 0 40px rgba(44, 62, 80, 0.3)`
                  }}
                />

                {/* Feature Cards Orbiting */}
                {features.map((feature, idx) => {
                  const angle = (idx * 90 + particleOffset) * (Math.PI / 180);
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={idx}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        transition: 'transform 0.05s linear'
                      }}
                    >
                      <div className={`group w-32 h-32 bg-gradient-to-br ${feature.color} rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl border border-white/10 hover:scale-110 transition-all duration-300 cursor-pointer`}>
                        <div className="text-white mb-2 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div className="text-white font-bold text-sm mb-1">{feature.title}</div>
                        <div className="text-white/70 text-xs">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-600/50 transform hover:rotate-12 transition-transform duration-300">
                    <Microscope className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Particle Field */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0 ? brandRed : brandGray,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-gray-400 text-sm">Scroll to explore</span>
          <ArrowDown className="w-6 h-6 text-red-500" />
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
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;