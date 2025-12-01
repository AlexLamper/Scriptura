"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import { Badge } from "./ui/badge"

interface QuizType {
  _id: string
  title: string
  description: string
  language: string
  category: string
  subCategory: string
  difficulty: string
  tags: string[]
}

export function DashboardQuizzes() {
  const { t } = useTranslation("dashboard-quizzes")
  const [quizzes, setQuizzes] = useState<QuizType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes")
        }
        const data = await response.json()
        if (Array.isArray(data.quizzes)) {
          // Limit to 5 quizzes for the dashboard
          setQuizzes(data.quizzes.slice(0, 5))
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  // Generate random teacher names and durations for demo purposes
  const teachers = ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Davis", "David Wilson"]
  const durations = ["45 min", "60 min", "30 min", "75 min", "50 min"]

  return (
    <div className="overflow-hidden bg-white dark:bg-[#2a2b2f] rounded-lg shadow-sm border border-gray-100 dark:border-[#b6b6b63d] h-full">
      <div className="relative pl-6 py-6 mb-2">
        <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-gradient-to-b from-indigo-600/10 to-purple-600/10 dark:from-indigo-500/10 dark:to-purple-400/10 rounded-r-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("my_next_bible_lessons")}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="shadow-sm hover:shadow-md transition-all duration-300 border border-border dark:border-[#b6b6b63d] rounded-xl p-5 bg-white dark:bg-[#32333a] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-50 to-transparent dark:from-[#3a3b42] dark:to-transparent rounded-bl-[100px]"></div>
              <Skeleton className="h-6 w-3/4 mb-4 bg-gray-100 dark:bg-[#2a2b2f] rounded-md" />
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-5 w-1/3 bg-gray-100 dark:bg-[#2a2b2f] rounded-md" />
                <Skeleton className="h-10 w-10 rounded-full bg-gray-100 dark:bg-[#2a2b2f]" />
              </div>
              <Skeleton className="h-6 w-1/4 mb-4 bg-gray-100 dark:bg-[#2a2b2f] rounded-full" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-5 w-1/4 bg-gray-100 dark:bg-[#2a2b2f] rounded-md" />
                <Skeleton className="h-5 w-1/4 bg-gray-100 dark:bg-[#2a2b2f] rounded-md" />
              </div>
            </div>
          ))
        ) : quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <Link href={`/quizzes/${quiz._id}`} key={quiz._id.toString()} className="block">
              <div className="shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-white dark:bg-[#32333a] dark:border-[#b6b6b63d] rounded-xl p-5 h-full hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gray-100 to-transparent dark:from-[#3a3b42] dark:to-transparent rounded-bl-[100px] -z-0"></div>

                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{quiz.title}</h3>
                  <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-[#32333a] shadow-sm">
                    <AvatarImage src={`/placeholder.svg`} alt={teachers[index % teachers.length]} />
                    <AvatarFallback className="bg-[#e9ebfa] dark:bg-blue-900/30 text-[#1f1f1f9d] dark:text-blue-400 text-xs font-medium">
                      {teachers[index % teachers.length][0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <Badge
                  variant="outline"
                  className="mb-4 bg-[#e9ebfa] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d] text-[#1f1f1f9d] rounded-full font-normal"
                >
                  {quiz.category}
                </Badge>

                <div className="flex justify-between items-center mt-4 relative z-10">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <BookOpen className="w-4 h-4 mr-1.5 text-[#10172a] dark:text-indigo-400" />
                    <span>{quiz.subCategory}</span>
                  </div>

                  <div className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 mr-1.5 text-[#10172a] dark:text-indigo-400" />
                    <span>{durations[index % durations.length]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 px-6">
            <BookOpen className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No quizzes available yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Check back later for new lessons</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 dark:border-[#b6b6b63d] p-4 bg-gray-50 dark:bg-[#252629] flex justify-end">
        <Link href="/quizzes">
          <Button
            variant="ghost"
            className="text-sm flex items-center gap-2 font-medium"
          >
            {t("view_all_lessons")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
