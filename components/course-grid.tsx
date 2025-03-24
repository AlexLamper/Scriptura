"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CourseCard } from "./course-card"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

interface CourseGridProps {
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
  progress?: string
}

export function CourseGrid({ params: { lng } }: CourseGridProps) {
  const { t } = useTranslation(lng, "course-grid")
  const [courses, setCourses] = useState<CourseType[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [showAllCourses, setShowAllCourses] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data: { courses: CourseType[] } = await response.json()
        if (Array.isArray(data.courses)) {
          setCourses(data.courses)

          // Extract unique categories
          const uniqueCategories: string[] = [...new Set(data.courses.map((course: CourseType) => course.category))]
          setCategories(uniqueCategories)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses =
    activeCategory === "all" ? courses : courses.filter((course) => course.category === activeCategory)

  // Limit courses to 6 if not showing all
  const displayedCourses = showAllCourses ? filteredCourses : filteredCourses.slice(0, 6)
  const hasMoreCourses = filteredCourses.length > 6

  const toggleShowAllCourses = () => {
    setShowAllCourses(!showAllCourses)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("my_bible_courses")}</h2>
        <Badge
          variant="outline"
          className="gap-1 border-[#0f172a] dark:border-[#0f172a] text-[#0f172a] dark:text-[#0f172a]"
        >
          <Filter className="h-3.5 w-3.5" />
          <span>
            {filteredCourses.length} {filteredCourses.length === 1 ? "Course" : "Courses"}
          </span>
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Badge
          variant={activeCategory === "all" ? "secondary" : "outline"}
          className={
            activeCategory === "all"
              ? "bg-[#0f172a] text-white hover:bg-[#0f172a] dark:bg-[#0f172a] dark:hover:bg-[#0f172a] dark:text-white cursor-pointer transition-colors"
              : "border-[#0f172a] text-[#0f172a] dark:border-[#0f172a] dark:text-[#0f172a] cursor-pointer hover:bg[#0f172a] dark:hover:bg-[#0f172a]/30 transition-colors"
          }
          onClick={() => setActiveCategory("all")}
        >
          {t("all_courses")}
        </Badge>

        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "secondary" : "outline"}
            className={
              activeCategory === category
                ? "bg-[#0f172a] text-white hover:bg-[#0f172a] dark:bg-[#0f172a] dark:hover:bg-[#0f172a] dark:text-white cursor-pointer transition-colors"
                : "border-[#0f172a] text-[#0f172a] dark:border-[#0f172a] dark:text-[#0f172a] cursor-pointer hover:bg[#0f172a] dark:hover:bg-[#0f172a]/30 transition-colors"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center p-5">
                  <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30">
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              </div>
              <div className="p-5 pt-3">
                <Skeleton className="h-4 w-full mb-5" />
                <Skeleton className="h-4 w-full mb-2" />
                <div className="mb-2 flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-10" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full mb-5" />
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : displayedCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course._id.toString()}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/courses/${course._id}`}>
                  <CourseCard
                    id={course._id.toString()}
                    title={course.title}
                    category={course.category}
                    progress={`${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 30) + 20}`}
                    language={course.language}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {hasMoreCourses && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={toggleShowAllCourses}
                className="border-[#0f172a] text-[#0f172a] dark:border-[#0f172a] dark:text-[#0f172a] hover:bg-[#0f172a]/10"
              >
                {showAllCourses ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    {t("show_less")}
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    {t("see_more")}
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-lg border border-gray-100 dark:border-gray-700">
          <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-300 text-lg">No courses found</p>
          <p className="text-gray-400 dark:text-gray-400 mt-2">Try selecting a different category</p>
        </div>
      )}
    </div>
  )
}

