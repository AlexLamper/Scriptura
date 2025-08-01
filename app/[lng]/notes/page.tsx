"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../i18n/client";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Tag,
  Eye,
  EyeOff,
  ChevronDown,
  StickyNote,
  Highlighter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../../components/ui/dropdown-menu";

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
  isPrivate: boolean;
  type: "note" | "highlight" | "both";
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesPageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = React.use(params);
  const { lng } = resolvedParams;
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation(lng, "notes");
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Get unique books and tags from notes for filters
  const uniqueBooks = Array.from(new Set(notes.map(note => note.book))).sort();
  const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

  const highlightColors = {
    yellow: "bg-yellow-200 border-yellow-300 text-yellow-900",
    blue: "bg-blue-200 border-blue-300 text-blue-900",
    green: "bg-green-200 border-green-300 text-green-900",
    pink: "bg-pink-200 border-pink-300 text-pink-900",
    purple: "bg-purple-200 border-purple-300 text-purple-900",
    orange: "bg-orange-200 border-orange-300 text-orange-900"
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push(`/${lng}/auth/signin`);
      return;
    }
  }, [session, status, router, lng]);

  // Fetch notes
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedBook !== "all") params.append("book", selectedBook);
      if (selectedTag !== "all") params.append("tag", selectedTag);
      if (selectedType !== "all") params.append("type", selectedType);
      params.append("page", currentPage.toString());
      params.append("limit", "20");

      const response = await fetch(`/api/notes?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data.notes);
      setTotalPages(data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [selectedBook, selectedTag, selectedType, currentPage]);

  useEffect(() => {
    if (session) {
      fetchNotes();
    }
  }, [session, fetchNotes]);

  // Filter notes by search term (client-side filtering for better UX)
  const filteredNotes = notes.filter(note => 
    note.verseReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.verseText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.noteText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const deleteNote = async (noteId: string) => {
    if (!confirm(t("confirm_delete", { defaultValue: "Are you sure you want to delete this note?" }))) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Remove note from local state
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete note");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lng, { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StickyNote className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t("page_title", { defaultValue: "My Notes & Highlights" })}
              </h1>
            </div>
            <Button 
              onClick={() => router.push(`/${lng}/study`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("create_note", { defaultValue: "Create Note" })}
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t("page_description", { defaultValue: "Manage all your Bible study notes and highlights in one place" })}
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={t("search_placeholder", { defaultValue: "Search notes, verses, or tags..." })}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                {/* Type Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      {selectedType === "all" ? t("all_types", { defaultValue: "All Types" }) : selectedType}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedType("all")}>
                      {t("all_types", { defaultValue: "All Types" })}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("note")}>
                      <StickyNote className="h-4 w-4 mr-2" />
                      {t("notes_only", { defaultValue: "Notes Only" })}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("highlight")}>
                      <Highlighter className="h-4 w-4 mr-2" />
                      {t("highlights_only", { defaultValue: "Highlights Only" })}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType("both")}>
                      {t("both_types", { defaultValue: "Notes & Highlights" })}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Book Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {selectedBook === "all" ? t("all_books", { defaultValue: "All Books" }) : selectedBook}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 overflow-y-auto">
                    <DropdownMenuItem onClick={() => setSelectedBook("all")}>
                      {t("all_books", { defaultValue: "All Books" })}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {uniqueBooks.map(book => (
                      <DropdownMenuItem key={book} onClick={() => setSelectedBook(book)}>
                        {book}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Tag Filter */}
                {uniqueTags.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Tag className="h-4 w-4 mr-2" />
                        {selectedTag === "all" ? t("all_tags", { defaultValue: "All Tags" }) : selectedTag}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="max-h-60 overflow-y-auto">
                      <DropdownMenuItem onClick={() => setSelectedTag("all")}>
                        {t("all_tags", { defaultValue: "All Tags" })}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {uniqueTags.map(tag => (
                        <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                          #{tag}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-950">
            <CardContent className="p-4">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Notes Grid */}
        {!loading && (
          <>
            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t("no_notes_title", { defaultValue: "No notes found" })}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {t("no_notes_description", { defaultValue: "Start taking notes while studying to see them here." })}
                  </p>
                  <Button onClick={() => router.push(`/${lng}/study`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("start_studying", { defaultValue: "Start Studying" })}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <Card key={note._id} className={`hover:shadow-lg transition-shadow ${
                    note.type === "highlight" ? `border-2 ${highlightColors[note.highlightColor as keyof typeof highlightColors]}` : ""
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                            {note.verseReference}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {formatDate(note.createdAt)}
                            {!note.isPrivate ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              {t("edit_note", { defaultValue: "Edit" })}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteNote(note._id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("delete_note", { defaultValue: "Delete" })}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* Bible Verse */}
                      <blockquote className="italic text-gray-700 dark:text-gray-300 border-l-4 border-indigo-200 pl-4 mb-4">
                        &ldquo;{note.verseText}&rdquo;
                        <footer className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          — {note.translation}
                        </footer>
                      </blockquote>

                      {/* User Note */}
                      <div className="text-gray-900 dark:text-gray-100 mb-4">
                        {note.noteText}
                      </div>

                      {/* Tags */}
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {note.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {note.type === "note" && <StickyNote className="h-3 w-3 mr-1" />}
                          {note.type === "highlight" && <Highlighter className="h-3 w-3 mr-1" />}
                          {note.type === "both" && (
                            <>
                              <StickyNote className="h-3 w-3 mr-1" />
                              <Highlighter className="h-3 w-3" />
                            </>
                          )}
                          {t(`type_${note.type}`, { defaultValue: note.type })}
                        </Badge>
                        
                        {note.type === "highlight" && (
                          <div className={`w-4 h-4 rounded-full border-2 ${highlightColors[note.highlightColor as keyof typeof highlightColors]}`} />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
