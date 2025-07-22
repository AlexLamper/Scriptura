"use client"

import { useEffect, useState } from "react";
import { useTranslation } from "../app/i18n/client";

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
    // Haal het juiste endpoint uit de vertaling
    const endpoint = t("api_endpoint");
    fetch(endpoint)
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || t("fetch_failed"));
        }
        return res.json();
      })
      .then((data) => {
        // Verschillende APIs hebben verschillende response formats
        if (lng === "nl" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version });
        } else if (lng === "en" && data.verse && data.verse.details && data.verse.details.text) {
          setVerse({ text: data.verse.details.text, reference: data.verse.details.reference, translation: "KJV" });
        } else if (lng === "de" && data.text && data.reference) {
          setVerse({ text: data.text, reference: data.reference, translation: data.version });
        } else if (data.text) {
          setVerse({ text: data.text });
        } else {
          throw new Error(t("fetch_failed"));
        }
      })
      .catch((err) => {
        setError(err.message || t("fetch_failed"));
      })
      .finally(() => setLoading(false));
  }, [lng, t]);

  return (
    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 p-4 rounded-lg shadow mb-4">
      {loading && <p>{t("loading")}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {verse && (
        <>
          <p className="text-lg font-semibold mb-1">{verse.reference} {verse.translation && <span className="text-xs text-gray-500">({verse.translation})</span>}</p>
          <p>{verse.text}</p>
        </>
      )}
    </div>
  );
}
