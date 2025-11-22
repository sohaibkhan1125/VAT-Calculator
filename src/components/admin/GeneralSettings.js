import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Upload, 
  Save, 
  AlertTriangle,
  Globe,
  Image,
  Trash2
} from 'lucide-react';
import { useWebsiteSettings } from '../../contexts/WebsiteSettingsContext';

export default function GeneralSettings() {
  const { 
    settings, 
    loading,
    saving,
    firebaseAvailable,
    saveSettings,
    toggleMaintenanceMode, 
    updateWebsiteTitle, 
    updateWebsiteLogo,
    deleteWebsiteLogo
  } = useWebsiteSettings();
  
  const [title, setTitle] = useState(settings.websiteTitle);
  const [logoPreview, setLogoPreview] = useState(settings.websiteLogo);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasChanges(true);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
      updateWebsiteLogo(file);
    }
  };

  const handleDeleteLogo = async () => {
    try {
      await deleteWebsiteLogo();
      setLogoPreview(null);
      setHasChanges(true);
      setSaveMessage('Logo deleted successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error deleting logo. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings({
        maintenanceMode: settings.maintenanceMode,
        websiteTitle: title,
        websiteLogo: logoPreview,
      });
      setHasChanges(false);
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">General Settings</h2>
              <p className="text-gray-600">
                Manage your website's basic settings and maintenance mode.
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
          {/* Maintenance Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Maintenance Mode</h3>
                <p className="text-sm text-gray-600">
                  Enable to show maintenance message instead of website content
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {settings.maintenanceMode ? 'Currently enabled' : 'Currently disabled'}
                </p>
                <p className="text-xs text-gray-500">
                  {settings.maintenanceMode 
                    ? 'Visitors will see a maintenance message' 
                    : 'Website is accessible to all visitors'
                  }
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toggleMaintenanceMode();
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.maintenanceMode ? 'bg-orange-600' : 'bg-gray-200'
                }`}
              >
                <motion.span
                  animate={{
                    x: settings.maintenanceMode ? 24 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Website Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Website Title</h3>
                <p className="text-sm text-gray-600">
                  Change your website's title that appears in the header and footer
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter website title"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveSettings}
                disabled={saving || !hasChanges}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Website Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Website Logo</h3>
                <p className="text-sm text-gray-600">
                  Upload or change your website logo that appears in the header and footer
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Current Logo Preview */}
              {logoPreview && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Current logo" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Current Logo</p>
                      <p className="text-xs text-gray-500">This will update across the entire website</p>
                    </div>
                  </div>
                  
                  {/* Delete Logo Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDeleteLogo}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Logo</span>
                  </motion.button>
                </div>
              )}
              
              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Logo
                </label>
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">Choose file or drag and drop</span>
                    </motion.div>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: PNG or SVG format, max 2MB
                </p>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-lg font-bold text-gray-900">{title}</span>
              </div>
              <p className="text-sm text-gray-600">
                {logoPreview 
                  ? "This is how your website title and logo will appear in the header and footer."
                  : "This is how your website will appear with the default logo. Upload a custom logo to replace it."
                }
              </p>
            </div>
          </motion.div>

          {/* Save Settings Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
                <p className="text-sm text-gray-600">
                  Save all changes to apply them to your website
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      saveMessage.includes('successfully') 
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
                      <span>Save All Settings</span>
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
