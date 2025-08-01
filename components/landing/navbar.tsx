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
    <header className="border-b border-gray-100 dark:border-[#23263a] bg-white/80 dark:bg-gradient-to-b dark:from-[#181b23]/90 dark:to-[#23263a]/90 backdrop-blur-md sticky top-0 z-50 shadow-sm dark:shadow-blue-900/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 z-10">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/en/logo/scriptura.png"
                  alt="Scriptura"
                  width={32}
                  height={32}
                  className="rounded-md group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-blue-100 drop-shadow dark:drop-shadow-xl">
                Scriptura
              </span>
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
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/api/auth/signin" className="hover:cursor-pointer">
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg">
                  {t("signup")}
                </Button>
              </Link>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden dark:text-blue-200 dark:hover:bg-[#23263a] dark:hover:text-blue-400"
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
                <Link href="/api/auth/signin" className="hover:cursor-pointer">
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-400 dark:text-white dark:hover:from-blue-700 dark:hover:to-blue-500 dark:shadow-lg">
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
