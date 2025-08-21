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
    <section className="bg-white p-4 sm:p-6 rounded shadow overflow-auto dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        {selectedBook && selectedChapter && (
          <h2 className="text-lg font-semibold dark:text-white">
            <span className="font-semibold">{selectedBook} </span>
            <span className='font-semibold'>{selectedChapter}</span>
          </h2>
        )}
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg dark:text-gray-200 dark:bg-[#2a2d35]">
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
