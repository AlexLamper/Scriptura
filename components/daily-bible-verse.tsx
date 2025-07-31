"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";
import { BookOpen } from "lucide-react"; // Je kunt een ander icoon gebruiken of verwijderen

interface DailyBibleVerseProps {
  params: {
    lng: string;
  };
}

interface Verse {
  reference?: string;
  text: string;
  translation?: string;
}

export default function DailyBibleVerse({ params: { lng } }: DailyBibleVerseProps) {
  console.log('🚀 DailyBibleVerse component RENDERED with lng:', lng);
  
  const { t } = useTranslation(lng, "daily");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('🔄 DailyBibleVerse component state:', { verse, loading, error });

  useEffect(() => {
    console.log('🎯 DailyBibleVerse useEffect triggered');
    console.log('🌍 Current language (lng):', lng);
    console.log('🔧 Translation function t:', typeof t);
    
    setLoading(true);
    setError(null);
    setVerse(null);
    
    // Determine the API URL based on language
    let apiUrl = '';
    if (lng === 'en' || lng === 'de') {
      apiUrl = 'https://www.scriptura-api.com/api/daytext?version=asv';
      console.log('🇺🇸 Using ASV API for language:', lng);
    } else {
      apiUrl = 'https://www.scriptura-api.com/api/daytext';
      console.log('🇳🇱 Using default statenvertaling API for language:', lng);
    }
    
    console.log('🌐 Final API URL:', apiUrl);
    console.log('📡 Starting fetch request...');
    
    fetch(apiUrl)
      .then(async (res) => {
        console.log('Fetch response status:', res.status);
        console.log('Fetch response ok:', res.ok);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.log('Fetch error response:', errorText);
          throw new Error(errorText || t("fetch_failed"));
        }
        return res.json();
      })
      .then((data) => {
        console.log('=== DAILY VERSE API RESPONSE ===');
        console.log('Raw data:', data);
        console.log('Data type:', typeof data);
        console.log('Data keys:', Object.keys(data || {}));
        console.log('Language:', lng);
        console.log('API URL used:', apiUrl);
        console.log('=================================');
        
        // Handle ASV response format for English/German
        if ((lng === "en" || lng === "de") && data.version && data.text && data.book && data.chapter && data.verse) {
          console.log('Using ASV response format');
          const reference = `${data.book} ${data.chapter}:${data.verse}`;
          setVerse({ text: data.text, reference: reference, translation: data.version.toUpperCase() });
        }
        // Handle Dutch statenvertaling response format
        else if (lng === "nl" && data.text && data.reference) {
          console.log('Using Dutch statenvertaling response format');
          setVerse({ text: data.text, reference: data.reference, translation: data.version || "Statenvertaling" });
        }
        // Fallback for other response formats
        else if (data.verse && data.verse.details && data.verse.details.text) {
          console.log('Using fallback verse.details response format');
          setVerse({ text: data.verse.details.text, reference: data.verse.details.reference, translation: lng === "en" || lng === "de" ? "ASV" : "Statenvertaling" });
        } else if (data.text) {
          console.log('Using minimal fallback with just text');
          setVerse({ text: data.text, translation: lng === "en" || lng === "de" ? "ASV" : "Statenvertaling" });
        } else {
          console.error('=== UNEXPECTED API RESPONSE FORMAT ===');
          console.error('Data:', data);
          console.error('Language:', lng);
          console.error('API URL:', apiUrl);
          console.error('====================================');
          throw new Error(t("fetch_failed"));
        }
      })
      .catch((err) => {
        console.error('=== DAILY VERSE FETCH ERROR ===');
        console.error('Error:', err);
        console.error('Error message:', err.message);
        console.error('Language:', lng);
        console.error('API URL:', apiUrl);
        console.error('===============================');
        setError(err.message || t("fetch_failed"));
      })
      .finally(() => {
        console.log('Fetch completed, setting loading to false');
        setLoading(false);
      });
  }, [lng, t]);

  console.log('🎨 DailyBibleVerse about to RENDER with verse:', verse);
  
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md p-6 max-w-3xl mx-auto my-6 transition-colors">
      <div className="flex items-center mb-4">
        <BookOpen className="text-blue-600 dark:text-blue-400 w-6 h-6 mr-2" />
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
          {t("daily_verse_title") || "Dagelijkse Bijbeltekst"}
        </h2>
      </div>

      {loading && <p className="text-zinc-600 dark:text-zinc-300">{t("loading")}</p>}

      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

      {verse && (
        <div>
          <blockquote className="text-lg italic text-zinc-800 dark:text-zinc-200 mb-4 leading-relaxed">
            “{verse.text}”
          </blockquote>

          {verse.reference && (
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              {verse.reference}
              {verse.translation && (
                <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                  ({verse.translation})
                </span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
