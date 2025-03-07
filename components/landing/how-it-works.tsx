"use client"

import { Button } from "../../components/ui/button"
import { useTranslation } from "../../app/i18n/client"
import { Search, FileText, Send, CheckCircle } from "lucide-react"

interface HowItWorksProps {
  params: {
    lng: string
  }
}

export function HowItWorks({ params: { lng } }: HowItWorksProps) {
  const { t } = useTranslation(lng, "how-it-works")

  const steps = [
    {
      title: t("step_1_title"),
      description: t("step_1_description"),
      icon: Search,
    },
    {
      title: t("step_2_title"),
      description: t("step_2_description"),
      icon: FileText,
    },
    {
      title: t("step_3_title"),
      description: t("step_3_description"),
      icon: Send,
    },
    {
      title: t("step_4_title"),
      description: t("step_4_description"),
      icon: CheckCircle,
    },
  ]

  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">{t("heading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
                  <step.icon size={40} />
                </div>
                <div className="absolute top-0 right-0 bg-gray-900 dark:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full transition-colors duration-300"
          >
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  )
}

