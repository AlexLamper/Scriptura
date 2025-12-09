'use client';

import React, { useState } from 'react';
import { MessageCircle, Clock, Users, Brain } from 'lucide-react';
import { ChapterNotes } from './ChapterNotes';
import InductiveStudy from './InductiveStudy';
import HistoricalContext from './HistoricalContext';
import { useKeyboardShortcuts, KeyboardShortcut } from '../../hooks/useKeyboardShortcuts';
import CommentaryComponent from './CommentaryComponent';

interface TabComponentProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion?: string | null;
  t: (key: string) => string;
  versions: string[];
  versionObjects?: { id: string; name: string; abbreviation: string }[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onDownload: () => void;
  height?: number;
}

export default function TabComponent({ 
  selectedBook, 
  selectedChapter, 
  selectedVersion, 
  t, 
  onNextChapter,
  onPrevChapter,
  onDownload,
  height
}: TabComponentProps) {
  const [activeTab, setActiveTab] = useState('commentary');

  // Define keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'ArrowRight',
      action: onNextChapter,
      description: t('shortcuts.next_chapter')
    },
    {
      key: 'ArrowLeft',
      action: onPrevChapter,
      description: t('shortcuts.prev_chapter')
    },
    {
      key: 'd',
      action: onDownload,
      description: t('shortcuts.download')
    },
  ];

  // Enable keyboard shortcuts
  useKeyboardShortcuts({ shortcuts });

  const tabs = [
    { id: 'commentary', label: t('tabs.commentary'), icon: MessageCircle },
    { id: 'inductive', label: t('tabs.inductive_study'), icon: Brain },
    { id: 'historical', label: t('tabs.historical'), icon: Clock },
    { id: 'notes', label: t('tabs.notes'), icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'commentary':
        return (
          <CommentaryComponent
            book={selectedBook}
            chapter={selectedChapter}
            source="matthew-henry"
            height={height}
          />
        );
      case 'inductive':
        return <InductiveStudy 
          book={selectedBook || ''} 
          chapter={selectedChapter || 0} 
          version={selectedVersion || ''} 
        />;
      case 'historical':
        return (
          <HistoricalContext 
            book={selectedBook || ''} 
            chapter={selectedChapter || 0} 
            t={t}
          />
        );
      case 'notes':
        return (
          <div className="space-y-4">
            <ChapterNotes 
              book={selectedBook} 
              chapter={selectedChapter}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={height ? "flex flex-col h-full" : ""}>
      {/* Tab Headers */}
      <div className="flex flex-wrap space-x-1 mb-4 border-b border-gray-200 dark:border-border overflow-x-auto flex-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-inter font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#798777]/10 text-[#798777] border-b-2 border-[#798777] dark:bg-accent dark:text-[#9aaa98] dark:border-[#9aaa98]'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent'
              }`}
            >
              <Icon size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className={height ? "flex-1 min-h-0 overflow-hidden" : "min-h-[400px]"}>
        {renderTabContent()}
      </div>
    </div>
  );
}
