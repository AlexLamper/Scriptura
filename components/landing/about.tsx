"use client"

import { useTranslation } from "../../app/i18n/client"
import Image from "next/image"

interface AboutSectionProps {
  params: {
    lng: string
  }
}

export function AboutSection({ params: { lng } }: AboutSectionProps) {
  const { t } = useTranslation(lng, "about")

  const stats = [
    {
      label: t("stats_users"),
      value: t("stats_users_value")
    },
    {
      label: t("stats_courses"),
      value: t("stats_courses_value")
    },
    {
      label: t("stats_studies"),
      value: t("stats_studies_value")
    },
    {
      label: t("stats_satisfaction"),
      value: t("stats_satisfaction_value")
    }
  ]

  return (
    <section id="about" className="relative bg-white dark:bg-[#181b23] py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Title and Subtitle */}
          <div className="space-y-6 mb-16">
            <h2 className="font-['Merriweather'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#262626] dark:text-white">
              {t("heading")}
            </h2>
            <p className="font-['Inter'] text-lg sm:text-xl font-normal text-gray-900 dark:text-blue-200 leading-relaxed max-w-4xl mx-auto">
              {t("intro")}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 w-full max-w-4xl">
            {stats.map((stat, index) => (
              <div key={index} className="relative text-center">
                {/* Vertical divider line - hide on first item */}
                {index > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-gray-300 dark:bg-gray-600"></div>
                )}
                
                <div className="space-y-2">
                  <div className="font-['Merriweather'] text-3xl lg:text-4xl font-bold text-[#798777] dark:text-[#9aaa98]">
                    {stat.value}
                  </div>
                  <div className="font-['Inter'] text-sm lg:text-base text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Section */}
          <div className="w-full max-w-5xl mx-auto mb-16">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/50">
              <Image
                src={`/en/images/hero.png`}
                alt="Scripture study illustration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                quality={95}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
