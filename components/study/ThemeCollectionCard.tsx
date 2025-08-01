"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Star, ArrowRight, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"

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

interface ThemeCollectionCardProps {
  collection: ThemeCollection
  language?: string
  onStartCollection?: (slug: string) => void
}

export function ThemeCollectionCard({ 
  collection, 
  language = "en",
  onStartCollection 
}: ThemeCollectionCardProps) {
  const progressPercentage = collection.userProgress 
    ? (collection.userProgress.completedPassages.length / collection.passages.length) * 100
    : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const handleStartClick = () => {
    if (onStartCollection) {
      onStartCollection(collection.slug)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full relative overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Color accent bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: collection.color }}
        />
        
        {/* Premium badge */}
        {collection.isPremium && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="secondary" className={getDifficultyColor(collection.difficulty)}>
              {collection.difficulty.charAt(0).toUpperCase() + collection.difficulty.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {collection.category}
            </Badge>
          </div>
          
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {collection.title}
          </CardTitle>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {collection.shortDescription}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Progress bar if user has started */}
          {collection.userProgress && progressPercentage > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${progressPercentage}%`,
                    backgroundColor: collection.color
                  }}
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{collection.passages.length} passages</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{collection.estimatedDuration}min</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {collection.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {collection.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{collection.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Action button */}
          <Link href={`/${language}/study/themes/${collection.slug}`} passHref>
            <Button 
              className="w-full transition-all duration-300" 
              variant={collection.userProgress?.isCompleted ? "outline" : "default"}
              style={{
                backgroundColor: !collection.userProgress?.isCompleted ? collection.color : undefined,
                borderColor: collection.userProgress?.isCompleted ? collection.color : undefined
              }}
              onClick={handleStartClick}
            >
              {collection.userProgress?.isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Review
                </>
              ) : collection.userProgress ? (
                <>
                  Continue Reading
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Start Reading
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
