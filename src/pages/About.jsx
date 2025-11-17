import React, { useState, useEffect, useRef } from 'react';
import { Building2, MapPin, Award, TrendingUp, CheckCircle, Users, Globe, Target, Lightbulb, ArrowRight, Zap } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveblueFeature, setHoveblueFeature] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [counterValues, setCounterValues] = useState({ years: 0, labs: 0, hospitals: 0, clients: 0 });
  const sectionRef = useRef(null);

  const brandblue = '#c41e3a';
  const brandGray = '#2c3e50';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = { years: 30, labs: 500, hospitals: 200, clients: 1000 };
      let current = { years: 0, labs: 0, hospitals: 0, clients: 0 };
      
      const timer = setInterval(() => {
        current = {
          years: Math.min(current.years + targets.years / steps, targets.years),
          labs: Math.min(current.labs + targets.labs / steps, targets.labs),
          hospitals: Math.min(current.hospitals + targets.hospitals / steps, targets.hospitals),
          clients: Math.min(current.clients + targets.clients / steps, targets.clients)
        };
        
        setCounterValues({
          years: Math.floor(current.years),
          labs: Math.floor(current.labs),
          hospitals: Math.floor(current.hospitals),
          clients: Math.floor(current.clients)
        });
        
        if (current.years >= targets.years) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const features = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Established Since 1993",
      description: "Over 30 years of excellence in medical laboratory equipment supply across Africa",
      color: "from-blue-600 to-blue-800",
      stat: `${counterValues.years}+`
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Strategic Location",
      description: "Headquarters at Hass Biotechnology Centre, Hurlingham, Nairobi, Kenya",
      color: "from-gray-600 to-gray-800",
      stat: "Kenya"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trusted Partner",
      description: "Leading diagnostics partner across East & Central Africa with ISO certification",
      color: "from-blue-700 to-blue-900",
      stat: "ISO"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Growth",
      description: "Serving 500+ laboratories and 200+ hospitals with cutting-edge solutions",
      color: "from-gray-700 to-gray-900",
      stat: `${counterValues.labs}+`
    }
  ];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, value: `${counterValues.years}+`, label: "Years Experience", color: "blue" },
    { icon: <Building2 className="w-6 h-6" />, value: `${counterValues.labs}+`, label: "Laboratories", color: "gray" },
    { icon: <Users className="w-6 h-6" />, value: `${counterValues.hospitals}+`, label: "Hospitals", color: "blue" },
    { icon: <Globe className="w-6 h-6" />, value: `${counterValues.clients}+`, label: "Happy Clients", color: "gray" }
  ];

  const services = [
    { text: "Medical Equipment Procurement & Supply", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Clinical Chemistry Analyzers", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Microbiology Detection Systems", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Immunology Testing Equipment", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Laboratory Reagents & Consumables", icon: <CheckCircle className="w-5 h-5" /> },
    { text: "Full Equipment Maintenance & Support", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const values = [
    {
      icon: <Target className="w-10 h-10" />,
      title: "Quality First",
      description: "We never compromise on equipment quality or service excellence"
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Innovation",
      description: "Bringing the latest diagnostic technology to African healthcare"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Partnership",
      description: "Building lasting relationships with healthcare providers"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-black to-gray-900' 
        : 'bg-gradient-to-b from-white via-gray-50 to-gray-100'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
        }`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-1 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <section ref={sectionRef} className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm mb-6 backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300' 
                : 'bg-blue-100 border border-blue-200 text-blue-700'
            }`}>
              {/* <Award className="w-4 h-4" /> */}
              <span>About Hass Scientific</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Your Leading
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
                Diagnostics Partner
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              in East & Central Africa
            </p>
          </div>

          {/* Stats Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-110 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-blue-600/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-2xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-4 ${
                  stat.color === 'blue' 
                    ? isDarkMode ? 'text-blue-500' : 'text-blue-600'
                    : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-black mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-semibold ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
                
                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl ${
                  stat.color === 'blue' ? 'bg-blue-600/20' : 'bg-gray-600/20'
                }`} />
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column - Story */}
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 rounded-full" />
                <div className="pl-8 space-y-8">
                  <div>
                    <h2 className={`text-3xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Our Story
                    </h2>
                    <p className={`text-lg leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Hass Scientific & Medical Supplies (U) Ltd was incorporated in 1993.
The company's head office is located in the up market Hurligham area along Argwings Kodhek Road at Hass Biotechnology Centre in Nairobi - Kenya, which is wholly owned by Hass Scientific & Medical Supplies (U) Ltd.

It is an ultra modern centre with adequate facilities eg.coldroom, conference /demonstration room that support the effective promotion of diagnostic products and internal trainings.
We also have an East African regional business network, with branches in Kampala - Uganda and Kigali - Rwanda.

At Hass Scientific & Medical Supplies (U) Ltd., we deal with the procurement and supply of Medical Equipments, Reagents and Consumables used in the clinical laboratory. Our core functions include marketing and delivery of supplies, services and maintenance of a vast range of laboratory equipments.
                    </p>
                  </div>

                  <div>
                    <h2 className={`text-3xl font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      What We Do
                    </h2>
                    <p className={`text-lg leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      At Hass Scientific & Medical Supplies (U) Ltd., we specialize in the procurement and supply of Medical Equipment, Reagents, and Consumables used in clinical laboratories across East and Central Africa.
                    </p>
                  </div>

                  <div className={`p-8 rounded-2xl relative overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50' 
                      : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'
                  }`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
                    <p className={`text-xl font-bold italic relative z-10 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      -   To supply world class diagnostic reagents and equipments. <br />
                      -   To provide consultancy in good laboratory practice (GLP). <br />
                      -   To developing capacity of our human resource base, to support the services that we provide.
                    </p>
                    <div className={`mt-4 flex items-center space-x-2 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">Our Mission</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            {/* Right Column - Features Grid */}
            <div className={`grid sm:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveblueFeature(index)}
                  onMouseLeave={() => setHoveblueFeature(null)}
                  className={`group relative p-6 rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-blue-600/50' 
                      : 'bg-white border border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-2xl'
                  }`}
                  style={{
                    transform: hoveblueFeature === index ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)'
                  }}
                >
                  {/* Icon */}
                  <div className={`mb-4 p-3 rounded-xl inline-flex bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Stat Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                    isDarkMode 
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {feature.stat}
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>

                  {/* Hover Glow */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-br ${feature.color}`} style={{ opacity: hoveblueFeature === index ? 0.2 : 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Core Values
              </h2>
              <p className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-blue-600/50' 
                      : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-2xl'
                  }`}
                >
                  <div className={`mb-6 ${
                    isDarkMode ? 'text-blue-500' : 'text-blue-600'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {value.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`rounded-3xl p-10 md:p-12 relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700' 
                : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-2xl'
            }`}>
              {/* Background Pattern */}
              <div className={`absolute inset-0 ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}>
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle, ${isDarkMode ? 'white' : 'black'} 1px, transparent 1px)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Our Services & Solutions
                  </h2>
                  <p className={`text-lg max-w-2xl mx-auto ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Comprehensive laboratory solutions tailoblue to meet the highest standards of medical diagnostics
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className={`group flex items-start space-x-3 p-5 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isDarkMode 
                          ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-600/50' 
                          : 'bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 ${
                        isDarkMode ? 'text-blue-500' : 'text-blue-600'
                      }`}>
                        {service.icon}
                      </div>
                      <span className={`font-medium ${
                        isDarkMode ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                      } transition-colors duration-300`}>
                        {service.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105 inline-flex items-center space-x-2">
                    <span>Learn More About Our Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;