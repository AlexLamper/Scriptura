'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

interface CommentaryComponentProps {
  book: string;
  chapter: number;
  source?: string; // e.g. matthew-henry
}

interface CommentaryData {
  [verse: string]: string;
}

// ✅ Map Dutch → English book names for the commentary API
const bookNameMap: Record<string, string> = {
  // OT
  'Genesis': 'Genesis',
  'Exodus': 'Exodus',
  'Leviticus': 'Leviticus',
  'Numeri': 'Numbers',
  'Deuteronomium': 'Deuteronomy',
  'Jozua': 'Joshua',
  'Richteren': 'Judges',
  // Statenvertaling has 'Richtere' for some reason
  'Richtere': 'Judges',
  'Ruth': 'Ruth',
  '1 Samuel': '1 Samuel',
  '2 Samuel': '2 Samuel',
  '1 Koningen': '1 Kings',
  '2 Koningen': '2 Kings',
  '1 Kronieken': '1 Chronicles',
  '2 Kronieken': '2 Chronicles',
  'Ezra': 'Ezra',
  'Nehemia': 'Nehemiah',
  'Ester': 'Esther',
  'Job': 'Job',
  'Psalmen': 'Psalms',
  'Spreuken': 'Proverbs',
  'Prediker': 'Ecclesiastes',
  'Hooglied': 'Song of Solomon',
  'Jesaja': 'Isaiah',
  'Jeremia': 'Jeremiah',
  'Klaagliederen': 'Lamentations',
  'Ezechiël': 'Ezekiel',
  'Daniël': 'Daniel',
  'Hosea': 'Hosea',
  'Joël': 'Joel',
  'Amos': 'Amos',
  'Obadja': 'Obadiah',
  'Jona': 'Jonah',
  'Micha': 'Micah',
  'Nahum': 'Nahum',
  'Habakuk': 'Habakkuk',
  'Zefanja': 'Zephaniah',
  'Haggai': 'Haggai',
  'Zacharia': 'Zechariah',
  'Maleachi': 'Malachi',

  // NT
  'Mattheüs': 'Matthew',
  'Markus': 'Mark',
  'Lukas': 'Luke',
  'Johannes': 'John',
  'Handelingen': 'Acts',
  'Romeinen': 'Romans',
  '1 Korintiërs': '1 Corinthians',
  '2 Korintiërs': '2 Corinthians',
  'Galaten': 'Galatians',
  'Efeziërs': 'Ephesians',
  'Filippenzen': 'Philippians',
  'Kolossenzen': 'Colossians',
  '1 Tessalonicenzen': '1 Thessalonians',
  '2 Tessalonicenzen': '2 Thessalonians',
  '1 Timotheüs': '1 Timothy',
  '2 Timotheüs': '2 Timothy',
  'Titus': 'Titus',
  'Filemon': 'Philemon',
  'Hebreeën': 'Hebrews',
  'Jakobus': 'James',
  '1 Petrus': '1 Peter',
  '2 Petrus': '2 Peter',
  '1 Johannes': '1 John',
  '2 Johannes': '2 John',
  '3 Johannes': '3 John',
  'Judas': 'Jude',
  'Openbaring': 'Revelation',
};

const CommentaryComponent: React.FC<CommentaryComponentProps> = ({
  book,
  chapter,
  source = 'matthew-henry',
}) => {
  const [commentary, setCommentary] = useState<CommentaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  useEffect(() => {
    const fetchCommentary = async () => {
      if (!book || !chapter) return;

      setLoading(true);
      setError(null);
      setCommentary(null);

      try {
        const englishBook = bookNameMap[book] || book;

        const params = new URLSearchParams({
          source,
          book: englishBook,
          chapter: chapter.toString(),
        });

        const url = `${API_BASE_URL}/commentary?${params.toString()}`;

        const res = await fetch(url);

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(
            `API error: ${res.status} ${res.statusText} - ${errText}`
          );
        }

        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error('No commentary found for this chapter.');
        }

        setCommentary(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error while fetching commentary.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCommentary();
  }, [book, chapter, source]);

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#798777] mx-auto mb-4" />
            <p className="font-['Inter'] text-gray-700 text-base font-medium dark:text-gray-200">
              Commentaar laden...
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center max-w-md">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p className="font-['Merriweather'] text-red-600 font-semibold mb-2 text-base dark:text-red-400">
              Error loading commentary
            </p>
            <p className="font-['Inter'] text-gray-700 dark:text-gray-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Commentary */}
      {!loading && !error && commentary && (
        <Accordion
          type="single"
          collapsible={false}
          defaultValue={`verse-${Object.keys(commentary)[0]}`}
          className="w-full space-y-2"
        >
          {Object.entries(commentary).map(([key, text]) => (
            <AccordionItem
              key={key}
              value={`verse-${key}`}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232325]"
            >
              <AccordionTrigger className="px-4 py-2 font-['Merriweather'] font-semibold text-[#262626] dark:text-gray-100 hover:no-underline">
                Verse {key}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3 font-['Inter'] text-gray-700 text-sm leading-relaxed dark:text-gray-200 whitespace-pre-line">
                {text}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {/* Empty state */}
      {!loading && !error && !commentary && (
        <div className="py-8 text-center text-gray-500 dark:text-gray-300 text-sm">
          No commentary available for this chapter.
        </div>
      )}
    </div>
  );
};

export default CommentaryComponent;
