"use client";

import { useState, useEffect } from "react"
import { Button } from "../../../../components/ui/button"
import { Progress } from "../../../../components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { useTranslation } from "../../../../app/i18n/client"
import { Footer } from "../../../../components/Footer/client"
import { use } from "react"

type CourseType = {
  _id: string
  title: string
  description: string
  instructor: string
  category: string
  difficulty: string
  totalDuration: number
  tags: string[]
}

export default function CoursePage({ params }: { params: Promise<{ lng: string, courseId: string }> }) {
  const { lng, courseId } = use(params);
  const { t } = useTranslation(lng, "course");

  const [course, setCourse] = useState<CourseType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch course")
        }
        const data = await response.json()
        setCourse(data)
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [courseId])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">{t("loading")}</div>
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">{t("course_not_found")}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#18181bf2] flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{course.title}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-gray-200 dark:bg-[#3d3d3ff2]">
              <CardHeader>
                <CardTitle>{t("course_details")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>
                    {t("instructor")}: {course.instructor}
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
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-gray-200 dark:bg-[#3d3d3ff2]">
              <CardHeader>
                <CardTitle>{t("course_progress")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="mb-2" />
                <p className="text-sm mb-4">33% {t("complete")}</p>
                <Button className="w-full">{t("continue_course")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer lng={lng} />
    </div>
  )
}

