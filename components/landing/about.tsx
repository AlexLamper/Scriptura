"use client"

import Image from "next/image"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { useTranslation } from "../../app/i18n/client"

interface AboutSectionProps {
  params: {
    lng: string
  }
}

export default function AboutSection({ params: { lng } }: AboutSectionProps) {
  const { t } = useTranslation(lng, "about")

  return (
    <section id="about" className="bg-gray-100 dark:bg-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex justify-start">
          <Badge className="bg-[#111828] hover:bg-[#1c2538]">New</Badge>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl dark:text-white">
              {t("heading")}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                At StudyBug, we believe that everyone deserves access to the best learning tools and techniques to reach their full potential.
              </p>
              <p>
                Our mission is to democratize education by providing AI-powered tools that adapt to each student&apos;s unique learning style.
              </p>
              <p>
                Since founding StudyBug in 2022, we&apos;ve helped over 100,000 students improve their grades and study more efficiently.
              </p>
            </div>
            <div className="pt-4">
              <Button className="bg-[#111828] hover:bg-[#1c2538]">
                Try StudyBug for Free
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full max-w-[500px] md:h-[350px]">
              <Image
                src="/en/images/hero-nobg1.png"
                alt="StudyBug App Screenshot"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm font-medium dark:text-gray-300">Product Hunt</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm font-medium dark:text-gray-300">TechCrunch</span>
          </div>
        </div>
      </div>
    </section>
  )
}
