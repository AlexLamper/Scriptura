"use client"

import { Button } from "../../components/ui/button"
import Link from "next/link"
import { useTranslation } from "../../app/i18n/client"
import { ModeToggle } from "../dark-mode-toggle"
import { LanguageSwitcher } from "../language-switcher"
import Image from "next/image"

interface HeroProps {
  params: {
    lng: string
  }
}

export function Hero({ params: { lng } }: HeroProps) {
  const { t } = useTranslation(lng, "landing-hero")

  return (
    <section className="bg-[#111828] pt-8 pb-24 text-white md:pt-12 md:pb-32 relative">

      <div className="lg:mt-0 mt-16">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center space-x-3 z-10">
          <LanguageSwitcher />
          <ModeToggle />
        </div>

        <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-8 max-lg:max-w-[90%]">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {t("title_1")} <span className="text-red-500">{t("title_2")}</span>
              </h1>
              <p className="text-xl text-gray-300">{t("description")}</p>
              <div className="flex flex-col space-y-3 pt-6 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  asChild
                  size="lg"
                  className="text-lg border font-semibold tracking-wide bg-gray-900 hover:bg-white hover:text-[#111827] dark:border-[#ffffff94] text-white dark:text-white dark:bg-[#1118279d] dark:hover:bg-[#ffffff34]"
                >
                  <Link href="#features">{t("read_more")}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-none text-lg font-semibold tracking-wide bg-red-500 hover:bg-[#ef4444e7] hover:text-white dark:border-none text-white dark:bg-red-500 dark:hover:text-white dark:hover:bg-[#ef4444e7]"
                >
                  <Link href={`/api/auth/signin`}>{t("sign_up")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center md:mt-0">
              <div className="relative h-[350px] w-full max-w-[600px] md:h-[400px] lg:h-[450px]">
                <Image
                  src="/en/images/hero-nobg1.png"
                  alt="Scriptura Dashboard Screenshot"
                  className="rounded-lg object-contain"
                  width={500}
                  height={400}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

