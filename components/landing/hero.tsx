"use client"

import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { ArrowRight, Check } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface HeroSectionProps {
  params: {
    lng: string
  }
}

export function HeroSection({ params: { lng } }: HeroSectionProps) {
  const { t } = useTranslation(lng, "landing-hero")

  return (
    <section className="relative bg-[#f6f7ff] dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23] py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 border-gray-200 dark:bg-[#23263a] dark:text-blue-200 dark:border-[#23263a] shadow-sm dark:shadow-blue-900/20"
            >
              {t("badge")}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-blue-100 leading-tight max-w-[95%] drop-shadow dark:drop-shadow-xl">
              {t("title_1")}{" "}
              <span className="bg-gradient-to-r from-[#465af8] to-[#8d92fe] bg-clip-text text-transparent dark:from-[#7a8cff] dark:to-[#bfcaff]">
                {t("title_2")}
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed dark:drop-shadow">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg">
                {t("primary_cta")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-white hover:bg-white hover:border-gray-300 dark:bg-[#181b23] dark:text-blue-200 dark:border-gray-700 dark:hover:bg-[#23263a] dark:hover:border-blue-400 dark:shadow-md">
                {t("secondary_cta")}
              </Button>
            </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-gray-500 dark:text-blue-300 pt-8">
            <div className="flex items-center space-x-2 dark:bg-[#23263a] dark:px-2 dark:py-1 dark:rounded-md">
              <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
              <span>{t("feature_1")}</span>
            </div>
            <div className="flex items-center space-x-2 dark:bg-[#23263a] dark:px-2 dark:py-1 dark:rounded-md">
              <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
              <span>{t("feature_2")}</span>
            </div>
            <div className="flex items-center space-x-2 dark:bg-[#23263a] dark:px-2 dark:py-1 dark:rounded-md">
              <Check className="w-4 h-4 text-green-500 dark:text-green-400" />
              <span>{t("feature_3")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
