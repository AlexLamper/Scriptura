"use client"

import Image from "next/image"
import { Button } from "../components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "../app/i18n/client"

interface WhereToStartProps {
  params: {
    lng: string
  }
}

export default function WhereToStart({ params: { lng } }: WhereToStartProps) {

  const { t } = useTranslation(lng, "where-to-start")

  return (
    <div className="w-full mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">{t("not_sure_where_to_start")}</h2>
          <p className="text-lg text-gray-700">
            {t("learn_how_hebrew_bible_formed")}
          </p>
          <div className="group inline-block">
            <Button className="text-sm font-medium transition-all duration-300 group-hover:translate-y-[-2px] px-4 py-1.5 rounded-md bg-gray-900 text-white">
              {t("introduction_to_hebrew_bible")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <Image
              src="/en/images/start.png"
              alt="Where to start image"
              width={500}
              height={400}
              className="object-contain rounded-lg opacity-75"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
