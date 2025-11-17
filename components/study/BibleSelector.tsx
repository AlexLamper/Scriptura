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

  return (
    <div className="space-y-1 sm:space-y-2 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 sm:gap-2 md:gap-4">
        {/* Version Selector */}
        <div className="space-y-1 sm:space-y-2 md:space-y-4">
          <label className="hidden md:block text-xs md:text-sm font-['Inter'] font-medium text-gray-700 dark:text-gray-300">
            {t('translation')}
          </label>
          <select
            className="w-full px-1.5 py-1 text-xs sm:text-sm font-['Inter'] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#798777] focus:border-[#798777] rounded-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-[#9aaa98] dark:focus:border-[#9aaa98]"
            value={selectedVersion || ''}
            onChange={(e) => onVersionChange(e.target.value)}
            disabled={loadingVersions || versions.length === 0}
            title={t('translation')}
          >
            <option value="" disabled>
              {loadingVersions ? '...' : (versions.length === 0 ? t('no_translations') : 'Trans')}
            </option>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>

        {/* Book and Chapter - Side by side on mobile, separate on desktop */}
        <div className="grid grid-cols-2 md:contents gap-1 sm:gap-2 md:gap-4">
          {/* Book Selector */}
          <div className="space-y-1 sm:space-y-2 md:space-y-4">
            <label className="hidden md:block text-xs md:text-sm font-['Inter'] font-medium text-gray-700 dark:text-gray-300">
              {t('book')}
            </label>
            <select
              className="w-full px-1.5 py-1 text-xs sm:text-sm font-['Inter'] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#798777] focus:border-[#798777] rounded-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-[#9aaa98] dark:focus:border-[#9aaa98]"
              value={selectedBook}
              onChange={(e) => onBookChange(e.target.value)}
              disabled={loadingBooks || books.length === 0}
              title={t('book')}
            >
              <option value="" disabled>
                {loadingBooks ? '...' : (books.length === 0 ? t('no_books') : 'Book')}
              </option>
              {books.map((book) => (
                <option key={book} value={book}>
                  {book}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selector */}
          <div className="space-y-1 sm:space-y-2 md:space-y-4">
            <label className="hidden md:block text-xs md:text-sm font-['Inter'] font-medium text-gray-700 dark:text-gray-300">
              {t('chapter')}
            </label>
            <select
              className="w-full px-1.5 py-1 text-xs sm:text-sm font-['Inter'] border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#798777] focus:border-[#798777] rounded-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-[#9aaa98] dark:focus:border-[#9aaa98]"
              value={selectedChapter}
              onChange={(e) => onChapterChange(Number(e.target.value))}
              disabled={loadingChapters || chapters.length === 0}
              title={t('chapter')}
            >
              <option value={0} disabled>
                {loadingChapters ? '...' : (chapters.length === 0 ? t('no_chapters') : 'Ch')}
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
    </div>
  );
}