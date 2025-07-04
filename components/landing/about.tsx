"use client"

import Image from "next/image"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { useTranslation } from "../../app/i18n/client"
import Link from "next/link"
import { motion } from "framer-motion"

interface AboutSectionProps {
  params: {
    lng: string
  }
}

export default function AboutSection({ params: { lng } }: AboutSectionProps) {
  const { t } = useTranslation(lng, "about")

  const textVariants = {
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  return (
    <section id="about" className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-8 flex justify-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="bg-[#111828] hover:bg-[#1c2538] dark:bg-red-500 dark:text-white dark:hover:bg-red-400">
            {t("badge")}
          </Badge>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight md:text-4xl dark:text-white"
              variants={itemVariants}
            >
              {t("heading")}
            </motion.h2>
            <motion.div className="space-y-4 text-gray-600 dark:text-gray-400" variants={itemVariants}>
              <p>{t("paragraph_1")}</p>
              <p>{t("paragraph_2")}</p>
              <p>{t("paragraph_3")}</p>
            </motion.div>
            <motion.div className="pt-4" variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="text-lg border font-semibold tracking-wide bg-[#10172a] hover:bg-[#10172ae0] text-white hover:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:text-white"
              >
                <Link href={`/api/auth/signin`}>{t("button_text")}</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative h-[300px] w-full max-w-[500px] md:h-[350px]">
              <Image
                src="/en/images/hero-nobg1.png"
                alt="Scriptura App Screenshot"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </motion.div>
        </div>
{/* 
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm font-medium dark:text-gray-300">Product Hunt</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm font-medium dark:text-gray-300">TechCrunch</span>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}

