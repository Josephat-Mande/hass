import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/PageLayout';
import { Building2, Award, Globe, Handshake, ArrowRight, ExternalLink } from 'lucide-react';

const Partners = () => {
  const { isDarkMode } = useTheme();
  const [hoveredPartner, setHoveredPartner] = useState(null);

  const partners = [
    {
      name: "BIOMÉRIEUX",
      category: "Clinical Chemistry, Bacteriology, Microbiology, ImmunoAssay",
      logo: "circle", // Placeholder for logo
      bgColor: "from-pink-300 to-yellow-300",
      textColor: "text-purple-900",
      logoColors: ["#E91E8C", "#9B59B6", "#F39C12"],
      description: "Leading in clinical diagnostics and microbiology solutions",
      link: "https://www.biomerieux.com/en",
    },
    {
      name: "ERBA MANNHEIM",
      category: "Clinical Chemistry",
      logo: "erba", // Placeholder for logo
      bgColor: "from-gray-600 to-gray-800",
      textColor: "text-white",
      logoColors: ["#1A5F7A"],
      description: "Innovative clinical chemistry analyzers and reagents",
      link: "https://www.erba-mannheim.com/en"
      
    },
    {
      name: "BECTON DICKINSON",
      category: "CD4 Counts, CD8 Counts, Blood Collection tubes etc.",
      logo: "bd", // Placeholder for logo
      bgColor: "from-gray-700 to-gray-900",
      textColor: "text-white",
      logoColors: ["#0046BE", "#8B4513"],
      slogan: "Helping all people live healthy lives",
      link: "https://www.bd.com/en",
     description: "Global medical technology company"
    },
    {
      name: "SFRI",
      category: "Haematology",
      logo: "sfri", // Placeholder for logo
      bgColor: "from-gray-600 to-gray-800",
      textColor: "text-white",
      logoColors: ["#FF6B35"],
      description: "Specialized hematology diagnostic solutions",
      link: "https://www.sfri.com/en"
      
    },
    {
      name: "RUNLAB",
      category: "Manufacturer of laboratory plastic consumables",
      logo: "runlab", // Placeholder for logo
      bgColor: "from-gray-600 to-gray-800",
      textColor: "text-white",
      logoColors: ["#D4A574"],
      description: "Quality laboratory consumables and plasticware",
      link: "https://www.runlab.com/en"
      
    },
    {
      name: "HUMASIS",
      category: "Specializes in studying the rapid test kit with its differentiated technology",
      logo: "humasis", // Placeholder for logo
      bgColor: "from-gray-700 to-gray-900",
      textColor: "text-white",
      logoColors: ["#4A90E2"],
      description: "Rapid diagnostic test kit innovation",
      link: "https://www.humasis.com/en"
      
    }
  ];

  const stats = [
    { icon: <Building2 className="w-8 h-8" />, value: "5+", label: "Global Partners" },
    { icon: <Award className="w-8 h-8" />, value: "30+", label: "Years Experience" },
    { icon: <Globe className="w-8 h-8" />, value: "20+", label: "Countries Served" },
    { icon: <Handshake className="w-8 h-8" />, value: "100%", label: "Satisfaction Rate" }
  ];

  return (
    <PageLayout>
      <section className="relative py-20 px-6 overflow-hidden min-h-screen">
        {/* Background Image Layer */}
        <div 
          className="fixed inset-0 w-full h-full"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(0px)',
            transform: 'scale(1.1)',
            opacity: 0.15,
            zIndex: 0
          }}
        />

        {/* Dark Overlay */}
        <div 
          className={`fixed inset-0 w-full h-full transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95' 
              : 'bg-gradient-to-br from-gray-50/95 via-white/90 to-gray-100/95'
          }`}
          style={{ zIndex: 1 }}
        />

        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5" style={{ zIndex: 2 }}>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #c41e3a 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated Background Blobs */}
        <div className="fixed top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ zIndex: 3 }} />
        <div className="fixed bottom-20 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s', zIndex: 3 }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mb-4 ${
              isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-black'
            }`}>
              Our Partners
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Trusted Global Partnerships
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Collaborating with world-leading manufacturers to deliver cutting-edge biomedical solutions across East & Central Africa
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-r from-blue-600 to-blue-800`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPartner(index)}
                onMouseLeave={() => setHoveredPartner(null)}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* Card Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.bgColor} opacity-90`} />
                
                {/* Decorative Circle/Logo Background */}
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30"
                  style={{
                    background: `radial-gradient(circle, ${partner.logoColors[0]} 0%, transparent 70%)`,
                    transform: hoveredPartner === index ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.5s ease'
                  }}
                />
                
                {partner.logoColors[1] && (
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${partner.logoColors[1]} 0%, transparent 70%)`,
                      transform: hoveredPartner === index ? 'scale(1.2)' : 'scale(1)',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative p-8 h-80 flex flex-col justify-between">
                  {/* Top Section - Brand Name */}
                  <div>
                    <div className="mb-6">
                      <h3 className={`text-3xl font-black mb-3 ${partner.textColor} tracking-tight`}>
                        {partner.name}
                      </h3>
                      <div className="h-1 w-16 bg-white/50 rounded-full" />
                    </div>
                    
                    {/* Category/Specialty */}
                    <p className={`text-base leading-relaxed ${partner.textColor} opacity-90 font-medium`}>
                      {partner.category}
                    </p>
                  </div>

                  {/* Bottom Section - Slogan/CTA */}
                  <div>
                    {partner.slogan && (
                      <p className={`text-sm italic mb-4 ${partner.textColor} opacity-75`}>
                        "{partner.slogan}"
                      </p>
                    )}
                    
                    <button 
                    onClick={() => window.open(partner.link, '_blank')}
                      className={`flex items-center space-x-2 hover:cursor-pointer ${partner.textColor} font-semibold group-hover:gap-3 transition-all duration-300`}
                    >
                      <span className="text-sm">Learn More</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-300`} />
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`rounded-2xl p-12 backdrop-blur-sm border text-center ${
            isDarkMode ? 'bg-gray-800/70 border-gray-700' : 'bg-white/90 border-gray-200'
          }`}>
            <div className="max-w-3xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Become a Partner
              </h2>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Join our network of leading biomedical equipment manufacturers and distributors. Together, we're transforming healthcare across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => window.open('/contact', '_blank')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Partner With Us</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                {/* <button className={`px-8 py-4 border-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  isDarkMode ? 'border-white/30 text-white hover:bg-white/10 hover:border-white' : 'border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400'
                }`}>
                  Download Partnership Guide
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Partners;