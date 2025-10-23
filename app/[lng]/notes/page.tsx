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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "../../../components/ui/dropdown-menu";
import { EditNoteModal } from "../../../components/study/EditNoteModal";

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
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Get unique books and tags from notes for filters
  const uniqueBooks = Array.from(new Set(notes.map(note => note.book))).sort();
  const uniqueTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

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

  const editNote = (note: Note) => {
    setEditingNote(note);
    setShowEditModal(true);
  };

  const handleEditNoteSaved = (updatedNote: Note) => {
    // Update the note in the local state
    setNotes(notes.map(note => 
      note._id === updatedNote._id ? updatedNote : note
    ));
    setShowEditModal(false);
    setEditingNote(null);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingNote(null);
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
    <div className="w-full pb-6 pt-0">
      <div className="mb-6">
        {/* Header */}
        <div className="p-8 shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a] mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-['Merriweather'] text-2xl lg:text-3xl font-bold text-[#262626] dark:text-white mb-2">
                {t("page_title", { defaultValue: "My Notes & Highlights" })}
              </h1>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-300">
                {t("page_description", { defaultValue: "Manage all your Bible study notes and highlights in one place" })}
              </p>
            </div>
            <Button 
              onClick={() => router.push(`/${lng}/study`)}
              className="bg-[#798777] hover:bg-[#6a7a68] text-white whitespace-nowrap rounded-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("create_note", { defaultValue: "Create Note" })}
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a] mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t("search_placeholder", { defaultValue: "Search notes, verses, or tags..." })}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-[#1a1d2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {/* Type Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
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
                  <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
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
                    <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
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
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 shadow-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-8 w-8 border-b-2 border-[#262626] dark:border-white"></div>
          </div>
        )}

        {/* Notes Grid */}
        {!loading && (
          <>
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a]">
                <StickyNote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-['Merriweather'] text-xl font-semibold text-[#262626] dark:text-white mb-2">
                  {t("no_notes_title", { defaultValue: "No notes found" })}
                </h3>
                <p className="font-['Inter'] text-gray-600 dark:text-gray-300 mb-6">
                  {t("no_notes_description", { defaultValue: "Start taking notes while studying to see them here." })}
                </p>
                <Button onClick={() => router.push(`/${lng}/study`)} className="bg-[#798777] hover:bg-[#6a7a68] text-white rounded-none">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("start_studying", { defaultValue: "Start Studying" })}
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <div key={note._id} className={`shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a] hover:shadow-xl transition-shadow ${
                    note.type === "highlight" ? `border-l-4 border-l-[#d4af37]` : "border"
                  }`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-['Merriweather'] text-lg font-semibold text-[#262626] dark:text-white mb-1">
                            {note.verseReference}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-['Inter']">
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
                            <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => editNote(note)}>
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

                      {/* Bible Verse */}
                      <blockquote className="italic text-gray-700 dark:text-gray-300 border-l-4 border-gray-300 dark:border-gray-600 pl-4 mb-4 font-['Inter']">
                        &ldquo;{note.verseText}&rdquo;
                        <footer className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          — {note.translation}
                        </footer>
                      </blockquote>

                      {/* User Note */}
                      <div className="text-gray-900 dark:text-gray-100 mb-4 font-['Inter']">
                        {note.noteText}
                      </div>

                      {/* Tags */}
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {note.tags.map((tag, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-['Inter']">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-['Inter']">
                          {note.type === "note" && <StickyNote className="h-3 w-3 mr-1 inline" />}
                          {note.type === "highlight" && <Highlighter className="h-3 w-3 mr-1 inline" />}
                          {note.type === "both" && (
                            <>
                              <StickyNote className="h-3 w-3 mr-1 inline" />
                              <Highlighter className="h-3 w-3 inline" />
                            </>
                          )}
                          {t(`type_${note.type}`, { defaultValue: note.type })}
                        </span>
                        
                        {note.type === "highlight" && (
                          <div className="w-4 h-4 border-2 border-[#d4af37] bg-[#d4af37]/20" />
                        )}
                      </div>
                    </div>
                  </div>
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
                    className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Note Modal */}
      <EditNoteModal
        isOpen={showEditModal}
        onClose={handleEditModalClose}
        note={editingNote}
        language={lng}
        onSave={handleEditNoteSaved}
      />
    </div>
  );
}
