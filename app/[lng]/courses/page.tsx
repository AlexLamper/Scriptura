"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { use } from "react"
import { usePathname } from "next/navigation"
import { Button } from "../../../components/ui/button"
import { useSession } from "next-auth/react"
// import Image from "next/image"

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
  const { data: session } = useSession()

  const fallbackTranslations = {
    progress: "Progress",
    continue: "Continue",
  }

  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")
  interface User {
    subscribed?: boolean
    image?: string
    _id: string
    enrolledCourses?: string[]
    stripeSubscriptionId?: string
    isAdmin?: boolean
    name?: string
    email?: string
    bio?: string
    stripeCustomerId?: string
    createdAt?: string
    updatedAt?: string
  }
  const [user, setUser] = useState<User | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    const detectedLanguage = langFromPath && ["en", "nl", "de"].includes(langFromPath) ? langFromPath : lng || "en"
    setCurrentLanguage(detectedLanguage)
  }, [pathname, lng])

  // Fetch user data to check subscription status
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) return

      try {
        const response = await fetch("/api/user")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [session])

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

  const isUserSubscribed = user?.subscribed || false

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
            <p className="text-2xl sm:text-3xl font-bold text-[#0f172a] dark:text-white">{stat.value}+</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
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
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("sort_by")}:</span>
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
              className="rounded-lg shadow-sm border border-gray-200 bg-[#f6f7ff] dark:border-[#23263a] dark:bg-[#23263a] h-full p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="h-6 w-48 mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
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
              <Link
                href={`/${currentLanguage}/courses/${course._id}`}
                className={`block h-full ${course.isPremium && !isUserSubscribed ? "cursor-not-allowed" : ""}`}
                onClick={(e) => {
                  // Prevent navigation for premium courses if user is not subscribed
                  if (course.isPremium && !isUserSubscribed) {
                    e.preventDefault()
                    // You could show a modal or redirect to subscription page here
                  }
                }}
              >
                <div className="group rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white dark:border-[#23263a] dark:bg-[#23263a] dark:shadow-lg dark:shadow-blue-900/20 h-full p-6 relative">
                  
                  {/* Premium overlay */}
                  {course.isPremium && !isUserSubscribed && (
                    <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center rounded-lg">
                      <div className="bg-black/60 p-2 rounded-full shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Header badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#23263a] dark:text-blue-200 dark:border-[#23263a] shadow-sm dark:shadow-blue-900/20">
                        {course.difficulty}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#23263a] dark:text-blue-200 dark:border-[#23263a] shadow-sm dark:shadow-blue-900/20">
                        {course.language}
                      </span>
                    </div>

                    {course.isPremium && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center gap-1 shadow-lg dark:shadow-amber-900/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
                        </svg>
                        <span>Premium</span>
                      </span>
                    )}
                  </div>

                  {/* Course content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl mb-2">{course.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#23263a] dark:text-blue-200 dark:border-[#23263a] shadow-sm dark:shadow-blue-900/20">
                        {course.category}
                      </span>
                    </div>
                    
                    {course.description && (
                      <p className="text-sm text-gray-600 dark:text-blue-200 dark:drop-shadow line-clamp-3">
                        {course.description}
                      </p>
                    )}

                    <Button
                      className={`w-full text-sm font-medium transition-all duration-300 group-hover:translate-y-[-2px] px-4 py-2.5 rounded-md shadow-sm dark:shadow-lg ${
                        course.isPremium && !isUserSubscribed 
                          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white" 
                          : "bg-blue-500 hover:bg-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500"
                      }`}
                      disabled={course.isPremium && !isUserSubscribed}
                    >
                      {course.isPremium && !isUserSubscribed
                        ? "Premium Content"
                        : t("continue") || fallbackTranslations.continue}
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
