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
  background: string
  students: Student[]
}

export function CourseCard({ id, title, category, progress, background, students }: CourseCardProps) {
  // Extract progress numbers
  const [current, total] = progress.split("/").map(Number)
  const progressPercentage = (current / total) * 100

  return (
    <div
      className={`${background} rounded-xl overflow-hidden shadow-lg h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
    >
      <div className="flex flex-col h-full p-6">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>

        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white">Progress</span>
            <span className="text-sm font-medium text-white">{progress}</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-2.5 mb-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-white h-2.5 rounded-full"
            />
          </div>

          <div className="flex items-center">
            <div className="flex -space-x-2 mr-3">
              {students
                .filter((student) => student.name && student.image)
                .map((student, index) => (
                  <Avatar
                    key={index}
                    className="border-2 border-white w-8 h-8 transition-transform hover:scale-110 hover:z-10"
                  >
                    <AvatarImage src={student.image} alt={student.name} />
                    <AvatarFallback className="bg-white/70 text-[#ef4444]">{student.name?.[0]}</AvatarFallback>
                  </Avatar>
                ))}
              {students.find((student) => student.more) && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/30 text-xs border-2 border-white text-white font-medium">
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

