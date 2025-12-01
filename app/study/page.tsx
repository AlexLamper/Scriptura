'use client';

import React, { useCallback } from 'react';
import { useTranslation } from '../i18n/client';
import { useBibleData } from '../../hooks/useBibleData';
import TopControls from '../../components/study/TopControls';
import BibleViewerSection from '../../components/study/BibleViewerSection';
import StudyMaterialsSection from '../../components/study/StudyMaterialsSection';

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

  // Wrapper for download functionality for keyboard shortcuts
  const handleDownload = useCallback(() => {
    // This will be handled by the DownloadButton component
    // Download triggered via keyboard shortcut
  }, []);

  return (
    <div className="mt-2 font-inter">
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
        />
      </div>
    </div>
  );
}