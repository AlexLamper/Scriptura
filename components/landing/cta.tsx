"use client"

import { Button } from "../../components/ui/button"
import Link from "next/link"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface CTAProps {
  params: {
    lng: string
  }
}

export function CTA({ params: { lng } }: CTAProps) {
  const { t } = useTranslation(lng, "cta")

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="text-3xl font-bold mb-4 dark:text-white" variants={itemVariants}>
          {t("ready_to_start")}
        </motion.h2>
        <motion.p className="mb-8 text-xl text-gray-600 dark:text-gray-400" variants={itemVariants}>
          {t("join_scriptura")}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg font-semibold tracking-wide bg-[#10172a] hover:bg-[#10172ae0] text-white hover:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
          >
            <Link href={`/api/auth/signin`}>{t("sign_up")}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

