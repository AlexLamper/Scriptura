import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '../app/i18n/client';
import { cookieName } from '../app/i18n/settings';

export interface GeneralSettings {
  language: string;
  translation: string;
}

export function useGeneralSettings() {
  const { i18n } = useTranslation();
  const router = useRouter();
  
  // Language is derived from i18n, translation is state
  const [translation, setTranslation] = useState('kjv'); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/user/preferences');
        if (res.ok) {
          const data = await res.json();
          if (data.preferences) {
            // We don't set language here because i18n handles it via cookie
            // But if we wanted to sync DB language to i18n on load if cookie is missing...
            // For now, let's just trust i18n for language state
            if (data.preferences.translation) {
                setTranslation(data.preferences.translation);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<GeneralSettings>) => {
    // Handle Language Change
    if (newSettings.language && newSettings.language !== i18n.resolvedLanguage) {
        document.cookie = `${cookieName}=${newSettings.language}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
        i18n.changeLanguage(newSettings.language);
        router.refresh();
    }

    // Handle Translation Change
    if (newSettings.translation) {
        setTranslation(newSettings.translation);
    }

    // Save to DB
    try {
      await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  return { 
      settings: {
          language: i18n.resolvedLanguage || 'en',
          translation
      }, 
      updateSettings, 
      loading 
  };
}
