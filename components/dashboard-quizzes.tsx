"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { Clock, BookOpen, ArrowRight } from "lucide-react"
import { Badge } from "./ui/badge"

interface DashboardQuizzesProps {
  params: {
    lng: string
  }
}

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

export function DashboardQuizzes({ params: { lng } }: DashboardQuizzesProps) {
  const { t } = useTranslation(lng, "dashboard-quizzes")
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
    <div className="bg-white dark:bg-[#2a2b2f] rounded-lg shadow-sm border border-gray-100 dark:border-[#b6b6b63d] overflow-hidden">
      {/* Header with left border accent */}
      <div className="border-l-4 border-gray-900 dark:border-white pl-4 py-4 mx-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("my_next_bible_lessons")}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Continue your learning journey</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-5 w-3/4 mb-3 bg-gray-100 dark:bg-[#0d1017]" />
              <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-4 w-1/3 bg-gray-100 dark:bg-[#0d1017]" />
                <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#0d1017]" />
              </div>
              <div className="flex justify-between mt-4">
                <Skeleton className="h-4 w-1/4 bg-gray-100 dark:bg-[#0d1017]" />
                <Skeleton className="h-4 w-1/4 bg-gray-100 dark:bg-[#0d1017]" />
              </div>
            </div>
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {quizzes.map((quiz, index) => (
            <Link href={`/quizzes/${quiz._id}`} key={quiz._id.toString()} className="block">
              <div className="border border-gray-100 bg-gray-50 dark:border-[#b6b6b63d] rounded-lg p-4 h-full hover:bg-[#e4e2e2a1] dark:hover:bg-[#141b23]/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white text-lg">{quiz.title}</h3>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg`} alt={teachers[index % teachers.length]} />
                    <AvatarFallback className="bg-gray-100 dark:bg-[#0d1017] text-gray-500 dark:text-[#c9d1d9] text-xs">
                      {teachers[index % teachers.length][0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <Badge variant="outline" className="mb-3">
                  {quiz.category}
                </Badge>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <BookOpen className="w-3 h-3 mr-1 text-[#111a2c] dark:text-[#c9d1d9]" />
                    <span>{quiz.subCategory}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{durations[index % durations.length]}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-300">No quizzes available</p>
        </div>
      )}

      {/* Footer with view all link */}
      <div className="border-t border-gray-100 dark:border-[#b6b6b63d] p-4 flex justify-end">
        <Link href="/quizzes">
          <Button variant="ghost" className="text-sm text-[#111a2c] dark:text-[#c9d1d9] flex items-center gap-2">
            {t("view_all_lessons")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
