"use client"

import { useEffect, useState, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { LogOut, ChevronDown, User, Settings } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslation } from "../app/i18n/client"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarTrigger } from "../components/ui/sidebar"
import { ModeToggle } from "./dark-mode-toggle"
import { LanguageSwitcher } from "./language-switcher"

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
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

  return (
    <header className="flex items-center justify-between">
      <SidebarTrigger />
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ModeToggle />
        <div className="relative" ref={containerRef}>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-[#2d2d30] transition-colors"
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
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2d2d30] rounded-md shadow-lg py-1 z-10"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                  onClick={() => router.push(`/profile`)}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t("profile")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                  onClick={() => router.push(`/settings`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t("settings")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
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
