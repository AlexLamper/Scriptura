'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Edit, BookOpen, Folder, MessageCircle, Clock, Link, Users } from 'lucide-react';
import BibleSelector from '../../../components/study/BibleSelector';
import ChapterViewer from '../../../components/study/ChapterViewer';
import { ChapterNotes } from '../../../components/study/ChapterNotes';

// Define interfaces for API responses
interface Version {
  name: string;
}

// Tab Component
interface TabComponentProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion?: string | null;
}

function TabComponent({ selectedBook, selectedChapter }: TabComponentProps) {
  const [activeTab, setActiveTab] = useState('explanation');

  const tabs = [
    { id: 'explanation', label: 'Uitleg', icon: MessageCircle },
    { id: 'historical', label: 'Historische Context', icon: Clock },
    { id: 'related', label: 'Gerelateerde Verzen', icon: Link },
    { id: 'notes', label: 'Mijn Notities', icon: Users },
  ];

  const renderTabContent = () => {
    const reference = selectedBook && selectedChapter ? `${selectedBook} ${selectedChapter}` : 'Selecteer een passage';
    
    switch (activeTab) {
      case 'explanation':
        return (
          <div className="space-y-4">
            {/* Thinking Question Section - Prominent placement at top of explanation tab */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg dark:bg-[#232325] dark:border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 dark:text-blue-300">
                <MessageCircle size={18} className="text-blue-600 dark:text-blue-300" />
                Denkvraag
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed dark:text-blue-200">
                Wat zegt dit bijbelgedeelte over Gods karakter en Zijn relatie met de mensheid? 
                Hoe kunnen we deze waarheden toepassen in ons dagelijks leven?
              </p>
            </div>
            
            <h3 className="font-semibold mb-2 dark:text-gray-100">Wat zegt dit bijbelgedeelte over de schepping?</h3>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> wordt over Gods scheppingswerk verteld. Maar wat betekent dit voor ons vandaag de dag? Hoe kunnen we deze tekst toepassen in ons leven en onze wereldvisie? 
            </p>
            <h4 className="font-semibold mb-2 dark:text-gray-100">Commentaar</h4>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> wordt over Gods scheppingswerk verteld. De zeven dagen vormen de eerste week van Gods handelen. De uitdrukkingen &apos;God&apos;, &apos;scheppen&apos; en &apos;hemel en aarde&apos; komen voor in het begin en in omgekeerde volgorde in het slot van dit gedeelte.
            </p>
            <p className="mb-4 dark:text-gray-200">
              <span className="bg-yellow-200 p-1 rounded dark:bg-yellow-600 dark:text-yellow-50">De schepping vindt plaats in een oplopende reeks van gebeurtenissen, in een andere volgorde dan de hedendaagse evolutietheorie dat doet. De mensen komen niet voort uit dieren, in een proces van toeval en overleving van de sterkste, maar zij zijn ontstaan door Gods scheppingswoorden.</span>
            </p>
          </div>
        );
      case 'historical':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2 dark:text-gray-100">Historische Context van {reference}</h3>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#232325]">
              <h4 className="font-medium mb-2 dark:text-gray-100">Tijdperiode</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                Genesis werd geschreven in de context van het oude Nabije Oosten, waarschijnlijk tijdens de tijd van Mozes (ca. 1400 v.Chr.).
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">Culturele Achtergrond</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                Het scheppingsverhaal onderscheidt zich van andere oude Nabije Oosterse scheppingsmythen door zijn monotheïstische karakter en de waardigheid van de mens.
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">Literaire Context</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                Genesis 1-11 vormt de &apos;oergeschiedenis&apos; die de basis legt voor de verhalen van de aartsvaders die volgen.
              </p>
            </div>
          </div>
        );
      case 'related':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2 dark:text-gray-100">Gerelateerde Bijbelpassages</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 dark:border-blue-400">
                <h4 className="font-medium text-blue-700 dark:text-blue-200">Johannes 1:1-3</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;In den beginne was het Woord, en het Woord was bij God, en het Woord was God.&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">Thema: Schepping door het Woord</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4 dark:border-green-400">
                <h4 className="font-medium text-green-700 dark:text-green-200">Psalm 33:6</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;Door des HEEREN woord zijn de hemelen gemaakt, en door den geest zijns monds al hun heir.&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">Thema: Gods scheppende woord</span>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 dark:border-purple-400">
                <h4 className="font-medium text-purple-700 dark:text-purple-200">Hebreeën 11:3</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;Door het geloof verstaan wij, dat de wereld door Gods woord is toebereid.&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">Thema: Geloof in de schepping</span>
              </div>
              <div className="border-l-4 border-red-500 pl-4 dark:border-red-400">
                <h4 className="font-medium text-red-700 dark:text-red-200">Kolossenzen 1:16</h4>
                <p className="text-sm text-gray-600 dark:text-gray-200">&quot;Want door Hem zijn alle dingen geschapen, die in de hemelen en die op de aarde zijn.&quot;</p>
                <span className="text-xs text-gray-500 dark:text-gray-300">Thema: Christus als Schepper</span>
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
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex space-x-1 mb-4 border-b border-gray-200 dark:border-gray-600">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-t-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500 dark:bg-[#232325] dark:text-blue-300 dark:border-blue-400'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#2a2d35]'
              }`}
            >
              <Icon size={16} />
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

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  // 1. Fetch available versions on initial load
  useEffect(() => {
    const fetchVersions = async () => {
      setLoadingVersions(true);
      try {
        const res = await fetch(`${API_BASE_URL}/versions`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch versions: ${res.status} ${res.statusText} - ${errorText}`);
        }
        const data: Version[] = await res.json();
        const versionNames = data.map((v) => v.name);
        setVersions(versionNames);

        // Set 'Statenvertaling' as default, otherwise the first one
        if (versionNames.includes('Statenvertaling')) {
          setSelectedVersion('Statenvertaling');
        } else if (versionNames.length > 0) {
          setSelectedVersion(versionNames[0]);
        } else {
          setSelectedVersion(null); // No versions found
          console.warn('No versions found from API.');
        }
      } catch (err) {
        console.error('Error fetching versions:', err);
        setVersions([]);
        setSelectedVersion(null);
      } finally {
        setLoadingVersions(false);
        console.groupEnd(); // End useEffect: Fetching versions... group
      }
    };
    fetchVersions();
  }, []); // Empty dependency array means this runs once on mount

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
        const res = await fetch(`${API_BASE_URL}/books`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch books: ${res.status} ${res.statusText} - ${errorText}`);
        }
        // CORRECT: The /api/books endpoint returns an array of strings directly
        const bookNames: string[] = await res.json();
        console.log('API Response for books:', bookNames);

        setBooks(bookNames);

        // Set 'Genesis' as default, otherwise the first one
        if (bookNames.includes('Genesis')) {
          setSelectedBook('Genesis');
          console.log('Default book set to Genesis');
        } else if (bookNames.length > 0) {
          setSelectedBook(bookNames[0]);
          console.log('Default book set to first available:', bookNames[0]);
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
  }, [selectedVersion]); // Runs when selectedVersion changes

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
        // Only append version if it's explicitly selected and not the default 'Statenvertaling'
        if (selectedVersion && selectedVersion.toLowerCase() !== 'statenvertaling') {
          params.append('version', selectedVersion);
          console.log(`Appending version parameter: ${selectedVersion}`);
        } else {
          console.log(`Using default version (Statenvertaling) or no version specified in API call.`);
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
    setSelectedBook(''); // This will trigger the book useEffect
    setSelectedChapter(1); // Reset chapter to 1
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

  return (
    <div className="mt-2">
      {/* Top controls: Bible/book/chapter selectors, arrows, print/download */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
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
        />

        {/* Prev/Next Arrows */}
        <button
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100"
          title="Vorige hoofdstuk"
          onClick={handlePreviousChapter}
          disabled={selectedChapter <= 1 || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === 0}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100"
          title="Volgende hoofdstuk"
          onClick={handleNextChapter}
          disabled={selectedChapter >= maxChapter || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === chapters.length - 1}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Print/Download Button */}
        <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition ml-auto dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100" title="Print of download hoofdstuk">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 17v4H7v-4M12 12v6m0 0l-3-3m3 3l3-3M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Bible verse section - Render ChapterViewer */}
        <section className="bg-white p-6 rounded shadow overflow-auto dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold dark:text-white">
              BIJBELTEKST ({selectedVersion || (loadingVersions ? 'Laden...' : 'Niet geselecteerd')})
            </h2>
            {selectedBook && selectedChapter && (
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg dark:text-gray-200 dark:bg-[#2a2d35]">
                <span className="font-medium">{selectedBook}</span>
                <span className="mx-1">•</span>
                <span>Hoofdstuk {selectedChapter}</span>
              </div>
            )}
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
              {loadingVersions && 'Laden vertalingen...'}
              {!loadingVersions && versions.length === 0 && 'Geen vertalingen beschikbaar.'}
              {!loadingVersions && versions.length > 0 && selectedVersion && loadingBooks && 'Laden boeken...'}
              {!loadingVersions && versions.length > 0 && selectedVersion && !loadingBooks && books.length === 0 && 'Geen boeken beschikbaar voor deze vertaling.'}
              {!loadingVersions && versions.length > 0 && selectedVersion && !selectedBook && 'Selecteer een boek en hoofdstuk om te beginnen.'}
              {!selectedVersion && 'Selecteer een Bijbelvertaling om te beginnen.'}
            </div>
          )}
        </section>

        {/* Right: Tabbed content section */}
        <section className="bg-white p-6 rounded shadow dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold dark:text-white">STUDIE MATERIAAL</h2>
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
          <TabComponent selectedBook={selectedBook} selectedChapter={selectedChapter} />
        </section>
      </div>
    </div>
  );
}