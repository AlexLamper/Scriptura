"use client"

import { useTranslation } from "../../app/i18n/client"
import { Button } from "../../components/ui/button"
import { motion } from "framer-motion"

export function CTASection() {
  const { t } = useTranslation("cta")

  return (
    <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a] border-gray-200 dark:border-[#23263a]">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">{t("title")}</h2>
          <p className="text-gray-600 dark:text-blue-200 dark:drop-shadow">{t("subtitle")}</p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg">
            {t("buttonText")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
