"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { use } from "react"
import { usePathname } from "next/navigation"
import { Button } from "../../../components/ui/button"
// import { useSession } from "next-auth/react"

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

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "course")
  // const { data: session } = useSession()

  const [courses, setCourses] = useState<Course[]>([])
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
          <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 text-gray-400 dark:text-gray-500" size={18} />
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/${currentLanguage}/courses/${course._id}`}>
                <div className="group rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white dark:border-[#23263a] dark:bg-[#23263a] p-6 relative">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-blue-100 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-blue-200 line-clamp-3">{course.description}</p>
                  <Button className="mt-4 w-full">{t("continue")}</Button>
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
