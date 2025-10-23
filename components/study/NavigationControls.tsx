'use client';

import React from 'react';

interface NavigationControlsProps {
  selectedChapter: number;
  maxChapter: number;
  loadingChapters: boolean;
  selectedBook: string;
  chapters: number[];
  onPreviousChapter: () => void;
  onNextChapter: () => void;
  t: (key: string) => string;
}

export default function NavigationControls({
  selectedChapter,
  maxChapter,
  loadingChapters,
  selectedBook,
  chapters,
  onPreviousChapter,
  onNextChapter,
  t
}: NavigationControlsProps) {
  const isPreviousDisabled = selectedChapter <= 1 || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === 0;
  const isNextDisabled = selectedChapter >= maxChapter || loadingChapters || !selectedBook || chapters.indexOf(selectedChapter) === chapters.length - 1;

  return (
    <div className="flex items-end gap-2 pb-0.5">
      <button
        className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-[#9aaa98] dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title={t('previous_chapter')}
        onClick={onPreviousChapter}
        disabled={isPreviousDisabled}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-[#9aaa98] dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title={t('next_chapter')}
        onClick={onNextChapter}
        disabled={isNextDisabled}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
