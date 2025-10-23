"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Check, Languages } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { cookieName } from "../app/i18n/settings"

const languages = [
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "de", name: "Deutsch" },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  // Get current language from path
  const getCurrentLanguage = () => {
    if (!pathname) return "en"
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    return languages.some((lang) => lang.code === langFromPath) ? langFromPath : "en"
  }

  // Function to switch language with proper cookie handling
  const switchLanguage = (newLanguage: string) => {
    const currentLang = getCurrentLanguage()

    // Don't do anything if clicking the current language
    if (newLanguage === currentLang) return

    // Extract the path without the language prefix
    const pathSegments = pathname.split("/").filter(Boolean)
    const pathWithoutLang = pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : "/"

    // Construct the new path with the selected language
    const newPath = `/${newLanguage}${pathWithoutLang}`

    // Set the cookie to remember the user's language preference
    // This ensures the middleware will use this language for future visits
    document.cookie = `${cookieName}=${newLanguage}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    // Navigate to the new path
    router.push(newPath)
  }

  const currentLang = getCurrentLanguage()
  const currentLanguageName = languages.find((lang) => lang.code === currentLang)?.name || "English"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="transparent"
          size="sm"
          className="gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-sm"
        >
          <Languages className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline sm:inline">{currentLanguageName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-primary/20">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="flex items-center gap-2"
          >
            {currentLang === lang.code && <Check className="h-4 w-4" />}
            <span className={currentLang === lang.code ? "font-medium" : ""}>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
