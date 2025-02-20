"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { LogOut, Sun, Moon, Globe, ChevronDown, User, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslation } from "../app/i18n/client"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarTrigger } from "../components/ui/sidebar"

interface HeaderProps {
  params: {
    lng: string
  }
}

export function Header({ params: { lng } }: HeaderProps) {
  const { t } = useTranslation(lng, "header")
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Implement your dark mode logic here
  }

  const toggleLanguage = () => {
    // Implement your language switch logic here
  }

  return (
    <header className="flex items-center justify-between">
      <SidebarTrigger />
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          aria-label="Switch language"
          className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Globe className="h-5 w-5" />
        </Button>
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="text-sm text-left">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
            </div>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => router.push(`/profile`)}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t("profile")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => router.push(`/settings`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t("settings")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => signOut({ callbackUrl: `/${lng}` })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("sign_out")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

