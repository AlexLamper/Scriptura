'use client';

import { useState, useEffect, useCallback } from 'react';

interface Version {
  name: string;
}

interface UseBibleDataReturn {
  // State
  versions: string[];
  books: string[];
  chapters: number[];
  selectedVersion: string | null;
  selectedBook: string;
  selectedChapter: number;
  maxChapter: number;
  
  // Loading states
  loadingVersions: boolean;
  loadingBooks: boolean;
  loadingChapters: boolean;
  
  // Handlers
  handleVersionChange: (version: string) => void;
  handleBookChange: (book: string) => void;
  handleChapterChange: (chapter: number) => void;
  handlePreviousChapter: () => void;
  handleNextChapter: () => void;
}

export function useBibleData(lng: string): UseBibleDataReturn {
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
  
  const [lastReadLoaded, setLastReadLoaded] = useState(false);

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

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

        let restored = false;
        
        // Try to fetch user's last read chapter
        try {
          const lastReadRes = await fetch('/api/user/last-read');
          if (lastReadRes.ok) {
            const { lastReadChapter } = await lastReadRes.json();
            if (lastReadChapter && lastReadChapter.version && lastReadChapter.book && lastReadChapter.chapter) {
              // Restore last read position
              setSelectedVersion(lastReadChapter.version);
              setSelectedBook(lastReadChapter.book);
              setSelectedChapter(lastReadChapter.chapter);
              setLastReadLoaded(true);
              restored = true;
            }
          }
        } catch {
          console.log('No last read chapter found, using defaults');
        }

        // If not restored from last read, try to use user preferences
        if (!restored) {
          try {
            const prefRes = await fetch('/api/user/preferences');
            if (prefRes.ok) {
              const { preferences } = await prefRes.json();
              if (preferences?.translation) {
                // Try to find a matching version in the available versions
                // The preference might be a code (e.g. "ESV") or a full name
                // We try to find a version that contains the preference string or matches exactly
                const pref = preferences.translation.toLowerCase();
                const matchedVersion = versionNames.find(v => {
                  const vLower = v.toLowerCase();
                  return vLower === pref || 
                         vLower.includes(`(${pref})`) || 
                         vLower.includes(`${pref} `) ||
                         vLower === pref; // exact match
                });

                if (matchedVersion) {
                  setSelectedVersion(matchedVersion);
                  restored = true;
                } else {
                   // Fallback: check if any version contains the code
                   const looseMatch = versionNames.find(v => v.toLowerCase().includes(pref));
                   if (looseMatch) {
                     setSelectedVersion(looseMatch);
                     restored = true;
                   }
                }
              }
            }
          } catch (e) {
            console.error('Error fetching preferences:', e);
          }
        }

        // Set default version based on language preference (only if no last read found AND no preference found)
        if (!restored) {
          const defaultVersion = getDefaultVersion(versionNames, lng);
          setSelectedVersion(defaultVersion);
        }
      } catch (err) {
        console.log(err)
        setVersions([]);
        setSelectedVersion(null);
      } finally {
        setLoadingVersions(false);
      }
    };
    fetchVersions();
  }, [lng]);

  // 2. Fetch books when a version is selected or on initial load
  useEffect(() => {
    if (!selectedVersion) {
      setBooks([]);
      setSelectedBook('');
      setChapters([]); // Clear dependent states
      setSelectedChapter(1);
      setMaxChapter(1);
      return;
    }

    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        // Build URL with version parameter if not the default Statenvertaling
        const params = new URLSearchParams();
        if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
          params.append('version', selectedVersion);
        }

        const url = `${API_BASE_URL}/books${params.toString() ? `?${params.toString()}` : ''}`;
        
        const res = await fetch(url);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch books: ${res.status} ${res.statusText} - ${errorText}`);
        }
        // The /api/books endpoint returns an array of strings directly
        const bookNames: string[] = await res.json();

        setBooks(bookNames);

        // Only set default book if we haven't already restored one from last read
        if (!selectedBook) {
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
          } else {
            setSelectedBook(''); // No books found
            console.warn('No books found from API.');
          }
        }
        
        // Mark that initial load is complete, allowing saves to happen
        if (!lastReadLoaded) {
          setLastReadLoaded(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVersion, lng]);

  // 3. Fetch chapters for a selected book and version
  useEffect(() => {
    if (!selectedBook) {
      setChapters([]);
      setSelectedChapter(1);
      setMaxChapter(1);
      return;
    }
    if (!selectedVersion) {
      console.warn('useEffect: selectedBook is present but selectedVersion is missing. This is unexpected.');
      return; // Should ideally not happen if logic flows correctly
    }

    const fetchChapters = async () => {
      setLoadingChapters(true);
      try {
        const params = new URLSearchParams({ book: selectedBook });
        // Only append version if it's explicitly selected and not the default 'Staten Vertaling'
        if (selectedVersion && selectedVersion !== 'Staten Vertaling') {
          params.append('version', selectedVersion);
        }

        const url = `${API_BASE_URL}/chapters?${params.toString()}`;
        const res = await fetch(url);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch chapters for ${selectedBook}: ${res.status} ${res.statusText} - ${errorText}`);
        }
        const chapterStrings: string[] = await res.json();

        const chapterNumbers = chapterStrings.map(Number).sort((a,b) => a-b);
        const numberOfChapters = chapterNumbers.length > 0 ? chapterNumbers[chapterNumbers.length - 1] : 0;

        if (chapterNumbers.length === 0) {
          console.warn(`No chapters found for ${selectedBook}. API returned empty array.`);
          setChapters([]);
          setMaxChapter(1);
          setSelectedChapter(1);
          return;
        }

        setChapters(chapterNumbers);
        setMaxChapter(numberOfChapters);

        setSelectedChapter((prevChapter) => {
          // If the previous chapter is still in the new list, keep it. Otherwise, default to 1.
          const newChapter = chapterNumbers.includes(prevChapter) ? prevChapter : (chapterNumbers.length > 0 ? chapterNumbers[0] : 1);
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
  }, [selectedBook, selectedVersion]);

  // 4. Save last read chapter whenever user changes book, chapter, or version
  useEffect(() => {
    // Only save if we have valid data and it's not the initial load
    if (!selectedBook || !selectedChapter || !selectedVersion || !lastReadLoaded) {
      return;
    }

    const saveLastRead = async () => {
      try {
        await fetch('/api/user/last-read', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            book: selectedBook,
            chapter: selectedChapter,
            version: selectedVersion,
          }),
        });
      } catch (err) {
        console.error('Error saving last read chapter:', err);
      }
    };

    // Debounce the save to avoid too many requests
    const timeoutId = setTimeout(saveLastRead, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedBook, selectedChapter, selectedVersion, lastReadLoaded]);

  const handleVersionChange = useCallback((version: string) => {
    setSelectedVersion(version);
    setSelectedBook('');
    setBooks([]);
    setSelectedChapter(1);
    setChapters([]);
    setMaxChapter(1);
  }, []);

  const handleBookChange = useCallback((book: string) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  }, []);

  const handleChapterChange = useCallback((chapter: number) => {
    setSelectedChapter(chapter);
  }, []);

  // Callback handlers for navigation buttons
  const handlePreviousChapter = useCallback(() => {
    setSelectedChapter((prev) => {
      const currentIndex = chapters.indexOf(prev);
      if (currentIndex > 0) {
        const newChapter = chapters[currentIndex - 1];
        return newChapter;
      }
      return prev;
    });
  }, [chapters]);

  const handleNextChapter = useCallback(() => {
    setSelectedChapter((prev) => {
      const currentIndex = chapters.indexOf(prev);
      if (currentIndex !== -1 && currentIndex < chapters.length - 1) {
        const newChapter = chapters[currentIndex + 1];
        return newChapter;
      }
      return prev;
    });
  }, [chapters]);

  return {
    versions,
    books,
    chapters,
    selectedVersion,
    selectedBook,
    selectedChapter,
    maxChapter,
    loadingVersions,
    loadingBooks,
    loadingChapters,
    handleVersionChange,
    handleBookChange,
    handleChapterChange,
    handlePreviousChapter,
    handleNextChapter,
  };
}
