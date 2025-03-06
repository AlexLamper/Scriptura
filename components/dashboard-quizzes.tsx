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
    <div className="bg-white dark:bg-[#2d2d33] rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("my_next_bible_lessons")}</h2>
        <Link href="/quizzes">
          <Button variant="link" className="text-red-500 dark:text-red-400">
            {t("view_all_lessons")}
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : quizzes.length > 0 ? (
        <div className="space-y-6">
          {quizzes.map((quiz, index) => (
            <Link href={`/quizzes/${quiz._id}`} key={quiz._id.toString()}>
              <div className="flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">{quiz.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <BookOpen className="w-3 h-3 mr-1" />
                      <span>
                        {quiz.category} - {quiz.subCategory}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} alt={teachers[index % teachers.length]} />
                    <AvatarFallback>{teachers[index % teachers.length][0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
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
          <p className="text-gray-500 dark:text-gray-400">No quizzes available</p>
        </div>
      )}
    </div>
  )
}

