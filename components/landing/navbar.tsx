"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { LanguageSwitcher } from "../language-switcher"
import { ModeToggle } from "../dark-mode-toggle"
import { useTranslation } from "../../app/i18n/client"

interface HeaderProps {
  params: {
    lng: string
  }
}

export function Header({ params: { lng } }: HeaderProps) {
  const { t } = useTranslation(lng, "landing-navbar")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-100/70 dark:border-[#23263a] bg-white/70 dark:bg-gradient-to-b dark:from-[#181b23]/90 dark:to-[#23263a]/90 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-blue-900/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 z-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-28 h-10 sm:w-32 sm:h-12">
                <Image
                  src="/en/images/logo-text.svg"
                  alt="Scriptura"
                  fill
                  className="object-contain rounded-md group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
          </div>

          {/* Centered nav */}
          <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t("about")}
            </Link>
            <Link href="#features" className="text-gray-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t("features")}
            </Link>
            <Link href="#testimonials" className="text-gray-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t("testimonials")}
            </Link>
            <Link href="#pricing" className="text-gray-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t("pricing")}
            </Link>
            <Link href="#faq" className="text-gray-600 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              {t("faq")}
            </Link>
          </nav>

          {/* Right controls */}
          <div className="flex items-center space-x-3 z-10">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Link href={`/${lng}/auth/signin`} className="hover:cursor-pointer">
                <Button size="sm" variant="dark" className="px-4 sm:px-6 text-xs sm:text-sm">
                  {t("signup")}
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden dark:text-blue-200 dark:hover:bg-[#23263a] dark:hover:text-blue-400 px-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-[#23263a] py-4 bg-white dark:bg-[#181b23]">
            <nav className="flex flex-col space-y-3">
              <Link href="#about" className="text-gray-600 dark:text-blue-200 dark:hover:text-blue-400">
                {t("about")}
              </Link>
              <Link href="#features" className="text-gray-600 dark:text-blue-200 dark:hover:text-blue-400">
                {t("features")}
              </Link>
              <Link href="#testimonials" className="text-gray-600 dark:text-blue-200 dark:hover:text-blue-400">
                {t("testimonials")}
              </Link>
              <Link href="#pricing" className="text-gray-600 dark:text-blue-200 dark:hover:text-blue-400">
                {t("pricing")}
              </Link>
              <Link href="#faq" className="text-gray-600 dark:text-blue-200 dark:hover:text-blue-400">
                {t("faq")}
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100 dark:border-[#23263a]">
                <Link href={`/${lng}/auth/signin`} className="hover:cursor-pointer">
                  <Button size="sm" variant="dark" className="px-6">
                    {t("login")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
