"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { Clock, BookOpen } from "lucide-react"

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
    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("my_next_bible_lessons")}</h2>
        <Link href="/quizzes">
          <Button variant="link" style={{ color: "#dc2626" }}>
            {t("view_all_lessons")}
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2 bg-gray-100 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-700" />
                </div>
              </div>
              <Skeleton className="h-4 w-16 bg-gray-100 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        <div className="space-y-6">
          {quizzes.map((quiz, index) => (
            <Link href={`/quizzes/${quiz._id}`} key={quiz._id.toString()}>
              <div className="flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{quiz.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      <BookOpen className="w-3 h-3 mr-1" style={{ color: "#dc2626" }} />
                      <span>
                        {quiz.category} - {quiz.subCategory}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} alt={teachers[index % teachers.length]} />
                    <AvatarFallback className="bg-[rgba(220,38,38,0.1)] dark:bg-[rgba(220,38,38,0.15)] text-red-500 dark:text-red-400">
                      {teachers[index % teachers.length][0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {durations[index % durations.length]}
                  </span>
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
    </div>
  )
}
