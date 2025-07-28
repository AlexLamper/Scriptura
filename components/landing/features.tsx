"use client"

import { BookOpen, MessageCircle, Trophy, Search, Bookmark, Calendar, Star } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface FeaturesSectionProps {
  params: {
    lng: string
  }
}

export function FeaturesSection({ params: { lng } }: FeaturesSectionProps) {
  const { t } = useTranslation(lng, "features")

  const features = [
    {
      icon: BookOpen,
      title: t("feature_1_title"),
      description: t("feature_1_description"),
    },
    {
      icon: MessageCircle,
      title: t("feature_2_title"),
      description: t("feature_2_description"),
    },
    {
      icon: Trophy,
      title: t("feature_3_title"),
      description: t("feature_3_description"),
    },
    {
      icon: Search,
      title: t("feature_4_title"),
      description: t("feature_4_description"),
    },
    {
      icon: Bookmark,
      title: t("feature_5_title"),
      description: t("feature_5_description"),
    },
    {
      icon: Calendar,
      title: t("feature_6_title"),
      description: t("feature_6_description"),
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

  const { t: tTesti } = useTranslation(lng, "testimonials")
  const testimonials = [
    {
      content: tTesti("testimonial_1_content"),
      author: tTesti("testimonial_1_name"),
      role: tTesti("testimonial_1_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
    {
      content: tTesti("testimonial_2_content"),
      author: tTesti("testimonial_2_name"),
      role: tTesti("testimonial_2_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
    {
      content: tTesti("testimonial_3_content"),
      author: tTesti("testimonial_3_name"),
      role: tTesti("testimonial_3_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
  ]

  const testiContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }
  const testiItemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="features" className="py-24 pb-0 dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a] bg-[#f6f7ff]">
      <div className="container mx-auto px-6 lg:px-8 pb-16">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">{t("heading")}</h2>
          <p className="text-xl text-gray-600 dark:text-blue-200 dark:drop-shadow">{t("description")}</p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="text-center space-y-4 dark:bg-[#23263a] dark:rounded-xl dark:shadow-lg dark:shadow-gray-600/10 p-6"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-700/60 rounded-lg flex items-center justify-center mx-auto shadow dark:shadow-blue-900/20">
                <Icon className="w-8 h-8 text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-blue-100">{title}</h3>
              <p className="text-gray-600 dark:text-blue-200">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Testimonials merged below, no section break, same background */}
      <div className="w-full pt-24 pb-24 bg-white dark:bg-transparent" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={testiContainerVariants}
          >
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl"
              variants={testiItemVariants}
            >
              {tTesti("heading")}
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-blue-200 dark:drop-shadow"
              variants={testiItemVariants}
            >
              {tTesti("description")}
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={testiContainerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700/40 p-6 shadow-sm dark:bg-[#23263a] dark:shadow-lg dark:shadow-gray-600/10"
                variants={testiItemVariants}
              >
                <div className="mb-4 flex">
                  {Array(testimonial.stars)
                    .fill(null)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="mb-6 flex-1 text-gray-600 dark:text-blue-200">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-blue-100">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-blue-300">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
