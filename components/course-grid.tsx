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
import { usePathname } from "next/navigation"

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
  imageUrl: string
}

export function CourseGrid({ params: { lng } }: CourseGridProps) {
  const { t } = useTranslation(lng, "course-grid")
  const [courses, setCourses] = useState<CourseType[]>([])
  const [allCourses, setAllCourses] = useState<CourseType[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [categories, setCategories] = useState<string[]>([])
  const [showAllCourses, setShowAllCourses] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>("en") // Default to English

  // Get the current language from the URL path
  const pathname = usePathname()

  useEffect(() => {
    // Extract language from pathname
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    const detectedLanguage =
      langFromPath && ["en", "nl", "de"].includes(langFromPath) ? langFromPath : lng || "en"
    setCurrentLanguage(detectedLanguage)
  }, [pathname, lng])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data: { courses: CourseType[] } = await response.json()

        if (Array.isArray(data.courses)) {
          setAllCourses(data.courses)

          // Filter courses by the current language (case insensitive)
          const languageFilteredCourses = data.courses.filter((course) => {
            return course.language && course.language.toLowerCase() === currentLanguage.toLowerCase()
          })

          setCourses(languageFilteredCourses)

          // Extract unique categories from filtered courses
          const uniqueCategories: string[] = [
            ...new Set(languageFilteredCourses.map((course) => course.category))
          ]
          setCategories(uniqueCategories)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    if (currentLanguage) {
      fetchCourses()
    }
  }, [currentLanguage])

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          {t("my_bible_courses")}
        </h2>
        <Badge
          variant="outline"
          className="gap-1 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300"
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
              ? "bg-gray-700 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white cursor-pointer transition-colors"
              : "border-gray-300 text-gray-800 dark:border-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-700/30 transition-colors"
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
                ? "bg-gray-700 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-700 dark:text-white cursor-pointer transition-colors"
                : "border-gray-300 text-gray-800 dark:border-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-700/30 transition-colors"
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
              className="rounded-lg overflow-hidden bg-gradient-to-r from-gray-100/5 via-gray-200/5 to-gray-100/5 dark:from-gray-800/15 dark:via-gray-900/15 dark:to-gray-800/15 border border-gray-200 dark:border-gray-700"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex items-center p-5">
                  <div className="flex-shrink-0 mr-4 w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900/30">
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
                <Link href={`/${currentLanguage}/courses/${course._id}`}>
                  <CourseCard
                    id={course._id.toString()}
                    title={course.title}
                    category={course.category}
                    progress={`${Math.floor(Math.random() * 20)}/${Math.floor(Math.random() * 30) + 20}`}
                    language={course.language} 
                    imageUrl={course.imageUrl}          
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
                className="border-gray-300 text-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-700/10 dark:hover:bg-gray-700/20"
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
        <div className="text-center py-16 bg-gradient-to-r from-gray-100/5 via-gray-200/5 to-gray-100/5 dark:from-gray-800/15 dark:via-gray-900/15 dark:to-gray-800/15 rounded-lg border border-gray-200 dark:border-gray-700">
          <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            {allCourses.length > 0 ? `No courses found for ${currentLanguage} language` : "No courses found"}
          </p>
          <p className="text-gray-400 dark:text-gray-400 mt-2">
            {allCourses.length > 0 ? "Try switching to a different language" : "Try selecting a different category"}
          </p>

          {/* Debug button to show all courses regardless of language */}
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setCourses(allCourses)
              const uniqueCategories = [...new Set(allCourses.map((course) => course.category))]
              setCategories(uniqueCategories)
            }}
          >
            Show all courses (debug)
          </Button>
        </div>
      )}
    </div>
  )
}
