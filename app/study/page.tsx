'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from '../i18n/client';
import { useBibleData } from '../../hooks/useBibleData';
import { useReadingPreferences } from '../../hooks/useReadingPreferences';
import BibleViewerSection from '../../components/study/BibleViewerSection';
import StudyMaterialsSection from '../../components/study/StudyMaterialsSection';
import StartupAnimation from '../../components/ui/startup-animation';

export default function StudyPage() {
  const { t, i18n } = useTranslation('study');
  const lng = i18n.resolvedLanguage;
  
  const { preferences, updatePreferences } = useReadingPreferences();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Check if we've already shown the animation in this session
    const hasShown = sessionStorage.getItem('study-startup-shown');
    if (!hasShown) {
      setShowAnimation(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    sessionStorage.setItem('study-startup-shown', 'true');
    setShowAnimation(false);
  };

  const {
    versions,
    books,
    chapters,
    selectedVersion,
    selectedBook,
    selectedChapter,
    selectedCommentary,
    maxChapter,
    loadingVersions,
    loadingBooks,
    loadingChapters,
    isInitialLoading,
    handleVersionChange,
    handleBookChange,
    handleChapterChange,
    handleCommentaryChange,
    handlePreviousChapter,
    handleNextChapter,
  } = useBibleData(lng);

  const handleDownload = useCallback(() => {
    // This will be handled by the DownloadButton component
    // Download triggered via keyboard shortcut
  }, []);

  return (
    <div className="h-full flex flex-col font-inter overflow-hidden">
      {showAnimation && (
        <StartupAnimation 
          isReady={!isInitialLoading} 
          onComplete={handleAnimationComplete} 
        />
      )}
      
      <div className="flex flex-col lg:flex-row h-full w-full">
        {/* Left: Bible verse section (50% width) */}
        <div className="h-full w-full lg:w-1/2 min-h-0 overflow-hidden border-r border-gray-200 dark:border-border">
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
            chapters={chapters}
            onVersionChange={handleVersionChange}
            onBookChange={handleBookChange}
            onChapterChange={handleChapterChange}
            onPreviousChapter={handlePreviousChapter}
            onNextChapter={handleNextChapter}
            t={t}
            preferences={preferences}
            onUpdatePreferences={updatePreferences}
          />
        </div>

        {/* Right: Study materials section (50% width) */}
        <div className="h-full w-full lg:w-1/2 min-h-0 overflow-hidden">
          <StudyMaterialsSection
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            selectedVersion={selectedVersion}
            selectedCommentary={selectedCommentary}
            versions={versions}
            onNextChapter={handleNextChapter}
            onPrevChapter={handlePreviousChapter}
            onCommentaryChange={handleCommentaryChange}
            onDownload={handleDownload}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}