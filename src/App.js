import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calculator, Home, Info, Mail, Shield, Menu, X, Github, Linkedin, Twitter, Facebook, Instagram, Youtube, Globe, MessageCircle } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { WebsiteSettingsProvider, useWebsiteSettings, cleanupGlobalFirebaseListener } from './contexts/WebsiteSettingsContext';
import About from './About';
import Contact from './Contact';
import Privacy from './Privacy';
import AdminRoutes from './pages/AdminRoutes';
import MaintenanceMode from './components/MaintenanceMode';
import ErrorBoundary from './components/ErrorBoundary';
import SEO from './components/SEO';
import './App.css';

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useWebsiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup for Firebase operations
  useEffect(() => {
    return () => {
      // Component cleanup - no Firebase operations to clean up here
      // Firebase operations are handled by the context
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            {settings.websiteLogo ? (
              <img 
                src={settings.websiteLogo} 
                alt="Logo" 
                className="w-10 h-10 object-contain"
              />
            ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {settings.websiteTitle}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-semibold text-lg"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ x: 5 }}>
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 py-3 px-4 hover:bg-blue-50"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { scrollY } = useScroll();
  const { settings } = useWebsiteSettings();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      id="home"
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/90 to-purple-50/80"></div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-40"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-40"
      />
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-50"
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-8"
        >
          {settings.heroHeading ? (
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {settings.heroHeading}
            </span>
          ) : (
            <>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Instant VAT</span>
              <br />
              <span className="text-gray-800">Calculator</span>
            </>
          )}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {settings.heroDescription || 'Calculate, Add or Remove VAT in seconds with our professional-grade calculator'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Calculating
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

// VAT Calculator Component
const VATCalculator = () => {
  const [mode, setMode] = useState('add');
  const [netPrice, setNetPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [vatRate, setVatRate] = useState('20');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateVAT = () => {
    setError('');
    
    if (!vatRate || vatRate <= 0 || vatRate > 100) {
      setError('Please enter a valid VAT rate (0-100%)');
      return;
    }

    const rate = parseFloat(vatRate) / 100;

    if (mode === 'add') {
      if (!netPrice || netPrice <= 0) {
        setError('Please enter a valid net price');
        return;
      }
      const net = parseFloat(netPrice);
      const vatAmount = net * rate;
      const total = net + vatAmount;
      setResult({
        netPrice: net.toFixed(2),
        vatAmount: vatAmount.toFixed(2),
        totalPrice: total.toFixed(2),
        vatRate: vatRate
      });
    } else {
      if (!totalPrice || totalPrice <= 0) {
        setError('Please enter a valid total price');
        return;
      }
      const total = parseFloat(totalPrice);
      const net = total / (1 + rate);
      const vatAmount = total - net;
      setResult({
        netPrice: net.toFixed(2),
        vatAmount: vatAmount.toFixed(2),
        totalPrice: total.toFixed(2),
        vatRate: vatRate
      });
    }
  };

  const clearAll = () => {
    setNetPrice('');
    setTotalPrice('');
    setVatRate('20');
    setResult(null);
    setError('');
  };

  return (
    <motion.section
      id="calculator"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VAT Calculator</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Professional VAT calculations made simple. Add or remove VAT with precision and speed.
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-full p-2">
              <button
                onClick={() => setMode('add')}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  mode === 'add'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Add VAT
              </button>
              <button
                onClick={() => setMode('remove')}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  mode === 'remove'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Remove VAT
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-4">
                {mode === 'add' ? 'Net Price (€)' : 'Total Price (€)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={mode === 'add' ? netPrice : totalPrice}
                onChange={(e) => mode === 'add' ? setNetPrice(e.target.value) : setTotalPrice(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-xl font-semibold"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-4">
                VAT Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-xl font-semibold"
                placeholder="20"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 text-lg font-semibold"
            >
              {error}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={calculateVAT}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Calculate VAT
            </motion.button>
            
            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
                className="border-2 border-gray-600 text-gray-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all duration-300"
            >
              Clear All
            </motion.button>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200"
            >
              <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Calculation Results
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-600 mb-2 font-semibold">Net Price</div>
                  <div className="text-3xl font-bold text-gray-800">€{result.netPrice}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-600 mb-2 font-semibold">VAT ({result.vatRate}%)</div>
                  <div className="text-3xl font-bold text-blue-600">€{result.vatAmount}</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-lg text-gray-600 mb-2 font-semibold">Total Price</div>
                  <div className="text-3xl font-bold text-purple-600">€{result.totalPrice}</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

// Information Cards Component
const InformationCards = () => {
  const cards = [
    {
      icon: Calculator,
      title: "What is VAT?",
      description: "Value Added Tax (VAT) is a consumption tax levied on goods and services at each stage of production and distribution.",
      color: "from-primary-400 to-primary-600"
    },
    {
      icon: Info,
      title: "How is VAT Calculated?",
      description: "VAT is calculated as a percentage of the net price. The total price includes the net price plus the VAT amount.",
      color: "from-accent-400 to-accent-600"
    },
    {
      icon: Shield,
      title: "Common VAT Rates",
      description: "Standard VAT rates vary by country: UK (20%), Germany (19%), France (20%), Spain (21%), Italy (22%).",
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Understanding VAT</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about Value Added Tax and its calculations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg`}>
                <card.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed text-lg">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { settings } = useWebsiteSettings();

  // Cleanup for Firebase operations
  useEffect(() => {
    return () => {
      // Component cleanup - no Firebase operations to clean up here
      // Firebase operations are handled by the context
    };
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  // Social media platform configurations
  const socialPlatforms = {
    facebook: { name: 'Facebook', icon: Facebook, color: '#1877F2' },
    instagram: { name: 'Instagram', icon: Instagram, color: '#E4405F' },
    twitter: { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
    youtube: { name: 'YouTube', icon: Youtube, color: '#FF0000' },
    linkedin: { name: 'LinkedIn', icon: Linkedin, color: '#0077B5' },
    github: { name: 'GitHub', icon: Github, color: '#333333' },
    website: { name: 'Website', icon: Globe, color: '#6366F1' },
    telegram: { name: 'Telegram', icon: MessageCircle, color: '#0088CC' }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 mb-6"
            >
              {settings.websiteLogo ? (
                <img 
                  src={settings.websiteLogo} 
                  alt="Logo" 
                  className="w-10 h-10 object-contain"
                />
              ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
              )}
              <span className="text-3xl font-bold text-white">{settings.websiteTitle}</span>
            </motion.div>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Professional VAT calculations made simple. Calculate, add, or remove VAT with precision and speed using our modern calculator.
            </p>
            
                {/* Social Links */}
                <div className="flex flex-wrap gap-4">
                  {settings.socialLinks && settings.socialLinks.length > 0 ? (
                    settings.socialLinks.map((link) => {
                      const platform = socialPlatforms[link.platform];
                      const IconComponent = platform?.icon || Globe;
                      
                      return (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-lg"
                          style={{ 
                            backgroundColor: platform?.color || '#6366F1',
                            boxShadow: `0 4px 14px 0 ${platform?.color || '#6366F1'}40`
                          }}
                          title={platform?.name || 'Social Link'}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </motion.a>
                      );
                    })
                  ) : (
                    <div className="text-gray-400 text-sm">
                      No social links added yet
                    </div>
                  )}
                </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-lg"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
            <div className="space-y-3 text-gray-300 text-lg">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                info@vatcalc.com
              </p>
              <p className="flex items-center">
                <span className="w-5 h-5 mr-3 text-blue-400">📞</span>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <span className="w-5 h-5 mr-3 text-blue-400">📍</span>
                123 Business St, City, Country
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            &copy; {currentYear} VATCalc. All rights reserved. Built with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

    // Homepage Content Component
    const HomepageContent = () => {
      const { settings } = useWebsiteSettings();

      if (!settings.homepageContent) {
        return null;
      }

      return (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: settings.homepageContent }}
            />
          </div>
        </motion.section>
      );
    };

    // Main Calculator Page Component
    const CalculatorPage = () => {
      const { settings } = useWebsiteSettings();

      // Cleanup for Firebase operations
      useEffect(() => {
        return () => {
          // Component cleanup - no Firebase operations to clean up here
          // Firebase operations are handled by the context
        };
      }, []);

      // Check if maintenance mode is enabled
      if (settings.maintenanceMode) {
        return <MaintenanceMode />;
      }

      return (
        <div className="App">
          <SEO 
            title="VAT Calculator - Free Online VAT Calculator | Add & Remove VAT Instantly"
            description="Professional VAT calculator for instant VAT calculations. Add or remove VAT with precision. Supports all VAT rates. Free, fast, and accurate VAT calculations for businesses and individuals."
            keywords="VAT calculator, VAT calculation, add VAT, remove VAT, value added tax, tax calculator, business calculator, UK VAT, EU VAT, tax tool, financial calculator, invoice calculator, tax rate calculator"
            url="https://vatcalc.com"
          />
          <Navbar />
          <HeroSection />
          <VATCalculator />
          <HomepageContent />
          <InformationCards />
          {settings.footerTopContent ? (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="py-16 bg-white"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: settings.footerTopContent }}
                />
              </div>
            </motion.section>
          ) : null}
          <Footer />
        </div>
      );
    };

// Main App Component
function App() {
  // Cleanup Firebase listener on app unmount
  useEffect(() => {
    return () => {
      cleanupGlobalFirebaseListener();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <WebsiteSettingsProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<CalculatorPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
            </Router>
          </AuthProvider>
        </WebsiteSettingsProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
