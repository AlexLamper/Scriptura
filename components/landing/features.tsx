"use client"

import { Brain, FileText, Zap, BarChart } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"
import { useRef } from "react"

interface FeaturesSectionProps {
  params: {
    lng: string
  }
}

export default function FeaturesSection({ params: { lng } }: FeaturesSectionProps) {
  const { t } = useTranslation(lng, "features")
  const ref = useRef(null)

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <p className="text-sm font-semibold uppercase text-[#111828] dark:text-red-500">{t("subtitle")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl dark:text-white">{t("heading")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">{t("description")}</p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md dark:bg-gray-800"
              variants={itemVariants}
            >
              <div className="mb-4 rounded-lg bg-[#111828] p-3 text-white w-fit">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

