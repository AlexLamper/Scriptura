"use client"

import { useState, useEffect, use } from "react"
import { useTranslation } from "../../../i18n/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CourseGeneralInformation {
  originLanguage: string
  author: string
  genre: string
  chapters: number
  languageDetail: string
  timePeriod: string
}

type CourseType = {
  _id: string
  title: string
  description: string
  instructor: string | { _id: string; name: string; email?: string }
  category: string
  difficulty: string
  totalDuration: number
  tags: string[]
  content: string
  learning_objectives: string[]
  imageUrl?: string
  generalInformation: CourseGeneralInformation
  isPremium?: boolean
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string }>
}) {
  const { lng, courseId } = use(params)
  const { t } = useTranslation(lng, "course")
  const { data: session } = useSession()
  const router = useRouter()

  const [course, setCourse] = useState<CourseType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [markingAsCompleted, setMarkingAsCompleted] = useState(false)
  interface UserType {
    subscribed?: boolean
    [key: string]: unknown
  }
  const [user, setUser] = useState<UserType | null>(null)

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
    const fetchCourse = async () => {
      try {
        console.log(`Fetching course with ID: ${courseId}`)
        const response = await fetch(`/api/courses/${courseId}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch course")
        }

        const data = await response.json()
        console.log("Course data received:", data)
        setCourse(data)
      } catch (error) {
        console.error("Error fetching course:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  // Fetch completion status
  useEffect(() => {
    const fetchCompletionStatus = async () => {
      if (!session || !courseId) return

      try {
        const response = await fetch(`/api/user-progress?courseId=${courseId}`)
        if (response.ok) {
          const data = await response.json()
          setIsCompleted(data.completed || false)
        }
      } catch (error) {
        console.error("Error fetching completion status:", error)
      }
    }

    fetchCompletionStatus()
  }, [session, courseId])

  // Process content to handle citations, newlines, and other formatting issues
  function processContent(content: string) {
    if (!content) return ""

    // Replace literal \n with actual newlines
    let processed = content.replace(/\\n/g, "\n")

    // Handle citations
    processed = processed.replace(/:contentReference\[oaicite:(\d+)\]\{index=\d+\}/g, (_, idx) => {
      const num = Number.parseInt(idx, 10) + 1
      return `<sup id="ref-${num}"><a href="#ref-${num}">[${num}]</a></sup>`
    })

    processed = processed.replace(/^Eiland Patmos$/gm, "![Eiland Patmos](/en/images/courses/patmos.png)")

    // Add proper heading to the beginning if it doesn't exist
    if (!processed.startsWith("# ")) {
      const firstLine = processed.split("\n")[0]
      processed = processed.replace(firstLine, `# ${firstLine}`)
    }

    return processed
  }

  // Function to directly render HTML content
  function createMarkup(content: string) {
    // Convert markdown to HTML
    const html = content
      // Headers
      .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-blue-100">$1</h2>')
      .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-blue-100">$1</h1>')

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Lists
      .replace(/^\d+\. (.*?)$/gm, '<li class="mb-1 text-base text-gray-700 dark:text-blue-200">$1</li>')
      .replace(/<li>(.*?)<\/li>\n<li>/g, "<li>$1</li>\n<li>")
      .replace(/(<li>.*?<\/li>\n)+/g, (match) => `<ol class="list-decimal pl-6 mb-4 text-base">${match}</ol>`)

      // Blockquotes
      .replace(
        /^> (.*?)$/gm,
        '<blockquote class="border-l-4 border-gray-300 dark:border-gray-400 pl-4 italic my-4 text-base text-gray-700 dark:text-blue-200">$1</blockquote>',
      )

      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<div class="my-6 flex justify-center"><img src="$2" alt="$1" class="rounded-lg max-w-full h-auto" style="max-height: 500px" /></div>',
      )

      // Paragraphs (must come last)
      .replace(/^([^<].*?)$/gm, '<p class="mb-4 leading-relaxed text-base text-gray-700 dark:text-blue-200">$1</p>')

      // Fix empty paragraphs
      .replace(/<p class="mb-4 leading-relaxed text-base text-gray-700 dark:text-blue-200"><\/p>/g, "")

      // Convert newlines to breaks for readability
      .replace(/\n\n/g, "<br />")

    return { __html: html }
  }

  const markAsCompleted = async () => {
    if (!session) return

    try {
      setMarkingAsCompleted(true)
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          completed: true,
        }),
      })

      if (response.ok) {
        setIsCompleted(true)
      }
    } catch (error) {
      console.error("Error marking course as completed:", error)
    } finally {
      setMarkingAsCompleted(false)
    }
  }

  const isUserSubscribed = user?.subscribed || false
  const isPremiumCourse = course?.isPremium || false

  // Redirect to courses page if premium course and user is not subscribed
  useEffect(() => {
    if (!loading && isPremiumCourse && !isUserSubscribed) {
      router.push(`/${lng}/courses`)
    }
  }, [loading, isPremiumCourse, isUserSubscribed, router, lng])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{t("loading")}</span>
        <div className="w-12 h-12 border-4 border-[#1f2937] border-t-transparent rounded-full animate-spin mt-8"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">{t("course_not_found")}</div>
        <Button onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    )
  }

  // If premium course and user is not subscribed, show a message
  if (isPremiumCourse && !isUserSubscribed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">This is a premium course. Please subscribe to access the content.</p>
        </div>
        <Button onClick={() => router.push(`/${lng}/pricing`)} className="mb-4">
          View Subscription Plans
        </Button>
        <Button onClick={() => router.back()} variant="outline" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    )
  }

  // Process content for rendering
  const processedContent = processContent(course.content)

  return (
    <div className="min-h-screen bg-[#f6f7ff] dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23]">
      <main className="container mx-auto px-6 py-8">
        <Button onClick={() => router.push(`/${lng}/courses`)} className="mb-6 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back_to_courses")}
        </Button>

        <div className="bg-white dark:bg-[#23263a] rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-blue-100">{course.title}</h1>
            {isPremiumCourse && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
                </svg>
                Premium
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={createMarkup(processedContent)}
              />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-blue-100">Course Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-blue-200">Category:</span>
                    <span className="font-medium text-gray-900 dark:text-blue-100">{course.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-blue-200">Difficulty:</span>
                    <span className="font-medium text-gray-900 dark:text-blue-100">{course.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-blue-200">Duration:</span>
                    <span className="font-medium text-gray-900 dark:text-blue-100">{course.totalDuration} min</span>
                  </div>
                </div>
              </div>

              {course.learning_objectives && course.learning_objectives.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-blue-100">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {course.learning_objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-blue-200">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                onClick={markAsCompleted}
                disabled={isCompleted || markingAsCompleted}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
              >
                {isCompleted ? "✓ Completed" : markingAsCompleted ? "Marking Complete..." : "Mark as Complete"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
