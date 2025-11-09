import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Award,
  Shield,
  Clock,
  Microscope,
  Send,
  ExternalLink,
  ArrowUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [email, setEmail] = useState('');
  const [hoveredLink, setHoveredLink] = useState(null);
  const currentYear = new Date().getFullYear();

  const brandRed = '#c41e3a';
  const brandGray = '#2c3e50';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'News & Updates', href: '#news' }
    ],
    products: [
      { name: 'Clinical Chemistry', href: '#chemistry' },
      { name: 'Microbiology', href: '#microbiology' },
      { name: 'Immunology', href: '#immunology' },
      { name: 'Reagents', href: '#reagents' }
    ],
    services: [
      { name: 'Equipment Maintenance', href: '#maintenance' },
      { name: 'Installation', href: '#installation' },
      { name: 'Technical Support', href: '#support' },
      { name: 'Training', href: '#training' }
    ]
  };

  const socialLinks = [
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: '#', 
      color: isDarkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-500',
      label: 'Facebook'
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: '#', 
      color: isDarkMode ? 'hover:bg-sky-500' : 'hover:bg-sky-400',
      label: 'Twitter'
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: '#', 
      color: isDarkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-600',
      label: 'LinkedIn'
    },
    { 
      icon: <Instagram className="w-5 h-5" />, 
      href: '#', 
      color: isDarkMode ? 'hover:bg-pink-600' : 'hover:bg-pink-500',
      label: 'Instagram'
    }
  ];

  const certifications = [
    { icon: <Award className="w-8 h-8" />, text: 'ISO Certified', color: 'red' },
    { icon: <Shield className="w-8 h-8" />, text: 'Quality Assured', color: 'gray' },
    { icon: <Clock className="w-8 h-8" />, text: '30+ Years', color: 'red' }
  ];

  const handleSubscribe = () => {
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <footer className={`relative overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-black to-gray-950' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'
    }`}>
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
        }`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
              isDarkMode ? 'bg-red-500/10' : 'bg-red-500/5'
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

      {/* Top Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="grid lg:grid-cols-5 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300 ${
                    isDarkMode ? '':''
                  }`}>
                    <img src="/hass-logo.png" alt="HASS Logo" className="w-14 h-14 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-3xl font-black ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      HASS
                    </h3>
                    <p className={`text-sm font-semibold -mt-1 ${
                      isDarkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      Scientific & Medical
                    </p>
                  </div>
                </div>
              </div>
              
              <p className={`text-lg leading-relaxed mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Your leading diagnostics partner in East & Central Africa since 1993. Providing cutting-edge medical laboratory equipment, reagents, and comprehensive support services.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <a 
                  href="mailto:info@hassuganda.co.ug" 
                  className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                  }`}>
                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-medium">info@hassuganda.co.ug</span>
                </a>

                <a 
                  href="tel:256 (0)414 250 655" 
                  className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-medium">256 (0)414 250 655</span>
                </a>

                <div className={`flex items-start space-x-3 p-3 rounded-xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                  }`}>
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  </div>
                  <div className="font-medium">
                    <div>Hass Biotechnology Centre</div>
                    <div>Argwings Kodhek Road, Hurlingham</div>
                    <div>Nairobi, Kenya</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className={`text-sm font-semibold mb-3 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Connect With Us
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      title={social.label}
                      className={`group p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                        isDarkMode 
                          ? `bg-gray-800 text-white ${social.color}` 
                          : `bg-gray-200 text-gray-900 ${social.color} hover:text-white`
                      }`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
              {/* Company Links */}
              <div>
                <h4 className={`text-lg font-bold mb-6 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(`company-${index}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`group flex items-center space-x-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                          hoveredLink === `company-${index}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                        }`} />
                        <span className={`transition-transform duration-300 ${
                          hoveredLink === `company-${index}` ? 'translate-x-1' : ''
                        }`}>
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Products Links */}
              <div>
                <h4 className={`text-lg font-bold mb-6 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  Products
                </h4>
                <ul className="space-y-3">
                  {footerLinks.products.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(`products-${index}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`group flex items-center space-x-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                          hoveredLink === `products-${index}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                        }`} />
                        <span className={`transition-transform duration-300 ${
                          hoveredLink === `products-${index}` ? 'translate-x-1' : ''
                        }`}>
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h4 className={`text-lg font-bold mb-6 ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onMouseEnter={() => setHoveredLink(`services-${index}`)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`group flex items-center text-white space-x-2 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-gray-300 hover:text-white' 
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                      >
                        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                          hoveredLink === `services-${index}` ? 'translate-x-1 opacity-100' : 'opacity-0'
                        }`} />
                        <span className={`transition-transform duration-300 ${
                          hoveredLink === `services-${index}` ? 'translate-x-1' : ''
                        }`}>
                          {link.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Bar */}
          <div className={`border-t pt-10 mb-10 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`group flex items-center space-x-4 p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 hover:border-red-600/50' 
                      : 'bg-white border-gray-200 hover:border-red-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${
                    cert.color === 'red'
                      ? isDarkMode ? 'bg-red-600/20 text-red-400' : 'bg-red-100 text-red-600'
                      : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {cert.icon}
                  </div>
                  <span className={`font-bold text-lg ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {cert.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={`rounded-3xl p-10 mb-10 relative overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-r from-red-600 to-red-800' 
              : 'bg-gradient-to-r from-red-500 to-red-700'
          }`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
              <div className="text-white">
                <h4 className="text-3xl font-bold mb-2">Stay Updated</h4>
                <p className="text-white/90 text-lg">
                  Subscribe to receive updates on new products and services
                </p>
              </div>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`flex-1 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 ${
                    isDarkMode ? 'bg-white/10 text-white placeholder-white/60 backdrop-blur-xl' : 'bg-white text-gray-900'
                  }`}
                />
                <button 
                  onClick={handleSubscribe}
                  className="group px-6 py-4 bg-white rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-red-700"
                >
                  <span>Subscribe</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`border-t pt-8 ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className={`text-sm text-center md:text-left flex items-center space-x-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>© {currentYear} Hass Scientific & Medical Supplies (U) Ltd.</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>All rights reserved.</span>
              </p>
              <div className="flex flex-wrap justify-center items-center space-x-6 text-sm">
                <a 
                  href="#privacy" 
                  className={`transition-colors duration-300 hover:underline ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Privacy Policy
                </a>
                <a 
                  href="#terms" 
                  className={`transition-colors duration-300 hover:underline ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Terms of Service
                </a>
                <a 
                  href="#cookies" 
                  className={`transition-colors duration-300 hover:underline ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-40 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-red-600/50' 
            : 'bg-gradient-to-r from-red-500 to-red-700 text-white hover:shadow-red-500/50'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;