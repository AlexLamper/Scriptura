"use client"

import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Check, Languages } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { cookieName } from "../app/i18n/settings"
import { useTranslation } from "../app/i18n/client"

const languages = [
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "de", name: "Deutsch" },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const { i18n } = useTranslation("common")
  const currentLang = i18n.resolvedLanguage || "en"

  // Function to switch language with proper cookie handling
  const switchLanguage = (newLanguage: string) => {
    if (newLanguage === currentLang) return

    // Set the cookie to remember the user's language preference
    document.cookie = `${cookieName}=${newLanguage}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    // Change language in i18next
    i18n.changeLanguage(newLanguage)
    
    // Refresh the page to apply changes on server components
    router.refresh()
  }

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
