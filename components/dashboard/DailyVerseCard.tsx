"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { useTranslation } from "../../app/i18n/client";
import { BookOpen } from "lucide-react";

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
    <Card className="p-8 shadow-sm rounded-2xl border border-gray-200 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <BookOpen className="text-indigo-600 lg:w-6 lg:h-6 w-5 h-5" />
          {t("daily_verse_title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-0">
        {loading && <p className="text-gray-600 dark:text-gray-400 text-lg py-6 font-medium">{t("loading")}</p>}
        {error && (
          <div className="text-red-700 text-base py-4 bg-red-50 p-4 rounded-lg border border-red-200 dark:bg-red-950 dark:border-red-700 dark:text-red-300">
            <div className="font-semibold mb-2">Error: {error}</div>
            {status && <div className="text-sm">Status Code: {status}</div>}
            {rawResponse && <pre className="text-xs text-red-500 bg-red-100 p-3 rounded mt-3 max-w-full overflow-x-auto border border-red-200 dark:bg-red-800 dark:text-red-200 dark:border-red-600">{JSON.stringify(rawResponse, null, 2)}</pre>}
          </div>
        )}
        {verse && (
          <div className="w-full">
            <blockquote className="text-[1.24rem] md:text-2xl text-gray-700 dark:text-gray-200 mb-4 leading-relaxed relative" style={{ fontFamily: 'Montserrat, Nunito, Lato, Arial, sans-serif' }}>
              <span className="absolute top-0 left-0 text-5xl text-gray-300 dark:text-gray-600 -translate-x-4 -translate-y-4">“</span>
              <span className="text-[1.24rem]">{verse.text}</span>
              <span className="absolute bottom-0 right-0 text-5xl text-gray-300 dark:text-gray-600 translate-x-4 translate-y-4">”</span>
            </blockquote>
            {/* Toon book, chapter, verse indien aanwezig in the API-respons */}
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
                  // Bouw string: 'book chapter:verse' (chapter en verse optioneel)
                  let refString = book ? book : '';
                  if (chapter) {
                    refString += (refString ? ' ' : '') + chapter;
                    if (verseNum) {
                      refString += `:${verseNum}`;
                    }
                  }
                  return (
                    <div className="lg:text-md lg:text-gray-400 text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{refString || '-'} ({verse.translation})</span>
                    </div>
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