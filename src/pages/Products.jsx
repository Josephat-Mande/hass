import React, { useState, useEffect } from 'react';
import { Microscope, FlaskConical, Activity, Droplet, TestTube, ChevronRight, Sparkles, Zap, Shield, CheckCircle, ArrowUpRight } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveblueProduct, setHoveblueProduct] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const brandblue = '#c41e3a';
  const brandGray = '#2c3e50';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      name: "Molecular Diagnostics",
      icon: <Droplet className="w-6 h-6" />,
      description: "Nucleic acid extraction and molecular testing",
      color: "from-blue-600 to-blue-800",
      bgGlow: "blue"
    },
    {
      name: "Microbiology",
      icon: <Microscope className="w-6 h-6" />,
      description: "Automated identification and blood culture systems",
      color: "from-gray-600 to-gray-800",
      bgGlow: "gray"
    },
    {
      name: "Immunology",
      icon: <Activity className="w-6 h-6" />,
      description: "Immunoassay testing and infectious disease detection",
      color: "from-blue-700 to-blue-900",
      bgGlow: "blue"
    },
    {
      name: "Clinical Chemistry",
      icon: <FlaskConical className="w-6 h-6" />,
      description: "Chemistry analyzers and electrolyte testing",
      color: "from-gray-700 to-gray-900",
      bgGlow: "gray"
    }
  ];

  const products = [
    {
      category: 0,
      name: "EMAG® Nucleic Acid Extraction System",
      manufacturer: "bioMérieux",
      description: "Fully automated extraction platform for total nucleic acid purification from various clinical samples with minimal hands-on time and standardized workflow.",
      features: [
        "48 samples in 98 minutes",
        "2 independent 24-sample sections",
        "10 minutes hands-on time",
        "5 pblueefined workflows"
      ],
      specs: ["Sample Volume: 10µl-1000µl", "Elution: 25µl-200µl", "CE-IVD Certified"],
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop",
      gradient: "from-blue-500/20 to-blue-900/20"
    },
    {
      category: 1,
      name: "VITEK® 2 COMPACT",
      manufacturer: "bioMérieux",
      description: "The #1 automated microbial identification system. Identifies the vast majority of microorganisms that contaminate production areas and finished products in minimal time.",
      features: [
        "2-10 hours for gram-negative",
        "Miniaturized card format",
        "21 CFR Part 11 compliant",
        "15/30/60 card capacity"
      ],
      specs: ["Gram +/- bacteria", "Yeasts & Anaerobes", "Automated validation"],
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&auto=format&fit=crop",
      gradient: "from-gray-500/20 to-gray-900/20"
    },
    {
      category: 1,
      name: "BACT/ALERT® 3D",
      manufacturer: "bioMérieux",
      description: "Accurate automated blood culture system for efficient septicemia diagnosis. Provides optimal recovery of bacteria, fungi, and mycobacteria with colorimetric real-time detection.",
      features: [
        "Real-time colorimetric detection",
        "120-240 bottle capacity",
        "Modular & scalable design",
        "Only 2 bottle types to manage"
      ],
      specs: ["Plastic bottles", "Triple-layer design", "Remote monitoring"],
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&auto=format&fit=crop",
      gradient: "from-blue-600/20 to-blue-800/20"
    },
    {
      category: 2,
      name: "VIDAS® KUBE™",
      manufacturer: "bioMérieux",
      description: "Stackable benchtop automated immunoassay solution. Advanced technology providing flexible, cost-effective testing with fast results in complete confidence.",
      features: [
        "36 tests/hour per module",
        "Stackable up to 6 modules",
        "80+ parameter menu",
        "Integrated PC for 2 modules"
      ],
      specs: ["Emergency & critical care", "Immunochemistry", "Infectious diseases"],
      image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop",
      gradient: "from-gray-600/20 to-gray-800/20"
    },
    {
      category: 3,
      name: "ERBA Clinical Chemistry Analyzer",
      manufacturer: "ERBA Mannheim",
      description: "Liquid stable reagents, ready-to-use, specially designed clinical chemistry analyzers with higher linearity, sensitivity and precision. Expanding menu with novel biomarkers.",
      features: [
        "Ready-to-use reagents",
        "Higher sensitivity",
        "Advanced biomarkers",
        "Wide parameter menu"
      ],
      specs: ["Photometric testing", "Colorimetric analysis", "High precision"],
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop",
      gradient: "from-blue-700/20 to-blue-900/20"
    },
    {
      category: 3,
      name: "ERBA EC 90 Electrolyte Analyzer",
      manufacturer: "ERBA Mannheim",
      description: "Next generation electrolyte analyzer using thick film sensor technology for accurate ion-selective potentiometry and rapid electrolyte testing.",
      features: [
        "Thick film sensors",
        "ISE technology",
        "Rapid results",
        "Low maintenance"
      ],
      specs: ["Na, K, Cl, Li", "Whole blood compatible", "STAT testing ready"],
      image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&auto=format&fit=crop",
      gradient: "from-gray-700/20 to-gray-900/20"
    },
    {
      category: 3,
      name: "ERBA Hemostasis Line",
      manufacturer: "ERBA Mannheim",
      description: "Universal hemostasis reagents for automatic or semi-automatic systems. Comprehensive and evolving reagent line accommodating small to high-volume laboratories.",
      features: [
        "Universal compatibility",
        "Multiple packaging sizes",
        "Optical & mechanical systems",
        "Evolving parameter line"
      ],
      specs: ["Coagulation testing", "PT, APTT, Fibrinogen", "D-Dimer"],
      image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=800&auto=format&fit=crop",
      gradient: "from-blue-800/20 to-blue-950/20"
    }
  ];

  const filteblueProducts = products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-xl rounded-full border border-blue-500/30 mb-6">
              {/* <Sparkles className="w-4 h-4 text-blue-400" /> */}
              <span className="text-blue-200 font-semibold text-sm">Premium Medical Equipment</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Advanced Laboratory
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              World-class diagnostic equipment from leading manufacturers bioMérieux and ERBA Mannheim
            </p>
          </div>

          {/* Category Navigation */}
          <div className="mb-16">
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`group flex-shrink-0 flex items-center space-x-4 px-8 py-5 rounded-2xl transition-all duration-500 border-2 ${
                    activeCategory === index
                      ? `bg-gradient-to-r ${category.color} border-transparent text-white shadow-2xl scale-105`
                      : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
                  }`}
                  style={{
                    boxShadow: activeCategory === index 
                      ? `0 20px 60px -15px ${category.bgGlow === 'blue' ? 'rgba(196, 30, 58, 0.5)' : 'rgba(44, 62, 80, 0.5)'}`
                      : 'none'
                  }}
                >
                  <div className={`p-3 rounded-xl transition-all duration-300 ${
                    activeCategory === index 
                      ? 'bg-white/20 scale-110' 
                      : 'bg-gray-700 group-hover:bg-gray-600'
                  }`}>
                    {category.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg whitespace-nowrap">{category.name}</div>
                    <div className={`text-sm ${activeCategory === index ? 'text-white/80' : 'text-gray-400'}`}>
                      {category.description.split(' ').slice(0, 5).join(' ')}...
                    </div>
                  </div>
                  {activeCategory === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteblueProducts.map((product, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveblueProduct(index)}
                onMouseLeave={() => setHoveblueProduct(null)}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl overflow-hidden border border-gray-700 hover:border-blue-600/50 transition-all duration-500 backdrop-blur-xl"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: hoveblueProduct === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveblueProduct === index 
                    ? '0 30px 60px -15px rgba(196, 30, 58, 0.4)' 
                    : '0 10px 30px -15px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} group-hover:opacity-75 transition-opacity duration-500`} />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-white font-bold text-sm">{product.manufacturer}</span>
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-white" />
                      <span className="text-white font-bold text-xs">Certified</span>
                    </div>
                  </div>

                  {/* Category Icon Overlay */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      {categories[activeCategory].icon}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {product.features.map((feature, fIndex) => (
                      <div 
                        key={fIndex}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.specs.map((spec, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-lg text-xs font-medium border border-gray-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className={`flex-1 py-3.5 bg-gradient-to-r ${categories[activeCategory].color} text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 group-hover:scale-105`}>
                      <span>Learn More</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <button className="px-6 py-3.5 bg-gray-700/50 hover:bg-gray-700 text-white rounded-xl font-bold border border-gray-600 hover:border-gray-500 transition-all duration-300">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 blur-3xl opacity-30" />
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-12 max-w-3xl backdrop-blur-xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Need a Custom Solution?
                </h3>
                <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                  Our team of specialists can help you find the perfect laboratory equipment for your specific needs. Contact us for personalized consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-600/50 transition-all duration-300 hover:scale-105">
                    Request Consultation
                  </button>
                  <button className="px-8 py-4 border-2 border-gray-600 text-white rounded-xl font-bold hover:border-blue-600 hover:bg-blue-600/10 transition-all duration-300">
                    Download Catalog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Products;