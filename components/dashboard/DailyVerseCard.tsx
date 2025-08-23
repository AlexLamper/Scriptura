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
    <Card className="h-full shadow-sm border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
      <CardContent className="h-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{t("daily_verse_title")}</h3>
        </div>
        {loading && <p className="text-gray-600 dark:text-gray-400 text-lg py-6 font-medium">{t("loading")}</p>}
        {error && (
          <div className="text-red-700 text-base py-4 bg-red-50 p-4 rounded-lg border border-red-200 dark:bg-red-950 dark:border-red-700 dark:text-red-300">
            <div className="font-semibold mb-2">Error: {error}</div>
            {status && <div className="text-sm">Status Code: {status}</div>}
            {rawResponse && <pre className="text-xs text-red-500 bg-red-100 p-3 rounded mt-3 max-w-full overflow-x-auto border border-red-200 dark:bg-red-800 dark:text-red-200 dark:border-red-600">{JSON.stringify(rawResponse, null, 2)}</pre>}
          </div>
        )}
        {verse && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <blockquote className="text-gray-800 mb-3 text-sm leading-relaxed break-words">
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
                    <cite className="text-xs text-gray-500 font-medium">{refString || '-'} ({verse.translation})</cite>
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