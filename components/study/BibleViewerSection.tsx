'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ChapterViewer from './ChapterViewer';
import BibleSelector from './BibleSelector';
import EmptyState from './EmptyState';

interface BibleViewerSectionProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string | null;
  maxChapter: number;
  loadingBooks: boolean;
  loadingChapters: boolean;
  loadingVersions: boolean;
  versions: string[];
  books: string[];
  chapters: number[];
  onVersionChange: (v: string) => void;
  onBookChange: (b: string) => void;
  onChapterChange: (c: number) => void;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  t: (key: string) => string;
}

export default function BibleViewerSection({
  selectedBook,
  selectedChapter,
  selectedVersion,
  maxChapter,
  loadingBooks,
  loadingChapters,
  loadingVersions,
  versions,
  books,
  chapters,
  onVersionChange,
  onBookChange,
  onChapterChange,
  onPreviousChapter,
  onNextChapter,
  t
}: BibleViewerSectionProps) {
  return (
    <section className="bg-white shadow-sm flex flex-col h-full dark:bg-card dark:border-r dark:border-border">
      {/* Header with Navigation and Selectors */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-border bg-white dark:bg-card flex-none gap-2">
        {/* Previous Chapter Button */}
        <button
          onClick={onPreviousChapter}
          disabled={selectedChapter <= 1}
          className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-card dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          title={t('previous_chapter')}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bible Selector */}
        <div className="flex-1 px-2 sm:px-4 flex justify-center">
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
        </div>

        {/* Next Chapter Button */}
        <button
          onClick={onNextChapter}
          disabled={selectedChapter >= maxChapter}
          className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-card dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          title={t('next_chapter')}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative min-h-0">
        <div className="h-full overflow-y-auto p-4 sm:p-6 pb-24">
          {selectedBook && selectedChapter && selectedVersion ? (
            <ChapterViewer
              version={selectedVersion}
              book={selectedBook}
              chapter={selectedChapter}
              maxChapter={maxChapter}
            />
          ) : (
            <EmptyState
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              selectedVersion={selectedVersion}
              loadingBooks={loadingBooks}
              loadingChapters={loadingChapters}
              loadingVersions={loadingVersions}
              versions={versions}
              books={books}
              t={t}
            />
          )}
        </div>
        {/* Bottom Blur Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 dark:from-card" />
      </div>
    </section>
  );
}
