
"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"
import Image from "next/image"

export function HeroSection() {
  const { t } = useTranslation("landing-hero")

  return (
    <section className="relative bg-white dark:bg-background overflow-hidden">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="min-h-screen flex flex-col">
          {/* Mobile Content Section */}
          <div className="flex-1 px-0 text-center flex flex-col justify-center py-16 space-y-8 lg:max-w-[70%] max-w-[95%] mx-auto">
            <div className="px-4">
              <h1 className="font-merriweather text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-[#262626] dark:text-foreground">{t("hero_title_part_1")}</span>
                <span className="text-brand dark:text-foreground">{t("hero_title_part_2")}</span>
                <span className="text-[#262626] dark:text-foreground">{t("hero_title_part_3")}</span>
              </h1>

              {/* Subtitle */}
              <p className="font-inter text-lg sm:text-xl font-normal text-gray-900 dark:text-muted-foreground leading-relaxed mt-6">
                {t("description")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 px-4">
              <Link href="/api/auth/signin" className="hover:cursor-pointer">
                <Button 
                  size="lg" 
                  className="w-full px-4 py-4 bg-brand hover:bg-brand/90 text-white dark:bg-[#e0e0e0] dark:text-black dark:hover:bg-[#d0d0d0] font-inter font-normal text-lg rounded-none"
                >
                  {t("primary_cta")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#about" scroll={true} className="hover:cursor-pointer">
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="w-full px-4 py-4 text-[#262626] dark:text-foreground hover:text-[#262626] dark:hover:text-foreground hover:bg-gray-100 dark:hover:bg-accent font-inter font-normal text-lg rounded-none border border-[#262626] dark:border-foreground"
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
                src={`/images/hero.png`}
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
          <h1 className="font-merriweather text-5xl xl:text-6xl font-bold leading-tight max-w-[80%]">
            <span className="text-[#262626] dark:text-foreground">{t("hero_title_part_1")}</span>
            <span className="text-brand dark:text-foreground">{t("hero_title_part_2")}</span>
            <span className="text-[#262626] dark:text-foreground">{t("hero_title_part_3")}</span>
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-xl font-normal text-gray-900 dark:text-muted-foreground leading-relaxed max-w-lg">
            {t("description")}
          </p>

          {/* Buttons */}
          <div className="flex flex-row gap-4 pt-4">
            <Link href="/api/auth/signin" className="hover:cursor-pointer">
              <Button 
                size="lg" 
                className="px-12 py-6 bg-brand hover:bg-brand/90 text-white dark:bg-[#e0e0e0] dark:text-black dark:hover:bg-[#d0d0d0] font-inter font-normal text-xl rounded-none"
              >
                {t("primary_cta")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link> 
            <Link href="#about" scroll={true} className="hover:cursor-pointer">
              <Button 
                size="lg" 
                variant="ghost" 
                className="px-12 py-6 text-[#262626] dark:text-foreground hover:text-[#262626] dark:hover:text-foreground hover:bg-gray-100 dark:hover:bg-accent font-inter font-normal text-xl rounded-none border border-[#262626] dark:border-foreground"
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
              src={`/images/hero.png`}
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
