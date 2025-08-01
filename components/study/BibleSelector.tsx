import React from 'react';

type Props = {
  versions: string[];
  books: string[];
  chapters: number[];
  selectedVersion: string | null;
  selectedBook: string;
  selectedChapter: number;
  onVersionChange: (v: string) => void;
  onBookChange: (b: string) => void;
  onChapterChange: (c: number) => void;
  loadingVersions: boolean;
  loadingBooks: boolean;
  loadingChapters: boolean;
  t: (key: string) => string;
};

export default function BibleSelector({
  versions,
  books,
  chapters,
  selectedVersion,
  selectedBook,
  selectedChapter,
  onVersionChange,
  onBookChange,
  onChapterChange,
  loadingVersions,
  loadingBooks,
  loadingChapters,
  t,
}: Props) {
  console.groupCollapsed('--- BibleSelector Render ---');
  console.log('Props received by BibleSelector:', {
    selectedVersion,
    selectedBook,
    selectedChapter,
    versionsCount: versions.length,
    booksCount: books.length,
    chaptersCount: chapters.length,
    loadingVersions,
    loadingBooks,
    loadingChapters,
  });
  console.groupEnd();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {t('select_passage')}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Version Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('translation')}
          </label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            value={selectedVersion || ''}
            onChange={(e) => onVersionChange(e.target.value)}
            disabled={loadingVersions || versions.length === 0}
          >
            <option value="" disabled>
              {loadingVersions ? t('loading_translations') : (versions.length === 0 ? t('no_translations') : t('select_translation'))}
            </option>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        {/* Book Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('book')}
          </label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            value={selectedBook}
            onChange={(e) => onBookChange(e.target.value)}
            disabled={loadingBooks || books.length === 0}
          >
            <option value="" disabled>
              {loadingBooks ? t('loading_books') : (books.length === 0 ? t('no_books') : t('select_book'))}
            </option>
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
        </div>

        {/* Chapter Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('chapter')}
          </label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            value={selectedChapter}
            onChange={(e) => onChapterChange(Number(e.target.value))}
            disabled={loadingChapters || chapters.length === 0}
          >
            <option value={0} disabled>
              {loadingChapters ? t('loading_chapters') : (chapters.length === 0 ? t('no_chapters') : t('select_chapter'))}
            </option>
            {chapters.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}