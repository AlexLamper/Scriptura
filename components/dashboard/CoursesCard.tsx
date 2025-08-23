"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Clock } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface Course {
  _id: string
  title: string
  description: string
  instructor: string
  category: string
  difficulty: string
  language: string
  totalDuration: number
  tags: string[]
  imageUrl?: string
  isPremium?: boolean
}

interface CoursesCardProps {
  lng: string
}

export function CoursesCard({ lng }: CoursesCardProps) {
  const { t } = useTranslation(lng, "course")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) throw new Error("Failed to fetch courses")
        const data = await response.json()
        
        if (Array.isArray(data.courses)) {
          // Filter courses by language, fallback to English if none found
          let languageFilteredCourses = data.courses.filter(
            (course) => course.language?.toLowerCase() === lng.toLowerCase()
          )
          
          if (languageFilteredCourses.length === 0 && lng !== 'en') {
            languageFilteredCourses = data.courses.filter(
              (course) => course.language?.toLowerCase() === 'en'
            );
          }
          
          // Take only first 3 courses
          setCourses(languageFilteredCourses.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [lng])

  if (loading) {
    return (
      <Card className="h-full shadow-sm border-gray-200">
        <CardContent className="h-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col">
    <div className="flex items-center justify-between mb-4 gap-2">
            <h3 className="text-xl font-semibold text-gray-900">{t("courses")}</h3>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-pulse">
                <div className="mb-3">
                  <div className="space-y-2 mb-2">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
    </Card>
    )
  }

  return (
  <Card className="h-full shadow-sm border-gray-200">
  <CardContent className="h-full px-4 py-4 sm:px-6 sm:py-6 flex flex-col">
  <div className="flex items-center justify-between mb-4 gap-2">
          <h3 className="text-xl font-semibold text-gray-900">{t("courses")}</h3>
          <Link href={`/${lng}/courses`}>
            <Button variant="ghost" className="text-[#3b82f6] font-medium hover:bg-[#3b82f6]/10">
              {t("view_all")} →
            </Button>
          </Link>
        </div>

      {courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t("no_courses_found")}</p>
          <Link href={`/${lng}/courses`}>
            <Button>{t("browse_courses")}</Button>
          </Link>
        </div>
      ) : (
  <div className="space-y-4 grow">
          {courses.map((course) => (
            <Link 
              key={course._id} 
              href={`/${lng}/courses/${course._id}`}
              className="block"
            >
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
        <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900">
                      {course.title}
                      </h4>
                      {course.isPremium && (
                        <span className="text-xs px-2 py-1 rounded border bg-orange-100 text-orange-800 border-orange-200 font-medium">
                          Pro
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {course.instructor} • {course.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 leading-relaxed line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {course.totalDuration} min
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-4 text-[#3b82f6] border-[#3b82f6]/30 bg-white hover:bg-[#3b82f6]/10"
                  >
                    {t("start_study")} →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      </CardContent>
    </Card>
  )
}
