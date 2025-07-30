"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, Check } from "lucide-react"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"
import { useTranslation } from "../../../../i18n/client"
import { Skeleton } from "../../../../../components/ui/skeleton"
import { cn } from "../../../../../lib/utils"
// import { useSession } from "next-auth/react"
// import { Badge } from "../../../../../components/ui/badge"
// import { PremiumCourseLock } from "../../../../../components/premium-course-lock"
// import { useRouter } from "next/navigation"

type ContentType = {
  _id: string
  title: string
  slug: string
  content: string
  duration: number
}

type CourseType = {
  _id: string
  title: string
  description: string
  category: string
  difficulty: string
  totalDuration: number
  tags: string[]
  isPremium?: boolean
}

export default function CourseContentPage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string; contentSlug: string }>
}) {
  const { lng, courseId, contentSlug } = use(params)
  const { t } = useTranslation(lng, "course")
//   const { data: session } = useSession()
//   const router = useRouter()

  const [course, setCourse] = useState<CourseType | null>(null)
  const [contents, setContents] = useState<ContentType[]>([])
  const [activeContent, setActiveContent] = useState<ContentType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRes = await fetch(`/api/courses/${courseId}`)
        const courseData = await courseRes.json()
        setCourse(courseData)

        const contentRes = await fetch(`/api/courses/${courseId}/content`)
        const contentData = await contentRes.json()
        setContents(contentData)

        const selected = contentData.find((c: ContentType) => c.slug === contentSlug) || contentData[0]
        setActiveContent(selected)
      } catch (error) {
        console.error("Error fetching course data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, contentSlug])

  if (loading) {
    return <Skeleton className="h-64 w-full" />
  }

  if (!course || !activeContent) {
    return <p>{t("lesson_not_found")}</p>
  }

  const currentIndex = contents.findIndex((c) => c._id === activeContent._id)
  const prevContent = currentIndex > 0 ? contents[currentIndex - 1] : null
  const nextContent = currentIndex < contents.length - 1 ? contents[currentIndex + 1] : null

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Link href={`/${lng}/courses/${courseId}`} className="group">
              <Button size="sm" className="mr-4 transition-all group-hover:-translate-x-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("back_to_course")}
              </Button>
            </Link>
            <div className="text-sm md:text-base font-medium text-muted-foreground">{course.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">{activeContent.duration} {t("minutes")}</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">{activeContent.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div
                  className="prose dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: activeContent.content }}
                />
              </CardContent>
            </Card>

            <Tabs defaultValue="content" className="mt-8">
              <TabsList className="mb-4">
                <TabsTrigger value="discussion">{t("discussion")}</TabsTrigger>
                <TabsTrigger value="resources">{t("additional_resources")}</TabsTrigger>
              </TabsList>
              <TabsContent value="discussion">
                <Card>
                  <CardContent className="p-6">
                    <p>{t("discussion_forum_placeholder")}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources">
                <Card>
                  <CardContent className="p-6">
                    <p>{t("additional_resources_placeholder")}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-xl">{t("lesson_navigation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contents.map((c, idx) => (
                  <Link key={c._id} href={`/${lng}/courses/${courseId}/${c.slug}`}>
                    <div
                      className={cn(
                        "p-2 rounded-md text-sm flex items-center",
                        c._id === activeContent._id ? "bg-primary/10 font-medium" : "hover:bg-muted"
                      )}
                    >
                      <span className="mr-2">{idx + 1}.</span>
                      <span>{c.title}</span>
                      {c._id === activeContent._id && <Check className="h-4 w-4 ml-auto text-green-500" />}
                    </div>
                  </Link>
                ))}
              </CardContent>
              <CardFooter>
                <div className="flex w-full gap-2">
                  {prevContent && (
                    <Link href={`/${lng}/courses/${courseId}/${prevContent.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <ChevronLeft className="h-4 w-4 mr-1" /> {t("previous_lesson")}
                      </Button>
                    </Link>
                  )}
                  {nextContent && (
                    <Link href={`/${lng}/courses/${courseId}/${nextContent.slug}`} className="flex-1">
                      <Button className="w-full">
                        {t("next_lesson")} <ChevronLeft className="h-4 w-4 rotate-180 ml-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
