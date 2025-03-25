"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { languages } from "../app/i18n/settings"
import { Check, Globe } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

const languageNames: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
}

export function LanguageSwitcher() {
  const pathname = usePathname()
  const [currentLanguage, setCurrentLanguage] = useState<string>("")

  // Extract current language from pathname
  const updateLanguage = useCallback(() => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]

    if (languages.includes(langFromPath)) {
      setCurrentLanguage(langFromPath)
    } else {
      setCurrentLanguage("en") // Default to English if no valid language is found
    }
  }, [pathname])

  useEffect(() => {
    updateLanguage()
  }, [updateLanguage])

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

  // Don't render anything until we have determined the current language
  if (!currentLanguage) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/20 bg-background/20 hover:bg-gray-100 hover:text-black backdrop-blur-sm"
        >
          <Globe className="h-4 w-4" />
          <span>{languageNames[currentLanguage] || "Language"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-primary/20">
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

