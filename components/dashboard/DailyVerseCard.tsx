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
    setLoading(true);
    setError(null);
    setVerse(null);
    setRawResponse(null);
    setStatus(null);
    const endpoint = "https://www.bijbel-api.nl/api/daytext";
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
        if (lng === "nl" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version });
        } else if (lng === "en" && data.verse && data.verse.details && data.verse.details.text) {
          setVerse({ text: data.verse.details.text, reference: data.verse.details.reference, translation: "KJV" });
        } else if (lng === "de" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version });
        } else if (data.text) {
          setVerse({ text: data.text });
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
    <Card className="p-6 bg-white shadow-sm rounded-lg" style={{ fontFamily: 'Montserrat, Nunito, Lato, Arial, sans-serif' }}>
      <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-blue-600 w-5 h-5" />
          {t("daily_verse_title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-0">
        {loading && <p className="text-gray-500 text-base py-4">{t("loading")}</p>}
        {error && (
          <div className="text-red-600 text-base py-4">
            <div>{error}</div>
            {status && <div>Status: {status}</div>}
            {rawResponse && <pre className="text-xs text-red-400 bg-red-50 p-2 rounded mt-2 max-w-full overflow-x-auto">{JSON.stringify(rawResponse, null, 2)}</pre>}
          </div>
        )}
        {verse && (
          <div className="w-full">
            <blockquote className="text-2xl text-gray-800 mb-2 italic leading-relaxed">“{verse.text}”</blockquote>
            {verse.reference && (
              <>
                <p className="text-sm font-medium text-blue-700">
                  {verse.reference}
                  {verse.translation && (
                    <span className="ml-2 text-xs text-gray-500">({verse.translation})</span>
                  )}
                </p>
                {/* Biblebook, chapter, verse extraction with debug info */}
                {(() => {
                  // Nieuwe robuuste parsing
                  let book = null, chapter = null, verseNum = null, debug = {};
                  try {
                    // Voorbeeld: "Genesis 1:3", "1 Johannes 4:8", "Psalmen 23"
                    const ref = verse.reference.trim();
                    // Zoek laatste spatie, alles ervoor is boek, alles erna is hoofdstuk/vers
                    const lastSpace = ref.lastIndexOf(" ");
                    if (lastSpace > 0) {
                      book = ref.substring(0, lastSpace);
                      const chapVerse = ref.substring(lastSpace + 1);
                      // chapVerse kan "1:3" of "23" zijn
                      if (chapVerse.includes(":")) {
                        const [ch, v] = chapVerse.split(":");
                        chapter = ch;
                        verseNum = v;
                      } else {
                        chapter = chapVerse;
                        verseNum = null;
                      }
                    } else {
                      // Geen spatie, alles is boek
                      book = ref;
                    }
                    debug = {ref, book, chapter, verseNum};
                  } catch (e) {
                    debug = {error: String(e), ref: verse.reference};
                  }
                  return (
                    <div className="text-xs text-gray-400 mt-1">
                      <span className="mr-2">Boek: <span className="font-medium text-gray-600">{book ?? '-'}</span></span>
                      <span className="mr-2">Hoofdstuk: <span className="font-medium text-gray-600">{chapter ?? '-'}</span></span>
                      <span>Vers: <span className="font-medium text-gray-600">{verseNum ?? '-'}</span></span>
                      <details className="mt-1">
                        <summary className="cursor-pointer text-gray-300">[debug]</summary>
                        <div className="text-gray-400">debug: <pre>{JSON.stringify(debug, null, 2)}</pre></div>
                      </details>
                    </div>
                  );
                })()}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
