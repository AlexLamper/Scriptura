"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { BookOpen, Star } from "lucide-react"

interface CourseRecommendationProps {
  params: {
    lng: string
  }
}

interface CourseType {
  _id: string
  title: string
  description: string
  instructor: string
  category: string
  difficulty: string
  language: string
  totalDuration: number
  tags: string[]
}

export function CourseRecommendation({ params: { lng } }: CourseRecommendationProps) {
  const { t } = useTranslation(lng, "course-recommendation")
  const [recommendedCourse, setRecommendedCourse] = useState<CourseType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendedCourse = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        if (Array.isArray(data.courses) && data.courses.length > 0) {
          // For demo purposes, just pick a random course as the "recommended" one
          const randomIndex = Math.floor(Math.random() * data.courses.length)
          setRecommendedCourse(data.courses[randomIndex])
        }
      } catch (error) {
        console.error("Error fetching recommended course:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedCourse()
  }, [])

  // Get badge color based on category
  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Bible: "bg-amber-100 text-amber-800 dark:bg-amber-700 dark:text-amber-100",
      Bijbel: "bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100",
      "Entire Bible": "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100",
    }
    return colors[category || ""] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
  }

  return (
    <div className="bg-white dark:bg-[#2d2d33] text-gray-900 dark:text-white rounded-xl p-6 shadow-sm">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-24 mb-4 bg-gray-100 dark:bg-[#3a393f]" />
          <Skeleton className="h-7 w-full mb-4 bg-gray-100 dark:bg-[#3a393f]" />
          <Skeleton className="h-4 w-3/4 mb-6 bg-gray-100 dark:bg-[#3a393f]" />
          <div className="flex -space-x-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#3a393f]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#3a393f]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#3a393f]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#3a393f]" />
          </div>
          <Skeleton className="h-10 w-full bg-gray-100 dark:bg-[#3a393f]" />
        </div>
      ) : recommendedCourse ? (
        <>
          <Badge className={getCategoryColor(recommendedCourse.category)}>{recommendedCourse.category}</Badge>
          <h3 className="text-xl font-bold my-4 text-gray-900 dark:text-white">{recommendedCourse.title}</h3>
          <div className="flex items-center gap-1 mb-2 text-amber-500">
            <Star className="fill-current" size={16} />
            <Star className="fill-current" size={16} />
            <Star className="fill-current" size={16} />
            <Star className="fill-current" size={16} />
            <Star className="fill-current" size={16} />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{t("popularity")}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{recommendedCourse.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-gray-500 dark:text-gray-400" size={16} />
            <span className="text-sm text-gray-600 dark:text-gray-400">{recommendedCourse.instructor}</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-white dark:border-gray-800">
                  <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-xs border-2 border-white dark:border-gray-800">
                +{Math.floor(Math.random() * 100) + 50}
              </div>
            </div>
          </div>
          <Link href={`/courses/${recommendedCourse._id}`}>
            <Button className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white">
              {t("enroll_now")}
            </Button>
          </Link>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No recommendation available</p>
        </div>
      )}
    </div>
  )
}

