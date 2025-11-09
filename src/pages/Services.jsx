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
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50"
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
      bgColor: "bg-teal-50"
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
      bgColor: "bg-purple-50"
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
      bgColor: "bg-orange-50"
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
      <section className={`relative py-20 px-6 overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'} transition-colors duration-300`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #1e293b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated Background Blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />

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
                className={`group relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border overflow-hidden ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'} ${hoveredService === index ? 'scale-105' : ''}`}
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon Circle */}
                <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className={`text-transparent bg-gradient-to-r ${service.color} bg-clip-text`}>
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {service.title}
                  </h3>
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
                        <CheckCircle2 className={`w-5 h-5 text-transparent bg-gradient-to-r ${service.color} bg-clip-text flex-shrink-0 mt-0.5`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold px-4 py-2 rounded-lg group-hover:gap-3 transition-all duration-300">
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
          <div className={`rounded-2xl p-10 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(45deg, transparent 48%, white 48%, white 52%, transparent 52%)`,
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
                    className={`group text-center p-6 rounded-xl transition-all duration-300 border ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white border-gray-100 text-black'}`}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-gray-300 ${isDarkMode ? '' : 'text-gray-700'}`}>
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
                  <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
                    Contact Support Team
                  </button>
                  <button className={`px-8 py-4 border-2 rounded-lg font-semibold transition-all duration-300 ${isDarkMode ? 'border-white/30 text-white hover:bg-white/10 hover:border-white' : 'border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400'}`}>
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