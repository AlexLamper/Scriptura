"use client"

import { useEffect, useState } from 'react'
import React from 'react'
import BibleSelector from '../../../components/study/BibleSelector'
import ChapterViewer from '../../../components/study/ChapterViewer'
import { useTranslation } from '../../i18n/client'

export default function ReadPage({ params }: { params: Promise<{ lng: string }> }) {
  const resolvedParams = React.use(params);
  const lng = resolvedParams.lng;
  const { t } = useTranslation(lng, 'study');
  
  const [versions, setVersions] = useState<string[]>([])
  const [books, setBooks] = useState<string[]>([])
  const [chapters, setChapters] = useState<number[]>([])
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState('Genesis')
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [loadingVersions, setLoadingVersions] = useState(false)
  const [loadingBooks, setLoadingBooks] = useState(false)
  const [loadingChapters, setLoadingChapters] = useState(false)

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
  }, [lng])

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('read_scripture')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
            {t('explore_bible')}
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
        </div>
      </div>
    </div>
  )
}
