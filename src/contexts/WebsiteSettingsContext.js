import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getAllContent, saveContent as saveContentToSupabase, subscribeToAllContent, initializeContentTable } from '../services/contentService';

const WebsiteSettingsContext = createContext();

export function useWebsiteSettings() {
  const context = useContext(WebsiteSettingsContext);

  // Provide default values if context is not available
  if (!context) {
    return {
      settings: {
        maintenanceMode: false,
        websiteTitle: 'VATCalc',
        websiteLogo: null,
        logoFile: null,
        homepageContent: '',
        footerTopContent: '',
        heroHeading: '',
        heroDescription: '',
        socialLinks: [],
      },
      loading: false,
      saving: false,
      supabaseAvailable: false,
      updateSettings: () => { },
      saveSettings: async () => { },
      toggleMaintenanceMode: () => { },
      updateWebsiteTitle: () => { },
      updateWebsiteLogo: () => { },
    };
  }

  return context;
}

// Global settings state
let globalSettings = {
  maintenanceMode: false,
  websiteTitle: 'VATCalc',
  websiteLogo: null,
  logoFile: null,
  socialLinks: [],
  homepageContent: '',
  footerTopContent: '',
  heroHeading: '',
  heroDescription: '',
};

// Global cleanup function
let globalUnsubscribe = null;

export const cleanupGlobalSupabaseListener = () => {
  if (globalUnsubscribe) {
    try {
      globalUnsubscribe();
    } catch (error) {
      console.error('Error cleaning up global listener:', error);
    }
    globalUnsubscribe = null;
  }
};

export function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(globalSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [supabaseAvailable, setSupabaseAvailable] = useState(false);

  // Use refs to track component state
  const isMountedRef = useRef(true);

  // Initialize Supabase and load content
  useEffect(() => {
    const initializeSupabase = async () => {
      if (!isMountedRef.current) return;

      try {
        // Check if Supabase table is accessible
        const isAvailable = await initializeContentTable();

        if (!isMountedRef.current) return;

        if (!isAvailable) {
          console.error('Supabase table not accessible');
          setSupabaseAvailable(false);
          setLoading(false);
          return;
        }

        // Load all content from Supabase
        const contentData = await getAllContent();

        if (!isMountedRef.current) return;

        // Update global settings with Supabase data
        globalSettings = {
          ...globalSettings,
          homepageContent: contentData.homepage_content || '',
          footerTopContent: contentData.footer_top_content || '',
          heroHeading: contentData.hero_heading || '',
          heroDescription: contentData.hero_description || '',
          websiteTitle: contentData.website_title || 'VATCalc',
          websiteLogo: contentData.website_logo || null,
          maintenanceMode: contentData.maintenance_mode === 'true' || false,
          socialLinks: contentData.social_links ? JSON.parse(contentData.social_links) : [],
        };

        setSettings(globalSettings);
        setSupabaseAvailable(true);

        // Set up real-time subscription
        if (globalUnsubscribe) {
          globalUnsubscribe();
        }

        globalUnsubscribe = subscribeToAllContent(async (updatedContent) => {
          if (!isMountedRef.current) return;

          globalSettings = {
            ...globalSettings,
            homepageContent: updatedContent.homepage_content || '',
            footerTopContent: updatedContent.footer_top_content || '',
            heroHeading: updatedContent.hero_heading || '',
            heroDescription: updatedContent.hero_description || '',
            websiteTitle: updatedContent.website_title || 'VATCalc',
            websiteLogo: updatedContent.website_logo || null,
            maintenanceMode: updatedContent.maintenance_mode === 'true' || false,
            socialLinks: updatedContent.social_links ? JSON.parse(updatedContent.social_links) : [],
          };

          setSettings(globalSettings);
        });

        setLoading(false);
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        if (isMountedRef.current) {
          setSupabaseAvailable(false);
          setLoading(false);
        }
      }
    };

    // Add a small delay to prevent immediate calls
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        initializeSupabase();
      }
    }, 100);

    // Cleanup function
    return () => {
      isMountedRef.current = false;
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Save settings to Supabase
  const saveSettings = async (newSettings) => {
    if (saving) {
      console.warn('Save operation already in progress');
      return;
    }

    setSaving(true);

    try {
      // Update global settings immediately for optimistic UI
      globalSettings = { ...globalSettings, ...newSettings };
      setSettings(globalSettings);

      if (!supabaseAvailable) {
        throw new Error('Supabase is not available');
      }

      // Save each setting to Supabase
      const savePromises = [];

      if (newSettings.homepageContent !== undefined) {
        savePromises.push(
          saveContentToSupabase('homepage_content', newSettings.homepageContent)
        );
      }

      if (newSettings.footerTopContent !== undefined) {
        savePromises.push(
          saveContentToSupabase('footer_top_content', newSettings.footerTopContent)
        );
      }

      if (newSettings.heroHeading !== undefined) {
        savePromises.push(
          saveContentToSupabase('hero_heading', newSettings.heroHeading)
        );
      }

      if (newSettings.heroDescription !== undefined) {
        savePromises.push(
          saveContentToSupabase('hero_description', newSettings.heroDescription)
        );
      }

      if (newSettings.websiteTitle !== undefined) {
        savePromises.push(
          saveContentToSupabase('website_title', newSettings.websiteTitle)
        );
      }

      if (newSettings.websiteLogo !== undefined) {
        savePromises.push(
          saveContentToSupabase('website_logo', newSettings.websiteLogo || '')
        );
      }

      if (newSettings.maintenanceMode !== undefined) {
        savePromises.push(
          saveContentToSupabase('maintenance_mode', String(newSettings.maintenanceMode))
        );
      }

      if (newSettings.socialLinks !== undefined) {
        savePromises.push(
          saveContentToSupabase('social_links', JSON.stringify(newSettings.socialLinks))
        );
      }

      await Promise.all(savePromises);

    } catch (error) {
      console.error('Error saving website settings:', error);
      throw new Error(`Failed to save settings: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleMaintenanceMode = () => {
    setSettings(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode
    }));
  };

  const updateWebsiteTitle = (title) => {
    setSettings(prev => ({ ...prev, websiteTitle: title }));
  };

  const updateWebsiteLogo = (logoFile) => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          websiteLogo: e.target.result,
          logoFile: logoFile
        }));
      };
      reader.readAsDataURL(logoFile);
    }
  };

  const deleteWebsiteLogo = async () => {
    try {
      // Reset logo to null (default state)
      globalSettings = { ...globalSettings, websiteLogo: null, logoFile: null };
      setSettings(globalSettings);

      // Save to Supabase
      if (supabaseAvailable) {
        await saveContentToSupabase('website_logo', '');
      } else {
        throw new Error('Supabase is not available');
      }

      return true; // Success
    } catch (error) {
      console.error('Error deleting logo:', error);
      throw new Error(`Failed to delete logo: ${error.message}`);
    }
  };

  const value = {
    settings,
    loading,
    saving,
    supabaseAvailable,
    firebaseAvailable: supabaseAvailable, // For backward compatibility
    updateSettings,
    saveSettings,
    toggleMaintenanceMode,
    updateWebsiteTitle,
    updateWebsiteLogo,
    deleteWebsiteLogo,
  };

  return (
    <WebsiteSettingsContext.Provider value={value}>
      {children}
    </WebsiteSettingsContext.Provider>
  );
}
