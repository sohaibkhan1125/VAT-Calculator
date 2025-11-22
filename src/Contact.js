import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, Clock, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      value: "admin@vatcalc.com",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      value: "123 Business St, City, Country",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your VAT calculation needs"
    },
    {
      icon: MessageCircle,
      title: "Quick Response",
      description: "We typically respond within 2-4 hours during business hours"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "Supporting users from over 50 countries worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEO 
        title="Contact VATCalc - Get Support & Help | Professional VAT Calculator"
        description="Contact VATCalc for support, questions, or feedback. Get help with VAT calculations, technical support, and general inquiries. Quick response times guaranteed."
        keywords="contact VATCalc, VAT calculator support, help with VAT calculations, technical support, customer service, VATCalc contact, business support"
        url="https://vatcalc.com/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact VATCalc",
          "description": "Contact VATCalc for support, questions, or feedback. Get help with VAT calculations, technical support, and general inquiries.",
          "url": "https://vatcalc.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "VATCalc",
            "email": "admin@vatcalc.com",
            "telephone": "+1 (555) 123-4567",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Business St",
              "addressLocality": "City",
              "addressCountry": "Country"
            }
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Contact</span>
              <br />
              <span className="text-gray-800">Us</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Get in touch with our team. We're here to help with all your VAT calculation needs.
            </motion.p>
          </div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {info.description}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Send us a Message</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Have a question about VAT calculations? Need technical support? 
                We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600 text-lg">
                    Thank you for your message. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-bold text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Send className="w-6 h-6" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Support Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Contact Us?</h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Response Times</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">General Inquiries</span>
                    <span className="font-bold text-blue-600">2-4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Technical Support</span>
                    <span className="font-bold text-green-600">1-2 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Bug Reports</span>
                    <span className="font-bold text-purple-600">4-8 hours</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  For urgent matters or technical issues, email us directly at:
                </p>
                <a 
                  href="mailto:admin@vatcalc.com"
                  className="text-2xl font-bold hover:text-blue-200 transition-colors duration-300"
                >
                  admin@vatcalc.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
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
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate are the VAT calculations?",
                answer: "Our calculations are 99.9% accurate and follow official VAT regulations from over 50 countries. All calculations are double-checked using industry-standard formulas."
              },
              {
                question: "Is VATCalc free to use?",
                answer: "Yes! VATCalc is completely free to use forever. No registration required, no hidden fees, and no premium features locked behind paywalls."
              },
              {
                question: "Can I use VATCalc for business purposes?",
                answer: "Absolutely! VATCalc is designed for both personal and business use. Many companies use our calculator for their daily VAT calculations."
              },
              {
                question: "Do you store my calculation data?",
                answer: "No, we don't store any of your data. All calculations are processed locally on your device, ensuring complete privacy and security."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
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
              Ready to Calculate VAT?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Start using our professional VAT calculator today
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/"
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Calculating Now
              </Link>
              
              <motion.a
                href="mailto:admin@vatcalc.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Email Us Directly
              </motion.a>
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

export default Contact;
