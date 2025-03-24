"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"

interface CourseCardProps {
  id: string | number
  title: string
  category: string
  progress: string
  language: string
}

export function CourseCard({ title, category, progress }: CourseCardProps) {
  // Extract progress numbers
  const [current, total] = progress.split("/").map(Number)
  const progressPercentage = (current / total) * 100

  return (
    <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-white dark:bg-gray-800/60 h-full">
      <div className="flex items-center p-5">
        {/* <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-open"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        </div> */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 text-[#1f1f1f9d] dark:text-blue-400 border border-black/10 dark:border-gray-700">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 pt-3">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-medium">Progress</span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full transition-all duration-300 group-hover:brightness-110 bg-[#0f172b] dark:bg-blue-600"
          />
        </div>
        <Button className="text-sm font-medium transition-all duration-300 group-hover:translate-y-[-2px] px-4 py-1.5 rounded-md">
          Continue
        </Button>
      </div>
    </div>
  )
}
