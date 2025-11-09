import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import HomeScreen from './pages/HomeScreen';
import Products from './pages/Products';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import NotFound from './pages/NotFound';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

// Layout component to handle conditional rendering of Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isNotFound = location.pathname === '/404' || location.pathname === '*';

  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen w-full flex flex-col ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    } transition-colors duration-300`}>
      {!isNotFound && <Header />}
      <main className="flex-1 w-full">
        {children}
      </main>
      {!isNotFound && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
