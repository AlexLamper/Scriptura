"use client"

import { usePathname } from "next/navigation"
import { Button } from "../components/ui/button"
import { Check, Languages } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

const languages = [
  { code: "en", name: "English" },
  { code: "nl", name: "Nederlands" },
  { code: "de", name: "Deutsch" },
]

export function LanguageSwitcher() {
  const pathname = usePathname()

  // Simple function to get current language from path
  const getCurrentLanguage = () => {
    if (!pathname) return "en"
    const pathSegments = pathname.split("/").filter(Boolean)
    const langFromPath = pathSegments[0]
    return languages.some((lang) => lang.code === langFromPath) ? langFromPath : "en"
  }

  // Simple function to switch language
  const switchLanguage = (newLanguage: string) => {
    const currentLang = getCurrentLanguage()

    // Don't do anything if clicking the current language
    if (newLanguage === currentLang) return

    // Extract the path without the language prefix
    const pathSegments = pathname.split("/").filter(Boolean)
    const pathWithoutLang = pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : "/"

    // Construct the new path with the selected language
    const newPath = `/${newLanguage}${pathWithoutLang}`

    // Navigate with a small delay to prevent any race conditions
    setTimeout(() => {
      window.location.href = newPath
    }, 50)
  }

  const currentLang = getCurrentLanguage()
  const currentLanguageName = languages.find((lang) => lang.code === currentLang)?.name || "English"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/20 bg-background/20 hover:bg-gray-100 hover:text-black backdrop-blur-sm"
        >
          <Languages className="h-4 w-4" />
          <span>{currentLanguageName}</span>
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
