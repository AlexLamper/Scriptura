"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { languages } from "../app/i18n/settings"
import { Check, Globe } from "lucide-react"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

const languageNames: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
}

export function LanguageSwitcher() {
  // const router = useRouter()
  const pathname = usePathname()
  const [currentLanguage, setCurrentLanguage] = useState<string>("en")

  // Extract current language from pathname
  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]

    if (languages.includes(langFromPath)) {
      setCurrentLanguage(langFromPath)
    }
  }, [pathname])

  // Switch language while preserving the current path
  const switchLanguage = (newLanguage: string) => {
    if (newLanguage === currentLanguage) return

    // Extract the path without the language prefix
    const pathSegments = pathname.split("/").filter(Boolean)
    const pathWithoutLang = pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : "/"

    // Construct the new path with the selected language
    const newPath = `/${newLanguage}${pathWithoutLang}`

    // Use window.location.href to force a full page refresh
    window.location.href = newPath
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{languageNames[currentLanguage] || "Language"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang} onClick={() => switchLanguage(lang)} className="flex items-center gap-2">
            {currentLanguage === lang && <Check className="h-4 w-4" />}
            <span className={currentLanguage === lang ? "font-medium" : ""}>{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

