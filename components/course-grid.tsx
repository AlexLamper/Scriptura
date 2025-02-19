"use client"

import { Badge } from "../components/ui/badge"
import { CourseCard } from "../components/course-card"
import { useTranslation } from "../app/i18n/client"

interface CourseGridProps {
  params: {
    lng: string
  }
}

const courses = [
  {
    id: 1,
    titleKey: "course_1_title",
    categoryKey: "category_old_testament",
    progress: "5/20",
    background: "bg-[#FFD700]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 120 },
    ],
  },
  {
    id: 2,
    titleKey: "course_2_title",
    categoryKey: "category_new_testament",
    progress: "12/50",
    background: "bg-[#E6E6FA]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 80 },
    ],
  },
  {
    id: 3,
    titleKey: "course_3_title",
    categoryKey: "category_christian_living",
    progress: "18/22",
    background: "bg-[#ADD8E6]",
    students: [
      { name: "Student 1", image: "/placeholder.svg" },
      { name: "Student 2", image: "/placeholder.svg" },
      { name: "Student 3", image: "/placeholder.svg" },
      { more: 24 },
    ],
  },
]

export function CourseGrid({ params: { lng } }: CourseGridProps) {
  const { t } = useTranslation(lng, "course-grid")

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{t("my_bible_courses")}</h2>
      <div className="flex gap-4 mb-6">
        <Badge variant="secondary" className="bg-black text-white hover:bg-black/90">
          {t("all_courses")}
        </Badge>
        <Badge variant="outline">{t("category_old_testament")}</Badge>
        <Badge variant="outline">{t("category_new_testament")}</Badge>
        <Badge variant="outline">{t("category_christian_living")}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} title={t(course.titleKey)} category={t(course.categoryKey)} />
        ))}
      </div>
    </div>
  )
}

