"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search, User, BookOpen, Clock } from "lucide-react"
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
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")

  const pathname = usePathname()

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    const detectedLanguage = langFromPath && ["en", "nl", "de"].includes(langFromPath)
      ? langFromPath
      : lng || "en"
    setCurrentLanguage(detectedLanguage)
  }, [pathname, lng])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) throw new Error("Failed to fetch courses")
        const data = await response.json()
        if (Array.isArray(data.courses)) {
          setAllCourses(data.courses)
          const languageFilteredCourses = data.courses.filter((course) =>
            course.language?.toLowerCase() === currentLanguage.toLowerCase()
          )
          setCourses(languageFilteredCourses)
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

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("course_header")}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-[#91969e52] focus:outline-none focus:ring-2 focus:ring-[#0f172a] dark:bg-[#2a2b2f] dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={20} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: allCourses.length, label: t("total_courses") },
          { value: 24, label: t("expert_instructors") },
          { value: 1200, label: t("active_students") },
          { value: "4.8", label: t("average_rating") },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#2a2b2f] p-4 rounded-lg border border-gray-100 dark:border-[#91969e52]">
            <p className="text-3xl font-bold text-[#0f172a] dark:text-white">{stat.value}+</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Title + Filter */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {filteredCourses.length > 0
            ? `${t("showing")} ${filteredCourses.length} ${t("courses")}`
            : t("no_courses_found")}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{t("sort_by")}:</span>
          <select className="bg-white dark:bg-[#2a2b2f] text-gray-700 dark:text-gray-200 px-3 py-1 rounded text-sm border border-gray-200 dark:border-[#91969e52]">
            <option value="newest">{t("newest")}</option>
            <option value="popular">{t("most_popular")}</option>
            <option value="highest">{t("highest_rated")}</option>
          </select>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border border-gray-100 dark:border-[#91969e52]"
            >
              <div className="p-5">
                <div className="h-5 w-40 mb-2 bg-white dark:bg-[#34373bad] rounded"></div>
                <div className="h-3 w-24 bg-gray-100 dark:bg-[#34373bad] rounded"></div>
              </div>
              <div className="p-5 pt-3">
                <div className="h-4 w-full mb-5 bg-gray-100 dark:bg-[#34373bad] rounded"></div>
                <div className="h-4 w-full mb-2 bg-gray-100 dark:bg-[#34373bad] rounded"></div>
                <div className="h-8 w-20 mt-4 bg-gray-100 dark:bg-[#34373bad] rounded-md"></div>
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
                <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border dark:border-[#91969e52] bg-white dark:bg-[#2a2b2f] h-full">
                  <div className="flex items-center p-5">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 text-[#1f1f1f9d] dark:text-blue-400 border border-black/10 dark:border-[#91969e52]">
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
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.difficulty}</p>
                      </div>
                      <div className="flex items-center">
                        <LanguagesIcon className="text-purple-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">{course.language}</p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="text-orange-500 mr-2" size={16} />
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {course.totalDuration} min
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{t("no_courses_found")}</p>
      )}
    </div>
  )
}
