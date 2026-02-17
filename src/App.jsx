import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/footer';
import HomeScreen from './pages/HomeScreen';
import Products from './pages/Products';
import Services from './pages/Services';
import Partners from './pages/Partners';
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
  // Load Google Fonts globally
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Cleanup on unmount
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

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
            <Route path="/partners" element={<Partners />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />

              {/* ── Products – index redirects to haematology ─────── */}
        <Route
          path="/products"
          element={<Navigate to="/products/haematology" replace />}
        />

        {/* ── Products – all 7 categories via :category param ─ */}
        {/*
            Valid :category values (match the path segment exactly):
              immuno-assay
              molecular
              microbiology
              haematology
              coagulation
              chemistry
              urinalysis
        */}
        <Route path="/products/:category" element={<Products />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;