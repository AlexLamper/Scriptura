"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslation } from "../../app/i18n/client"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { cn } from "../../lib/utils"
import { useRouter } from "next/navigation"

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
]

const BIBLE_VERSIONS = [
  { code: "ESV", label: "English Standard Version (ESV)" },
  { code: "NIV", label: "New International Version (NIV)" },
  { code: "KJV", label: "King James Version (KJV)" },
  { code: "NBV21", label: "Nieuwe Bijbelvertaling 21 (NBV21)" },
  { code: "HSV", label: "Herziene Statenvertaling (HSV)" },
  { code: "LUT", label: "Lutherbibel 2017 (LUT)" },
]

const THEMES = [
  { code: "light", label: "theme_light" },
  { code: "dark", label: "theme_dark" },
  { code: "system", label: "theme_system" },
]

export function OnboardingModal({ isOpen: initialIsOpen, onClose, onComplete }: OnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen)
  const [step, setStep] = useState(1)
  const { t, i18n } = useTranslation("onboarding")
  const { setTheme } = useTheme()
  const router = useRouter()

  const [preferences, setPreferences] = useState({
    language: "en",
    translation: "ESV",
    intent: "light", // intent maps to theme
  })

  useEffect(() => {
    setIsOpen(initialIsOpen)
  }, [initialIsOpen])

  // Auto-detect language
  useEffect(() => {
    if (i18n.resolvedLanguage && ["en", "nl", "de"].includes(i18n.resolvedLanguage)) {
      setPreferences(prev => ({ ...prev, language: i18n.resolvedLanguage }))
    }
  }, [i18n.resolvedLanguage])

  const handleClose = async () => {
    // Save defaults/current selection
    await savePreferences()
    setIsOpen(false)
    onClose()
  }

  const savePreferences = async () => {
    try {
      await fetch("/api/user/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...preferences,
          onboardingCompleted: true,
        }),
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to save preferences", error)
    }
  }

  const handleLanguageSelect = (lang: string) => {
    setPreferences(prev => ({ ...prev, language: lang }))
    i18n.changeLanguage(lang)
    // Move to next step after short delay or immediately? 
    // User might want to confirm. But requirement says "When the user clicks on a language option, the language get's updated".
    // Let's just update state.
  }

  const handleTranslationSelect = (version: string) => {
    setPreferences(prev => ({ ...prev, translation: version }))
  }

  const handleThemeSelect = (mode: string) => {
    setPreferences(prev => ({ ...prev, intent: mode }))
    setTheme(mode)
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      savePreferences()
      setIsOpen(false)
      onComplete()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl min-h-[600px] p-0 overflow-hidden gap-0 flex flex-col">
        <div className="p-8 pt-12 flex-1 flex flex-col">
          <DialogHeader className="mb-8">
            <div className="text-center text-sm font-medium text-muted-foreground mb-2">
              {t("step_indicator", { current: step, total: 3 })}
            </div>
            <DialogTitle className="text-3xl font-bold text-center">
              {step === 1 && t("select_language")}
              {step === 2 && t("choose_bible_version")}
              {step === 3 && t("appearance")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {step === 1 && (
              <div className="flex flex-col gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={cn(
                      "flex items-center justify-between p-4 border-2 rounded-lg transition-all hover:border-primary/50",
                      preferences.language === lang.code
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50"
                    )}
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <span className="text-xl">{lang.flag}</span>
                      {lang.label}
                    </span>
                    {preferences.language === lang.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 min-h-[300px]">
                {BIBLE_VERSIONS.map((version) => (
                  <button
                    key={version.code}
                    onClick={() => handleTranslationSelect(version.code)}
                    className={cn(
                      "flex items-center justify-between p-4 border-2 rounded-lg transition-all hover:border-primary/50",
                      preferences.translation === version.code
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50"
                    )}
                  >
                    <span className="font-medium text-left">{version.label}</span>
                    {preferences.translation === version.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-3">
                {THEMES.map((tItem) => (
                  <button
                    key={tItem.code}
                    onClick={() => handleThemeSelect(tItem.code)}
                    className={cn(
                      "flex items-center justify-between p-4 border-2 rounded-lg transition-all hover:border-primary/50",
                      preferences.intent === tItem.code
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/50"
                    )}
                  >
                    <span className="font-medium capitalize">{t(tItem.label)}</span>
                    {preferences.intent === tItem.code && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={nextStep}
              className="w-full sm:w-auto"
            >
              {step === 3 ? t("get_started") : t("next")}
            </Button>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="flex h-1 w-full bg-secondary">
          <div 
            className="bg-[#798777] transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }} 
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
