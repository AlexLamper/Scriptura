"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const { t } = useTranslation("testimonials")

  const testimonials = [
    {
      content: t("testimonial_1_content"),
      author: t("testimonial_1_name"),
      role: t("testimonial_1_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
    {
      content: t("testimonial_2_content"),
      author: t("testimonial_2_name"),
      role: t("testimonial_2_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
    {
      content: t("testimonial_3_content"),
      author: t("testimonial_3_name"),
      role: t("testimonial_3_role"),
      avatar: "/placeholder.svg?height=48&width=48",
      stars: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
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
    <section id="testimonials" className="py-24 bg-white dark:bg-gradient-to-b dark:from-[#181b23] dark:to-[#23263a]">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl"
            variants={itemVariants}
          >
            {t("heading")}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-blue-200 dark:drop-shadow"
            variants={itemVariants}
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700/40 p-6 shadow-sm dark:bg-[#23263a] dark:shadow-lg dark:shadow-gray-600/10"
              variants={itemVariants}
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
                    fill
                    className="object-cover"
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
    </section>
  )
}
