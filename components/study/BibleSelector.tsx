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
    <>
      {/* Version Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm dark:bg-[#232325] dark:border-gray-500 dark:text-gray-100 dark:focus:ring-indigo-300"
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

      {/* Book Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm dark:bg-[#232325] dark:border-gray-500 dark:text-gray-100 dark:focus:ring-indigo-300"
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

      {/* Chapter Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm dark:bg-[#232325] dark:border-gray-500 dark:text-gray-100 dark:focus:ring-indigo-300"
        value={selectedChapter}
        onChange={(e) => onChapterChange(Number(e.target.value))}
        disabled={loadingChapters || chapters.length === 0}
      >
        {/* Value of 0 for the disabled option, as chapters start from 1 */}
        <option value={0} disabled>
          {loadingChapters ? t('loading_chapters') : (chapters.length === 0 ? t('no_chapters') : t('select_chapter'))}
        </option>
        {chapters.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}