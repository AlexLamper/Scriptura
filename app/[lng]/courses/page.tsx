"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search, User, BookOpen, Tag, Clock, ArrowRight } from "lucide-react"
import { LanguagesIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { use } from "react"
import { usePathname } from "next/navigation"

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
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {

  const { lng } = use(params)
  const { t } = useTranslation(lng, "course")
  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<string>("en") // Default to English

  // Get the current language from the URL path
  const pathname = usePathname()

  useEffect(() => {
    // Extract language from pathname
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]

    console.log("Path segments:", pathSegments)
    console.log("Language from path:", langFromPath)
    console.log("Provided lng param:", lng)

    // Use the language from the URL path, fallback to the lng param, or default to "en"
    const detectedLanguage = langFromPath && ["en", "nl", "de"].includes(langFromPath) ? langFromPath : lng || "en"

    console.log("Using language for filtering:", detectedLanguage)
    setCurrentLanguage(detectedLanguage)
  }, [pathname, lng])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()

        console.log("All courses from API:", data.courses)
        console.log("Current language for filtering:", currentLanguage)

        if (Array.isArray(data.courses)) {
          setAllCourses(data.courses)

          // Filter courses by the current language (case insensitive)
          const languageFilteredCourses = data.courses.filter((course) => {
            console.log(`Course ${course.title} language:`, course.language)
            return course.language && course.language.toLowerCase() === currentLanguage.toLowerCase()
          })

          console.log("Filtered courses:", languageFilteredCourses)
          setCourses(languageFilteredCourses)
        } else {
          console.error("Fetched data is not an array:", data)
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

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("course_header")}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f172a] dark:bg-[rgb(24,24,27)] dark:border-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={20} />
        </div>
      </div>
      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-white">{allCourses.length}+</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t("total_courses")}</p>
        </div>
        <div className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-white">24+</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t("expert_instructors")}</p>
        </div>
        <div className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-white">1200+</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t("active_students")}</p>
        </div>
        <div className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
          <p className="text-3xl font-bold text-[#0f172a] dark:text-white">4.8</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{t("average_rating")}</p>
        </div>
      </div>

      {/* Course List Section Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {filteredCourses.length > 0
            ? `${t("showing")} ${filteredCourses.length} ${t("courses")}`
            : t("no_courses_found")}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{t("sort_by")}:</span>
          <select className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded text-sm border border-gray-200 dark:border-gray-600">
            <option value="newest">{t("newest")}</option>
            <option value="popular">{t("most_popular")}</option>
            <option value="highest">{t("highest_rated")}</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-5">
                <div className="h-5 w-40 mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="p-5 pt-3">
                <div className="h-4 w-full mb-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-20 mt-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
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
              <Link href={`/${currentLanguage}/courses/${course._id}`} className="block h-full">
                <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-white dark:bg-gray-800/60 h-full">
                  <div className="flex items-center p-5">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 text-[#1f1f1f9d] dark:text-blue-400 border border-black/10 dark:border-gray-700">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {course.description.length > 100
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center">
                        <User className="text-blue-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.instructor}</p>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="text-green-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.category}</p>
                      </div>
                      <div className="flex items-center">
                        <Tag className="text-yellow-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.difficulty}</p>
                      </div>
                      <div className="flex items-center">
                        <LanguagesIcon className="text-red-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.language}</p>
                      </div>
                      <div className="flex items-center col-span-2">
                        <Clock className="text-purple-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.totalDuration} minutes</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-4">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 text-[#1f1f1f9d] dark:text-blue-400 border border-black/10 dark:border-gray-700 mr-2 mb-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full bg-[#0f172a] hover:bg-[#0f172a]/90 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center text-sm group-hover:translate-y-[-2px]">
                      View Course
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-lg border border-gray-100 dark:border-gray-700">
          <Search className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            {allCourses.length > 0
              ? `No courses found for ${currentLanguage} language`
              : "No courses found. Try adjusting your search."}
          </p>
          {allCourses.length > 0 && (
            <p className="text-gray-400 dark:text-gray-400 mt-2">Try switching to a different language</p>
          )}
        </div>
      )}
    </div>
  )
}

