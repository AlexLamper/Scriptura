'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface CommentaryComponentProps {
  book: string;
  chapter: number;
  source?: string;
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
  source: initialSource = 'matthew-henry',
  height
}) => {
  const [commentary, setCommentary] = useState<CommentaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState(initialSource);

  const API_BASE_URL = '/api';

  // Fetch available commentaries
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/commentaries`);
        if (res.ok) {
          const sources = await res.json();
          setAvailableSources(sources);
          // If initialSource is not in the list, default to the first one or keep it
          if (sources.length > 0 && !sources.includes(initialSource)) {
             // Don't override if it's not loaded yet, but good to have logic here
          }
        }
      } catch (e) {
        console.error("Failed to fetch commentary sources", e);
      }
    };
    fetchSources();
  }, []);

  useEffect(() => {
    const fetchCommentary = async () => {
      if (!book || !chapter) return;

      setLoading(true);
      setError(null);
      setCommentary(null);

      try {
        const englishBook = bookNameMap[book] || book;

        const params = new URLSearchParams({
          source: selectedSource,
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
  }, [book, chapter, selectedSource]);

  const formatSourceLabel = (src: string) => {
      return src.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className={`border-0 shadow-none rounded-none dark:bg-card ${height ? 'h-full flex flex-col' : ''}`}>
      {/* Source Selector */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-100 dark:border-border flex items-center justify-between bg-gray-50/50 dark:bg-card">
        <span className="text-sm font-medium text-gray-600 dark:text-muted-foreground">Source:</span>
        <div className="relative">
            <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="appearance-none bg-white dark:bg-secondary border border-gray-200 dark:border-border rounded-md py-1 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#798777] dark:text-foreground"
            >
                {availableSources.length > 0 ? (
                    availableSources.map(src => (
                        <option key={src} value={src}>{formatSourceLabel(src)}</option>
                    ))
                ) : (
                    <option value={selectedSource}>{formatSourceLabel(selectedSource)}</option>
                )}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Content Area */}
      <CardContent className={`px-4 sm:px-6 pt-4 pb-24 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary scrollbar-track-transparent ${height ? 'flex-1 min-h-0' : 'max-h-[600px] lg:max-h-[calc(100vh-300px)]'}`}>
        {loading ? (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#798777] dark:text-[#9aaa98] mx-auto mb-4" />
                <p className="font-inter text-gray-700 text-base font-medium dark:text-muted-foreground">
                    Commentaar laden...
                </p>
                </div>
            </div>
        ) : error ? (
            <div className="py-12 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <p className="font-merriweather text-red-600 font-semibold mb-2 text-base dark:text-red-400">
                    Error loading commentary
                </p>
                <p className="font-inter text-gray-700 dark:text-muted-foreground text-sm">{error}</p>
            </div>
        ) : !commentary ? (
            <div className="py-12 text-center text-gray-500 dark:text-muted-foreground text-sm">
                <p className="font-inter">Geen commentaar beschikbaar voor dit hoofdstuk.</p>
            </div>
        ) : (
            Object.entries(commentary).map(([key, text]) => (
            <div key={key} className="border-b border-gray-100 dark:border-border pb-4 last:border-0 pr-2">
                <h3 className="font-merriweather font-semibold text-[#262626] dark:text-foreground mb-2">
                {key === 'intro' ? 'Inleiding' : `Vers ${key}`}
                </h3>
                <div 
                    className="font-inter text-gray-700 text-base leading-relaxed dark:text-foreground whitespace-pre-line prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            </div>
            ))
        )}
      </CardContent>
    </Card>
  );
};

export default CommentaryComponent;
