import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

function Header() {
  const { isDarkMode } = useTheme();

  return (
    <div>
      {/* Navigation */}
      <nav className={`relative z-50 px-6 py-6 backdrop-blur-md ${
        isDarkMode ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'
      } border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <img src="/hass-logo.png" alt="HASS Logo" className="w-14 h-14 text-white" />
            </div>
            <div>
              <div className={`text-2xl font-bold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                HASS
              </div>
              <div className={`text-xs -mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Scientific & Medical Supplies (U) Ltd</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Products', path: '/products' },
              { name: 'Services', path: '/services' },              
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative ${
                  isDarkMode ? 'text-white hover:text-red-400' : 'text-black hover:text-red-700'
                } transition-colors duration-300 group`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-800 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <ThemeToggle />
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header