'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface CommentaryComponentProps {
  book: string;
  chapter: number;
  source?: string; // e.g. matthew-henry
  height?: number;
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
  height
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
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] dark:text-[#9aaa98] mx-auto mb-4" />
          <p className="font-inter text-gray-700 text-base font-medium dark:text-muted-foreground">
            Commentaar laden...
          </p>
        </div>
      </div>
    );
  }

  {/* Error state */}
  if (error) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-card">
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="font-merriweather text-red-600 font-semibold mb-2 text-base dark:text-red-400">
            Error loading commentary
          </p>
          <p className="font-inter text-gray-700 dark:text-muted-foreground text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  {/* Empty state */}
  if (!commentary) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-card">
        <CardContent className="py-12 text-center text-gray-500 dark:text-muted-foreground text-sm">
          <p className="font-inter">Geen commentaar beschikbaar voor dit hoofdstuk.</p>
        </CardContent>
      </Card>
    );
  }

  {/* Commentary Content */}
  return (
    <Card className={`border-0 shadow-none rounded-none dark:bg-card ${height ? 'h-full flex flex-col' : ''}`}>
      <CardHeader className="px-0 flex-none">
        <CardTitle className="flex items-center gap-2 font-merriweather text-[#262626] dark:text-foreground">
          <MessageCircle className="w-6 h-6 text-[#798777] dark:text-[#9aaa98]" />
          Bijbelcommentaar: {book} {chapter}
        </CardTitle>
        <p className="font-inter text-sm text-gray-600 dark:text-muted-foreground">
          Verdieping en uitleg bij de geselecteerde passage uit de Bijbel.
        </p>
      </CardHeader>
      <CardContent className={`px-0 pt-0 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary scrollbar-track-transparent ${height ? 'flex-1 min-h-0' : 'max-h-[600px] lg:max-h-[calc(100vh-300px)]'}`}>
        {Object.entries(commentary).map(([key, text]) => (
          <div key={key} className="border-b border-gray-100 dark:border-border pb-4 last:border-0 pr-2">
            <h3 className="font-merriweather font-semibold text-[#262626] dark:text-foreground mb-2">
              Vers {key}
            </h3>
            <p className="font-inter text-gray-700 text-sm leading-relaxed dark:text-foreground whitespace-pre-line">
              {text}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentaryComponent;
