import React, { useState } from 'react';
import { Wrench, Clock, Truck, Headphones, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/PageLayout';

const Services = () => {
  const { isDarkMode } = useTheme();
  const [hoveredService, setHoveredService] = useState(null);

  const mainServices = [
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Full Equipment Maintenance",
      description: "24/7 on-site maintenance by fully trained engineers and application specialists ensuring maximum uptime",
      features: [
        "Preventive maintenance programs",
        "Emergency repair services",
        "Calibration and validation",
        "Performance optimization"
      ],
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Guaranteed Uptime",
      description: "Comprehensive service contracts with guaranteed response times for critical equipment",
      features: [
        "24-hour uptime guarantee",
        "Priority support access",
        "Spare parts availability",
        "Extended warranty options"
      ],
      color: "from-teal-500 to-green-600",
      bgColor: "bg-teal-50",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Installation & Commissioning",
      description: "Professional installation, commissioning, and relocation services by local field specialists",
      features: [
        "Site assessment and preparation",
        "Equipment installation",
        "Staff training programs",
        "Documentation and certification"
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop"
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "Technical Support",
      description: "Round-the-clock technical assistance from experienced application specialists",
      features: [
        "Phone and email support",
        "Remote diagnostics",
        "On-site troubleshooting",
        "Software updates"
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const additionalServices = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rapid Response",
      description: "Fast response times to minimize downtime"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quality Results",
      description: "Ensuring high-quality diagnostic outcomes"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Compliance",
      description: "Meeting international quality standards"
    }
  ];

  return (
    <PageLayout>
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="fixed inset-0 w-full h-full"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(3px)',
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
            backgroundImage: `radial-gradient(circle, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated Background Blobs */}
        <div className="fixed top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ zIndex: 3 }} />
        <div className="fixed bottom-20 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s', zIndex: 3 }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mb-4 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-black'}`}>
              Our Services
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Comprehensive Support Solutions
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Expert maintenance and technical support ensuring 24-hour uptime and high-quality results
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border ${
                  isDarkMode ? 'bg-gray-800/70 border-gray-700 backdrop-blur-sm' : 'bg-white/90 border-gray-100 backdrop-blur-sm'
                } ${hoveredService === index ? 'scale-[1.02]' : ''}`}
              >
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  {/* Image Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                  
                  {/* Icon on Image */}
                  <div className="absolute top-6 left-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Title on Image */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li 
                        key={fIndex} 
                        className={`flex items-start space-x-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                        style={{ 
                          opacity: hoveredService === index ? 1 : 0.8,
                          transform: hoveredService === index ? 'translateX(10px)' : 'translateX(0)',
                          transition: `all 0.3s ease ${fIndex * 0.1}s`
                        }}
                      >
                        <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 text-transparent bg-gradient-to-r ${service.color} bg-clip-text`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <button className={`flex items-center space-x-2 font-semibold px-6 py-3 rounded-lg group-hover:gap-4 transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:shadow-lg`}>
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Decorative Corner Element */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.color} rounded-full opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`} />
              </div>
            ))}
          </div>

          {/* Additional Services Bar */}
          <div className={`rounded-2xl p-10 relative overflow-hidden backdrop-blur-sm ${
            isDarkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/90 border border-gray-200'
          }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)`,
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative z-10">
              <h3 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Why Choose Our Services?
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {additionalServices.map((item, index) => (
                  <div 
                    key={index}
                    className={`group text-center p-6 rounded-xl transition-all duration-300 border hover:scale-105 ${
                      isDarkMode ? 'bg-gray-900/50 border-gray-700 text-white hover:bg-gray-900/70' : 'bg-white border-gray-200 text-black hover:bg-gray-50'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h4>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Need immediate assistance or want to discuss a service contract?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => window.open('tel:+256 (0)414 250 655', '_blank')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                    Contact Support Team
                  </button>
                  <button  onClick={() => window.open('/service-guide.pdf', '_blank')} className={`px-8 py-4 border-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode ? 'border-white/30 text-white hover:bg-white/10 hover:border-white' : 'border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400'
                  }`}>
                    Download Service Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;