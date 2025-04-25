"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { use } from "react"
import { usePathname } from "next/navigation"
import { Button } from "../../../components/ui/button"

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
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "course")

  const fallbackTranslations = {
    progress: "Progress",
    continue: "Continue",
  }

  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")

  const pathname = usePathname()

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    const detectedLanguage = langFromPath && ["en", "nl", "de"].includes(langFromPath) ? langFromPath : lng || "en"
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
          const languageFilteredCourses = data.courses.filter(
            (course) => course.language?.toLowerCase() === currentLanguage.toLowerCase(),
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

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const coursesWithProgress = filteredCourses.map((course) => ({
    ...course,
    progress: `${Math.floor(Math.random() * 8)}/${10}`,
  }))

  return (
    <div className="min-h-screen">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          {t("course_header")}
        </h1>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full sm:w-[250px] pl-8 sm:pl-10 pr-4 py-1 sm:py-2 rounded-lg border border-gray-300 dark:border-[#91969e52] focus:outline-none focus:ring-2 focus:ring-[#0f172a] dark:bg-[#2a2b2f] dark:text-white text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400 dark:text-gray-500"
            size={18}
          />
        </div>
      </div>

      {/* Statistics (hidden on mobile) */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: allCourses.length, label: t("total_courses") },
          { value: 24, label: t("expert_instructors") },
          { value: 1200, label: t("active_students") },
          { value: "4.8", label: t("average_rating") },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#2a2b2f] p-2 sm:p-4 rounded-lg border border-gray-100 dark:border-[#91969e52]"
          >
            <p className="text-2xl sm:text-3xl font-bold text-[#0f172a] dark:text-white">
              {stat.value}+
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-0">
          {filteredCourses.length > 0
            ? `${t("showing")} ${filteredCourses.length} ${t("courses")}`
            : t("no_courses_found")}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t("sort_by")}:
          </span>
          <select className="bg-white dark:bg-[#2a2b2f] text-gray-700 dark:text-gray-200 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm border border-gray-200 dark:border-[#91969e52]">
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
              className="group rounded-lg overflow-hidden shadow-sm border border-border bg-white dark:border-[#b6b6b63d] dark:bg-[#2a2b2f] h-full"
            >
              <div className="relative w-full h-32 bg-gray-100 dark:bg-gray-700"></div>
              <div className="flex items-center p-5">
                <div className="h-5 w-40 mb-2 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="p-5 pt-3">
                <div className="mb-2 flex justify-between">
                  <div className="h-3 w-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-10 bg-gray-100 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-5"></div>
                <div className="h-8 w-24 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithProgress.map((course, index) => (
            <motion.div
              key={course._id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/${currentLanguage}/courses/${course._id}`} className="block h-full">
                <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border bg-white dark:border-[#b6b6b63d] dark:bg-[#2a2b2f] h-full">
                  <div className="relative w-full h-32">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                    <div className="absolute top-2 right-2 z-20 flex gap-1" onClick={(e) => e.preventDefault()}>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d] text-[#1f1f1f9d]">
                        {course.difficulty}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d] text-[#1f1f1f9d]">
                        {course.language}
                      </span>
                    </div>
                    <img
                      src={
                        course.imageUrl ||
                        `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(course.title) || "/placeholder.svg"}`
                      }
                      alt={`${course.title} cover`}
                      className="object-cover w-full h-full opacity-70 hover:opacity-80 transition-all duration-300"
                    />
                  </div>

                  <div className="flex items-center p-5">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#e9ebfa] dark:bg-blue-900/30 dark:text-blue-400 border border-black/10 dark:border-[#b6b6b63d] text-[#1f1f1f9d]">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 pt-3">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">
                        {t("progress") || fallbackTranslations.progress}
                      </span>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{course.progress}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(Number.parseInt(course.progress.split("/")[0]) / Number.parseInt(course.progress.split("/")[1])) * 100}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full transition-all duration-300 group-hover:brightness-110 bg-[#0f172b] dark:bg-blue-600"
                      />
                    </div>
                    <Button className="text-sm font-medium transition-all duration-300 group-hover:translate-y-[-2px] px-4 py-1.5 rounded-md">
                      {t("continue") || fallbackTranslations.continue}
                    </Button>
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
