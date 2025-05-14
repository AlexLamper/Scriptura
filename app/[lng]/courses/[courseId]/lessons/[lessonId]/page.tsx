"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Check } from "lucide-react"
import { Button } from "../../../../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { useTranslation } from "../../../../../../app/i18n/client"
import { Skeleton } from "../../../../../../components/ui/skeleton"
import { cn } from "../../../../../../lib/utils"
import { useSession } from "next-auth/react"
import { Badge } from "../../../../../../components/ui/badge"

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
  const { lng, courseId, lessonId } = use(params)
  const { t } = useTranslation(lng, "course")
  const { data: session } = useSession()

  const [course, setCourse] = useState<CourseType | null>(null)
  const [lesson, setLesson] = useState<LessonType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [markingAsCompleted, setMarkingAsCompleted] = useState(false)

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
      .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Lists
      .replace(/^\d+\. (.*?)$/gm, '<li class="mb-1 text-base">$1</li>')
      .replace(/<li>(.*?)<\/li>\n<li>/g, "<li>$1</li>\n<li>")
      .replace(/(<li>.*?<\/li>\n)+/g, (match) => `<ol class="list-decimal pl-6 mb-4 text-base">${match}</ol>`)

      // Blockquotes
      .replace(
        /^> (.*?)$/gm,
        '<blockquote class="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-base">$1</blockquote>',
      )

      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<div class="my-6 flex justify-center"><img src="$2" alt="$1" class="rounded-lg max-w-full h-auto" style="max-height: 500px" /></div>',
      )

      // Paragraphs (must come last)
      .replace(/^([^<].*?)$/gm, '<p class="mb-4 leading-relaxed text-base">$1</p>')

      // Fix empty paragraphs
      .replace(/<p class="mb-4 leading-relaxed text-base"><\/p>/g, "")

      // Convert newlines to breaks for readability
      .replace(/\n\n/g, "<br />")

    return { __html: html }
  }

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

  useEffect(() => {
    const fetchProgress = async () => {
      if (!session) return

      try {
        const response = await fetch(`/api/user-progress?courseId=${courseId}`)
        if (response.ok) {
          const data = await response.json()
          const completedArray = data.completedLessons || []
          setCompletedLessons(completedArray)
          setIsCompleted(completedArray.includes(Number(lessonId)))
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      }
    }

    fetchProgress()
  }, [courseId, lessonId, session])

  useEffect(() => {
    const updateAccess = async () => {
      if (!session) return

      try {
        await fetch("/api/user-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId,
            lessonIndex: Number(lessonId),
            completed: false,
          }),
        })
      } catch (error) {
        console.error("Error updating last accessed lesson:", error)
      }
    }

    if (courseId && lessonId) {
      updateAccess()
    }
  }, [courseId, lessonId, session])

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
          lessonIndex: Number(lessonId),
          completed: true,
        }),
      })

      if (response.ok) {
        setIsCompleted(true)
        setCompletedLessons([...completedLessons, Number(lessonId)])
      }
    } catch (error) {
      console.error("Error marking lesson as completed:", error)
    } finally {
      setMarkingAsCompleted(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
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
      <div className="min-h-screen dark:bg-gray-900">
        <Card className="w-full">
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
      <div className="min-h-screen dark:bg-gray-900 flex flex-col items-center justify-center">
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

  const lessonIndex = Number(lessonId)
  const prevLessonId = lessonIndex > 0 ? String(lessonIndex - 1) : lessonId
  const nextLessonId = String(lessonIndex + 1)
  const hasNextLesson = course?.lessons && lessonIndex < course.lessons.length - 1

  // Process content for rendering
  const processedContent = processContent(lesson.content)

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-2">
        {/* Header with back button and course title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Link href={`/${lng}/courses/${courseId}`} className="group">
              <Button size="sm" className="mr-4 transition-all group-hover:-translate-x-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("back_to_course")}
              </Button>
            </Link>
            {course && <div className="text-sm md:text-base font-medium text-muted-foreground">{course.title}</div>}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {lesson.duration} {t("minutes")}
            </div>
            {isCompleted && (
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <Check className="h-3 w-3 mr-1" /> {t("completed")}
              </Badge>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-foreground">{lesson.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0 overflow-hidden">
                <div className="pb-8 px-8">
                  {/* Use direct HTML rendering instead of ReactMarkdown */}
                  <div
                    className="prose dark:prose-invert prose-img:rounded-lg prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors max-w-none"
                    dangerouslySetInnerHTML={createMarkup(processedContent)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tabs for additional content */}
            <Tabs defaultValue="content" className="mt-8">
              <TabsList className="mb-4">
                <TabsTrigger value="discussion" className="text-sm md:text-base">
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
                    className="w-full justify-start group transition-all border border-black border-opacity-80 text-black text-opacity-80"
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

                {/* Mark as completed button */}
                {session && (
                  <Button
                    onClick={markAsCompleted}
                    disabled={isCompleted || markingAsCompleted}
                    className={cn(
                      "w-full mt-4",
                      isCompleted &&
                        "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100",
                    )}
                    variant={isCompleted ? "outline" : "default"}
                  >
                    {markingAsCompleted ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("processing")}
                      </span>
                    ) : isCompleted ? (
                      <span className="flex items-center">
                        <Check className="mr-2 h-4 w-4" /> {t("completed")}
                      </span>
                    ) : (
                      t("mark_as_completed")
                    )}
                  </Button>
                )}

                {/* Course progress */}
                {course?.lessons && course.lessons.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3">{t("course_progress")}</h3>
                    <div className="space-y-2">
                      {course.lessons.map((courseLesson, idx) => (
                        <Link key={idx} href={`/${lng}/courses/${courseId}/lessons/${idx}`}>
                          <div
                            className={cn(
                              "p-2 rounded-md text-sm flex items-center",
                              idx === lessonIndex ? "bg-primary/10 font-medium" : "hover:bg-muted",
                              completedLessons.includes(idx) && "border-l-4 border-green-500 pl-1",
                            )}
                          >
                            <span className="mr-2">{idx + 1}.</span>
                            <span className="truncate">{courseLesson.title}</span>
                            {completedLessons.includes(idx) && <Check className="h-4 w-4 ml-auto text-green-500" />}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t">
                <Link href={`/${lng}/courses/${courseId}`}>
                  <Button
                    variant="secondary"
                    className="w-full justify-start mt-6 hover:bg-secondary/80 transition-colors border"
                  >
                    <ChevronLeft className="mr-2 h-full w-full" />
                    {t("back_to_course")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
