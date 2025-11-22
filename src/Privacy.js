import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeft, Shield, Lock, Eye, Database, Users, Globe, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';

const Privacy = () => {
  const privacySections = [
    {
      icon: Database,
      title: "Data Collection",
      content: "We collect minimal data necessary to provide our VAT calculation services. This includes calculation inputs (which are processed locally) and basic usage analytics to improve our service."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "All data transmission is encrypted using industry-standard SSL/TLS protocols. We implement robust security measures to protect your information from unauthorized access, alteration, or disclosure."
    },
    {
      icon: Eye,
      title: "Data Usage",
      content: "We use collected data solely to provide and improve our VAT calculation services. We do not sell, trade, or rent your personal information to third parties under any circumstances."
    },
    {
      icon: Users,
      title: "Third Parties",
      content: "We do not share your personal information with third parties except as required by law or with your explicit consent. Any data sharing is limited to essential service providers under strict confidentiality agreements."
    }
  ];

  const dataTypes = [
    {
      type: "Calculation Data",
      description: "VAT rates, amounts, and calculation results",
      retention: "Not stored - processed locally",
      purpose: "To perform VAT calculations"
    },
    {
      type: "Usage Analytics",
      description: "Page views, feature usage, and performance metrics",
      retention: "Anonymized for 2 years",
      purpose: "To improve our service and user experience"
    },
    {
      type: "Contact Information",
      description: "Name, email, and messages (if you contact us)",
      retention: "Until you request deletion",
      purpose: "To respond to your inquiries and provide support"
    },
    {
      type: "Technical Data",
      description: "IP address, browser type, device information",
      retention: "Anonymized for 1 year",
      purpose: "To ensure security and optimize performance"
    }
  ];

  const rights = [
    {
      icon: CheckCircle,
      title: "Right to Access",
      description: "You can request a copy of all personal data we hold about you"
    },
    {
      icon: CheckCircle,
      title: "Right to Rectification",
      description: "You can request correction of any inaccurate personal data"
    },
    {
      icon: CheckCircle,
      title: "Right to Erasure",
      description: "You can request deletion of your personal data"
    },
    {
      icon: CheckCircle,
      title: "Right to Portability",
      description: "You can request your data in a structured, machine-readable format"
    },
    {
      icon: CheckCircle,
      title: "Right to Object",
      description: "You can object to processing of your personal data"
    },
    {
      icon: CheckCircle,
      title: "Right to Restrict",
      description: "You can request restriction of processing your personal data"
    }
  ];

  const cookies = [
    {
      name: "Essential Cookies",
      purpose: "Required for basic website functionality",
      duration: "Session",
      type: "Strictly Necessary"
    },
    {
      name: "Analytics Cookies",
      purpose: "Help us understand how visitors use our website",
      duration: "2 years",
      type: "Performance"
    },
    {
      name: "Preference Cookies",
      purpose: "Remember your settings and preferences",
      duration: "1 year",
      type: "Functionality"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="Privacy Policy - VATCalc | Data Protection & Privacy Rights"
        description="Learn about VATCalc's privacy policy, data protection practices, and your privacy rights. We protect your data with industry-standard security measures."
        keywords="privacy policy, data protection, GDPR compliance, privacy rights, data security, VATCalc privacy, user data protection, cookie policy"
        url="https://vatcalc.com/privacy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Privacy Policy - VATCalc",
          "description": "Learn about VATCalc's privacy policy, data protection practices, and your privacy rights.",
          "url": "https://vatcalc.com/privacy",
          "mainEntity": {
            "@type": "Organization",
            "name": "VATCalc",
            "privacyPolicy": "https://vatcalc.com/privacy",
            "dataProtectionOfficer": "admin@vatcalc.com"
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Privacy</span>
              <br />
              <span className="text-gray-800">Policy</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center space-x-2 mt-8 text-lg text-gray-500"
            >
              <FileText className="w-5 h-5" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </motion.div>
          </div>

          {/* Key Privacy Points */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <section.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Data Collection Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Data We Collect</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transparent information about the data we collect and how we use it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataTypes.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {data.type}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {data.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Retention:</span>
                    <span className="text-blue-600">{data.retention}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Purpose:</span>
                    <span className="text-purple-600">{data.purpose}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Your Rights Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Rights</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              You have complete control over your personal data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rights.map((right, index) => (
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
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <right.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {right.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {right.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cookies Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cookie Policy</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Information about the cookies we use and how to manage them
            </p>
          </motion.div>

          <div className="space-y-6">
            {cookies.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
              >
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {cookie.name}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {cookie.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600">
                      {cookie.purpose}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Duration:</span>
                    <span className="text-blue-600 ml-2">{cookie.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions About Privacy?</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Contact us if you have any questions about this privacy policy
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Privacy Contact
            </h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              For any privacy-related questions, concerns, or requests, please contact us:
            </p>
            <div className="space-y-4">
              <p className="text-2xl font-bold text-blue-600">
                admin@vatcalc.com
              </p>
              <p className="text-gray-600">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Legal Notice */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Legal Notice</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              This privacy policy is effective as of the date listed above and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
            <p className="text-gray-400">
              We reserve the right to update or change our privacy policy at any time. You should check this privacy policy periodically.
            </p>
          </motion.div>
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
              Ready to Calculate VAT?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Start using our secure and privacy-focused VAT calculator
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/"
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Calculating Now
              </Link>
              
              <Link
                to="/contact"
                className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Contact Us
              </Link>
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

export default Privacy;
