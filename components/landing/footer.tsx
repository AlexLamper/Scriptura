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
    <footer className="bg-[#262626] dark:bg-[#0d0f17] py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* About Scriptura */}
          <div className="space-y-4">
            <h3 className="font-['Inter'] text-lg font-semibold text-white mb-6">
              {t("about_scriptura")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lng}/courses`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("our_courses")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/pricing`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-['Inter'] text-lg font-semibold text-white mb-6">
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lng}/resources`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("resources")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/quizzes`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("quizzes")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/courses`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("courses")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-['Inter'] text-lg font-semibold text-white mb-6">
              {t("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lng}/privacy-policy`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lng}/terms-of-service`}
                  className="font-['Inter'] text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {t("terms_of_service")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect/Social */}
          <div className="space-y-4">
            <h3 className="font-['Inter'] text-lg font-semibold text-white mb-6">
              {t("connect")}
            </h3>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="w-10 h-10 bg-[#798777] hover:bg-[#6a7a68] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 bg-[#798777] hover:bg-[#6a7a68] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 bg-[#798777] hover:bg-[#6a7a68] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 bg-[#798777] hover:bg-[#6a7a68] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-600 text-center">
          <p className="font-['Inter'] text-gray-400">
            &copy; {new Date().getFullYear()} Scriptura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}