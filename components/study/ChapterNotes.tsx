"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { StickyNote, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useTranslation } from "../../app/i18n/client";

interface Note {
  _id: string;
  verseReference: string;
  book: string;
  chapter: number;
  verse?: number;
  verseText: string;
  translation: string;
  noteText: string;
  highlightColor: string;
  tags: string[];
  type: "note" | "highlight" | "both";
  createdAt: string;
}

interface ChapterNotesProps {
  book: string;
  chapter: number;
  className?: string;
  language?: string;
}

export function ChapterNotes({ book, chapter, className = "", language = "en" }: ChapterNotesProps) {
  const { data: session } = useSession();
  const { t } = useTranslation(language, "notes");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapterNotes = async () => {
      if (!session || !book || !chapter) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/notes?book=${encodeURIComponent(book)}&chapter=${chapter}&limit=10&page=1`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        setNotes(data.notes || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchChapterNotes();
  }, [session, book, chapter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString("en", { month: "short", day: "numeric" });
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (!session) return null;

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-['Merriweather'] font-semibold flex items-center gap-2 text-[#262626] dark:text-white">
          <StickyNote className="h-4 w-4 text-[#798777]" />
          {t("notes_for_chapter")} {book} {chapter}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-4 w-4 border-b-2 border-[#798777]"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="font-['Inter'] text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && notes.length === 0 && (
          <div className="text-center py-4">
            <p className="font-['Inter'] text-gray-600 dark:text-gray-400 text-sm">
              {t("no_notes_chapter")}
            </p>
          </div>
        )}

        {!loading && !error && notes.length > 0 && (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note._id}
                className="p-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-['Merriweather'] font-medium text-[#798777] dark:text-[#9aaa98] text-sm">
                    {note.verseReference}
                  </h4>
                  <div className="flex items-center gap-1 font-['Inter'] text-xs text-gray-500 dark:text-gray-400">
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
        )}
      </CardContent>
    </Card>
  );
}
