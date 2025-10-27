"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { StickyNote, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useTranslation } from "../../app/i18n/client";

interface Note {
  _id: string;
  noteText: string;
  verseReference?: string;
  tags: string[];
  createdAt: string;
}

interface ChapterNotesProps {
  book: string;
  chapter: number;
  language: string;
  className?: string;
}

export function ChapterNotes({ book, chapter, language }: ChapterNotesProps) {
  const { data: session } = useSession();
  const { t } = useTranslation(language, 'study');
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!session?.user?.email) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/notes?book=${book}&chapter=${chapter}&userEmail=${session.user.email}`);
        
        if (response.ok) {
          const data = await response.json();
          setNotes(data.notes || []);
        } else {
          setError('Failed to load notes');
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError('Error loading notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [book, chapter, session?.user?.email]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nl-NL', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const truncateText = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (!session) return null;

  {/* Loading State */}
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#798777] mx-auto mb-4" />
          <p className="font-['Inter'] text-gray-700 text-base font-medium dark:text-gray-200">
            Notities laden...
          </p>
        </div>
      </div>
    );
  }

  {/* Error State */}
  if (error) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
        <CardContent className="py-12 text-center">
          <p className="font-['Inter'] text-red-600 dark:text-red-400 text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  {/* Empty State */}
  if (notes.length === 0) {
    return (
      <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
        <CardContent className="py-12 text-center text-gray-500 dark:text-gray-300">
          <p className="font-['Inter'] text-sm">Nog geen notities voor dit hoofdstuk.</p>
        </CardContent>
      </Card>
    );
  }

  {/* Notes Content */}
  return (
    <Card className="border-0 shadow-none rounded-none dark:bg-[#23263a]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-['Merriweather'] text-[#262626] dark:text-white">
          <StickyNote className="w-6 h-6 text-[#798777]" />
          {t("notes")} {book} {chapter}
        </CardTitle>
        <p className="font-['Inter'] text-sm text-gray-600 dark:text-gray-400">
          Jouw persoonlijke notities en inzichten bij deze passage.
        </p>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notes.map((note) => (
            <div key={note._id} className="p-4 bg-gray-50 border border-gray-200 dark:bg-[#232325] dark:border-gray-700">
              <div className="flex items-start justify-between mb-2">
                {note.verseReference && (
                  <h4 className="font-['Merriweather'] font-medium text-[#798777] dark:text-[#9aaa98] text-sm">
                    {note.verseReference}
                  </h4>
                )}
                <div className="flex items-center gap-1 font-['Inter'] text-xs text-gray-500 dark:text-gray-400 ml-auto">
                  <Calendar className="h-3 w-3" />
                  {formatDate(note.createdAt)}
                </div>
              </div>
              
              <p className="font-['Inter'] text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                {truncateText(note.noteText)}
              </p>
              
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {note.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{note.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}