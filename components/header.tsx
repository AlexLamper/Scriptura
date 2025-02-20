// "use client"

// import { useEffect, useState } from "react"
// import { useSession, signOut } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
// import { Menu, LogOut } from "lucide-react"
// import { Button } from "./ui/button"
// import { useTranslation } from "../app/i18n/client"

// interface HeaderProps {
//   params: {
//     lng: string
//   }
// }

// export function Header({ params: { lng } }: HeaderProps) {
//   const { t } = useTranslation(lng, "header")
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/api/auth/signin")
//     }
//   }, [status, router])

//   if (status === "loading") {
//     return <div>{t("loading")}</div>
//   }

//   if (!session) {
//     return null
//   }

//   return (
//     <header className="mb-8">
//       <div className="flex items-center justify-between">
//       <span className="hidden sm:inline">
//         <div className="flex items-center gap-4">
//           <div className="hidden md:flex items-center gap-4">
//             <Avatar>
//               <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
//               <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
//             </Avatar>
//             <div className="text-sm hidden lg:block">
//               <p className="font-medium">{session.user?.name}</p>
//               <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => signOut({ callbackUrl: `/${lng}` })}
//               aria-label={t("sign_out")}
//             >
//               <LogOut className="h-5 w-5" />
//             </Button>
//           </div>
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             <Menu className="h-6 w-6" />
//           </Button>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className="mt-4 md:hidden">
//           <div className="flex items-center gap-4">
//             <Avatar>
//               <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
//               <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
//             </Avatar>
//             <div className="text-sm">
//               <p className="font-medium">{session.user?.name}</p>
//               <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => signOut({ callbackUrl: `/${lng}` })}
//               aria-label={t("sign_out")}
//             >
//               <LogOut className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { LogOut, Sun, Moon, Globe } from "lucide-react"
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
  const [isProfileOpen] = useState(false)
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
    <header>
      <div className="flex items-center justify-end space-x-4">
        <SidebarTrigger />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Switch language">
          <Globe className="h-5 w-5" />
        </Button>
        <div className="relative">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: `/${lng}` })}
              aria-label={t("sign_out")}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
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


