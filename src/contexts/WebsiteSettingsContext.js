import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { safeFirebaseOperation, safeFirebaseListener, withTimeout } from '../utils/firebaseHelpers';

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
      },
      loading: false,
      saving: false,
      firebaseAvailable: false,
      updateSettings: () => {},
      saveSettings: async () => {},
      toggleMaintenanceMode: () => {},
      updateWebsiteTitle: () => {},
      updateWebsiteLogo: () => {},
    };
  }
  
  return context;
}

// Singleton pattern to prevent multiple listeners
let globalListener = null;
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
export const cleanupGlobalFirebaseListener = () => {
  if (globalListener) {
    try {
      globalListener();
    } catch (error) {
      if (error.name !== 'AbortError' && error.code !== 'aborted') {
        console.error('Error cleaning up global listener:', error);
      }
    }
    globalListener = null;
  }
};

export function WebsiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(globalSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firebaseAvailable, setFirebaseAvailable] = useState(false);
  
  // Use refs to track component state
  const isMountedRef = useRef(true);
  const listenerCleanupRef = useRef(null);

  // Firebase document reference
  const settingsDocRef = doc(db, 'settings', 'website');

  // Load from localStorage immediately as fallback
  useEffect(() => {
    const fallbackSettings = localStorage.getItem('websiteSettings');
    if (fallbackSettings) {
      try {
        const parsed = JSON.parse(fallbackSettings);
        globalSettings = { ...globalSettings, ...parsed };
        setSettings(globalSettings);
      } catch (parseError) {
        console.error('Error parsing fallback settings:', parseError);
      }
    }
  }, []);

  // Initialize Firebase listener (singleton pattern)
  useEffect(() => {
    // Only create one global listener
    if (globalListener) {
      // Update this component with current global settings
      setSettings(globalSettings);
      setLoading(false);
      return;
    }

    const initializeFirebase = async () => {
      // Check if component is still mounted before starting Firebase operations
      if (!isMountedRef.current) return;

      try {
        // First, try to get the document
        const docSnap = await safeFirebaseOperation(
          () => withTimeout(getDoc(settingsDocRef), 3000, 'Get settings document'),
          'Get settings document'
        );

        // Check again if component is still mounted
        if (!isMountedRef.current) return;

        if (!docSnap) {
          setFirebaseAvailable(false);
          setLoading(false);
          return;
        }

        if (docSnap.exists()) {
          const data = docSnap.data();
          globalSettings = {
            ...globalSettings,
            maintenanceMode: data.maintenanceMode || false,
            websiteTitle: data.websiteTitle || 'VATCalc',
            websiteLogo: data.websiteLogo || null,
          };
        } else {
          // Create initial document if it doesn't exist
          await safeFirebaseOperation(
            () => withTimeout(setDoc(settingsDocRef, {
              maintenanceMode: false,
              websiteTitle: 'VATCalc',
              websiteLogo: null,
              socialLinks: [],
              homepageContent: '',
              footerTopContent: '',
              heroHeading: '',
              heroDescription: '',
              createdAt: new Date().toISOString(),
            }), 3000, 'Create initial document'),
            'Create initial document'
          );
        }

        // Check again if component is still mounted before setting up listener
        if (!isMountedRef.current) return;

        // Set up the global real-time listener with AbortController
        const abortController = new AbortController();
        
        const { safeListener, cleanup } = safeFirebaseListener(
          (doc) => {
            if (abortController.signal.aborted || !isMountedRef.current) return;
            
            if (doc.exists()) {
              const data = doc.data();
              globalSettings = {
                ...globalSettings,
                maintenanceMode: data.maintenanceMode || false,
                websiteTitle: data.websiteTitle || 'VATCalc',
                websiteLogo: data.websiteLogo || null,
                socialLinks: data.socialLinks || [],
                homepageContent: data.homepageContent || '',
                footerTopContent: data.footerTopContent || '',
                heroHeading: data.heroHeading || '',
                heroDescription: data.heroDescription || '',
              };
              
              // Update all components using the context
              if (isMountedRef.current) {
                setSettings(globalSettings);
              }
            }
          },
          () => {
            // Cleanup function
            if (!abortController.signal.aborted) {
              abortController.abort();
            }
          },
          'Settings listener'
        );

        // Set up the listener with proper error handling
        const unsubscribe = onSnapshot(settingsDocRef, safeListener, (error) => {
          if (abortController.signal.aborted || !isMountedRef.current) return;
          
          if (error.name !== 'AbortError' && error.code !== 'aborted' && !error.message?.includes('aborted')) {
            console.error('Settings listener error:', error);
          }
        });

        globalListener = () => {
          try {
            abortController.abort();
            cleanup();
            unsubscribe();
          } catch (error) {
            if (error.name !== 'AbortError' && error.code !== 'aborted') {
              console.error('Error cleaning up global listener:', error);
            }
          }
        };

        // Final check before setting state
        if (isMountedRef.current) {
          setFirebaseAvailable(true);
          setLoading(false);
          setSettings(globalSettings);
        }

      } catch (error) {
        if (isMountedRef.current) {
          console.error('Error initializing Firebase:', error);
          setFirebaseAvailable(false);
          setLoading(false);
        }
      }
    };

    // Add a small delay to prevent immediate Firebase calls
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        initializeFirebase();
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
      if (listenerCleanupRef.current) {
        listenerCleanupRef.current();
      }
    };
  }, []);

  // Save settings to Firebase
  const saveSettings = async (newSettings) => {
    if (saving) {
      console.warn('Save operation already in progress');
      return;
    }

    setSaving(true);
    
    try {
      const settingsToSave = {
        ...globalSettings,
        ...newSettings,
        updatedAt: new Date().toISOString(),
      };

      // Update global settings immediately
      globalSettings = { ...globalSettings, ...newSettings };
      setSettings(globalSettings);

      if (firebaseAvailable) {
        await safeFirebaseOperation(
          () => withTimeout(
            setDoc(settingsDocRef, settingsToSave, { merge: true }),
            5000,
            'Save settings'
          ),
          'Save settings to Firebase'
        );
      } else {
        // Fallback to localStorage if Firebase is not available
        localStorage.setItem('websiteSettings', JSON.stringify(settingsToSave));
      }
      
    } catch (error) {
      console.error('Error saving website settings:', error);
      // Try localStorage fallback
      try {
        const settingsToSave = {
          ...globalSettings,
          ...newSettings,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('websiteSettings', JSON.stringify(settingsToSave));
        setFirebaseAvailable(false);
      } catch (fallbackError) {
        console.error('Fallback save also failed:', fallbackError);
        throw new Error(`Failed to save settings: ${error.message}`);
      }
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
      const newSettings = {
        ...globalSettings,
        websiteLogo: null,
        logoFile: null,
        updatedAt: new Date().toISOString(),
      };

      // Update global settings immediately
      globalSettings = { ...globalSettings, websiteLogo: null, logoFile: null };
      setSettings(globalSettings);

      // Save to Firebase or localStorage
      if (firebaseAvailable) {
        await safeFirebaseOperation(
          () => withTimeout(
            setDoc(settingsDocRef, newSettings, { merge: true }),
            5000,
            'Delete logo'
          ),
          'Delete logo from Firebase'
        );
      } else {
        // Fallback to localStorage
        localStorage.setItem('websiteSettings', JSON.stringify(newSettings));
      }

      return true; // Success
    } catch (error) {
      console.error('Error deleting logo:', error);
      // Try localStorage fallback
      try {
        const newSettings = {
          ...globalSettings,
          websiteLogo: null,
          logoFile: null,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('websiteSettings', JSON.stringify(newSettings));
        setFirebaseAvailable(false);
        return true;
      } catch (fallbackError) {
        console.error('Fallback delete also failed:', fallbackError);
        throw new Error(`Failed to delete logo: ${error.message}`);
      }
    }
  };

  const value = {
    settings,
    loading,
    saving,
    firebaseAvailable,
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
