import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Globe,
  MessageCircle
} from 'lucide-react';
import { useWebsiteSettings } from '../../contexts/WebsiteSettingsContext';

// Social media platform configurations
const socialPlatforms = {
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: '#1877F2',
    placeholder: 'https://facebook.com/yourpage'
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: '#E4405F',
    placeholder: 'https://instagram.com/yourpage'
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: '#1DA1F2',
    placeholder: 'https://twitter.com/yourpage'
  },
  youtube: {
    name: 'YouTube',
    icon: Youtube,
    color: '#FF0000',
    placeholder: 'https://youtube.com/yourchannel'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: '#0077B5',
    placeholder: 'https://linkedin.com/company/yourcompany'
  },
  github: {
    name: 'GitHub',
    icon: Github,
    color: '#333333',
    placeholder: 'https://github.com/yourusername'
  },
  website: {
    name: 'Website',
    icon: Globe,
    color: '#6366F1',
    placeholder: 'https://yourwebsite.com'
  },
  telegram: {
    name: 'Telegram',
    icon: MessageCircle,
    color: '#0088CC',
    placeholder: 'https://t.me/yourchannel'
  }
};

export default function FooterManagement() {
  const { settings, saving, firebaseAvailable, saveSettings } = useWebsiteSettings();
  const [socialLinks, setSocialLinks] = useState(settings.socialLinks || []);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setSocialLinks(settings.socialLinks || []);
  }, [settings.socialLinks]);

  const handleAddSocialLink = () => {
    if (!newPlatform || !newUrl.trim()) {
      setSaveMessage('Please select a platform and enter a URL');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    // Check if platform already exists
    if (socialLinks.some(link => link.platform === newPlatform)) {
      setSaveMessage('This platform is already added');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      platform: newPlatform,
      url: newUrl.trim(),
      addedAt: new Date().toISOString()
    };

    setSocialLinks(prev => [...prev, newLink]);
    setNewPlatform('');
    setNewUrl('');
    setHasChanges(true);
    setSaveMessage('Social link added successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteSocialLink = (id) => {
    setSocialLinks(prev => prev.filter(link => link.id !== id));
    setHasChanges(true);
    setSaveMessage('Social link deleted successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings({ socialLinks });
      setHasChanges(false);
      setSaveMessage('Footer settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving footer settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleReset = () => {
    setSocialLinks([]);
    setHasChanges(true);
    setSaveMessage('All social links removed!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="p-6 h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Footer Management</h2>
              <p className="text-gray-600">
                Manage social media links and footer content for your website.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${firebaseAvailable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-600">
                {firebaseAvailable ? 'Connected to Firebase' : 'Using local storage'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Add New Social Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add Social Media Link</h3>
                <p className="text-sm text-gray-600">
                  Add new social media platforms to your website footer.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Platform
                </label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Choose a platform...</option>
                  {Object.entries(socialPlatforms).map(([key, platform]) => (
                    <option key={key} value={key}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={newPlatform ? socialPlatforms[newPlatform]?.placeholder : 'Enter URL...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddSocialLink}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Social Link</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Current Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Current Social Links</h3>
                <p className="text-sm text-gray-600">
                  Manage your existing social media links.
                </p>
              </div>
            </div>

            {socialLinks.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-600 mb-2">No Social Links Added</h4>
                <p className="text-gray-500">Add your first social media link above to get started.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {socialLinks.map((link) => {
                  const platform = socialPlatforms[link.platform];
                  const IconComponent = platform?.icon || Globe;
                  
                  return (
                    <motion.div
                      key={link.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                          style={{ backgroundColor: platform?.color || '#6366F1' }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{platform?.name || 'Unknown Platform'}</h4>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{link.url}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Visit Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                        <motion.button
                          onClick={() => handleDeleteSocialLink(link.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">Footer Social Links</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                This is how your social media links will appear in the website footer.
              </p>
              
              {socialLinks.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const platform = socialPlatforms[link.platform];
                    const IconComponent = platform?.icon || Globe;
                    
                    return (
                      <div
                        key={link.id}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg"
                      >
                        <div 
                          className="w-5 h-5 rounded flex items-center justify-center text-white"
                          style={{ backgroundColor: platform?.color || '#6366F1' }}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {platform?.name || 'Unknown'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No social links added yet</p>
              )}
            </div>
          </motion.div>

          {/* Save & Reset Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Apply Changes</h3>
                <p className="text-sm text-gray-600">
                  Save your footer settings or reset all social links.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      saveMessage.includes('successfully') || saveMessage.includes('removed')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {saveMessage}
                  </motion.div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  disabled={saving || socialLinks.length === 0}
                  className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Reset All</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveSettings}
                  disabled={saving || !hasChanges}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Footer Settings</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
