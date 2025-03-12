"use client"

import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

interface BibleVerse {
  reference: string
  text: string
  translation: string
}

interface RelatedVersesProps {
  verses: BibleVerse[]
}

export function RelatedVerses({ verses }: RelatedVersesProps) {
  if (!verses || verses.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-md"
    >
      <div className="flex items-center mb-2">
        <BookOpen className="text-green-600 dark:text-green-400 mr-2" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Related Bible Verses</h3>
      </div>
      <div className="space-y-4">
        {verses.map((verse, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-green-800 dark:text-green-200">
              {verse.reference} ({verse.translation})
            </p>
            <p className="text-green-800 dark:text-green-200">{verse.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

