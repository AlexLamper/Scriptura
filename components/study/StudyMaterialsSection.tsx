'use client';

import React from 'react';
import { FileText, Edit, BookOpen, Folder } from 'lucide-react';
import TabComponent from './TabComponent';

interface StudyMaterialsSectionProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string | null;
  language: string;
  versions: string[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onDownload: () => void;
  t: (key: string) => string;
}

export default function StudyMaterialsSection({
  selectedBook,
  selectedChapter,
  selectedVersion,
  language,
  versions,
  onNextChapter,
  onPrevChapter,
  onDownload,
  t
}: StudyMaterialsSectionProps) {
  return (
    <section className="bg-white p-4 sm:p-6 rounded shadow dark:bg-[#181b23] dark:shadow-xl dark:shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg font-semibold dark:text-white">{t('study_materials').toUpperCase()}</h2>
        <div className="flex space-x-3">
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
            <FileText size={18} />
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
            <Edit size={18} />
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
            <BookOpen size={18} />
          </button>
          <button className="p-2 bg-gray-100 rounded hover:bg-gray-200 hover:ring-2 hover:ring-indigo-200 transition dark:bg-[#2a2d35] dark:hover:bg-[#3a3d45] dark:hover:ring-indigo-400 dark:text-gray-100">
            <Folder size={18} />
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <TabComponent 
        selectedBook={selectedBook} 
        selectedChapter={selectedChapter} 
        selectedVersion={selectedVersion}
        language={language} 
        t={t} 
        versions={versions}
        onNextChapter={onNextChapter}
        onPrevChapter={onPrevChapter}
        onDownload={onDownload}
      />
    </section>
  );
}
