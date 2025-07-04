"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { useTranslation } from "../../app/i18n/client"

interface FooterProps {
  params: {
    lng: string
  }
}

export function Footer({ params: { lng } }: FooterProps) {
  const { t } = useTranslation(lng, "footer")

  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("about_scriptura")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lng}/courses`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("our_courses")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/community`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("community")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/pricing`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lng}/resources`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("resources")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/quizzes`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("quizzes")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/courses`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("courses")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lng}/privacy-policy`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/terms-of-service`}
                  className="text-gray-400 hover:text-white"
                >
                  {t("terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t("connect")}</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 border-gray-700 text-center">
          <p className="text-gray-600 text-gray-400">
            &copy; {new Date().getFullYear()} Scriptura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}