import React from 'react';
// import { ChevronDown } from 'lucide-react'; // Not needed if using native select styling

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
  // Add loading states from parent
  loadingVersions: boolean;
  loadingBooks: boolean;
  loadingChapters: boolean;
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
  console.groupEnd(); // End BibleSelector Render group

  return (
    <>
      {/* Version Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm"
        value={selectedVersion || ''} // Use empty string for disabled option to be selected initially
        onChange={(e) => onVersionChange(e.target.value)}
        disabled={loadingVersions || versions.length === 0}
      >
        <option value="" disabled>
          {loadingVersions ? 'Laden vertalingen...' : (versions.length === 0 ? 'Geen vertalingen' : 'Selecteer vertaling')}
        </option>
        {versions.map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>

      {/* Book Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm"
        value={selectedBook}
        onChange={(e) => onBookChange(e.target.value)}
        disabled={loadingBooks || books.length === 0}
      >
        <option value="" disabled>
          {loadingBooks ? 'Laden boeken...' : (books.length === 0 ? 'Geen boeken' : 'Selecteer boek')}
        </option>
        {books.map((book) => (
          <option key={book} value={book}>
            {book}
          </option>
        ))}
      </select>

      {/* Chapter Selector */}
      <select
        className="px-3 py-2 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm"
        value={selectedChapter}
        onChange={(e) => onChapterChange(Number(e.target.value))}
        disabled={loadingChapters || chapters.length === 0}
      >
        {/* Use a value of 0 for the disabled option, as chapters start from 1 */}
        <option value={0} disabled>
          {loadingChapters ? 'Laden hoofdstukken...' : (chapters.length === 0 ? 'Geen hoofdstukken' : 'Selecteer hoofdstuk')}
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