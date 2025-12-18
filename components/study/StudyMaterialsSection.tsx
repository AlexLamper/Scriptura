'use client';

import React, { useState } from 'react';
import { MessageCircle, Users, Brain, Info } from 'lucide-react';
import TabComponent from './TabComponent';

interface StudyMaterialsSectionProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string | null;
  selectedCommentary: string;
  versions: { id: string; name: string }[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onCommentaryChange: (commentary: string) => void;
  onDownload: () => void;
  t: (key: string) => string;
  height?: number;
}

export default function StudyMaterialsSection({
  selectedBook,
  selectedChapter,
  selectedVersion,
  selectedCommentary,
  versions,
  onNextChapter,
  onPrevChapter,
  onCommentaryChange,
  onDownload,
  t
}: StudyMaterialsSectionProps) {
  const [activeTab, setActiveTab] = useState('commentary');

  const tabs = [
    { id: 'commentary', label: t('tabs.commentary'), icon: MessageCircle },
    { id: 'inductive', label: t('tabs.inductive_study'), icon: Brain },
    { id: 'historical', label: t('tabs.general_info'), icon: Info },
    { id: 'notes', label: t('tabs.notes'), icon: Users },
  ];

  return (
    <section 
      className="bg-white shadow-sm flex flex-col h-full dark:bg-card"
    >
      {/* Header with Tabs */}
      <div className="h-14 flex items-center px-4 border-b border-gray-200 dark:border-border bg-white dark:bg-card flex-none overflow-x-auto">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-inter font-medium transition whitespace-nowrap rounded-md ${
                  isActive
                    ? 'bg-[#798777]/10 text-[#798777] dark:bg-accent dark:text-[#9aaa98]'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent'
                }`}
              >
                <Icon size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
        <TabComponent 
          selectedBook={selectedBook} 
          selectedChapter={selectedChapter} 
          selectedVersion={selectedVersion}
          selectedCommentary={selectedCommentary}
          t={t} 
          versions={versions}
          onNextChapter={onNextChapter}
          onPrevChapter={onPrevChapter}
          onCommentaryChange={onCommentaryChange}
          onDownload={onDownload}
          height={1}
          activeTab={activeTab}
        />
        {/* Bottom Blur Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 dark:from-card" />
      </div>
    </section>
  );
}
