"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { CourseCard } from "./course-card"
import { useTranslation } from "../app/i18n/client"
import { Skeleton } from "./ui/skeleton"
import { Search, Filter } from "lucide-react"
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

  // Get background color based on category - Using shades of the specified red
  const getCategoryBackground = (category: string) => {
    const colors: Record<string, string> = {
      Bible: "bg-gradient-to-br from-[#ef4444] to-[#f24344]",
      Bijbel: "bg-gradient-to-br from-[#f24344] to-[#ef4444]",
      "Entire Bible": "bg-gradient-to-br from-[#ff5555] to-[#ef4444]",
      "Old Testament": "bg-gradient-to-br from-[#ef4444] to-[#ff5555]",
      "New Testament": "bg-gradient-to-br from-[#f24344] to-[#ff5555]",
    }
    return colors[category] || "bg-gradient-to-br from-[#ef4444] to-[#f24344]"
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("my_bible_courses")}</h2>
        <Badge
          variant="outline"
          className="bg-red-50 text-[#ef4444] border-[#ef4444] dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
        >
          <Filter className="w-3.5 h-3.5 mr-1" />
          {filteredCourses.length} {filteredCourses.length === 1 ? "Course" : "Courses"}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Badge
          variant={activeCategory === "all" ? "secondary" : "outline"}
          className={
            activeCategory === "all"
              ? "bg-[#ef4444] text-white hover:bg-[#f24344] dark:bg-[#f24344] dark:hover:bg-[#ef4444] dark:text-white cursor-pointer transition-colors"
              : "border-[#ef4444] text-[#ef4444] dark:border-[#f24344] dark:text-[#f24344] cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
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
                ? "bg-[#ef4444] text-white hover:bg-[#f24344] dark:bg-[#f24344] dark:hover:bg-[#ef4444] dark:text-white cursor-pointer transition-colors"
                : "border-[#ef4444] text-[#ef4444] dark:border-[#f24344] dark:text-[#f24344] cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
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
            <div key={i} className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800/50 shadow-md">
              <div className="h-32 bg-gradient-to-r from-[#ef4444] to-[#f24344] dark:opacity-80">
                <div className="p-4">
                  <Skeleton className="h-6 w-24 bg-white/30 dark:bg-white/20" />
                </div>
              </div>
              <div className="p-5 space-y-4">
                <Skeleton className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-4 w-12 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <Skeleton className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full" />
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex -space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
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
                  background={getCategoryBackground(course.category)}
                  students={[
                    { name: "Student 1", image: "/placeholder.svg" },
                    { name: "Student 2", image: "/placeholder.svg" },
                    { name: "Student 3", image: "/placeholder.svg" },
                    { more: Math.floor(Math.random() * 100) + 20 },
                  ]}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-100 dark:border-gray-800">
          <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">No courses found</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">Try selecting a different category</p>
        </div>
      )}
    </div>
  )
}

