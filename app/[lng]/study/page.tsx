'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Edit, BookOpen, Folder, MessageCircle, Clock, Link, Users, Bookmark, Brain } from 'lucide-react';
import BibleSelector from '../../../components/study/BibleSelector';
import ChapterViewer from '../../../components/study/ChapterViewer';
import { ChapterNotes } from '../../../components/study/ChapterNotes';
import BookmarkSystem from '../../../components/study/BookmarkSystem';
import { ShortcutDisplay } from '../../../components/study/ShortcutDisplay';
import InductiveStudy from '../../../components/study/InductiveStudy';
import { useTranslation } from '../../i18n/client';
import { useKeyboardShortcuts, KeyboardShortcut } from '../../../hooks/useKeyboardShortcuts';

// Define interfaces for API responses
interface Version {
  name: string;
}

// Tab Component
interface TabComponentProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion?: string | null;
  language: string;
  t: (key: string) => string;
  versions: string[];
  versionObjects?: { id: string; name: string; abbreviation: string }[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onDownload: () => void;
}

function TabComponent({ 
  selectedBook, 
  selectedChapter, 
  selectedVersion, 
  language = "en", 
  t, 
  // versions, 
  // versionObjects = [],
  onNextChapter,
  onPrevChapter,
  onDownload
}: TabComponentProps) {
  const [activeTab, setActiveTab] = useState('inductive');

  // Define keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'ArrowRight',
      action: onNextChapter,
      description: t('shortcuts.next_chapter')
    },
    {
      key: 'ArrowLeft',
      action: onPrevChapter,
      description: t('shortcuts.prev_chapter')
    },
    {
      key: 'b',
      action: () => setActiveTab('bookmarks'),
      description: t('shortcuts.bookmark')
    },
    {
      key: 'd',
      action: onDownload,
      description: t('shortcuts.download')
    },
  ];

  // Enable keyboard shortcuts
  useKeyboardShortcuts({ shortcuts });

  const tabs = [
    { id: 'inductive', label: t('tabs.inductive_study'), icon: Brain },
    { id: 'explanation', label: t('tabs.explanation'), icon: MessageCircle },
    { id: 'historical', label: t('tabs.historical'), icon: Clock },
    { id: 'related', label: t('tabs.related'), icon: Link },
    { id: 'notes', label: t('tabs.notes'), icon: Users },
    { id: 'bookmarks', label: t('bookmarks'), icon: Bookmark },
    { id: 'shortcuts', label: t('keyboard_shortcuts'), icon: MessageCircle },
  ];

  const renderTabContent = () => {
    const reference = selectedBook && selectedChapter ? `${selectedBook} ${selectedChapter}` : t('select_book_chapter');
    
    switch (activeTab) {
      case 'inductive':
        return <InductiveStudy 
          book={selectedBook || ''} 
          chapter={selectedChapter || 0} 
          version={selectedVersion || ''} 
          t={t} 
        />;
      case 'explanation':
        return (
          <div className="space-y-4">
            {/* Thinking Question Section - Prominent placement at top of explanation tab */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg dark:bg-[#232325] dark:border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 dark:text-blue-300">
                <MessageCircle size={18} className="text-blue-600 dark:text-blue-300" />
                {t('thinking_question.title')}
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed dark:text-blue-200">
                {t('thinking_question.default_text')}
              </p>
            </div>
            
            <h3 className="font-semibold mb-2 dark:text-gray-100">{t('explanation.title')}</h3>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> {t('explanation.intro')}
            </p>
            <h4 className="font-semibold mb-2 dark:text-gray-100">{t('explanation.commentary_title')}</h4>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> {t('explanation.commentary_text')}
            </p>
            <p className="mb-4 dark:text-gray-200">
              <span className="bg-yellow-200 p-1 rounded dark:bg-yellow-600 dark:text-yellow-50">{t('explanation.creation_text')}</span>
            </p>
          </div>
        );
      case 'historical':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2 dark:text-gray-100">{t('historical.title')} {reference}</h3>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#232325]">
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.time_period')}</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                {t('historical.time_period_text')}
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.cultural_background')}</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                {t('historical.cultural_background_text')}
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.literary_context')}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {t('historical.literary_context_text')}
              </p>
            </div>
          </div>
        );
      case 'related':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2 dark:text-gray-100">{t('related_verses.title')}</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 dark:border-blue-400">
                <h4 className="font-medium text-blue-700 dark:text-blue-200">Johannes 1:1-3</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;{t('related_verses.john_1')}&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">{t('related_verses.john_1_theme')}</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4 dark:border-green-400">
                <h4 className="font-medium text-green-700 dark:text-green-200">Psalm 33:6</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;{t('related_verses.psalm_33')}&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">{t('related_verses.psalm_33_theme')}</span>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 dark:border-purple-400">
                <h4 className="font-medium text-purple-700 dark:text-purple-200">Hebreeën 11:3</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;{t('related_verses.hebrews_11')}&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">{t('related_verses.hebrews_11_theme')}</span>
              </div>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="space-y-4">
            <ChapterNotes 
              book={selectedBook} 
              chapter={selectedChapter}
              language={language}
            />
          </div>
        );
      case 'bookmarks':
        return (
          <BookmarkSystem
            currentTranslation={selectedVersion || ''}
            currentTranslationName={selectedVersion || ''}
            currentBook={selectedBook}
            currentChapter={selectedChapter}
            t={t}
          />
        );
      case 'shortcuts':
        return (
          <ShortcutDisplay
            shortcuts={shortcuts}
            t={t}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex flex-wrap space-x-1 mb-4 border-b border-gray-200 dark:border-gray-600 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-t-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500 dark:bg-[#232325] dark:text-blue-300 dark:border-blue-400'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#2a2d35]'
              }`}
            >
              <Icon size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default function StudyPage({ params }: { params: Promise<{ lng: string }> }) {
  const resolvedParams = React.use(params);
  const lng = resolvedParams.lng;
  const { t } = useTranslation(lng, 'study');
  
  const [versions, setVersions] = useState<string[]>([]);
  const [books, setBooks] = useState<string[]>([]);
  const [chapters, setChapters] = useState<number[]>([]);

  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [maxChapter, setMaxChapter] = useState<number>(1);

  const [loadingVersions, setLoadingVersions] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  // Close download dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDownloadOptions && !target.closest('.download-dropdown')) {
        setShowDownloadOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDownloadOptions]);

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  // Download functionality
  const downloadContent = useCallback((content: string, filename: string, format: 'txt' | 'pdf' = 'txt') => {
    if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, []);

  const handleDownloadChapter = useCallback(async () => {
    if (!selectedBook || !selectedChapter || !selectedVersion) return;
    
    try {
      const params = new URLSearchParams({ 
        book: selectedBook, 
        chapter: selectedChapter.toString() 
      });
      if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
        params.append('version', selectedVersion);
      }
      
      const response = await fetch(`${API_BASE_URL}/chapter?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Handle different response formats
        let verses;
        if (Array.isArray(data)) {
          verses = data;
        } else if (data.verses && Array.isArray(data.verses)) {
          verses = data.verses;
        } else {
          console.error('Unexpected API response format:', data);
          return;
        }
        
        const content = verses.map((verse: { verse: number; text: string }) => `${verse.verse}: ${verse.text}`).join('\n');
        const filename = `${selectedBook}_${selectedChapter}_${selectedVersion || 'default'}.txt`;
        downloadContent(content, filename);
      }
    } catch (error) {
      console.error('Error downloading chapter:', error);
    }
    setShowDownloadOptions(false);
  }, [selectedBook, selectedChapter, selectedVersion, downloadContent]);

  // Function to get default Bible version based on language
  const getDefaultVersion = (availableVersions: string[], language: string): string | null => {
    if (language === 'nl') {
      // For Dutch, prefer Staten Vertaling (note the space)
      if (availableVersions.includes('Staten Vertaling')) {
        return 'Staten Vertaling';
      }
    } else if (language === 'en') {
      // For English, prefer American Standard Version
      if (availableVersions.includes('American Standard Version')) {
        return 'American Standard Version';
      }
      if (availableVersions.includes('ASV')) {
        return 'ASV';
      }
    }
    
    // Fallback to first available version
    return availableVersions.length > 0 ? availableVersions[0] : null;
  };

  // 1. Fetch available versions on initial load
  useEffect(() => {
    const fetchVersions = async () => {
      console.log('📚 Starting to fetch Bible versions...');
      setLoadingVersions(true);
      try {
        const res = await fetch(`${API_BASE_URL}/versions`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch versions: ${res.status} ${res.statusText} - ${errorText}`);
        }
        const data: Version[] = await res.json();
        const versionNames = data.map((v) => v.name);
        console.log('📚 Fetched versions:', versionNames);
        setVersions(versionNames);

        // Set default version based on language preference
        const defaultVersion = getDefaultVersion(versionNames, lng);
        console.log(`📚 Selected default version for language '${lng}':`, defaultVersion);
        setSelectedVersion(defaultVersion);
      } catch (err) {
        console.error('❌ Error fetching versions:', err);
        setVersions([]);
        setSelectedVersion(null);
      } finally {
        setLoadingVersions(false);
        console.log('📚 Finished fetching versions');
      }
    };
    fetchVersions();
  }, [lng]); // Include lng in dependency array to refetch when language changes

  // 2. Fetch books when a version is selected or on initial load
  useEffect(() => {
    if (!selectedVersion) {
      console.log('useEffect: No selected version yet, skipping book fetch.');
      setBooks([]);
      setSelectedBook('');
      setChapters([]); // Clear dependent states
      setSelectedChapter(1);
      setMaxChapter(1);
      return;
    }

    console.groupCollapsed(`useEffect: Fetching books for version: ${selectedVersion}`);
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        // Build URL with version parameter if not the default Statenvertaling
        const params = new URLSearchParams();
        if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
          params.append('version', selectedVersion);
          console.log(`Fetching books for version: ${selectedVersion}`);
        } else {
          console.log('Fetching books for default version (Staten Vertaling)');
        }

        const url = `${API_BASE_URL}/books${params.toString() ? `?${params.toString()}` : ''}`;
        console.log('API URL for book fetch:', url);
        
        const res = await fetch(url);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch books: ${res.status} ${res.statusText} - ${errorText}`);
        }
        // The /api/books endpoint returns an array of strings directly
        const bookNames: string[] = await res.json();
        console.log('API Response for books:', bookNames);

        setBooks(bookNames);

        // Set appropriate default book based on language/version
        let defaultBook = '';
        if (selectedVersion === 'Staten Vertaling' || lng === 'nl') {
          // For Dutch versions, look for "Genesis" or equivalent
          if (bookNames.includes('Genesis')) {
            defaultBook = 'Genesis';
          } else if (bookNames.includes('1 Mozes')) {
            defaultBook = '1 Mozes';
          }
        } else {
          // For English and other versions, look for "Genesis"
          if (bookNames.includes('Genesis')) {
            defaultBook = 'Genesis';
          }
        }

        // Fallback to first book if no preferred default found
        if (!defaultBook && bookNames.length > 0) {
          defaultBook = bookNames[0];
        }

        if (defaultBook) {
          setSelectedBook(defaultBook);
          console.log('Default book set to:', defaultBook);
        } else {
          setSelectedBook(''); // No books found
          console.warn('No books found from API.');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setBooks([]);
        setSelectedBook('');
      } finally {
        setLoadingBooks(false);
        console.groupEnd(); // End useEffect: Fetching books... group
      }
    };
    fetchBooks();
  }, [selectedVersion, lng]); // Runs when selectedVersion or language changes

  // 3. Fetch chapters for a selected book and version
  useEffect(() => {
    if (!selectedBook) {
      console.log('useEffect: No selected book yet, skipping chapter fetch.');
      setChapters([]);
      setSelectedChapter(1);
      setMaxChapter(1);
      return;
    }
    if (!selectedVersion) {
      console.warn('useEffect: selectedBook is present but selectedVersion is missing. This is unexpected.');
      return; // Should ideally not happen if logic flows correctly
    }

    console.groupCollapsed(`useEffect: Fetching chapters for book: ${selectedBook}, version: ${selectedVersion}`);
    const fetchChapters = async () => {
      setLoadingChapters(true);
      try {
        const params = new URLSearchParams({ book: selectedBook });
        // Only append version if it's explicitly selected and not the default 'Staten Vertaling'
        if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
          params.append('version', selectedVersion);
          console.log(`Appending version parameter: ${selectedVersion}`);
        } else {
          console.log(`Using default version (Staten Vertaling) or no version specified in API call.`);
        }

        const url = `${API_BASE_URL}/chapters?${params.toString()}`;
        console.log('API URL for chapter fetch:', url);
        const res = await fetch(url);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch chapters for ${selectedBook}: ${res.status} ${res.statusText} - ${errorText}`);
        }
        const chapterStrings: string[] = await res.json();
        console.log(`API response for chapters of ${selectedBook}:`, chapterStrings);

        const chapterNumbers = chapterStrings.map(Number).sort((a,b) => a-b);
        const numberOfChapters = chapterNumbers.length > 0 ? chapterNumbers[chapterNumbers.length - 1] : 0;

        if (chapterNumbers.length === 0) {
          console.warn(`No chapters found for ${selectedBook}. API returned empty array.`);
          setChapters([]);
          setMaxChapter(1);
          setSelectedChapter(1);
          return;
        }

        console.log(`Processed chapter numbers for ${selectedBook}:`, chapterNumbers);
        setChapters(chapterNumbers);
        setMaxChapter(numberOfChapters);

        setSelectedChapter((prevChapter) => {
          // If the previous chapter is still in the new list, keep it. Otherwise, default to 1.
          const newChapter = chapterNumbers.includes(prevChapter) ? prevChapter : (chapterNumbers.length > 0 ? chapterNumbers[0] : 1);
          console.log(`Adjusting selected chapter from ${prevChapter} to ${newChapter} (available: ${chapterNumbers.join(',')})`);
          return newChapter;
        });

      } catch (err) {
        console.error(`Error fetching chapters for ${selectedBook}:`, err);
        setChapters([]);
        setMaxChapter(1);
        setSelectedChapter(1); // Default to 1 on error
      } finally {
        setLoadingChapters(false);
        console.groupEnd(); // End useEffect: Fetching chapters... group
      }
    };
    fetchChapters();
  }, [selectedBook, selectedVersion]); // Runs when selectedBook or selectedVersion changes

  // Callback handlers for BibleSelector
  const handleVersionChange = useCallback((version: string) => {
    console.log('handleVersionChange called with:', version);
    setSelectedVersion(version);
    // Reset book and chapter when version changes, to trigger re-fetch of books/chapters
    // Clear current selections since different versions have different book names
    setSelectedBook(''); // This will trigger the book useEffect
    setBooks([]); // Clear current books list
    setSelectedChapter(1); // Reset chapter to 1
    setChapters([]); // Clear chapters
    setMaxChapter(1); // Reset max chapter
  }, []);

  const handleBookChange = useCallback((book: string) => {
    console.log('handleBookChange called with:', book);
    setSelectedBook(book);
    setSelectedChapter(1); // Always reset chapter to 1 when book changes
  }, []);

  const handleChapterChange = useCallback((chapter: number) => {
    console.log('handleChapterChange called with:', chapter);
    setSelectedChapter(chapter);
  }, []);

  // Callback handlers for navigation buttons
  const handlePreviousChapter = useCallback(() => {
    setSelectedChapter((prev) => {
      // Find the current chapter's index in the `chapters` array
      const currentIndex = chapters.indexOf(prev);
      if (currentIndex > 0) {
        const newChapter = chapters[currentIndex - 1];
        console.log(`Navigating to previous chapter: ${prev} -> ${newChapter}`);
        return newChapter;
      }
      console.log(`Cannot navigate to previous chapter from ${prev} (already first available or not found).`);
      return prev; // Stay on current chapter if already first
    });
  }, [chapters]); // Depend on chapters array to ensure correct index lookup

  const handleNextChapter = useCallback(() => {
    setSelectedChapter((prev) => {
      // Find the current chapter's index in the `chapters` array
      const currentIndex = chapters.indexOf(prev);
      if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
        const newChapter = chapters[currentIndex + 1];
        console.log(`Navigating to next chapter: ${prev} -> ${newChapter} (max available: ${chapters[chapters.length - 1]})`);
        return newChapter;
      }
      console.log(`Cannot navigate to next chapter from ${prev} (already last available or not found).`);
      return prev; // Stay on current chapter if already last
    });
  }, [chapters]); // Depend on chapters array to ensure correct index lookup

  // Wrapper for download functionality for keyboard shortcuts
  const handleDownload = useCallback(() => {
    handleDownloadChapter();
  }, [handleDownloadChapter]);

  return (
    <div className="mt-2">
      {/* Top controls: Bible/book/chapter selectors with navigation arrows */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 mb-6">
        <BibleSelector
          versions={versions}
          books={books}
          chapters={chapters}
          selectedVersion={selectedVersion}
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          onVersionChange={handleVersionChange}
          onBookChange={handleBookChange}
          onChapterChange={handleChapterChange}
          loadingVersions={loadingVersions}
          loadingBooks={loadingBooks}
          loadingChapters={loadingChapters}
          t={t}
        />

        {/* Navigation Arrows - positioned right after selectors */}
        <div className="flex items-center gap-2 order-last sm:order-none">
          <button
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100"
            title={t('previous_chapter')}
            onClick={handlePreviousChapter}
            disabled={selectedChapter <= 1 || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === 0}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100"
            title={t('next_chapter')}
            onClick={handleNextChapter}
            disabled={selectedChapter >= maxChapter || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === chapters.length - 1}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Download Button with dropdown */}
        <div className="relative ml-auto download-dropdown">
          <button 
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100" 
            title={t('print_download')}
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 17v4H7v-4M12 12v6m0 0l-3-3m3 3l3-3M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" />
            </svg>
          </button>
          
          {showDownloadOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <button
                  onClick={handleDownloadChapter}
                  disabled={!selectedBook || !selectedChapter}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('download_chapter')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Left: Bible verse section - Render ChapterViewer */}
        <section className="bg-white p-4 sm:p-6 rounded shadow overflow-auto dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            {selectedBook && selectedChapter && (
              <h2 className="text-lg font-semibold dark:text-white">
                <span className="font-semibold">{selectedBook} </span>
                <span className='font-semibold'>{selectedChapter}</span>
              </h2>
            )}
            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg dark:text-gray-200 dark:bg-[#2a2d35]">
              {t('select_translation')}: ({selectedVersion || (loadingVersions ? t('loading_translations') : t('no_translations'))})
            </div>
          </div>

          {selectedBook && selectedChapter && selectedVersion && (
            <ChapterViewer
              version={selectedVersion}
              book={selectedBook}
              chapter={selectedChapter}
              maxChapter={maxChapter}
              language={lng}
            />
          )}
          {/* Add a message if no book/chapter is selected yet */}
          {(!selectedBook || !selectedChapter || !selectedVersion) && !loadingBooks && !loadingChapters && (
            <div className="py-12 text-center text-gray-500 dark:text-gray-300">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {t('ready_to_study')}
                  </h3>
                  <div className="text-sm space-y-1">
                    {loadingVersions && <p>{t('loading_translations')}</p>}
                    {!loadingVersions && versions.length === 0 && <p>{t('no_translations_available')}</p>}
                    {!loadingVersions && versions.length > 0 && selectedVersion && loadingBooks && <p>{t('loading_books')}</p>}
                    {!loadingVersions && versions.length > 0 && selectedVersion && !loadingBooks && books.length === 0 && <p>{t('no_books_available')}</p>}
                    {!loadingVersions && versions.length > 0 && selectedVersion && !selectedBook && <p>{t('select_book_chapter')}</p>}
                    {!selectedVersion && <p>{t('select_translation_start')}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right: Tabbed content section */}
        <section className="bg-white p-4 sm:p-6 rounded shadow dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 className="text-lg font-semibold dark:text-white">{t('study_materials').toUpperCase()}</h2>
            <div className="flex space-x-3">
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
                <FileText size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
                <Edit size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
                <BookOpen size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
                <Folder size={18} />
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <TabComponent 
            selectedBook={selectedBook} 
            selectedChapter={selectedChapter} 
            selectedVersion={selectedVersion}
            language={lng} 
            t={t} 
            versions={versions}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePreviousChapter}
            onDownload={handleDownload}
          />
        </section>
      </div>
    </div>
  );
}