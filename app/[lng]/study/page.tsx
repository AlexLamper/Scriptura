'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Edit, BookOpen, Folder } from 'lucide-react';
import BibleSelector from '../../../components/study/BibleSelector';
import ChapterViewer from '../../../components/study/ChapterViewer';

// Define interfaces for API responses
interface Version {
  name: string;
}

export default function StudyPage() {
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

  const API_BASE_URL = 'https://www.bijbel-api.nl/api';

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
        // CRITICAL FIX HERE: The /api/chapters endpoint returns an array of strings (chapter numbers)
        const chapterStrings: string[] = await res.json();
        console.log(`API response for chapters of ${selectedBook}:`, chapterStrings);

        // Convert string array to number array and get max chapter
        const chapterNumbers = chapterStrings.map(Number).sort((a,b) => a-b); // Ensure they are numbers and sorted
        const numberOfChapters = chapterNumbers.length > 0 ? chapterNumbers[chapterNumbers.length - 1] : 0; // Get the highest chapter number

        if (chapterNumbers.length === 0) {
          console.warn(`No chapters found for ${selectedBook}. API returned empty array.`);
          setChapters([]);
          setMaxChapter(1); // Or 0, depending on how you want to handle "no chapters"
          setSelectedChapter(1);
          return;
        }

        console.log(`Processed chapter numbers for ${selectedBook}:`, chapterNumbers);
        setChapters(chapterNumbers);
        setMaxChapter(numberOfChapters); // Set max chapter to the highest number

        // Ensure selected chapter is within bounds for the new book
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
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition"
          title="Vorige hoofdstuk"
          onClick={handlePreviousChapter}
          disabled={selectedChapter <= 1 || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === 0}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition"
          title="Volgende hoofdstuk"
          onClick={handleNextChapter}
          disabled={selectedChapter >= maxChapter || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === chapters.length - 1}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Print/Download Button */}
        <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition ml-auto" title="Print of download hoofdstuk">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 17v4H7v-4M12 12v6m0 0l-3-3m3 3l3-3M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Bible verse section - Render ChapterViewer */}
        <section className="bg-white p-6 rounded shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">
            BIJBELTEKST ({selectedVersion || (loadingVersions ? 'Laden...' : 'Niet geselecteerd')})
          </h2>
          {selectedBook && selectedChapter && selectedVersion && (
            <ChapterViewer
              version={selectedVersion}
              book={selectedBook}
              chapter={selectedChapter}
              maxChapter={maxChapter}
            />
          )}
          {/* Add a message if no book/chapter is selected yet */}
          {(!selectedBook || !selectedChapter || !selectedVersion) && !loadingBooks && !loadingChapters && (
            <div className="py-12 text-center text-gray-500">
              {loadingVersions && 'Laden vertalingen...'}
              {!loadingVersions && versions.length === 0 && 'Geen vertalingen beschikbaar.'}
              {!loadingVersions && versions.length > 0 && selectedVersion && loadingBooks && 'Laden boeken...'}
              {!loadingVersions && versions.length > 0 && selectedVersion && !loadingBooks && books.length === 0 && 'Geen boeken beschikbaar voor deze vertaling.'}
              {!loadingVersions && versions.length > 0 && selectedVersion && !selectedBook && 'Selecteer een boek en hoofdstuk om te beginnen.'}
              {!selectedVersion && 'Selecteer een Bijbelvertaling om te beginnen.'}
            </div>
          )}
        </section>

        {/* Right: Commentary section (remains static for now) */}
        <section className="bg-white p-6 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">DENKVRAAG</h2>
            <div className="flex space-x-3">
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition">
                <FileText size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition">
                <Edit size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition">
                <BookOpen size={18} />
              </button>
              <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition">
                <Folder size={18} />
              </button>
            </div>
          </div>
          <h3 className="font-semibold mb-2">Wat zegt dit bijbelgedeelte over de schepping?</h3>
          <p className="mb-4">
           In <a href="#" className="text-blue-600">Gen.1:1-2:3</a> wordt over Gods scheppingswerk verteld. Maar wat betekent dit voor ons vandaag de dag? Hoe kunnen we deze tekst toepassen in ons leven en onze wereldvisie? 
          </p>
          <h2 className="text-lg font-semibold mb-4">COMMENTAAR</h2>
          <h3 className="font-semibold mb-2">Boek 1: De schepping van hemel en aarde (Gen.1:1–2:3)</h3>
          <p className="mb-4">
            In <a href="#" className="text-blue-600">Gen.1:1-2:3</a> wordt over Gods scheppingswerk verteld. De zeven dagen vormen de eerste week van Gods handelen. De uitdrukkingen &apos;God&apos;, &apos;scheppen&apos; en &apos;hemel en aarde&apos; komen voor in <a href="#" className="text-blue-600">Gen.1:1</a> (het begin) en in omgekeerde volgorde in <a href="#" className="text-blue-600">Gen.2:1-3</a> (het slot van dit gedeelte). De taal is proza en geen poëzie, maar het onderwerp is zo verheven dat de taal soms bijna poëtisch wordt. Het boek Genesis begint met de grote en goede daden van God en eindigt in de laatste hoofdstukken met het ontstaan van het volk Israël. <span className="bg-yellow-200">De schepping vindt plaats in een oplopende reeks van gebeurtenissen, in een andere volgorde dan de hedendaagse evolutietheorie dat doet. De mensen komen niet voort uit dieren, in een proces van toeval en overleving van de sterkste, maar zij zijn ontstaan door Gods scheppingswoorden.</span>
          </p>
          <p className="mb-4">Er zijn enige overeenkomsten tussen de 1e en 4e dag, tussen de 2e en 5e dag en de 3e en 6e dag; de 7e dag staat apart. In de eerste drie dagen wordt de aarde gevormd, in de volgende drie dagen wordt de geschapen wereld verder ingericht.</p>
          <div className="overflow-auto">
            <table className="min-w-full border border-gray-300 text-center">
              <tbody>
                <tr className="border">
                  <td className="px-2 py-1 border border-gray-300">dag 1: licht</td>
                  <td className="px-2 py-1 border">dag 4: hemellichten</td>
                </tr>
                <tr className="border">
                  <td className="px-2 py-1 border">dag 2: water en lucht</td>
                  <td className="px-2 py-1 border">dag 5: vissen en vogels</td>
                </tr>
                <tr className="border">
                  <td className="px-2 py-1 border">dag 3: land en zee (planten)</td>
                  <td className="px-2 py-1 border">dag 6: dieren en mensen (planten voor voedsel)</td>
                </tr>
                <tr className="border">
                  <td className="px-2 py-1 border" colSpan={2}>dag 7: de sabbat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}