import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Target, Users, Award, ArrowLeft, CheckCircle, Star, Globe, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';

const About = () => {
  const features = [
    {
      icon: Calculator,
      title: "Precision Calculations",
      description: "Our advanced algorithms ensure accurate VAT calculations every time, supporting all major VAT rates worldwide."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant results with our optimized calculation engine. No waiting, no delays - just pure speed."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. All calculations are processed locally on your device."
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Supports VAT rates from over 50 countries, making it perfect for international businesses and freelancers."
    }
  ];

  const stats = [
    { number: "1M+", label: "Calculations Performed" },
    { number: "50+", label: "Countries Supported" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Available" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Lead Developer",
      description: "Full-stack developer with 8+ years of experience in fintech applications.",
      image: "👩‍💻"
    },
    {
      name: "Michael Chen",
      role: "UX Designer",
      description: "Award-winning designer focused on creating intuitive financial tools.",
      image: "👨‍🎨"
    },
    {
      name: "Emma Rodriguez",
      role: "Product Manager",
      description: "Expert in financial products with deep understanding of VAT regulations.",
      image: "👩‍💼"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description: "We believe in precision. Every calculation is double-checked to ensure 100% accuracy."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Our design philosophy puts users first. Simple, intuitive, and powerful."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our application, from code to user experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="About VATCalc - Professional VAT Calculator | Trusted by Millions"
        description="Learn about VATCalc, the world's most trusted VAT calculator. Built by financial experts, used by millions worldwide. Free, accurate, and secure VAT calculations."
        keywords="about VATCalc, VAT calculator company, financial tools, tax calculation software, business calculator, VATCalc team, financial technology"
        url="https://vatcalc.com/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About VATCalc",
          "description": "Learn about VATCalc, the world's most trusted VAT calculator. Built by financial experts, used by millions worldwide.",
          "url": "https://vatcalc.com/about",
          "mainEntity": {
            "@type": "Organization",
            "name": "VATCalc",
            "description": "Professional VAT calculator for instant VAT calculations. Add or remove VAT with precision. Supports all VAT rates.",
            "url": "https://vatcalc.com",
            "foundingDate": "2020",
            "numberOfEmployees": "10-50",
            "applicationCategory": "BusinessApplication"
          }
        }}
      />
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">VATCalc</span>
            </Link>
            
            <Link 
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-semibold text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Calculator</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About</span>
              <br />
              <span className="text-gray-800">VATCalc</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              The world's most trusted VAT calculator, built by financial experts and designed for modern businesses.
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Mission</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                To simplify VAT calculations for businesses worldwide, making complex tax computations accessible, 
                accurate, and efficient for everyone from small startups to large enterprises.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700">Free to use forever</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700">No registration required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700">Works offline</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Trusted by Millions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Join over 1 million users who trust VATCalc for their daily VAT calculations. 
                  From freelancers to Fortune 500 companies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Why Choose VATCalc?</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built with modern technology and user experience in mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Values</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Meet Our Team</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The experts behind VATCalc
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="text-6xl mb-6">{member.image}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold text-lg mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join millions of users who trust VATCalc for their VAT calculations
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/"
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Calculating Now
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-white">VATCalc</span>
            </motion.div>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Professional VAT calculations made simple. Calculate, add, or remove VAT with precision and speed.
            </p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400 text-lg">
                &copy; {new Date().getFullYear()} VATCalc. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
