"use client"

import { useTranslation } from "../../../app/i18n/client"
import { Construction } from "lucide-react"
import { use } from "react"

export default function QuizzesPage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "common")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <div className="mb-8">
          <Construction className="h-24 w-24 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("under_construction") || "Under Construction"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("under_construction_message") || "We're working hard to bring you this feature. Please check back soon!"}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t("coming_soon") || "Coming Soon"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("quiz_feature_description") || "Interactive Bible quizzes to test your knowledge and deepen your understanding."}
          </p>
        </div>
      </div>
    </div>
  )
}
