import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Settings,
  FileText,
  LogOut,
  ChevronRight,
  Mail,
  Home
} from 'lucide-react';
import GeneralSettings from '../components/admin/GeneralSettings';
import FooterManagement from '../components/admin/FooterManagement';
import HomepageContentEditor from '../components/admin/HomepageContentEditor';
import ContentManagement from '../components/admin/ContentManagement';
import HeroSectionManagement from '../components/admin/HeroSectionManagement';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('general');
  const { logout, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const sidebarItems = [
    { id: 'general', name: 'General Settings', icon: Settings, available: true },
    { id: 'homepage', name: 'Homepage Content', icon: Home, available: true },
    { id: 'footer', name: 'Footer Management', icon: FileText, available: true },
    { id: 'hero', name: 'Hero Section Management', icon: Home, available: true },
    { id: 'content', name: 'Content Management', icon: FileText, available: true },
    { id: 'contact', name: 'Contact Management', icon: Mail, available: false },
  ];

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'general':
        return <GeneralSettings />;
      case 'homepage':
        return <HomepageContentEditor />;
      case 'footer':
        return <FooterManagement />;
      case 'hero':
        return <HeroSectionManagement />;
      case 'content':
        return <ContentManagement />;
      case 'contact':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Contact Management</h3>
              <p className="text-gray-500">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-40">
        <div className="flex flex-col flex-grow bg-gray-900 pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 5 }}
                  onClick={() => item.available && setActivePanel(item.id)}
                  disabled={!item.available}
                  className={`group flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    activePanel === item.id
                      ? 'bg-gray-800 text-white'
                      : item.available
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {!item.available && (
                    <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                  {item.available && activePanel === item.id && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* User Info */}
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {currentUser?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {currentUser?.email}
                </p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="ml-3 flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            
            {/* Mobile Navigation - Same as desktop but in overlay */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Admin Panel</span>
                </div>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.available) {
                        setActivePanel(item.id);
                        setSidebarOpen(false);
                      }
                    }}
                    disabled={!item.available}
                    className={`group flex items-center justify-between w-full px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      activePanel === item.id
                        ? 'bg-gray-800 text-white'
                        : item.available
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {!item.available && (
                      <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                        Soon
                      </span>
                    )}
                    {item.available && activePanel === item.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Mobile User Info */}
            <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {currentUser?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {currentUser?.email}
                  </p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
                {sidebarItems.find(item => item.id === activePanel)?.name || 'Admin Panel'}
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderActivePanel()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
