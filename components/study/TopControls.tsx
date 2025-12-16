'use client';

import React from 'react';
import BibleSelector from './BibleSelector';
import NavigationControls from './NavigationControls';
import DownloadButton from './DownloadButton';

interface TopControlsProps {
  // Bible data
  versions: { id: string; name: string }[];
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
  onVersionChange: (version: string) => void;
  onBookChange: (book: string) => void;
  onChapterChange: (chapter: number) => void;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  
  // Translation function
  t: (key: string) => string;
}

export default function TopControls({
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
  onVersionChange,
  onBookChange,
  onChapterChange,
  onPreviousChapter,
  onNextChapter,
  t
}: TopControlsProps) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-2 md:gap-3 mb-6">
      <BibleSelector
        versions={versions}
        books={books}
        chapters={chapters}
        selectedVersion={selectedVersion}
        selectedBook={selectedBook}
        selectedChapter={selectedChapter}
        onVersionChange={onVersionChange}
        onBookChange={onBookChange}
        onChapterChange={onChapterChange}
        loadingVersions={loadingVersions}
        loadingBooks={loadingBooks}
        loadingChapters={loadingChapters}
        t={t}
      />

      {/* Navigation Arrows and Download Button */}
      <div className="flex items-center gap-2 md:ml-auto md:pb-0.5">
        <NavigationControls
          selectedChapter={selectedChapter}
          maxChapter={maxChapter}
          loadingChapters={loadingChapters}
          selectedBook={selectedBook}
          chapters={chapters}
          onPreviousChapter={onPreviousChapter}
          onNextChapter={onNextChapter}
          t={t}
        />

        <DownloadButton
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          selectedVersion={selectedVersion}
          t={t}
        />
      </div>
    </div>
  );
}
