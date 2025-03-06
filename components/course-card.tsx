"use client"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { motion } from "framer-motion"

interface Student {
  name?: string
  image?: string
  more?: number
}

interface CourseCardProps {
  id: string | number
  title: string
  category: string
  progress: string
  students: Student[]
}

export function CourseCard({ title, category, progress, students }: CourseCardProps) {
  // Extract progress numbers
  const [current, total] = progress.split("/").map(Number)
  const progressPercentage = (current / total) * 100

  return (
    <div className="bg-white dark:bg-[#2e2d32] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-sm hover:border-gray-200 dark:hover:border-gray-600 cursor-pointer">
      <div className="flex flex-col h-full p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#ef4444]/10 text-[#ef4444] dark:bg-[#ef4444]/20 dark:text-[#f24344]">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress}</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-[#353438] rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-[#ef4444] h-2 rounded-full"
            />
          </div>

          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {students
                .filter((student) => student.name && student.image)
                .map((student, index) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white dark:border-[#2e2d32] w-8 h-8 transition-transform hover:scale-110 hover:z-10"
                  >
                    <AvatarImage src={student.image} alt={student.name} />
                    <AvatarFallback className="bg-gray-100 dark:bg-[#353438] text-gray-600 dark:text-gray-300">
                      {student.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              {students.find((student) => student.more) && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#353438] text-xs border-2 border-white dark:border-[#2e2d32] text-gray-600 dark:text-gray-300 font-medium">
                  +{students.find((student) => student.more)?.more}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

