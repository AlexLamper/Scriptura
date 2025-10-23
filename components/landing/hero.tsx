
"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import Image from "next/image"

interface HeroSectionProps {
  params: {
    lng: string
  }
}

export function HeroSection({ params: { lng } }: HeroSectionProps) {
  const { t } = useTranslation(lng, "landing-hero")

  return (
    <section className="relative bg-white dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23] overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Content Section */}
          <div className="flex-1 px-0 text-center flex flex-col justify-center py-16 space-y-8 lg:max-w-[70%] max-w-[95%] mx-auto">
            <div className="px-4">
              <h1 className="font-['Merriweather'] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-[#262626] dark:text-white">{t("hero_title_part_1")}</span>
                <span className="text-[#798777]">{t("hero_title_part_2")}</span>
                <span className="text-[#262626] dark:text-white">{t("hero_title_part_3")}</span>
              </h1>

              {/* Subtitle */}
              <p className="font-['Inter'] text-lg sm:text-xl font-normal text-gray-900 dark:text-blue-200 leading-relaxed mt-6">
                {t("description")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 px-4">
              <Link href="/api/auth/signin" className="hover:cursor-pointer">
                <Button 
                  size="lg" 
                  className="w-full px-4 py-4 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-normal text-lg rounded-none"
                >
                  {t("primary_cta")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#about" scroll={true} className="hover:cursor-pointer">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="w-full px-4 py-4 text-[#262626] dark:text-gray-300 hover:text-[#262626] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-['Inter'] font-normal text-lg rounded-none border border-[#262626] dark:border-gray-300"
                >
                  {t("secondary_cta")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Image Section */}
          <div className="h-64 sm:h-80">
            <div className="relative w-full h-full">
              <Image
                src={`/en/images/hero.png`}
                alt="Scripture study illustration"
                fill
                className="object-cover opacity-90"
                sizes="100vw"
                quality={95}
                priority={true}
                unoptimized={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row lg:min-h-[700px]">
        {/* Desktop Content Section - 50% width */}
        <div className="w-1/2 px-8 xl:px-16 text-left space-y-6 flex flex-col justify-center py-24 ml-12 xl:ml-24">
          <h1 className="font-['Merriweather'] text-5xl xl:text-6xl font-bold leading-tight max-w-[80%]">
            <span className="text-[#262626] dark:text-white">{t("hero_title_part_1")}</span>
            <span className="text-[#798777]">{t("hero_title_part_2")}</span>
            <span className="text-[#262626] dark:text-white">{t("hero_title_part_3")}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-['Inter'] text-xl font-normal text-gray-900 dark:text-blue-200 leading-relaxed max-w-lg">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-4 pt-4">
            <Link href="/api/auth/signin" className="hover:cursor-pointer">
              <Button 
                size="lg" 
                className="px-12 py-6 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-normal text-xl rounded-none"
              >
                {t("primary_cta")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#about" scroll={true} className="hover:cursor-pointer">
              <Button 
                size="lg" 
                variant="ghost" 
                className="px-12 py-6 text-[#262626] dark:text-gray-300 hover:text-[#262626] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-['Inter'] font-normal text-xl rounded-none border border-[#262626] dark:border-gray-300"
              >
                {t("secondary_cta")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Image Section - 50% width */}
        <div className="w-1/2 h-auto">
          <div className="relative w-full h-full min-h-[700px]">
            <Image
              src={`/en/images/hero.png`}
              alt="Scripture study illustration"
              fill
              className="object-cover opacity-90"
              sizes="50vw"
              quality={95}
              priority={true}
              unoptimized={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
