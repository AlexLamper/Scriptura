import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

type Props = {
  version: string | null;
  book: string;
  chapter: number;
  maxChapter: number;
};

type VerseData = { [key: string]: string };

export default function ChapterViewer({
  version,
  book,
  chapter,
  maxChapter,
}: Props) {
  const [verses, setVerses] = useState<VerseData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'https://www.bijbel-api.nl/api';

  console.groupCollapsed('--- ChapterViewer Render ---');
  console.log('Props received by ChapterViewer:', {
    version,
    book,
    chapter,
    maxChapter,
  });
  console.groupEnd(); // End ChapterViewer Render group

  useEffect(() => {
    console.groupCollapsed(`useEffect: Fetching chapter content for ${book} ${chapter} (${version})`);
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);
      setVerses({}); // Clear previous verses when fetching new chapter

      try {
        const params = new URLSearchParams({
          book,
          chapter: chapter.toString(),
        });

        // Only append version if it's explicitly selected and not the default 'Statenvertaling'
        if (version && version.toLowerCase() !== 'statenvertaling') {
          params.append('version', version);
          console.log(`Appending version parameter: ${version}`);
        } else {
            console.log(`Using default version (Statenvertaling) or no version specified in API call.`);
        }

        const url = `${API_BASE_URL}/chapter?${params.toString()}`;
        console.log('API URL for chapter fetch:', url);

        const res = await fetch(url);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`API gaf een fout terug: ${res.status} ${res.statusText} - ${errorText}`);
        }

        const data = await res.json();
        console.log('Raw API response for chapter:', data);

        // API response for /api/chapter is an object like { verses: { "1": "text", "2": "text" } }
        if (!data.verses || Object.keys(data.verses).length === 0) {
          throw new Error('Geen verzen gevonden in response. Mogelijk is het hoofdstuk leeg of ongeldig.');
        }

        setVerses(data.verses);
        console.log('Successfully set verses for chapter.');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Chapter fetch error:', err.message);
        } else {
          setError('Fout bij het laden van de bijbeltekst');
          console.error('Unknown error during chapter fetch:', err);
        }
      } finally {
        setLoading(false);
        console.groupEnd(); // End useEffect: Fetching chapter content group
      }
    };

    // Only fetch if book, chapter, and version are truly selected and valid
    if (book && chapter > 0 && version) {
      fetchChapter();
    } else {
      console.log('Skipping chapter fetch in ChapterViewer: Missing book, chapter, or version.', { book, chapter, version });
      setVerses({});
      setLoading(false);
      setError(null);
    }
  }, [book, chapter, version]); // Depend on book, chapter, and version

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto mb-6" />
            <p className="text-gray-700 text-lg font-medium">Bijbeltekst laden...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center max-w-md">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-6" />
            <p className="text-red-600 font-semibold mb-3 text-lg">Fout bij laden</p>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && Object.keys(verses).length > 0 && (
        <div className="space-y-2 text-justify">
          {Object.entries(verses).map(([verseNumber, text]) => (
            <p key={verseNumber}>
              <sup className="font-semibold text-gray-700">
                {verseNumber}
              </sup>{' '}
              {text}
            </p>
          ))}
        </div>
      )}
      {!loading && !error && Object.keys(verses).length === 0 && (
          <div className="py-12 text-center text-gray-500">
            Geen bijbeltekst gevonden voor dit hoofdstuk. Probeer een ander hoofdstuk.
          </div>
      )}
    </div>
  );
}