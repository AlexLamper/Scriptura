"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { StickyNote } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

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

interface RecentNotesCardProps {
  lng: string;
}

export function RecentNotesCard({ lng }: RecentNotesCardProps) {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      if (!session) return;

      try {
        setLoading(true);
        const response = await fetch("/api/notes?limit=5&page=1");
        
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

    fetchRecentNotes();
  }, [session]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString(lng, { month: "short", day: "numeric" });
  };

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  if (!session) return null;

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Notes</h3>
          <Link href={`/${lng}/notes`}>
            <Button variant="ghost" size="sm" className="text-[#3b82f6] font-medium hover:bg-[#3b82f6]/10">
              View All →
            </Button>
          </Link>
        </div>
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && notes.length === 0 && (
          <div className="text-center py-8">
            <StickyNote className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              No notes yet
            </p>
            <Link href={`/${lng}/study`}>
              <Button size="sm" variant="outline">
                Start Taking Notes
              </Button>
            </Link>
          </div>
        )}

        {!loading && !error && notes.length > 0 && (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-gray-900">{note.verseReference}</p>
                  <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
                </div>
                
                <p className="text-sm text-gray-700 mb-2">
                  {truncateText(note.noteText)}
                </p>
                
                {note.tags.length > 0 && (
                  <div className="flex gap-1">
                    {note.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-300 bg-gray-100 text-gray-700">
                        #{tag}
                      </Badge>
                    ))}
                    {note.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-300 bg-gray-100 text-gray-700">
                        +{note.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full text-gray-700 border-gray-300 bg-white py-2 hover:bg-gray-50"
        >
          Nieuwe notitie
        </Button>
      </CardContent>
    </Card>
  );
}
