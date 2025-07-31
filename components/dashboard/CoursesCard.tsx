"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../ui/button"
import { BookOpen, ArrowRight, Clock } from "lucide-react"
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
      <div className="lg:col-span-2 bg-white dark:bg-[#2a2b2f] rounded-lg border border-gray-100 dark:border-[#91969e52] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("courses")}</h3>
          </div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#2a2b2f] rounded-lg border border-gray-100 dark:border-[#91969e52] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t("courses")}</h3>
        </div>
        <Link href={`/${lng}/courses`}>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {t("view_all")}
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t("no_courses_found")}</p>
          <Link href={`/${lng}/courses`}>
            <Button>{t("browse_courses")}</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Link 
              key={course._id} 
              href={`/${lng}/courses/${course._id}`}
              className="block"
            >
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {course.instructor} • {course.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {course.isPremium && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
                        </svg>
                        Pro
                      </span>
                    )}
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    {course.totalDuration} min
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1 h-auto"
                  >
                    {t("start_study")} →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
          
          {courses.length === 3 && (
            <Link href={`/${lng}/courses`}>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors group">
                <p className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium">
                  {t("view_more_studies")} →
                </p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
