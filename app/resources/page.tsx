"use client"

import { useTranslation } from "../i18n/client"
import { Construction } from "lucide-react"

export default function ResourcesPage() {
  const { t } = useTranslation("resources")

  return (
    <div className="min-h-screen flex items-center justify-center">
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
            {t("resources_feature_description") || "Discover the best Bible study resources, books, and tools to deepen your faith journey."}
          </p>
        </div>
      </div>
    </div>
  )
}