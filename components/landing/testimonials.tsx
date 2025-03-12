"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import { motion } from "framer-motion"

interface TestimonialsSectionProps {
  params: {
    lng: string
  }
}

export default function TestimonialsSection({ params: { lng } }: TestimonialsSectionProps) {
  const { t } = useTranslation(lng, "testimonials")

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
    <section className="py-16 md:py-24 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl dark:text-white">{t("heading")}</h2>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:bg-gray-800"
              variants={itemVariants}
            >
              <div className="mb-4 flex">
                {Array(testimonial.stars)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
              </div>
              <p className="mb-4 flex-1 text-gray-600 dark:text-gray-300">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium dark:text-white">{testimonial.author}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

