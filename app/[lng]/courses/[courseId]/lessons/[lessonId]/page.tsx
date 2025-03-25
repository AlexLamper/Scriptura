"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "../../../../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { useTranslation } from "../../../../../../app/i18n/client"
import { Skeleton } from "../../../../../../components/ui/skeleton"
import { cn } from "../../../../../../lib/utils"

type LessonType = {
  title: string
  content: string
  duration: number
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
  lessons?: LessonType[]
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string; lessonId: string }>
}) {
  // Unwrap the params promise using use()
  const { lng, courseId, lessonId } = use(params)
  const { t } = useTranslation(lng, "course")

  const [course, setCourse] = useState<CourseType | null>(null)
  const [lesson, setLesson] = useState<LessonType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch course")
        }
        const data = await response.json()
        setCourse(data)

        // Use lessonId as index to extract the lesson from the lessons array
        const lessonIndex = Number(lessonId)
        if (data.lessons && data.lessons.length > lessonIndex) {
          setLesson(data.lessons[lessonIndex])
        } else {
          throw new Error("Lesson not found")
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId, lessonId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-12 w-3/4 mb-6" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-[400px] w-full rounded-lg" />
              <div className="mt-6">
                <Skeleton className="h-10 w-60 rounded-lg" />
                <Skeleton className="h-60 w-full mt-4 rounded-lg" />
              </div>
            </div>
            <div>
              <Skeleton className="h-60 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen dark:bg-gray-900 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-500">{t("error")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">{error}</p>
            <Button onClick={() => window.history.back()} className="w-full" variant="secondary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t("go_back")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{t("lesson_not_found")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.history.back()} className="w-full" variant="secondary">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t("go_back")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Determine lesson navigation assuming lessonId is used as an index.
  const lessonIndex = Number(lessonId)
  const prevLessonId = lessonIndex > 0 ? String(lessonIndex - 1) : lessonId
  const nextLessonId = String(lessonIndex + 1)
  const hasNextLesson = course?.lessons && lessonIndex < course.lessons.length - 1

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button and course title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Link href={`/${lng}/courses/${courseId}`} className="group">
              <Button variant="ghost" size="sm" className="mr-4 transition-all group-hover:-translate-x-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("back_to_course")}
              </Button>
            </Link>
            {course && <div className="text-sm md:text-base font-medium text-muted-foreground">{course.title}</div>}
          </div>
          <div className="text-sm text-muted-foreground">
            {lesson.duration} {t("minutes")}
          </div>
        </div>

        {/* Lesson title */}
        <h1 className="text-3xl font-bold mb-8 text-foreground">{lesson.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Lesson Content */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0 overflow-hidden">
                <div className="p-8">
                  <div
                    className="prose dark:prose-invert prose-img:rounded-lg prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors max-w-none"
                    dangerouslySetInnerHTML={{ __html: lesson.content }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for additional content */}
            <Tabs defaultValue="content" className="mt-8">
              <TabsList className="mb-4">
                <TabsTrigger value="content" className="text-sm md:text-base">
                  {t("lesson_content")}
                </TabsTrigger>
                <TabsTrigger value="discussion" className="text-sm md:text-base">
                  {t("discussion")}
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-sm md:text-base">
                  {t("additional_resources")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="discussion">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{t("discussion_forum_placeholder")}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{t("additional_resources_placeholder")}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Navigation */}
          <div>
            <Card className="sticky top-6 shadow-md">
              <CardHeader className="border-b">
                <CardTitle className="text-xl">{t("lesson_navigation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Link
                  href={`/${lng}/courses/${courseId}/lessons/${prevLessonId}`}
                  className={cn("block", lessonIndex === 0 && "pointer-events-none opacity-50")}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start group transition-all"
                    disabled={lessonIndex === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {t("previous_lesson")}
                  </Button>
                </Link>

                <Link
                  href={`/${lng}/courses/${courseId}/lessons/${nextLessonId}`}
                  className={cn("block", !hasNextLesson && "pointer-events-none opacity-50")}
                >
                  <Button className="w-full justify-between group transition-all" disabled={!hasNextLesson}>
                    {t("next_lesson")}
                    <ChevronLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href={`/${lng}/courses/${courseId}`}>
                  <Button
                    variant="secondary"
                    className="w-full justify-start mt-8 hover:bg-secondary/80 transition-colors"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {t("back_to_course")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

