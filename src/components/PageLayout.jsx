import React from 'react';
import { useTheme } from '../context/ThemeContext';

const PageLayout = ({ children, className = '' }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen w-full ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900'
    } transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;