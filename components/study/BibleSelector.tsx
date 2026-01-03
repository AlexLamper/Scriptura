import React from 'react';

type Props = {
  versions: { id: string; name: string; language?: string }[];
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

const languageNames: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  af: 'Afrikaans',
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

  // Group versions by language
  const groupedVersions = versions.reduce((acc, version) => {
    const lang = version.language || 'en';
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(version);
    return acc;
  }, {} as Record<string, typeof versions>);

  // Sort languages (optional, maybe put current language first?)
  const sortedLanguages = Object.keys(groupedVersions).sort((a, b) => {
      // Put 'nl' and 'en' first
      if (a === 'nl') return -1;
      if (b === 'nl') return 1;
      if (a === 'en') return -1;
      if (b === 'en') return 1;
      return a.localeCompare(b);
  });

  return (
    <div className="flex flex-row gap-2 items-center w-full">
      {/* Version Selector */}
      <select
        className="flex-1 w-full p-1 sm:p-2 text-sm bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-card dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md border-none focus:outline-none cursor-pointer"
        value={selectedVersion || ''}
        onChange={(e) => onVersionChange(e.target.value)}
        disabled={loadingVersions || versions.length === 0}
        title={t('translation')}
      >
        <option value="" disabled>
          {loadingVersions ? '...' : (versions.length === 0 ? t('no_translations') : 'Trans')}
        </option>
        {sortedLanguages.map((lang) => (
          <optgroup key={lang} label={languageNames[lang] || lang.toUpperCase()}>
            {groupedVersions[lang].map((version) => (
              <option key={version.id} value={version.id}>
                {version.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* Book Selector */}
      <select
        className="flex-1 w-full p-1 sm:p-2 text-sm bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-card dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md border-none focus:outline-none cursor-pointer"
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

      {/* Chapter Selector */}
      <select
        className="flex-1 w-full p-1 sm:p-2 text-sm bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-card dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-md border-none focus:outline-none cursor-pointer"
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
  );
}