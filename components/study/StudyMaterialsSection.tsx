'use client';

import React from 'react';
import { FileText, Edit, BookOpen, Folder } from 'lucide-react';
import TabComponent from './TabComponent';

interface StudyMaterialsSectionProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string | null;
  versions: string[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onDownload: () => void;
  t: (key: string) => string;
  height?: number;
}

export default function StudyMaterialsSection({
  selectedBook,
  selectedChapter,
  selectedVersion,
  versions,
  onNextChapter,
  onPrevChapter,
  onDownload,
  t,
  height
}: StudyMaterialsSectionProps) {
  return (
    <section 
      style={height ? { height: `${height}px` } : undefined}
      className={`bg-white p-4 sm:p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-shadow duration-300 dark:bg-card dark:border dark:border-border ${height ? 'flex flex-col' : ''}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 flex-none">
        <h2 className="text-lg font-merriweather font-semibold text-[#262626] dark:text-foreground">{t('study_materials')}</h2>
        <div className="flex space-x-3">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-secondary dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground">
            <FileText size={18} />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-secondary dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground">
            <Edit size={18} />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-secondary dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground">
            <BookOpen size={18} />
          </button>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-[#798777] transition shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:bg-secondary dark:hover:bg-accent dark:hover:ring-[#9aaa98] dark:text-foreground">
            <Folder size={18} />
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className={height ? "flex-1 min-h-0 overflow-hidden flex flex-col" : ""}>
        <TabComponent 
          selectedBook={selectedBook} 
          selectedChapter={selectedChapter} 
          selectedVersion={selectedVersion}
          t={t} 
          versions={versions}
          onNextChapter={onNextChapter}
          onPrevChapter={onPrevChapter}
          onDownload={onDownload}
          height={height}
        />
      </div>
    </section>
  );
}
