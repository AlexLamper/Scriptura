"use client"

import { useEffect, useState } from 'react'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import BibleSelector from '../../../components/study/BibleSelector'
import ChapterViewer from '../../../components/study/ChapterViewer'
import { useTranslation } from '../../i18n/client'

export default function ReadPage({ params }: { params: Promise<{ lng: string }> }) {
  const resolvedParams = React.use(params);
  const lng = resolvedParams.lng;
  const { t } = useTranslation(lng, 'study');
  const searchParams = useSearchParams();
  
  const [versions, setVersions] = useState<string[]>([])
  const [books, setBooks] = useState<string[]>([])
  const [chapters, setChapters] = useState<number[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState('Genesis')
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [loadingVersions, setLoadingVersions] = useState(false)
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [loadingChapters, setLoadingChapters] = useState(false)
  const [fromPlan, setFromPlan] = useState<string | null>(null)
  const [planDay, setPlanDay] = useState<number | null>(null)

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  // Function to get default version based on language
  const getDefaultVersion = (versionNames: string[], language: string): string | null => {
    if (language === 'nl') {
      return versionNames.find(v => v === 'Staten Vertaling') || versionNames[0] || null;
    } else if (language === 'en') {
      return versionNames.find(v => v === 'American Standard Version') || versionNames[0] || null;
    } else {
      return versionNames[0] || null;
    }
  };

  // Fetch versions and books on load
  useEffect(() => {
    const fetchData = async () => {
      setLoadingVersions(true);
      setLoadingBooks(true);
      try {
        // Check URL parameters for Bible reference
        const bookParam = searchParams.get('book');
        const chapterParam = searchParams.get('chapter');
        const planParam = searchParams.get('plan');
        const dayParam = searchParams.get('day');

        if (planParam) {
          setFromPlan(planParam);
        }
        if (dayParam) {
          setPlanDay(parseInt(dayParam));
        }

        // Fetch versions
        const resVersions = await fetch(`${API_BASE_URL}/versions`);
        if (!resVersions.ok) {
          throw new Error(`Failed to fetch versions: ${resVersions.status}`);
        }
        const versionData = await resVersions.json();
        const versionNames = versionData.map((v: { name: string }) => v.name);
        setVersions(versionNames);

        // Set default version based on language
        const defaultVersion = getDefaultVersion(versionNames, lng);
        setSelectedVersion(defaultVersion);

        // Fetch books
        const resBooks = await fetch(`${API_BASE_URL}/books`);
        if (!resBooks.ok) {
          throw new Error(`Failed to fetch books: ${resBooks.status}`);
        }
        const dataBooks = await resBooks.json();
        setBooks(dataBooks);

        // Set book and chapter from URL parameters if available
        if (bookParam && dataBooks.includes(bookParam)) {
          setSelectedBook(bookParam);
        }
        if (chapterParam) {
          const chapter = parseInt(chapterParam);
          if (!isNaN(chapter) && chapter > 0) {
            setSelectedChapter(chapter);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setVersions([]);
        setBooks([]);
      } finally {
        setLoadingVersions(false);
        setLoadingBooks(false);
      }
    }

    fetchData()
  }, [lng, searchParams])

  // Fetch chapters when book changes
  useEffect(() => {
    if (!selectedBook || !selectedVersion) {
      setChapters([]);
      setSelectedChapter(1);
      return;
    }

    const fetchChapters = async () => {
      setLoadingChapters(true);
      try {
        const params = new URLSearchParams({ book: selectedBook });
        if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
          params.append('version', selectedVersion);
        }

        const res = await fetch(`${API_BASE_URL}/chapters?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch chapters: ${res.status}`);
        }
        const chapterStrings: string[] = await res.json();
        const chapterNumbers = chapterStrings.map(Number).sort((a, b) => a - b);
        setChapters(chapterNumbers);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setChapters([]);
      } finally {
        setLoadingChapters(false);
      }
    }

    fetchChapters();
  }, [selectedBook, selectedVersion])

  const handleMarkComplete = async () => {
    if (!fromPlan || !planDay) return;

    try {
      const response = await fetch('/api/bible-plans/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          planId: fromPlan, 
          day: planDay 
        }),
      });

      if (response.ok) {
        // Show success message and redirect back
        alert(t('day_marked_complete', { 
          defaultValue: `Day ${planDay} marked as complete!` 
        }));
        window.history.back();
      } else {
        alert(t('error_marking_complete', { 
          defaultValue: 'Error marking day as complete' 
        }));
      }
    } catch (error) {
      console.error('Error marking day complete:', error);
      alert(t('error_marking_complete', { 
        defaultValue: 'Error marking day as complete' 
      }));
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          {fromPlan && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {t('reading_plan_context', { defaultValue: 'Reading from plan' })}
                  </p>
                  {planDay && (
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                      {t('day', { defaultValue: 'Day' })} {planDay}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => window.history.back()}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  {t('back_to_plan', { defaultValue: 'Back to plan' })}
                </button>
              </div>
            </div>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {fromPlan ? t('daily_reading', { defaultValue: 'Daily Reading' }) : t('read_scripture')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
            {fromPlan ? t('follow_plan_reading', { defaultValue: 'Follow your reading plan' }) : t('explore_bible')}
          </p>
        </div>

        {/* Bible Selector */}
        <div className="mb-6 lg:mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
          <BibleSelector
            versions={versions}
            books={books}
            chapters={chapters}
            selectedVersion={selectedVersion}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            onVersionChange={(version) => setSelectedVersion(version)}
            onBookChange={(book) => {
              setSelectedBook(book)
              setSelectedChapter(1)
            }}
            onChapterChange={setSelectedChapter}
            loadingVersions={loadingVersions}
            loadingBooks={loadingBooks}
            loadingChapters={loadingChapters}
            t={t}
          />
        </div>

        {/* Chapter Viewer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <ChapterViewer
            version={selectedVersion}
            book={selectedBook}
            chapter={selectedChapter}
            maxChapter={Math.max(...chapters)}
            language={lng}
          />
          
          {/* Plan Progress Controls */}
          {fromPlan && planDay && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('reading_progress', { defaultValue: 'Reading Progress' })}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMarkComplete()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    {t('mark_complete', { defaultValue: 'Mark Complete' })}
                  </button>
                  <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
                  >
                    {t('back_to_plan', { defaultValue: 'Back to Plan' })}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
