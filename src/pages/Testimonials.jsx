import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building2, User, Award, TrendingUp, Shield, Zap, Heart, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveblueStat, setHoveblueStat] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const brandblue = '#c41e3a';
  const brandGray = '#2c3e50';

  const testimonials = [
    {
      name: "Dr. Sarah Kimani",
      role: "Laboratory Director",
      organization: "Nairobi General Hospital",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop",
      gradient: "from-blue-600 to-blue-800",
      rating: 5,
      text: "Hass Scientific has been our trusted partner for over 10 years. Their equipment quality is exceptional, and their technical support team is always available when we need them. The 24-hour uptime guarantee has been crucial for our emergency services.",
      highlight: "Outstanding technical support and reliability",
      icon: <Shield className="w-5 h-5" />
    },
    {
      name: "Dr. James Ochieng",
      role: "Chief Pathologist",
      organization: "East Africa Diagnostic Center",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop",
      gradient: "from-gray-600 to-gray-800",
      rating: 5,
      text: "The clinical chemistry analyzers we purchased from Hass have transformed our laboratory operations. The accuracy and speed of results have significantly improved patient care. Their maintenance service is impeccable.",
      highlight: "Transformative laboratory solutions",
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Dr. Mary Wanjiru",
      role: "Medical Laboratory Scientist",
      organization: "Kampala Medical Centre",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop",
      gradient: "from-blue-700 to-blue-900",
      rating: 5,
      text: "Professional installation, comprehensive training, and ongoing support - Hass Scientific delivers on all fronts. Their reagents and consumables are of the highest quality, ensuring consistent and reliable test results.",
      highlight: "Complete end-to-end service",
      icon: <Award className="w-5 h-5" />
    },
    {
      name: "Dr. Peter Mwangi",
      role: "Laboratory Manager",
      organization: "Regional Referral Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop",
      gradient: "from-gray-700 to-gray-900",
      rating: 5,
      text: "We've equipped multiple departments with Hass's microbiology and immunology systems. The equipment performs flawlessly, and their spare parts availability ensures minimal downtime. Highly recommended for any serious healthcare facility.",
      highlight: "Minimal downtime, maximum performance",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const stats = [
    { value: "1000+", label: "Happy Clients", icon: <Heart className="w-6 h-6" />, color: "blue" },
    { value: "98%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" />, color: "gray" },
    { value: "24/7", label: "Support Available", icon: <Shield className="w-6 h-6" />, color: "blue" },
    { value: "30+", label: "Years Experience", icon: <Award className="w-6 h-6" />, color: "gray" }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

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

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
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

      <section className="relative py-20 px-6 overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-300'
          }`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl opacity-20 animate-blob ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
          }`} style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm mb-6 backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-300' 
                : 'bg-blue-100 border border-blue-200 text-blue-700'
            }`}>
              <Star className="w-4 h-4 fill-current" />
              <span>Client Testimonials</span>
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-6 leading-tight ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Trusted by
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
                Healthcare Professionals
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Hear what our clients say about their experience with Hass Scientific
            </p>
          </div>

          {/* Main Testimonial Slider */}
          <div className="relative max-w-6xl mx-auto mb-20">
            <div className={`relative rounded-3xl p-8 md:p-12 backdrop-blur-xl transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700' 
                : 'bg-white/80 border border-gray-200 shadow-2xl'
            }`}>
              {/* Quote Icon */}
              <div className={`absolute -top-8 left-8 w-20 h-20 bg-gradient-to-r ${testimonials[activeSlide].gradient} rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 animate-pulse`}>
                <Quote className="w-10 h-10 text-white" />
              </div>

              {/* Testimonial Content */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === activeSlide 
                      ? 'opacity-100 block' 
                      : 'opacity-0 hidden'
                  }`}
                >
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Left: Profile */}
                    <div className="text-center lg:text-left">
                      <div className="relative inline-block mb-6">
                        <div className={`w-40 h-40 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Status Badge */}
                        <div className={`absolute -bottom-2 -right-2 p-2 bg-gradient-to-r ${testimonial.gradient} rounded-xl shadow-lg`}>
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {testimonial.name}
                      </h3>
                      
                      <p className={`font-semibold mb-2 text-lg ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {testimonial.role}
                      </p>
                      
                      <div className={`flex items-center justify-center lg:justify-start space-x-2 mb-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Building2 className="w-5 h-5" />
                        <span className="text-sm">{testimonial.organization}</span>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex justify-center lg:justify-start space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-6 h-6 text-yellow-400 fill-current animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right: Testimonial Text */}
                    <div className="lg:col-span-2">
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                        isDarkMode 
                          ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {testimonial.icon}
                        <span>{testimonial.highlight}</span>
                      </div>
                      
                      <blockquote className={`text-xl md:text-2xl leading-relaxed italic mb-6 ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        "{testimonial.text}"
                      </blockquote>

                      {/* Trust Badges */}
                      <div className="flex flex-wrap gap-3">
                        {['Certified', 'Trusted', '24/7 Support'].map((badge, idx) => (
                          <div
                            key={idx}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                              isDarkMode 
                                ? 'bg-gray-700/50 text-gray-300 border border-gray-600' 
                                : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                          >
                            {badge}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Controls */}
              <div className="flex items-center justify-center space-x-4 mt-10">
                <button
                  onClick={prevSlide}
                  className={`group p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Slide Indicators */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveSlide(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        index === activeSlide 
                          ? `w-12 h-3 bg-gradient-to-r ${testimonials[index].gradient}` 
                          : isDarkMode 
                            ? 'w-3 h-3 bg-gray-600 hover:bg-gray-500' 
                            : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className={`group p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Stacked Cards Effect */}
            <div className="absolute inset-0 -z-10 hidden lg:block">
              <div className={`absolute top-4 left-4 right-4 h-full rounded-3xl backdrop-blur-sm ${
                isDarkMode ? 'bg-gray-800/30 border border-gray-700/50' : 'bg-white/40 border border-gray-200/50'
              }`} />
              <div className={`absolute top-8 left-8 right-8 h-full rounded-3xl backdrop-blur-sm ${
                isDarkMode ? 'bg-gray-800/20 border border-gray-700/30' : 'bg-white/30 border border-gray-200/30'
              }`} />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveblueStat(index)}
                onMouseLeave={() => setHoveblueStat(null)}
                className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-110 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:border-blue-600/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-2xl'
                }`}
                style={{
                  transform: hoveblueStat === index ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)'
                }}
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

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 blur-3xl opacity-30" />
              <div className={`relative rounded-3xl p-10 max-w-2xl backdrop-blur-xl ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700' 
                  : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl'
              }`}>
                <h3 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Join Our Growing Family
                </h3>
                <p className={`text-lg mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Experience the same exceptional service that our clients rave about
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105">
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;