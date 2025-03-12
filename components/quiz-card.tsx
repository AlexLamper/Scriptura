"use client"

import { BookOpen } from "lucide-react"

interface QuizCardProps {
  quiz: {
    _id: string
    title: string
    description: string
    language: string
    category: string
    subCategory: string
    difficulty: string
    tags: string[]
    studyMaterials?: {
      bibleVerses: { verse: string; text: string }[]
    }
  }
  onClick: () => void
}

export function QuizCard({ quiz, onClick }: QuizCardProps) {
  const hasStudyMaterials = quiz.studyMaterials?.bibleVerses?.length > 0

  return (
    <li
      onClick={onClick}
      className="bg-white dark:bg-[#2C2C33] rounded-lg shadow-lg p-6 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      {hasStudyMaterials && (
        <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
          <BookOpen className="h-3 w-3 mr-1" />
          Study Materials
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{quiz.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{quiz.description}</p>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {quiz.difficulty}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {quiz.category}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {quiz.subCategory}
        </span>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
          {quiz.language}
        </span>
      </div>
    </li>
  )
}

