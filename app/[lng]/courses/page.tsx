"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search } from "lucide-react"
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
  theme: string // Add theme field
  difficulty: string
  language: string
  totalDuration: number
  tags: string[]
  imageUrl?: string
  isPremium?: boolean
  passages?: Array<{
    book: string
    chapter: number
    verses: string
  }>
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "course")
  const { data: session } = useSession()

  const [courses, setCourses] = useState<Course[]>([])
  const [allCourses, setAllCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTheme, setSelectedTheme] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
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
          let languageFilteredCourses = data.courses.filter(
            (course) => course.language?.toLowerCase() === currentLanguage.toLowerCase()
          )
          
          // Fallback to English courses if no courses found for current language
          if (languageFilteredCourses.length === 0 && currentLanguage !== 'en') {
            languageFilteredCourses = data.courses.filter(
              (course) => course.language?.toLowerCase() === 'en'
            );
          }
          
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

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTheme = selectedTheme === "all" || course.theme === selectedTheme
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty
    
    return matchesSearch && matchesTheme && matchesDifficulty
  })

  const isUserSubscribed = user?.subscribed || false

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("course_header") || "Biblical Courses"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("course_subtitle") || "Deepen your faith with structured biblical studies and timeless teachings"}
          </p>
        </div>

        {/* Search and Language Selector */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder={t("search_placeholder") || "Search courses..."}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("language") || "Language"}:
            </span>
            <div className="flex gap-2">
              {[
                { code: 'en', label: 'English', flag: '🇺🇸' },
                { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
                { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
              ].map((lang) => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}/courses`}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm border ${
                    currentLanguage === lang.code
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { value: allCourses.length, label: t("total_courses") || "Total Courses", icon: "📚" },
            { value: 24, label: t("expert_instructors") || "Expert Instructors", icon: "👨‍🏫" },
            { value: 1200, label: t("active_students") || "Active Students", icon: "👥" },
            { value: "4.8", label: t("average_rating") || "Average Rating", icon: "⭐" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {filteredCourses.length > 0
                ? `${t("showing") || "Showing"} ${filteredCourses.length} ${t("courses") || "courses"}`
                : t("no_courses_found") || "No courses found"}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Theme Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("theme") || "Theme"}:
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">{t("all_themes") || "All Themes"}</option>
                  <option value="Faith">{t("faith") || "Faith"}</option>
                  <option value="Grace">{t("grace") || "Grace"}</option>
                  <option value="Parables">{t("parables") || "Parables"}</option>
                  <option value="Prayer">{t("prayer") || "Prayer"}</option>
                  <option value="Salvation">{t("salvation") || "Salvation"}</option>
                  <option value="Discipleship">{t("discipleship") || "Discipleship"}</option>
                  <option value="Love">{t("love") || "Love"}</option>
                  <option value="Wisdom">{t("wisdom") || "Wisdom"}</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("difficulty") || "Level"}:
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">{t("all_levels") || "All Levels"}</option>
                  <option value="beginner">{t("beginner") || "Beginner"}</option>
                  <option value="intermediate">{t("intermediate") || "Intermediate"}</option>
                  <option value="advanced">{t("advanced") || "Advanced"}</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sort_by") || "Sort"}:
                </label>
                <select className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option value="newest">{t("newest") || "Newest"}</option>
                  <option value="popular">{t("most_popular") || "Most Popular"}</option>
                  <option value="highest">{t("highest_rated") || "Highest Rated"}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-80 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="h-8 w-full mb-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id.toString()}
                className="group"
              >
                <Link
                  href={`/${currentLanguage}/courses/${course._id}`}
                  className={`block h-full ${course.isPremium && !isUserSubscribed ? "cursor-not-allowed" : ""}`}
                  onClick={(e) => {
                    if (course.isPremium && !isUserSubscribed) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 h-full p-6">
                    
                    {/* Premium overlay */}
                    {course.isPremium && !isUserSubscribed && (
                      <div className="absolute inset-0 bg-black/20 z-20 flex items-center justify-center rounded-lg">
                        <div className="bg-black/70 p-4 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
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
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium">
                          {course.theme}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                          {course.difficulty}
                        </span>
                      </div>

                      {course.isPremium && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 flex items-center gap-1.5 font-medium">
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
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </h3>
                        <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                          {course.category}
                        </span>
                      </div>
                      
                      {course.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                          {course.description}
                        </p>
                      )}

                      {/* Course meta info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {course.totalDuration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.language.toUpperCase()}
                        </span>
                      </div>

                      <Button
                        className={`w-full text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                          course.isPremium && !isUserSubscribed 
                            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white" 
                            : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                        disabled={course.isPremium && !isUserSubscribed}
                      >
                        {course.isPremium && !isUserSubscribed
                          ? t("premium_content") || "Premium Content"
                          : t("start_course") || "Start Course"}
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("no_courses_title") || "No courses found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {t("no_courses_description") || "Try adjusting your filters or search terms to find the courses you're looking for."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
