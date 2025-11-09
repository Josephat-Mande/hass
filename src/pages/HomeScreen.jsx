import React from 'react';
import Hero from '../components/Hero';
import About from './About';
import Products from './Products';
import Testimonials from './Testimonials';
import PageLayout from '../components/PageLayout';
import { useTheme } from '../context/ThemeContext';

function HomeScreen() {
  const { isDarkMode } = useTheme();
  
  return (
    <PageLayout>
      <div className={`min-h-screen ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
      } transition-colors duration-300`}>
        <Hero />
        <About />
        <Products />
        <Testimonials />
      </div>
    </PageLayout>
  );
}

export default HomeScreen;