"use client";

import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "../../app/i18n/client";
import { Calendar } from "lucide-react";

interface DailyVerseCardProps {
  lng: string;
}

interface Verse {
  reference?: string;
  text: string;
  translation?: string;
}

export function DailyVerseCard({ lng }: DailyVerseCardProps) {
  const { t } = useTranslation(lng, "dailyverse");
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Debug state
  const [rawResponse, setRawResponse] = useState<unknown>(null);
  const [status, setStatus] = useState<number | null>(null);
  
  useEffect(() => {
    // Fallback to 'en' if lng is empty or undefined
    const language = lng && lng.trim() !== '' ? lng : 'en';
    console.log('DailyVerseCard: Language detected:', language, '(original:', lng, ')');
    
    setLoading(true);
    setError(null);
    setVerse(null);
    setRawResponse(null);
    setStatus(null);
    
    // Determine API endpoint based on language
    let endpoint = '';
    if (language === 'en' || language === 'de') {
      endpoint = "https://www.scriptura-api.com/api/daytext?version=asv";
      console.log('DailyVerseCard: Using ASV for', language);
    } else {
      endpoint = "https://www.scriptura-api.com/api/daytext";
      console.log('DailyVerseCard: Using Statenvertaling for', language);
    }
    
    fetch(endpoint)
      .then(async (res) => {
        setStatus(res.status);
        let json = null;
        try {
          json = await res.json();
        } catch (e) {
          throw new Error("Failed to parse JSON: " + e);
        }
        setRawResponse(json);
        if (!res.ok) {
          throw new Error("API error: " + res.status + " " + JSON.stringify(json));
        }
        return json;
      })
      .then((data) => {
        console.log('DailyVerseCard: API response for', language, ':', data);
        
        // Handle ASV response format for English/German
        if ((language === "en" || language === "de") && data.version && data.text && data.book && data.chapter && data.verse) {
          const reference = `${data.book} ${data.chapter}:${data.verse}`;
          setVerse({ text: data.text, reference: reference, translation: data.version.toUpperCase() });
        }
        // Handle Dutch statenvertaling response format
        else if (language === "nl" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version || "Statenvertaling" });
        }
        // Fallback for other formats
        else if (data.verse && data.verse.details && data.verse.details.text) {
          setVerse({ text: data.verse.details.text, reference: data.verse.details.reference, translation: language === "en" || language === "de" ? "ASV" : "Statenvertaling" });
        } else if (data.text) {
          setVerse({ text: data.text, translation: language === "en" || language === "de" ? "ASV" : "Statenvertaling" });
        } else {
          throw new Error("No recognizable verse in response: " + JSON.stringify(data));
        }
      })
      .catch((err) => {
        setError((err && err.message) ? err.message : String(err));
      })
      .finally(() => setLoading(false));
  }, [lng]);

  return (
  <Card className="h-full shadow-lg dark:shadow-gray-900/20 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#23263a]">
      <CardContent className="h-full px-6 py-6 sm:px-8 sm:py-8 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-[#798777] flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-['Merriweather'] text-xl font-bold text-[#262626] dark:text-white">{t("daily_verse_title")}</h3>
        </div>
        {loading && <p className="font-['Inter'] text-gray-600 dark:text-gray-400 text-lg py-6 font-medium">{t("loading")}</p>}
        {error && (
          <div className="text-red-700 text-base py-4 bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-700 dark:text-red-300">
            <div className="font-['Inter'] font-semibold mb-2">Error: {error}</div>
            {status && <div className="font-['Inter'] text-sm">Status Code: {status}</div>}
            {rawResponse && <pre className="font-['Inter'] text-xs text-red-500 bg-red-100 dark:bg-red-800 p-3 mt-3 max-w-full overflow-x-auto border border-red-200 dark:border-red-600 dark:text-red-200">{JSON.stringify(rawResponse, null, 2)}</pre>}
          </div>
        )}
        {verse && (
          <div className="bg-gray-50 dark:bg-[#181b23] p-6 border border-gray-200 dark:border-gray-600">
            <blockquote className="font-['Inter'] text-[#262626] dark:text-white mb-4 text-base leading-relaxed break-words">
              &ldquo;{verse.text}&rdquo;
            </blockquote>
            {/* Show reference and translation */}
            {rawResponse && typeof rawResponse === 'object' && (
              (() => {
                type ApiResponse = {
                  book?: string;
                  chapter?: number;
                  verse?: number;
                  [key: string]: unknown;
                };
                const resp = rawResponse as ApiResponse;
                const book = resp.book ?? null;
                const chapter = resp.chapter ?? null;
                const verseNum = resp.verse ?? null;
                if (book || chapter || verseNum) {
                  // Build string: 'book chapter:verse' (chapter and verse optional)
                  let refString = book ? book : '';
                  if (chapter) {
                    refString += (refString ? ' ' : '') + chapter;
                    if (verseNum) {
                      refString += `:${verseNum}`;
                    }
                  }
                  return (
                    <cite className="font-['Inter'] text-sm text-gray-500 dark:text-gray-400 font-medium">{refString || '-'} ({verse.translation})</cite>
                  );
                }
                return null;
              })()
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}