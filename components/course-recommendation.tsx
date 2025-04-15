"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { BookOpen, Star, Clock, Calendar } from "lucide-react"

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

  return (
    <div className="bg-white dark:bg-[#2a2b2f] rounded-lg p-6 shadow-sm border border-gray-100 dark:border-[#b6b6b63d] h-full">
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-24 mb-4 bg-gray-100 dark:bg-[#0d1017]" />
          <Skeleton className="h-7 w-full mb-4 bg-gray-100 dark:bg-[#0d1017]" />
          <Skeleton className="h-4 w-3/4 mb-6 bg-gray-100 dark:bg-[#0d1017]" />
          <div className="flex -space-x-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#0d1017]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#0d1017]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#0d1017]" />
            <Skeleton className="h-8 w-8 rounded-full bg-gray-100 dark:bg-[#0d1017]" />
          </div>
          <Skeleton className="h-10 w-full bg-gray-100 dark:bg-[#0d1017]" />
        </div>
      ) : recommendedCourse ? (
        <>
          <Badge className="px-2 py-1 rounded-md bg-white dark:bg-[#141b23]/30 border-none text-gray-600 dark:text-[#c9d1d9] hover:bg-white hover:text-gray-600">
            Featured Course
          </Badge>
          <h3 className="text-xl font-bold my-4 text-gray-900 dark:text-white">
            {recommendedCourse.title}
          </h3>
          <div className="flex items-center gap-1 mb-2 text-amber-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="fill-current" size={16} />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              {t("popularity")}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {recommendedCourse.description}
          </p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="text-gray-500 dark:text-gray-400" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {recommendedCourse.instructor}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-gray-500 dark:text-gray-400" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                15 hours of content
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-500 dark:text-gray-400" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Updated 2 weeks ago
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <Avatar key={i} className="w-8 h-8 border-2 border-white dark:border-[#b6b6b63d]">
                  <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
                  <AvatarFallback className="bg-gray-100 dark:bg-[#0d1017] text-gray-600 dark:text-[#c9d1d9]">
                    U{i}
                  </AvatarFallback>
                </Avatar>
              ))}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#0d1017] text-xs border-2 border-white dark:border-[#b6b6b63d] text-gray-600 dark:text-[#c9d1d9] font-medium">
                +{Math.floor(Math.random() * 100) + 50}
              </div>
            </div>
          </div>
          <Link href={`/courses/${recommendedCourse._id}`}>
            <Button className="w-full">
              {t("enroll_now")}
            </Button>
          </Link>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-300">
            No recommendation available
          </p>
        </div>
      )}
    </div>
  )
}
