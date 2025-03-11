"use client"

import { Brain, FileText, Zap, BarChart } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface FeaturesSectionProps {
  params: {
    lng: string
  }
}

export default function FeaturesSection({ params: { lng } }: FeaturesSectionProps) {
  const { t } = useTranslation(lng, "features")

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t("feature_1_title"),
      description: t("feature_1_description"),
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: t("feature_2_title"),
      description: t("feature_2_description"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("feature_3_title"),
      description: t("feature_3_description"),
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: t("feature_4_title"),
      description: t("feature_4_description"),
    },
  ]

  return (
    <section className="py-16 md:py-24 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase text-[#111828] dark:text-gray-300">{t("subtitle")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl dark:text-white">{t("heading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">{t("description")}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md dark:bg-gray-800"
            >
              <div className="mb-4 rounded-lg bg-[#111828] p-3 text-white w-fit">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

