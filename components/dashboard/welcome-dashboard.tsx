"use client"

import { BookOpen, FileText } from "lucide-react"
import { Button } from "../ui/button"
import { useSession } from "next-auth/react"
import { useTranslation } from "../../app/i18n/client"

interface WelcomeBannerProps {
  params: {
    lng: string
  }
}

export default function WelcomeBanner({ params: { lng } }: WelcomeBannerProps) {
  const { data: session } = useSession()
  const userName = session?.user?.name?.split(" ")[0] || "Student"
  const { t } = useTranslation(lng, "welcome")

  return (
    <div className="rounded-xl p-6 border mb-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {t("welcome_back")}, {userName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t("continue_your_biblical_journey")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t("resume_course")}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            {t("take_quiz")}
          </Button>
        </div>
      </div>
    </div>
  )
}
