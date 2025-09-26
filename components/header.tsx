"use client"

import { useEffect, useState, useRef } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LogOut, User, Settings, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarTrigger } from "../components/ui/sidebar"
import { ModeToggle } from "./dark-mode-toggle"
import { LanguageSwitcher } from "./language-switcher"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"


interface HeaderProps {
  params: {
    lng: string
  }
  title?: string;
}

export function Header({ params: { lng }, title }: HeaderProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch user image (only once per session)
  useEffect(() => {
    if (!mounted || !session?.user?.email || userImage) return

    fetch("/api/user")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        return response.json()
      })
      .then((data) => {
        if (data.user && data.user.image) {
          setUserImage(data.user.image)
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error)
      })
  }, [session?.user?.email, mounted])

  // Handle authentication redirect
  useEffect(() => {
    if (mounted && status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router, mounted])

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!mounted) return

    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mounted])

  if (!mounted || status === "loading") {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Simple translation function to avoid i18n issues
  const translate = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        profile: "Profile",
        settings: "Settings",
        sign_out: "Sign Out",
      },
      nl: {
        profile: "Profiel",
        settings: "Instellingen",
        sign_out: "Uitloggen",
      },
      de: {
        profile: "Profil",
        settings: "Einstellungen",
        sign_out: "Abmelden",
      },
    }

    return translations[lng]?.[key] || key
  }

  // Page title translation
  const pageTitles: Record<string, Record<string, string>> = {
    en: {
      dashboard: "Dashboard",
      study: "Study",
    },
    nl: {
      dashboard: "Dashboard",
      study: "Bijbelstudie",
    },
    de: {
      dashboard: "Dashboard",
      study: "Bibelstudium",
    },
  };
  // Fix: always use lowercase for translation keys, but fallback to title if not found
  let pageTitle = pageTitles[lng]?.dashboard || "Dashboard";
  if (title) {
    const key = title.toLowerCase();
    if (pageTitles[lng] && pageTitles[lng][key]) {
      pageTitle = pageTitles[lng][key];
    } else {
      pageTitle = title;
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b dark:border-b-[#91969e52] bg-white dark:bg-[#181b23] shadow-sm sticky top-0 z-50">
      {/* Left Side: Sidebar Trigger + Logo */}
      <div className="flex items-center space-x-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{pageTitle}</h1>
      </div>

      {/* Right Side: Desktop Controls */}
      <div className="hidden md:flex items-center space-x-4">
        <LanguageSwitcher />
        <ModeToggle />
        <div className="relative" ref={profileRef}>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-[#2d2d30] transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 rounded-full">
              <AvatarImage
                src={userImage || session.user?.image || ""}
                alt={session.user?.name || "User"}
                className="object-cover aspect-square"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {session.user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm text-left">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
            </div>
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
                  {translate("Profile")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                  onClick={() => router.push(`/settings`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {translate("Settings")}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                  onClick={() => signOut({ callbackUrl: `/${lng}` })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {translate("Sign Out")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden relative" ref={menuRef}>
        <Button
          variant="ghost"
          className="p-2 hover:bg-gray-100 dark:hover:bg-[#2d2d30] rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2d2d30] rounded-md shadow-lg py-2 z-10"
            >
              {/* Language Switcher */}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>

              {/* Dark Mode Toggle */}
              <div className="px-4 py-2">
                <ModeToggle />
              </div>

              {/* Profile & Logout */}
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                onClick={() => router.push(`/profile`)}
              >
                <User className="h-4 w-4 mr-2" />
                {translate("profile")}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#3b3b3f]"
                onClick={() => signOut({ callbackUrl: `/${lng}` })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {translate("sign_out")}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
