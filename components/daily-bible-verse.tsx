"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";
import { BookOpen } from "lucide-react";

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
  const { t } = useTranslation(lng, "daily");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    setLoading(true);
    setError(null);
    setVerse(null);
    
    // Determine the API URL based on language
    let apiUrl = '';
    if (lng === 'en' || lng === 'de') {
      apiUrl = 'https://www.scriptura-api.com/api/daytext?version=asv';
    } else {
      apiUrl = 'https://www.scriptura-api.com/api/daytext';
    }
    
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || t("fetch_failed"));
        }
        return res.json();
      })
      .then((data) => {
        // Handle ASV response format for English/German
        if ((lng === "en" || lng === "de") && data.version && data.text && data.book && data.chapter && data.verse) {
          const reference = `${data.book} ${data.chapter}:${data.verse}`;
          setVerse({ text: data.text, reference: reference, translation: data.version.toUpperCase() });
        }
        // Handle Dutch statenvertaling response format
        else if (lng === "nl" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version || "Statenvertaling" });
        }
        // Fallback for other response formats
        else if (data.verse && data.verse.details && data.verse.details.text) {
          setVerse({ text: data.verse.details.text, reference: data.verse.details.reference, translation: lng === "en" || lng === "de" ? "ASV" : "Statenvertaling" });
        } else if (data.text) {
          setVerse({ text: data.text, translation: lng === "en" || lng === "de" ? "ASV" : "Statenvertaling" });
        } else {
          throw new Error(t("fetch_failed"));
        }
      })
      .catch((err) => {
        setError(err.message || t("fetch_failed"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lng, t]);
  
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
