'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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

  {/* Loading state */}
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] mx-auto mb-4" />
          <p className="font-['Inter'] text-gray-700 text-base font-medium dark:text-gray-200">
            Commentaar laden...
          </p>
        </div>
      </div>
    );
  }

  {/* Error state */}
  if (error) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="font-['Merriweather'] text-red-600 font-semibold mb-2 text-base dark:text-red-400">
            Error loading commentary
          </p>
          <p className="font-['Inter'] text-gray-700 dark:text-gray-200 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  {/* Empty state */}
  if (!commentary) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
        <CardContent className="py-12 text-center text-gray-500 dark:text-gray-300 text-sm">
          <p className="font-['Inter']">Geen commentaar beschikbaar voor dit hoofdstuk.</p>
        </CardContent>
      </Card>
    );
  }

  {/* Commentary Content */}
  return (
    <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-['Merriweather'] text-[#262626] dark:text-white">
          <MessageCircle className="w-6 h-6 text-[#798777]" />
          Bijbelcommentaar: {book} {chapter}
        </CardTitle>
        <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
          Verdieping en uitleg bij de geselecteerde passage uit de Bijbel.
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <Accordion
          type="single"
          collapsible={false}
          defaultValue={`verse-${Object.keys(commentary)[0]}`}
          className="w-full space-y-4"
        >
          {Object.entries(commentary).map(([key, text]) => (
            <AccordionItem
              key={key}
              value={`verse-${key}`}
              className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232325]"
            >
              <AccordionTrigger className="px-4 py-3 font-['Merriweather'] font-semibold text-[#262626] dark:text-gray-100 hover:no-underline">
                Vers {key}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 font-['Inter'] text-gray-700 text-sm leading-relaxed dark:text-gray-200 whitespace-pre-line">
                {text}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CommentaryComponent;
