'use client';

import React from 'react';
import ChapterViewer from './ChapterViewer';
import EmptyState from './EmptyState';

interface BibleViewerSectionProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string | null;
  maxChapter: number;
  language: string;
  loadingBooks: boolean;
  loadingChapters: boolean;
  loadingVersions: boolean;
  versions: string[];
  books: string[];
  t: (key: string) => string;
}

export default function BibleViewerSection({
  selectedBook,
  selectedChapter,
  selectedVersion,
  maxChapter,
  language,
  loadingBooks,
  loadingChapters,
  loadingVersions,
  versions,
  books,
  t
}: BibleViewerSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 overflow-auto dark:bg-[#181b23] dark:border dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        {selectedBook && selectedChapter && (
          <h2 className="text-lg font-['Merriweather'] font-semibold text-[#262626] dark:text-white">
            <span className="font-semibold">{selectedBook} </span>
            <span className='font-semibold'>{selectedChapter}</span>
          </h2>
        )}
        <div className="text-sm font-['Inter'] text-gray-600 bg-gray-50 px-3 py-1 dark:text-gray-200 dark:bg-[#2a2d35]">
          {t('select_translation')}: ({selectedVersion || (loadingVersions ? t('loading_translations') : t('no_translations'))})
        </div>
      </div>

      {selectedBook && selectedChapter && selectedVersion ? (
        <ChapterViewer
          version={selectedVersion}
          book={selectedBook}
          chapter={selectedChapter}
          maxChapter={maxChapter}
          language={language}
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
    </section>
  );
}
