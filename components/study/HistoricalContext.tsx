'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface HistoricalContextProps {
  book: string;
  chapter: number;
  t: (key: string) => string;
}

export default function HistoricalContext({ book, chapter, t }: HistoricalContextProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency with other components
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [book, chapter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] dark:text-[#9aaa98] mx-auto mb-4" />
          <p className="font-inter text-gray-700 text-base font-medium dark:text-muted-foreground">
            Historische context laden...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none rounded-none dark:bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-merriweather text-[#262626] dark:text-foreground">
          <Clock className="w-6 h-6 text-[#798777] dark:text-[#9aaa98]" />
          {t('historical.title')} {book} {chapter}
        </CardTitle>
        <p className="font-inter text-sm text-gray-600 dark:text-muted-foreground">
          Ontdek de historische en culturele achtergrond van deze passage.
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-merriweather font-semibold mb-3 text-[#262626] dark:text-foreground flex items-center gap-2">
              <div className="w-6 h-6 bg-[#798777] text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              {t('historical.time_period')}
            </h4>
            <p className="font-inter text-sm text-gray-700 dark:text-muted-foreground leading-relaxed pl-8">
              {t('historical.time_period_text')}
            </p>
          </div>
          
          <div>
            <h4 className="font-merriweather font-semibold mb-3 text-[#262626] dark:text-foreground flex items-center gap-2">
              <div className="w-6 h-6 bg-[#798777] text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              {t('historical.cultural_background')}
            </h4>
            <p className="font-inter text-sm text-gray-700 dark:text-muted-foreground leading-relaxed pl-8">
              {t('historical.cultural_background_text')}
            </p>
          </div>
          
          <div>
            <h4 className="font-merriweather font-semibold mb-3 text-[#262626] dark:text-foreground flex items-center gap-2">
              <div className="w-6 h-6 bg-[#798777] text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              {t('historical.literary_context')}
            </h4>
            <p className="font-inter text-sm text-gray-700 dark:text-muted-foreground leading-relaxed pl-8">
              {t('historical.literary_context_text')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}