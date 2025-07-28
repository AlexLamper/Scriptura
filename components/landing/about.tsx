"use client"

import { BookOpen, Users, Trophy } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface AboutSectionProps {
  params: {
    lng: string
  }
}

export function AboutSection({ params: { lng } }: AboutSectionProps) {
  const { t } = useTranslation(lng, "about")

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-24 bg-white dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center space-y-4 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl"
              variants={itemVariants}
            >
              {t("heading")}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-blue-200 max-w-3xl mx-auto dark:drop-shadow"
              variants={itemVariants}
            >
              {t("intro")}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Item 1 */}
            <motion.div className="text-center space-y-4 dark:bg-[#23263a] dark:rounded-xl dark:shadow-lg dark:shadow-gray-600/10 p-6" variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-700/60 rounded-full flex items-center justify-center mx-auto shadow dark:shadow-blue-900/20">
                <BookOpen className="w-8 h-8 text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-blue-100">
                {t("feature_1_title")}
              </h3>
              <p className="text-gray-600 dark:text-blue-200">{t("feature_1_text")}</p>
            </motion.div>

            {/* Item 2 */}
            <motion.div className="text-center space-y-4 dark:bg-[#23263a] dark:rounded-xl dark:shadow-lg dark:shadow-gray-600/10 p-6" variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-700/60 rounded-full flex items-center justify-center mx-auto shadow dark:shadow-blue-900/20">
                <Users className="w-8 h-8 text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-blue-100">
                {t("feature_2_title")}
              </h3>
              <p className="text-gray-600 dark:text-blue-200">{t("feature_2_text")}</p>
            </motion.div>

            {/* Item 3 */}
            <motion.div className="text-center space-y-4 dark:bg-[#23263a] dark:rounded-xl dark:shadow-lg dark:shadow-gray-600/10 p-6" variants={itemVariants}>
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-700/60 rounded-full flex items-center justify-center mx-auto shadow dark:shadow-blue-900/20">
                <Trophy className="w-8 h-8 text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-blue-100">
                {t("feature_3_title")}
              </h3>
              <p className="text-gray-600 dark:text-blue-200">{t("feature_3_text")}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
