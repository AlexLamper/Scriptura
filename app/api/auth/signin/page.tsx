"use client"

import { useState, useEffect } from "react"
import { getProviders, type ClientSafeProvider, signIn } from "next-auth/react"
import { Button } from "../../../../components/ui/button"
import { Info, Loader2, Languages, ArrowLeft } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { ModeToggle } from "../../../../components/dark-mode-toggle"

// Language translations
const translations = {
  en: {
    title: "Sign In",
    titleAccent: "Now",
    subtitle: "Please sign in to continue to your account.",
    backButton: "Back to Home",
    infoTitle: "Sign In Information",
    infoDescription:
      "This is the sign-in page where you can log in using various authentication providers. Choose a provider to sign in and access your account.",
    infoSecure: "Secure Authentication",
    infoSecureDesc: "We use industry-standard OAuth protocols to ensure your data remains secure.",
    infoProviders: "Multiple Providers",
    infoProvidersDesc: "Choose your preferred authentication method from our supported providers.",
    infoAccount: "Account Linking",
    infoAccountDesc: "You can link multiple authentication methods to your account in settings.",
    signInWith: "Sign in with",
    signingIn: "Signing in...",
    termsText: "By signing in, you agree to our",
    termsService: "Terms of Service",
    and: "and",
    privacyPolicy: "Privacy Policy",
    languageEn: "English",
    languageNl: "Dutch",
    languageDe: "German",
  },
  nl: {
    title: "Nu",
    titleAccent: "Inloggen",
    subtitle: "Log in om door te gaan naar je account.",
    backButton: "Terug naar Home",
    infoTitle: "Inlog Informatie",
    infoDescription:
      "Dit is de inlogpagina waar je kunt inloggen met verschillende authenticatieproviders. Kies een provider om in te loggen en toegang te krijgen tot je account.",
    infoSecure: "Veilige Authenticatie",
    infoSecureDesc:
      "We gebruiken OAuth-protocollen van industriestandaard om ervoor te zorgen dat je gegevens veilig blijven.",
    infoProviders: "Meerdere Providers",
    infoProvidersDesc: "Kies je gewenste authenticatiemethode uit onze ondersteunde providers.",
    infoAccount: "Account Koppeling",
    infoAccountDesc: "Je kunt meerdere authenticatiemethoden aan je account koppelen in de instellingen.",
    signInWith: "Inloggen met",
    signingIn: "Inloggen...",
    termsText: "Door in te loggen ga je akkoord met onze",
    termsService: "Servicevoorwaarden",
    and: "en",
    privacyPolicy: "Privacybeleid",
    languageEn: "Engels",
    languageNl: "Nederlands",
    languageDe: "Duits",
  },
  de: {
    title: "Anmelden",
    titleAccent: "Jetzt",
    subtitle: "Bitte melden Sie sich an, um auf Ihr Konto zuzugreifen.",
    backButton: "Zurück zur Startseite",
    infoTitle: "Anmeldeinformationen",
    infoDescription:
      "Dies ist die Anmeldeseite, auf der Sie sich mit verschiedenen Authentifizierungsanbietern anmelden können. Wählen Sie einen Anbieter, um sich anzumelden und auf Ihr Konto zuzugreifen.",
    infoSecure: "Sichere Authentifizierung",
    infoSecureDesc:
      "Wir verwenden branchenübliche OAuth-Protokolle, um sicherzustellen, dass Ihre Daten sicher bleiben.",
    infoProviders: "Mehrere Anbieter",
    infoProvidersDesc: "Wählen Sie Ihre bevorzugte Authentifizierungsmethode aus unseren unterstützten Anbietern.",
    infoAccount: "Kontoverknüpfung",
    infoAccountDesc: "Sie können mehrere Authentifizierungsmethoden in den Einstellungen mit Ihrem Konto verknüpfen.",
    signInWith: "Anmelden mit",
    signingIn: "Anmeldung...",
    termsText: "Durch die Anmeldung stimmen Sie unseren",
    termsService: "Nutzungsbedingungen",
    and: "und",
    privacyPolicy: "Datenschutzrichtlinie",
    languageEn: "Englisch",
    languageNl: "Niederländisch",
    languageDe: "Deutsch",
  },
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [language, setLanguage] = useState<"en" | "nl" | "de">("en")
  const t = translations[language]

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true)
    setLoadingProvider(providerId)
    await signIn(providerId, { callbackUrl: "/" })
    // Note: The page will redirect, but we set this in case there's a delay
    setTimeout(() => {
      setIsLoading(false)
      setLoadingProvider(null)
    }, 5000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#111828] text-gray-900 dark:text-white relative">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3 justify-between w-auto">
        <div id="left" className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border dark:border-[#ffffff94] dark:text-white dark:bg-[#1118279d] dark:hover:bg-[#ffffff34]"
              >
                <Languages size={16} />
                {language === "en" ? "English" : language === "nl" ? "Nederlands" : "Deutsch"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>{t.languageEn}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("nl")}>{t.languageNl}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("de")}>{t.languageDe}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div id="middle" className="flex-shrink-0">
          <ModeToggle />
        </div>
        <div id="right" className="flex-shrink-0">
          {/* Info Icon */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:cursor-pointer">
              <DialogTrigger>
                <Info size={24} />
              </DialogTrigger>
            </div>
            <DialogContent className="p-6 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white max-w-lg border dark:border-[#ffffff20]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{t.infoTitle}</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-300 mt-2">
                  <div className="space-y-4 mt-2 text-left">
                    <p>{t.infoDescription}</p>

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.infoSecure}</h3>
                      <p>{t.infoSecureDesc}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.infoProviders}</h3>
                      <p>{t.infoProvidersDesc}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.infoAccount}</h3>
                      <p>{t.infoAccountDesc}</p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Back Button */}
      <Link href="/" className="absolute top-4 left-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-sm font-medium border dark:border-[#ffffff94] dark:text-white dark:bg-[#1118279d] dark:hover:bg-[#ffffff34]"
        >
          <ArrowLeft size={16} />
          {t.backButton}
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-[#ffffff20] mt-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t.title} <span className="text-red-500">{t.titleAccent}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{t.subtitle}</p>
        </motion.div>

        {/* Providers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 mt-6"
        >
          {providers ? (
            Object.values(providers).map((provider) => (
              <motion.div key={provider.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSignIn(provider.id)}
                  disabled={isLoading}
                  className="w-full text-lg font-semibold tracking-wide border dark:border-[#ffffff94] text-white bg-gray-900 hover:bg-white hover:text-gray-900 dark:text-white dark:bg-[#1118279d] dark:hover:bg-[#ffffff34]"
                  style={{
                    backgroundColor: provider.name === "Google" ? "#4285F4" : "#4CAF50",
                  }}
                >
                  {isLoading && loadingProvider === provider.id ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t.signingIn}
                    </span>
                  ) : (
                    `${t.signInWith} ${provider.name}`
                  )}
                </Button>
              </motion.div>
            ))
          ) : (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-gray-600 dark:text-gray-400 text-sm"
        >
          <p>
            {t.termsText}{" "}
            <Link
              href="/terms-of-service"
              className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
            >
              {t.termsService}
            </Link>{" "}
            {t.and}{" "}
            <Link
              href="/privacy-policy"
              className="text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium"
            >
              {t.privacyPolicy}
            </Link>
            .
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

