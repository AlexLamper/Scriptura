'use client';

import React, { useState } from 'react';
import { MessageCircle, Clock, Users, Brain } from 'lucide-react';
import { ChapterNotes } from './ChapterNotes';
import InductiveStudy from './InductiveStudy';
import { useKeyboardShortcuts, KeyboardShortcut } from '../../hooks/useKeyboardShortcuts';

interface TabComponentProps {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion?: string | null;
  language: string;
  t: (key: string) => string;
  versions: string[];
  versionObjects?: { id: string; name: string; abbreviation: string }[];
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onDownload: () => void;
}

export default function TabComponent({ 
  selectedBook, 
  selectedChapter, 
  selectedVersion, 
  language = "en", 
  t, 
  onNextChapter,
  onPrevChapter,
  onDownload
}: TabComponentProps) {
  const [activeTab, setActiveTab] = useState('inductive');

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
    { id: 'inductive', label: t('tabs.inductive_study'), icon: Brain },
    { id: 'explanation', label: t('tabs.explanation'), icon: MessageCircle },
    { id: 'historical', label: t('tabs.historical'), icon: Clock },
    { id: 'notes', label: t('tabs.notes'), icon: Users },
  ];

  const renderTabContent = () => {
    const reference = selectedBook && selectedChapter ? `${selectedBook} ${selectedChapter}` : t('select_book_chapter');
    
    switch (activeTab) {
      case 'inductive':
        return <InductiveStudy 
          book={selectedBook || ''} 
          chapter={selectedChapter || 0} 
          version={selectedVersion || ''} 
        />;
      case 'explanation':
        return (
          <div className="space-y-4">
            {/* Thinking Question Section - Prominent placement at top of explanation tab */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg dark:bg-[#232325] dark:border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 dark:text-blue-300">
                <MessageCircle size={18} className="text-blue-600 dark:text-blue-300" />
                {t('thinking_question.title')}
              </h3>
              <p className="text-sm text-blue-900 leading-relaxed dark:text-blue-200">
                {t('thinking_question.default_text')}
              </p>
            </div>
            
            <h3 className="font-semibold mb-2 dark:text-gray-100">{t('explanation.title')}</h3>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> {t('explanation.intro')}
            </p>
            <h4 className="font-semibold mb-2 dark:text-gray-100">{t('explanation.commentary_title')}</h4>
            <p className="mb-4 dark:text-gray-200">
              In <a href="#" className="text-blue-600 dark:text-blue-300">{reference}</a> {t('explanation.commentary_text')}
            </p>
            <p className="mb-4 dark:text-gray-200">
              <span className="bg-yellow-200 p-1 rounded dark:bg-yellow-600 dark:text-yellow-50">{t('explanation.creation_text')}</span>
            </p>
          </div>
        );
      case 'historical':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2 dark:text-gray-100">{t('historical.title')} {reference}</h3>
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-[#232325]">
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.time_period')}</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                {t('historical.time_period_text')}
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.cultural_background')}</h4>
              <p className="text-sm text-gray-700 mb-3 dark:text-gray-200">
                {t('historical.cultural_background_text')}
              </p>
              <h4 className="font-medium mb-2 dark:text-gray-100">{t('historical.literary_context')}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {t('historical.literary_context_text')}
              </p>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="space-y-4">
            <ChapterNotes 
              book={selectedBook} 
              chapter={selectedChapter}
              language={language}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex flex-wrap space-x-1 mb-4 border-b border-gray-200 dark:border-gray-600 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-t-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500 dark:bg-[#232325] dark:text-blue-300 dark:border-blue-400'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-[#2a2d35]'
              }`}
            >
              <Icon size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
}
