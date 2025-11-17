import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, CheckCircle, Building2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PageLayout from '../components/PageLayout';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Uganda Office",
      details: ["Plot 2236, Tank Hill Road,", "Muyenga - Kampala", "P.O Box 1735, Kampala."],
      color: "from blue-500 to-indigo-600"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["256 (0)414 250 655", "+256 (0)753 250 655", "Mon to Fri →   9:00 AM to 6:00 PM"],
      color: "blue-400 to-blue-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@hassuganda.co.ug", "support@hassuganda.co.ug", "sales@hassuganda.co.ug"],
      color: "blue-500 to-indigo-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM", "Emergency: 24/7"],
      color: "blue-400 to-blue-600"
    }
  ];

  const quickLinks = [
    { icon: <Globe className="w-5 h-5" />, text: "Visit Website", link: "https://www.hassuganda.co.ug/" },
    { icon: <Building2 className="w-5 h-5" />, text: "Request Catalog", link: "#" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "Schedule Demo", link: "#" }
  ];

  return (
    <PageLayout>
      <section className={`relative py-20 px-6 overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'} transition-colors duration-300`}>
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mb-4 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-black'}`}>Get In Touch</div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Let's Start a Conversation</h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact us today to discuss your laboratory equipment needs</p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className={`group rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{info.icon}</div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, dIndex) => (
                    <p key={dIndex} className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className={`rounded-2xl p-8 shadow-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-100'}`}>
                <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          focusedField === 'name'
                            ? 'border-blue-500 shadow-lg shadow-blue-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          focusedField === 'email'
                            ? 'border-blue-500 shadow-lg shadow-blue-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          focusedField === 'phone'
                            ? 'border-blue-500 shadow-lg shadow-blue-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>

                    {/* Organization Field */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('organization')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                          focusedField === 'organization'
                            ? 'border-blue-500 shadow-lg shadow-blue-100'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Hospital/Laboratory Name"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                        focusedField === 'subject'
                          ? 'border-blue-500 shadow-lg shadow-blue-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="5"
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 resize-none ${
                        focusedField === 'message'
                          ? 'border-blue-500 shadow-lg shadow-blue-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group w-full py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Links */}
              <div className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-800/50 text-white' : 'bg-white text-black'}`}>
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.link}
                      className={`group flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 border ${isDarkMode ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-black'}`}
                    >
                      <div className="text-teal-400 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <div className="font-semibold">{link.text}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className={`rounded-2xl p-6 shadow-xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white border-gray-100 text-black'}`}>
                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                <div className={`relative h-64 rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className={`w-16 h-16 mx-auto mb-3 ${isDarkMode ? 'text-red-600' : 'text-red-700'}`} />
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Nairobi, Kenya</p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hurlingham Area</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center">
                <Clock className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-sm opacity-90">
                  Our technical team is available round the clock to assist you
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
        `}</style>
      </section>
    </PageLayout>
  );
};

export default Contact;