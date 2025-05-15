"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "../../../../components/ui/button"
// import { Progress } from "../../../../components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useTranslation } from "../../../i18n/client"
import { ArrowLeft, Check, Clock, BookOpen } from "lucide-react"
import CourseProgress from "../../../../components/course-progress"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Badge } from "../../../../components/ui/badge"

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
  lessons?: { title: string; duration: number; content: string }[]
  learning_objectives: string[]
  imageUrl?: string
  generalInformation: CourseGeneralInformation
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string }>
}) {
  // Unwrap the params promise using use()
  const { lng, courseId } = use(params)
  const { t } = useTranslation(lng, "course")
  const { data: session } = useSession()
  const router = useRouter()

  const [course, setCourse] = useState<CourseType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [lastAccessedLesson, setLastAccessedLesson] = useState<number>(0)

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

  // Fetch user progress
  useEffect(() => {
    const fetchProgress = async () => {
      if (!session) return

      try {
        const response = await fetch(`/api/user-progress?courseId=${courseId}`)
        if (response.ok) {
          const data = await response.json()
          setCompletedLessons(data.completedLessons || [])
          setLastAccessedLesson(data.lastAccessedLesson || 0)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    if (courseId && session) {
      fetchProgress()
    }
  }, [courseId, session])

  const handleContinueCourse = () => {
    router.push(`/${lng}/courses/${courseId}/lessons/${lastAccessedLesson}`)
  }

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
        <Button onClick={() => window.history.back()} className="flex items-center">
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
        <Button onClick={() => window.history.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-0 py-2">
        <Button onClick={() => (window.location.href = `/courses`)} className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back_to_courses")}
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">{course.title}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
              <CardHeader>
                <CardTitle>{t("course_details")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>
                    <strong>{t("category")}:</strong> <em>{course.category}</em>
                  </span>
                  <span>
                    <strong>{t("difficulty")}:</strong> <em>{course.difficulty}</em>
                  </span>
                  <span>
                    <strong>{t("duration")}:</strong>{" "}
                    <em>
                      {course.totalDuration} {t("minutes")}
                    </em>
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold mb-0">{t("tags")}:</h3>
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {course.lessons && course.lessons.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t("lessons")}:</h3>
                    <div className="space-y-4">
                      {course.lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(index)
                        const isLastAccessed = index === lastAccessedLesson

                        return (
                          <Link href={`/${lng}/courses/${courseId}/lessons/${index}`} key={index}>
                            <div
                              className={`border p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1c1c1e] transition cursor-pointer my-4 ${
                                isCompleted ? "border-l-4 border-green-500" : ""
                              } ${isLastAccessed ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <h4 className="font-medium">{lesson.title}</h4>
                                  {isCompleted && (
                                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                      <Check className="h-3 w-3 mr-1" /> {t("completed")}
                                    </Badge>
                                  )}
                                  {isLastAccessed && !isCompleted && (
                                    <Badge className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                      {t("in_progress")}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {lesson.duration} {t("minutes")}
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                                {lesson.content?.substring(0, 100)}
                                {lesson.content && lesson.content.length > 100 ? "..." : ""}
                              </p>
                              <div className="flex items-center mt-2">
                                <BookOpen className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {t("lesson")} {index + 1} {t("of")} {course.lessons.length}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <div className="space-y-6">
              {course.imageUrl && (
                <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2] overflow-hidden">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={course.imageUrl || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover opacity-75"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Card>
              )}

              <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
                <CardHeader>
                  <CardTitle>{t("course_progress")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseProgress courseId={courseId} lng={lng} />
                  {/* <p className="text-sm mb-4">33% {t("complete")}</p> */}
                  <Button className="w-full mb-3" onClick={handleContinueCourse}>
                    {completedLessons.length > 0 ? t("continue_course") : t("start_course")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
                <CardHeader>
                  <CardTitle>{t("general_information")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="#" className="block space-y-1">
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("origin_language")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.originLanguage ?? ""}
                        </p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("author")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.author ?? ""}
                        </p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("genre")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.genre ?? ""}
                        </p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("chapters")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.chapters ?? ""}
                        </p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("language_detail")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.languageDetail ?? ""}
                        </p>
                      </div>
                      <div className="flex gap-1 text-sm">
                        <p className="font-medium">{t("time_period")}:</p>
                        <p className="text-muted-foreground dark:text-[#ededed95]">
                          {course.generalInformation?.timePeriod ?? ""}
                        </p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
