"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, BookOpen, Sparkles } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ThemeCollectionCard } from "./ThemeCollectionCard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Passage {
  book: string
  chapter: number
  verses: string
  title: string
  context?: string
}

interface ThemeCollection {
  _id?: string
  slug: string
  title: string
  description: string
  shortDescription: string
  category: string
  difficulty: string
  estimatedDuration: number
  passages: Passage[]
  tags: string[]
  color: string
  isPremium?: boolean
  userProgress?: {
    currentPassageIndex: number
    completedPassages: number[]
    isCompleted: boolean
  }
}

interface ThemeCollectionGridProps {
  collections: ThemeCollection[]
  loading?: boolean
  language?: string
  onStartCollection?: (slug: string) => void
}

export function ThemeCollectionGrid({ 
  collections, 
  loading = false, 
  language = "en",
  onStartCollection 
}: ThemeCollectionGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [filteredCollections, setFilteredCollections] = useState<ThemeCollection[]>(collections)

  // Get unique categories and difficulties
  const categories = ["all", ...Array.from(new Set(collections.map(c => c.category)))]
  const difficulties = ["all", "beginner", "intermediate", "advanced"]

  // Filter collections based on search and filters
  useEffect(() => {
    let filtered = collections

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(collection =>
        collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(collection => collection.category === selectedCategory)
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(collection => collection.difficulty === selectedDifficulty)
    }

    setFilteredCollections(filtered)
  }, [collections, searchTerm, selectedCategory, selectedDifficulty])

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Themed Collections
          </h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Explore curated passage collections designed to deepen your understanding of specific biblical themes
        </motion.p>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {selectedCategory === "all" ? "All Categories" : selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  {category === "all" ? "All Categories" : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Difficulty Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                {selectedDifficulty === "all" ? "All Levels" : selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {difficulties.map((difficulty) => (
                <DropdownMenuItem
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={selectedDifficulty === difficulty ? "bg-gray-100 dark:bg-gray-700" : ""}
                >
                  {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Collections Grid */}
      {filteredCollections.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No collections found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search or filters to find collections
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <ThemeCollectionCard
                collection={collection}
                language={language}
                onStartCollection={onStartCollection}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Stats */}
      {filteredCollections.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <span className="font-semibold">{filteredCollections.length}</span> collections
            </div>
            <div>
              <span className="font-semibold">
                {filteredCollections.reduce((acc, c) => acc + c.passages.length, 0)}
              </span> passages total
            </div>
            <div>
              <span className="font-semibold">
                {filteredCollections.reduce((acc, c) => acc + c.estimatedDuration, 0)}
              </span> minutes of reading
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
