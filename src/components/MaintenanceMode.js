import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Mail } from 'lucide-react';

export default function MaintenanceMode() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <Settings className="w-12 h-12 text-white" />
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl md:text-7xl font-bold text-gray-900 mb-8"
        >
          🛠️ Our website is currently under maintenance. Please check back soon.
        </motion.h1>


        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-40"
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
            className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-red-200 to-orange-200 rounded-full opacity-40"
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
            className="absolute bottom-40 left-20 w-8 h-8 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-50"
          />
        </div>
      </motion.div>
    </div>
  );
}
