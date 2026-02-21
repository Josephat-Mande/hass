import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Microscope, Droplets, FlaskConical, TestTube2, Activity, Dna, Beaker } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const productCategories = [
  {
    name: 'Immuno Assay',
    path: '/products/immuno-assay',
    icon: <Activity className="w-4 h-4" />,
    desc: 'VIDAS® immunoassay platforms',
    color: '#2563eb',
  },
  {
    name: 'Molecular',
    path: '/products/molecular',
    icon: <Dna className="w-4 h-4" />,
    desc: 'BioFire FilmArray diagnostics',
    color: '#7c3aed',
  },
  {
    name: 'Microbiology',
    path: '/products/microbiology',
    icon: <Microscope className="w-4 h-4" />,
    desc: 'VITEK® ID/AST & blood culture',
    color: '#059669',
  },
  {
    name: 'Haematology',
    path: '/products/haematology',
    icon: <Droplets className="w-4 h-4" />,
    desc: 'Erba analysers',
    color: '#c41e3a',
  },
  {
    name: 'Coagulation',
    path: '/products/coagulation',
    icon: <TestTube2 className="w-4 h-4" />,
    desc: 'Erba systems',
    color: '#d97706',
  },
  {
    name: 'Chemistry',
    path: '/products/chemistry',
    icon: <FlaskConical className="w-4 h-4" />,
    desc: 'ERBA clinical chemistry analysers',
    color: '#0891b2',
  },
  {
    name: 'Urinalysis',
    path: '/products/urinalysis',
    icon: <Beaker className="w-4 h-4" />,
    desc: 'Erba urine analysers',
    color: '#16a34a',
  },
];

function Header() {
  const { isDarkMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);
  const location = useLocation();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const handleMouseEnter = () => {
    clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const isProductsActive = location.pathname.startsWith('/products');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'What We Do', path: '/services' },
    { name: 'Our Partners', path: '/partners' },
  ];

  return (
    <>
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown-enter {
          animation: dropIn 0.2s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        .cat-item:hover .cat-icon {
          transform: scale(1.15) rotate(-4deg);
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? 'bg-gray-900/95 shadow-lg shadow-black/30 border-b border-gray-800'
              : 'bg-white/95 shadow-lg shadow-gray-200/60 border-b border-gray-200'
            : isDarkMode
            ? 'bg-gray-900/80 border-b border-gray-800/60'
            : 'bg-white/80 border-b border-gray-200/60'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-36 h-12 flex items-center justify-center">
              <img src="/hass-logo.png" alt="HASS Logo" className="w-36 h-12 object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className={`text-xl font-bold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                HASS
              </div>
              <div className={`text-[10px] leading-tight mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Scientific & Medical Supplies (U) Ltd
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    active
                      ? isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-700 bg-red-50'
                      : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-red-600 to-red-800 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Products Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/products"
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isProductsActive
                    ? isDarkMode ? 'text-red-400 bg-red-900/20' : 'text-red-700 bg-red-50'
                    : isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setDropdownOpen(false)}
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </Link>

              {/* Mega dropdown */}
              {dropdownOpen && (
                <div
                  className={`dropdown-enter absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-2xl shadow-2xl overflow-hidden border ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-700/80 shadow-black/60'
                      : 'bg-white border-gray-200 shadow-gray-300/50'
                  }`}
                >
                  {/* Dropdown header */}
                  <div className={`px-5 py-3 border-b ${isDarkMode ? 'border-gray-800 bg-gray-800/60' : 'border-gray-100 bg-gray-50'}`}>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Product Categories
                    </p>
                  </div>

                  {/* Category grid */}
                  <div className="grid grid-cols-2 gap-0.5 p-3">
                    {productCategories.map((cat) => {
                      const isActive = location.pathname === cat.path;
                      return (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => setDropdownOpen(false)}
                          className={`cat-item flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                            isActive
                              ? isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                              : isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className="cat-icon w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200"
                            style={{ background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}30` }}
                          >
                            {cat.icon}
                          </div>
                          <div>
                            <div className={`text-sm font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                              {cat.name}
                            </div>
                            <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {cat.desc}
                            </div>
                          </div>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Dropdown footer */}
                  <div className={`px-4 py-3 border-t flex items-center justify-between ${isDarkMode ? 'border-gray-800 bg-gray-800/40' : 'border-gray-100 bg-gray-50'}`}>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                      7 product categories available
                    </span>
                    <Link
                      to="/products"
                      onClick={() => setDropdownOpen(false)}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                      View All →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />
            <ThemeToggle />

            <Link
              to="/contact"
              className="ml-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-0.5 bg-current rounded transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 bg-current rounded transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Products */}
              <div>
                <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Products
                </div>
                <div className="space-y-0.5">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.path}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span style={{ color: cat.color }}>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 pb-1">
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm rounded-lg font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-[68px]" />
    </>
  );
}

export default Header;