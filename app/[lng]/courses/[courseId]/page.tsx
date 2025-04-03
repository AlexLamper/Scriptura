"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "../../../../components/ui/button"
import { Progress } from "../../../../components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useTranslation } from "../../../i18n/client"
import { ArrowLeft } from "lucide-react"

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
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string }>
}) {
  // Unwrap the params promise using use()
  const { lng, courseId } = use(params)
  const { t } = useTranslation(lng, "course")

  const [course, setCourse] = useState<CourseType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Handle instructor which might be an object or a string
  const instructorName = typeof course.instructor === "object" ? course.instructor.name : course.instructor

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-2">
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
                    {t("instructor")}: {instructorName}
                  </span>
                  <span>
                    {t("category")}: {course.category}
                  </span>
                  <span>
                    {t("difficulty")}: {course.difficulty}
                  </span>
                  <span>
                    {t("duration")}: {course.totalDuration} {t("minutes")}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">{t("tags")}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {course.lessons && course.lessons.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t("lessons")}:</h3>
                    <div className="space-y-2">
                      {course.lessons.map((lesson, index) => (
                        <Link href={`/${lng}/courses/${courseId}/lessons/${index}`} key={index}>
                          <div className="p-3 my-3 bg-white dark:bg-[#2C2C33] rounded hover:bg-gray-100 dark:hover:bg-[#1c1c1e] transition cursor-pointer">
                            {lesson.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2] mt-8">
              <CardHeader>
                <CardTitle>{t("learning_objectives")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Understand core concepts and principles of {course.category}</li>
                  <li>Develop practical skills through hands-on exercises</li>
                  <li>Apply learned techniques to real-world scenarios</li>
                  <li>Master advanced topics suitable for {course.difficulty} level learners</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2] mt-8">
              <CardHeader>
                <CardTitle>{t("course_curriculum")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">
                            {index + 1}. {lesson.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration} {t("minutes")}
                          </span>
                        </div>
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                          {lesson.content?.substring(0, 100)}
                          {lesson.content && lesson.content.length > 100 ? "..." : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>{t("no_lessons_available")}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <div className="space-y-6">
              <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
                <CardHeader>
                  <CardTitle>{t("course_progress")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={33} className="mb-2" />
                  <p className="text-sm mb-4">33% {t("complete")}</p>
                  <Button className="w-full mb-3">{t("continue_course")}</Button>
                  <Button variant="outline" className="w-full">
                    {t("download_materials")}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
                <CardHeader>
                  <CardTitle>{t("prerequisites")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      {t("basic_knowledge_of")} {course.category}
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      {course.difficulty === "Beginner" ? t("no_experience_needed") : t("prior_experience_recommended")}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
                <CardHeader>
                  <CardTitle>{t("related_courses")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href={`/${lng}/courses/related-course-1`} className="block">
                      <div className="p-3 bg-white dark:bg-[#2C2C33] rounded hover:bg-gray-100 dark:hover:bg-[#1c1c1e] transition">
                        <h4 className="font-medium">
                          {t("advanced")} {course.category}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {t("related_to_your_interests")}
                        </p>
                      </div>
                    </Link>
                    <Link href={`/${lng}/courses/related-course-2`} className="block">
                      <div className="p-3 bg-white dark:bg-[#2C2C33] rounded hover:bg-gray-100 dark:hover:bg-[#1c1c1e] transition">
                        <h4 className="font-medium">
                          {course.category} {t("fundamentals")}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t("popular_in_category")}</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
            <CardHeader>
              <CardTitle>{t("instructor_profile")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold">
                  {typeof course.instructor === "object"
                    ? course.instructor.name?.charAt(0)
                    : course.instructor?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{instructorName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {t("expert_in")} {course.category}
                  </p>
                  <p className="mt-3 text-sm">{t("instructor_bio")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2]">
            <CardHeader>
              <CardTitle>{t("student_reviews")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold">4.8</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(24 {t("reviews")})</span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-white dark:bg-[#2C2C33] rounded">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-medium">Alex M.</span>
                  </div>
                  <p className="text-sm">&quot;{t("review_content")}&quot;</p>
                </div>

                <div className="p-3 bg-white dark:bg-[#2C2C33] rounded">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star, i) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-medium">Sarah K.</span>
                  </div>
                  <p className="text-sm">&quot;{t("another_review_content")}&quot;</p>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-4 text-sm">
                {t("see_all_reviews")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#fafafa] dark:bg-[#3d3d3ff2] mt-8">
          <CardHeader>
            <CardTitle>{t("frequently_asked_questions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">{t("faq_question_1")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("faq_answer_1")}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t("faq_question_2")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("faq_answer_2")}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t("faq_question_3")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("faq_answer_3")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

