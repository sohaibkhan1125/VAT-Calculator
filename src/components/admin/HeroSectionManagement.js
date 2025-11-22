import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Save, RotateCcw } from 'lucide-react';
import { useWebsiteSettings } from '../../contexts/WebsiteSettingsContext';

export default function HeroSectionManagement() {
  const { settings, saving, firebaseAvailable, saveSettings } = useWebsiteSettings();
  const [heroHeading, setHeroHeading] = useState(settings.heroHeading || '');
  const [heroDescription, setHeroDescription] = useState(settings.heroDescription || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setHeroHeading(settings.heroHeading || '');
    setHeroDescription(settings.heroDescription || '');
  }, [settings.heroHeading, settings.heroDescription]);

  useEffect(() => {
    setHasChanges(
      heroHeading !== (settings.heroHeading || '') ||
      heroDescription !== (settings.heroDescription || '')
    );
  }, [heroHeading, heroDescription, settings.heroHeading, settings.heroDescription]);

  const handleSave = async () => {
    try {
      await saveSettings({
        heroHeading,
        heroDescription
      });
      setMessage('Hero section updated successfully!');
      setTimeout(() => setMessage(''), 2500);
    } catch (e) {
      setMessage('Failed to update hero section');
      setTimeout(() => setMessage(''), 2500);
    }
  };

  const handleReset = async () => {
    try {
      const emptyHeading = '';
      const emptyDescription = '';
      setHeroHeading(emptyHeading);
      setHeroDescription(emptyDescription);
      await saveSettings({
        heroHeading: emptyHeading,
        heroDescription: emptyDescription
      });
      setMessage('Hero section reset successfully!');
      setTimeout(() => setMessage(''), 2500);
    } catch (e) {
      setMessage('Failed to reset hero section');
      setTimeout(() => setMessage(''), 2500);
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Hero Section Management</h2>
                <p className="text-gray-600">Update the main heading and description shown in the hero section.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${firebaseAvailable ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-600">
                {firebaseAvailable ? 'Connected to Firebase' : 'Using local storage'}
              </span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        >
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {message}
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Heading</label>
            <input
              type="text"
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              placeholder="Enter hero heading"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
            <textarea
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              placeholder="Enter hero description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              disabled={saving || (!heroHeading && !heroDescription && !settings.heroHeading && !settings.heroDescription)}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


