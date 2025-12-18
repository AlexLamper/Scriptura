'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Info, AlertCircle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useTranslation } from '../../app/i18n/client';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import GeoImages from './GeoImages';
import { Separator } from '../ui/separator';

interface HistoricalContextProps {
  book: string;
  chapter: number;
  t: (key: string) => string;
}

export default function HistoricalContext({ book, chapter, t }: HistoricalContextProps) {
  const { i18n } = useTranslation('study');
  const lng = i18n.resolvedLanguage;
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
        if (!book) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const res = await fetch(`/api/summary?book=${encodeURIComponent(book)}&lang=${lng}`);
            if (res.ok) {
                const data = await res.json();
                setSummary(data.summary);
            } else {
                setSummary(null);
            }
        } catch (e) {
            console.error('Error fetching summary', e);
            setError('Failed to load summary');
        } finally {
            setIsLoading(false);
        }
    };

    fetchSummary();
  }, [book, lng]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] dark:text-[#9aaa98] mx-auto mb-4" />
          <p className="font-inter text-gray-700 text-base font-medium dark:text-muted-foreground">
            {t('historical.loading')}
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user?.isSubscribed) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-card h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-merriweather text-[#262626] dark:text-foreground">
            <Info className="w-6 h-6 text-[#798777] dark:text-[#9aaa98]" />
            {t('historical.general_info_title').replace('{{book}}', book)}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full">
            <Lock className="h-8 w-8 text-amber-600 dark:text-amber-500" />
          </div>
          <div className="max-w-md space-y-2">
            <h3 className="font-merriweather font-bold text-xl text-gray-900 dark:text-gray-100">
              {t('historical.premium_title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('historical.premium_desc')}
            </p>
          </div>
          <Button 
            onClick={() => router.push('/subscribe')}
            className="bg-[#798777] hover:bg-[#687566] text-white"
          >
            {t('historical.upgrade_button')}
          </Button>
          
          {/* Blurred Preview */}
          <div className="w-full max-w-2xl mt-8 opacity-50 blur-[2px] select-none pointer-events-none overflow-hidden h-32 relative">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#16191D] z-10"></div>
             <p className="text-left">
               {t('historical.preview_text')}
             </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none rounded-none dark:bg-card h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-merriweather text-[#262626] dark:text-foreground">
          <Info className="w-6 h-6 text-[#798777] dark:text-[#9aaa98]" />
          {t('historical.general_info_title').replace('{{book}}', book)}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary scrollbar-track-transparent">
        {error ? (
             <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <p className="text-red-500">{error}</p>
             </div>
        ) : summary ? (
            <div className="prose dark:prose-invert max-w-none font-inter text-gray-700 dark:text-foreground whitespace-pre-wrap leading-loose">
                {summary}
            </div>
        ) : (
            <p className="text-gray-500 dark:text-muted-foreground italic">
                {t('historical.no_info')}
            </p>
        )}

        <Separator className="my-6" />
        
        <div className="pb-8">
          <GeoImages book={book} chapter={chapter} className="mt-0" />
        </div>
      </CardContent>
    </Card>
  );
}
