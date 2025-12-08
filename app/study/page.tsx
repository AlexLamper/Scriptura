'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useTranslation } from '../i18n/client';
import { useBibleData } from '../../hooks/useBibleData';
import TopControls from '../../components/study/TopControls';
import BibleViewerSection from '../../components/study/BibleViewerSection';
import StudyMaterialsSection from '../../components/study/StudyMaterialsSection';
import StartupAnimation from '../../components/ui/startup-animation';

export default function StudyPage() {
  const { t, i18n } = useTranslation('study');
  const lng = i18n.resolvedLanguage;
  
  // Use the custom hook for Bible data management
  const {
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
  } = useBibleData(lng);

  // App ready state for startup animation
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (!loadingVersions && !loadingBooks && !loadingChapters && selectedBook && selectedChapter) {
      setIsAppReady(true);
    }
  }, [loadingVersions, loadingBooks, loadingChapters, selectedBook, selectedChapter]);

  // Wrapper for download functionality for keyboard shortcuts
  const handleDownload = useCallback(() => {
    // This will be handled by the DownloadButton component
    // Download triggered via keyboard shortcut
  }, []);

  // Ref for the BibleViewerSection to measure its height
  const bibleViewerRef = useRef<HTMLDivElement>(null);
  const [bibleViewerHeight, setBibleViewerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!bibleViewerRef.current) return;

    const updateHeight = () => {
      // Only apply height sync on xl screens (matching xl:grid-cols-2)
      if (window.innerWidth >= 1280 && bibleViewerRef.current) {
        setBibleViewerHeight(bibleViewerRef.current.offsetHeight);
      } else {
        setBibleViewerHeight(undefined);
      }
    };

    // Initial check
    updateHeight();

    // Observer for resize events on the element
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    
    resizeObserver.observe(bibleViewerRef.current);
    
    // Also listen for window resize to handle breakpoint changes
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [selectedBook, selectedChapter, selectedVersion]); // Re-run when content changes

  return (
    <div className="mt-2 font-inter">
      <StartupAnimation isReady={isAppReady} />
      
      {/* Top controls */}
      <TopControls
        versions={versions}
        books={books}
        chapters={chapters}
        selectedVersion={selectedVersion}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        maxChapter={maxChapter}
        loadingVersions={loadingVersions}
        loadingBooks={loadingBooks}
        loadingChapters={loadingChapters}
        onVersionChange={handleVersionChange}
        onBookChange={handleBookChange}
        onChapterChange={handleChapterChange}
        onPreviousChapter={handlePreviousChapter}
        onNextChapter={handleNextChapter}
        t={t}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Left: Bible verse section */}
        <div ref={bibleViewerRef}>
          <BibleViewerSection
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            selectedVersion={selectedVersion}
            maxChapter={maxChapter}
            loadingBooks={loadingBooks}
            loadingChapters={loadingChapters}
            loadingVersions={loadingVersions}
            versions={versions}
            books={books}
            t={t}
          />
        </div>

        {/* Right: Tabbed content section */}
        <StudyMaterialsSection
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          selectedVersion={selectedVersion}
          versions={versions}
          onNextChapter={handleNextChapter}
          onPrevChapter={handlePreviousChapter}
          onDownload={handleDownload}
          t={t}
          height={bibleViewerHeight}
        />
      </div>
    </div>
  );
}