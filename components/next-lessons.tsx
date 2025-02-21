"use client"

import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { useTranslation } from "../app/i18n/client"

interface NextLessonsProps {
  params: {
    lng: string
  }
}

const nextLessons = [
  {
    id: 1,
    titleKey: "lesson_1_title",
    courseKey: "course_1",
    teacherNameKey: "teacher_1",
    teacherImage: "/placeholder.svg",
    durationKey: "duration_45",
  },
  {
    id: 2,
    titleKey: "lesson_2_title",
    courseKey: "course_2",
    teacherNameKey: "teacher_2",
    teacherImage: "/placeholder.svg",
    durationKey: "duration_60",
  },
  {
    id: 3,
    titleKey: "lesson_3_title",
    courseKey: "course_3",
    teacherNameKey: "teacher_3",
    teacherImage: "/placeholder.svg",
    durationKey: "duration_90",
  },
  {
    id: 4,
    titleKey: "lesson_4_title",
    courseKey: "course_4",
    teacherNameKey: "teacher_4",
    teacherImage: "/placeholder.svg",
    durationKey: "duration_50",
  },
  {
    id: 5,
    titleKey: "lesson_5_title",
    courseKey: "course_5",
    teacherNameKey: "teacher_5",
    teacherImage: "/placeholder.svg",
    durationKey: "duration_75",
  },
]

export function NextLessons({ params: { lng } }: NextLessonsProps) {
  const { t } = useTranslation(lng, "next-lessons")

  return (
    <div className="bg-white dark:bg-[#2d2d33] rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("my_next_bible_lessons")}
        </h2>
        <Button variant="link" className="text-red-500 dark:text-red-400">
          {t("view_all_lessons")}
        </Button>
      </div>
      <div className="space-y-6">
        {nextLessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {t(lesson.titleKey)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t(lesson.courseKey)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={lesson.teacherImage}
                  alt={t(lesson.teacherNameKey)}
                />
                <AvatarFallback>{t(lesson.teacherNameKey)[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t(lesson.durationKey)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
