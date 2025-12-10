'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
  const lastBookIndexRef = useRef<number>(-1);
  const lastChapterRef = useRef<number>(-1);

  const API_BASE_URL = 'https://www.scriptura-api.com/api';

  // Function to get default Bible version based on language
  const getDefaultVersion = (availableVersions: string[], language: string): string | null => {
    if (language === 'nl') {
      if (availableVersions.includes('Staten Vertaling')) {
        return 'Staten Vertaling';
      }
    } else if (language === 'en') {
      if (availableVersions.includes('American Standard Version')) {
        return 'American Standard Version';
      }
      if (availableVersions.includes('ASV')) {
        return 'ASV';
      }
    }
    
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
                const pref = preferences.translation.toLowerCase();
                const matchedVersion = versionNames.find(v => {
                  const vLower = v.toLowerCase();
                  return vLower === pref || 
                         vLower.includes(`(${pref})`) || 
                         vLower.includes(`${pref} `) ||
                         vLower === pref;
                });

                if (matchedVersion) {
                  setSelectedVersion(matchedVersion);
                  restored = true;
                } else {
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
      setChapters([]);
      setSelectedChapter(1);
      setMaxChapter(1);
      return;
    }

    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
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
        const bookNames: string[] = await res.json();

        setBooks(bookNames);

        // Check if the currently selected book is valid in the new version
        let isBookValid = selectedBook && bookNames.includes(selectedBook);
        let nextBook = selectedBook;

        if (!isBookValid && lastBookIndexRef.current !== -1) {
          if (lastBookIndexRef.current < bookNames.length) {
            nextBook = bookNames[lastBookIndexRef.current];
            isBookValid = true;
          }
          lastBookIndexRef.current = -1;
        }

        // Only set default book if we don't have a valid selected book
        if (!isBookValid) {
          let defaultBook = '';
          if (selectedVersion === 'Staten Vertaling' || lng === 'nl') {
            if (bookNames.includes('Genesis')) {
              defaultBook = 'Genesis';
            } else if (bookNames.includes('1 Mozes')) {
              defaultBook = '1 Mozes';
            }
          } else {
            if (bookNames.includes('Genesis')) {
              defaultBook = 'Genesis';
            }
          }

          if (!defaultBook && bookNames.length > 0) {
            defaultBook = bookNames[0];
          }

          if (defaultBook) {
            setSelectedBook(defaultBook);
          } else {
            setSelectedBook('');
            console.warn('No books found from API.');
          }
        } else if (nextBook !== selectedBook) {
          setSelectedBook(nextBook);
        }
        
        if (!lastReadLoaded) {
          setLastReadLoaded(true);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setBooks([]);
        setSelectedBook('');
      } finally {
        setLoadingBooks(false);
        console.groupEnd();
      }
    };
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVersion, lng]);

  // 3. Fetch chapters for a selected book and version
  useEffect(() => {
    if (!selectedBook) {
      setChapters([]);
      setMaxChapter(1);
      return;
    }
    if (!selectedVersion) {
      console.warn('useEffect: selectedBook is present but selectedVersion is missing. This is unexpected.');
      return;
    }

    const fetchChapters = async () => {
      setLoadingChapters(true);
      try {
        const params = new URLSearchParams({ book: selectedBook });
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
          if (lastChapterRef.current !== -1) {
            const stored = lastChapterRef.current;
            lastChapterRef.current = -1;
            
            if (chapterNumbers.includes(stored)) {
              return stored;
            }
          }

          const newChapter = chapterNumbers.includes(prevChapter) ? prevChapter : (chapterNumbers.length > 0 ? chapterNumbers[0] : 1);
          return newChapter;
        });

      } catch (err) {
        console.error(`Error fetching chapters for ${selectedBook}:`, err);
        setChapters([]);
        setMaxChapter(1);
        setSelectedChapter(1);
      } finally {
        setLoadingChapters(false);
        console.groupEnd();
      }
    };
    fetchChapters();
  }, [selectedBook, selectedVersion]);

  // 4. Save last read chapter whenever user changes book, chapter, or version
  useEffect(() => {
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

    const timeoutId = setTimeout(saveLastRead, 1000);
    return () => clearTimeout(timeoutId);
  }, [selectedBook, selectedChapter, selectedVersion, lastReadLoaded]);

  const handleVersionChange = useCallback((version: string) => {
    if (books.length > 0 && selectedBook) {
      lastBookIndexRef.current = books.indexOf(selectedBook);
      lastChapterRef.current = selectedChapter;
    }

    setLoadingBooks(true);
    setSelectedBook('');
    setSelectedVersion(version);
  }, [books, selectedBook, selectedChapter]);

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
