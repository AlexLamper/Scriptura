"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { ArrowRight, BookOpen, FileText, Globe, Cloud } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

export function UniqueFeaturesSection() {
  const { t } = useTranslation("unique-features")

  const features = [
    {
      icon: BookOpen,
      title: t("feature_1_title"),
      description: t("feature_1_description")
    },
    {
      icon: FileText,
      title: t("feature_2_title"),
      description: t("feature_2_description")
    },
    {
      icon: Globe,
      title: t("feature_3_title"),
      description: t("feature_3_description")
    },
    {
      icon: Cloud,
      title: t("feature_4_title"),
      description: t("feature_4_description")
    }
  ]

  return (
    <section className="relative bg-white dark:bg-[#181b23] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Title and Subtitle */}
          <div className="space-y-6 mb-12">
            <h2 className="font-['Merriweather'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#262626] dark:text-white">
              {t("title_part_1")}{" "}
              <span className="text-[#798777]">{t("title_part_2")}</span>{" "}
              {t("title_part_3")}
            </h2>

            {/* Subtitle */}
            <p className="font-['Inter'] text-lg font-normal text-[#262626] dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* Features Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 w-full">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-[#23263a] rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[200px]">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#798777] rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-['Inter'] text-lg font-semibold text-[#262626] dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#262626] dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link href="/api/auth/signin" className="hover:cursor-pointer">
              <Button 
                size="lg" 
                className="px-12 py-6 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-normal text-xl rounded-none"
              >
                {t("cta_button")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}