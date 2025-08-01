import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Plus } from 'lucide-react';
import { CreateNote } from './CreateNote';

type Props = {
  version: string | null;
  book: string;
  chapter: number;
  maxChapter: number;
  language?: string;
};

type VerseData = { [key: string]: string };

interface SelectedVerse {
  verseNumber: string;
  text: string;
  reference: string;
}

export default function ChapterViewer({
  version,
  book,
  chapter,
  maxChapter,
  language = "en",
}: Props) {
  const [verses, setVerses] = useState<VerseData>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<SelectedVerse | null>(null);
  const [showCreateNote, setShowCreateNote] = useState(false);

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  console.groupCollapsed('--- ChapterViewer Render ---');
  console.log('Props received by ChapterViewer:', {
    version,
    book,
    chapter,
    maxChapter,
  });
  console.groupEnd();

  useEffect(() => {
    console.groupCollapsed(`useEffect: Fetching chapter content for ${book} ${chapter} (${version})`);
    const fetchChapter = async () => {
      setLoading(true);
      setError(null);
      setVerses({});

      try {
        const params = new URLSearchParams({
          book,
          chapter: chapter.toString(),
        });

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
        console.groupEnd();
      }
    };

    if (book && chapter > 0 && version) {
      fetchChapter();
    } else {
      console.log('Skipping chapter fetch in ChapterViewer: Missing book, chapter, or version.', { book, chapter, version });
      setVerses({});
      setLoading(false);
      setError(null);
    }
  }, [book, chapter, version]);

  const handleVerseClick = (verseNumber: string, text: string) => {
    const reference = `${book} ${chapter}:${verseNumber}`;
    setSelectedVerse({
      verseNumber,
      text,
      reference
    });
    setShowCreateNote(true);
  };

  const handleNoteSaved = () => {
    setShowCreateNote(false);
    setSelectedVerse(null);
  };

  const handleCancelNote = () => {
    setShowCreateNote(false);
    setSelectedVerse(null);
  };

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mx-auto mb-6" />
            <p className="text-gray-700 text-lg font-medium dark:text-gray-200">Bijbeltekst laden...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-24">
          <div className="text-center max-w-md">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-6" />
            <p className="text-red-600 font-semibold mb-3 text-lg dark:text-red-400">Fout bij laden</p>
            <p className="text-gray-700 dark:text-gray-200">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && Object.keys(verses).length > 0 && (
        <>
          <div className="space-y-2 text-justify">
            {Object.entries(verses).map(([verseNumber, text]) => (
              <div key={verseNumber} className="group relative">
                <p className="dark:text-gray-100 leading-relaxed">
                  <sup className="font-semibold text-gray-700 dark:text-gray-300 mr-1">
                    {verseNumber}
                  </sup>
                  <span className="hover:bg-yellow-100 dark:hover:bg-yellow-900/30 cursor-pointer transition-colors rounded px-1"
                        onClick={() => handleVerseClick(verseNumber, text)}>
                    {text}
                  </span>
                </p>
                <button
                  onClick={() => handleVerseClick(verseNumber, text)}
                  className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-1.5 shadow-md"
                  title="Add note to this verse"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Note Creation Component */}
          {showCreateNote && selectedVerse && (
            <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
              <CreateNote
                verseReference={selectedVerse.reference}
                book={book}
                chapter={chapter}
                verse={parseInt(selectedVerse.verseNumber)}
                verseText={selectedVerse.text}
                translation={version || "Statenvertaling"}
                language={language}
                onSave={handleNoteSaved}
                onCancel={handleCancelNote}
              />
            </div>
          )}
        </>
      )}

      {!loading && !error && Object.keys(verses).length === 0 && (
        <div className="py-12 text-center text-gray-500 dark:text-gray-300">
          Geen bijbeltekst gevonden voor dit hoofdstuk. Probeer een ander hoofdstuk.
        </div>
      )}
    </div>
  );
}