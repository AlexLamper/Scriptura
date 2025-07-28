"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getProviders, type ClientSafeProvider, signIn } from "next-auth/react"
import { Button } from "../../../../components/ui/button"
import Image from "next/image"
import { Info, Loader2 } from "lucide-react" // Import Loader2
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle, // Import DialogTitle
  DialogDescription,
} from "../../../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
// import { motion } from "framer-motion" // Keep commented as per original
import "../../../[lng]/globals.css"
import { ModeToggle } from "../../../../components/dark-mode-toggle"

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
    rightHeading: "Continue to Your Dashboard",
    rightDescription: "Sign in to access your account and continue your journey.",
    createNow: "Create now",
    email: "Email",
    password: "Password",
    saveAccount: "Save account",
    forgotPassword: "Forgot Password?",
    or: "or",
    continueWithGoogle: "Continue with Google",
    continueWithFacebook: "Continue with Facebook",
    introducingFeatures: "Introducing new features",
    analyzeTrends: "Analyzing previous trends ensures that businesses always make the right decision. And as the scale of the decision and its impact magnifies...",
    trackProgress: "Track Your Progress",
    trackProgressDesc: "Stay motivated by tracking your daily and weekly study progress with our new dashboard.",
    joinCommunity: "Join the Community",
    joinCommunityDesc: "Connect with others, share insights, and grow together in our vibrant learning community.",
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
    rightHeading: "Ga verder naar je Dashboard",
    rightDescription: "Log in om toegang te krijgen tot je account en je studie voort te zetten.",
    createNow: "Maak nu aan",
    email: "E-mail",
    password: "Wachtwoord",
    saveAccount: "Account opslaan",
    forgotPassword: "Wachtwoord vergeten?",
    or: "of",
    continueWithGoogle: "Doorgaan met Google",
    continueWithFacebook: "Doorgaan met Facebook",
    introducingFeatures: "Introductie van nieuwe functies",
    analyzeTrends: "Het analyseren van eerdere trends zorgt ervoor dat bedrijven altijd de juiste beslissing nemen. En naarmate de schaal van de beslissing en de impact ervan toenemen...",
    trackProgress: "Volg je voortgang",
    trackProgressDesc: "Blijf gemotiveerd door je dagelijkse en wekelijkse studievoortgang te volgen met ons nieuwe dashboard.",
    joinCommunity: "Word lid van de community",
    joinCommunityDesc: "Maak contact met anderen, deel inzichten en groei samen in onze levendige leergemeenschap.",
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
    rightHeading: "Zugang zur Anwendung",
    rightDescription: "Melden Sie sich an, um auf Ihr Konto zuzugreifen und Ihre Reise fortzusetzen.",
    createNow: "Jetzt erstellen",
    email: "E-Mail",
    password: "Passwort",
    saveAccount: "Konto speichern",
    forgotPassword: "Passwort vergessen?",
    or: "oder",
    continueWithGoogle: "Mit Google fortfahren",
    continueWithFacebook: "Mit Facebook fortfahren",
    introducingFeatures: "Neue Funktionen werden vorgestellt",
    analyzeTrends: "Die Analyse früherer Trends stellt sicher, dass Unternehmen immer die richtige Entscheidung treffen. Und wenn das Ausmaß der Entscheidung und ihre Auswirkungen zunehmen...",
    trackProgress: "Verfolgen Sie Ihren Fortschritt",
    trackProgressDesc: "Bleiben Sie motiviert, indem Sie Ihren täglichen und wöchentlichen Lernfortschritt mit unserem neuen Dashboard verfolgen.",
    joinCommunity: "Treten Sie der Community bei",
    joinCommunityDesc: "Vernetzen Sie sich mit anderen, tauschen Sie Erkenntnisse aus und wachsen Sie gemeinsam in unserer lebendigen Lerngemeinschaft.",
  }
}

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)
  const [language, setLanguage] = useState<"en" | "nl" | "de">("en")
  const t = translations[language]

  // Carousel state for right side
  const slides = [
    {
      image: "/en/images/signin/study.png",
      heading: t.introducingFeatures, // Translated
      text: t.analyzeTrends // Translated
    },
    {
      image: "/en/images/signin/nature.jpg",
      heading: t.trackProgress, // Translated
      text: t.trackProgressDesc // Translated
    },
    {
      image: "/en/images/signin/sea.jpg",
      heading: t.joinCommunity, // Translated
      text: t.joinCommunityDesc // Translated
    }
  ];
  const [current, setCurrent] = useState(0);
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

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
    <div>
      {/* Top-left back button */}
      <div className="fixed top-4 left-4 z-30">
        <Link href="/" className="flex items-center gap-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="inline-block"><path d="M12.5 16L7.5 10L12.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t.backButton} {/* Translated */}
        </Link>
      </div>
      {/* Top-right global controls */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-3 w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border dark:border-[#ffffff94] dark:text-white dark:bg-[#1118279d] dark:hover:bg-[#ffffff34]"
            >
              {language === "en" ? t.languageEn : language === "nl" ? t.languageNl : t.languageDe} {/* Translated */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage("en")}>{t.languageEn}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("nl")}>{t.languageNl}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("de")}>{t.languageDe}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:cursor-pointer">
            <DialogTrigger>
              <Info size={24} />
            </DialogTrigger>
          </div>
          <DialogContent className="p-6 rounded-2xl max-w-lg border border-gray-200 dark:border-[#23263a] shadow-2xl bg-white/70 dark:bg-[#23263a]/70 backdrop-blur-xl text-gray-900 dark:text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">{t.infoTitle}</DialogTitle>
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

      <div className="min-h-screen flex flex-col md:flex-row bg-[#f6f7ff] dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23] text-gray-900 dark:text-white relative">
        {/* Left Side: New Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8 py-16 md:py-0 relative z-10 bg-white dark:bg-[#181b23]">
          {/* Logo above form, left-aligned with form content */}
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex items-center">
              <Image
                src="/en/logo/scriptura.png"
                alt="Scriptura Logo"
                width={40}
                height={40}
                className="object-contain w-10 h-10 rounded-lg shadow mr-3"
                priority
              />
              <span className="font-bold text-xl text-gray-800 dark:text-blue-100">Scriptura</span>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto bg-white dark:bg-[#23263a] rounded-2xl shadow-xl border border-gray-200 dark:border-[#23263a] p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100 mb-2 text-left">Sign in</h1>
            <p className="text-sm text-gray-500 dark:text-gray-200/80 mb-6 text-left">Don&apos;t have an account? <a href="#" className="text-blue-600 hover:underline">{t.createNow}</a></p> {/* Translated */}
            <form className="space-y-5">
              <div className="text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">{t.email}</label> {/* Translated */}
                <input id="email" name="email" type="email" autoComplete="email" placeholder={t.email} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled />
              </div>
              <div className="text-left">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">{t.password}</label> {/* Translated */}
                <div className="relative">
                  <input id="password" name="password" type="password" autoComplete="current-password" placeholder={t.password} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer select-none">👁️</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm text-gray-600 dark:text-blue-200">
                  <input type="checkbox" className="mr-2 rounded border-gray-300 dark:border-gray-700" disabled />
                  {t.saveAccount} {/* Translated */}
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">{t.forgotPassword}</a> {/* Translated */}
              </div>
              <button type="button" className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg transition-colors">Sign in</button>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
                <span className="mx-2 text-gray-400 text-xs">{t.or}</span> {/* Translated */}
                <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Dynamic Provider Buttons */}
              {providers ? (
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.id}
                    variant="outline"
                    onClick={() => handleSignIn(provider.id)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full py-2 text-gray-700 dark:text-blue-100 bg-white dark:bg-[#181b23] hover:bg-gray-50 dark:hover:bg-[#23263a] font-medium transition-colors"
                  >
                    {isLoading && loadingProvider === provider.id ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        {t.signingIn}
                      </span>
                    ) : (
                      <>
                        {/* Colored Google icon for Google provider */}
                        {provider.name === "Google" && (
                          <span className="mr-2 flex items-center">
                            <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g>
                                <path d="M44.5 20H24V28.5H36.7C35.2 33.1 30.9 36.5 25.5 36.5C18.6 36.5 13 30.9 13 24C13 17.1 18.6 11.5 25.5 11.5C28.3 11.5 30.8 12.5 32.7 14.2L38.1 9.1C34.7 6.1 30.3 4 25.5 4C14.7 4 6 12.7 6 23.5C6 34.3 14.7 43 25.5 43C35.2 43 44 34.7 44 24C44 22.7 44.3 21.3 44.5 20Z" fill="#FFC107"/>
                                <path d="M6 12.7L13.7 18.6C15.9 14.2 20.3 11.5 25.5 11.5C28.3 11.5 30.8 12.5 32.7 14.2L38.1 9.1C34.7 6.1 30.3 4 25.5 4C18.6 4 13 8.6 13 15.5C13 17.1 13.3 18.6 13.7 20.1L6 12.7Z" fill="#FF3D00"/>
                                <path d="M25.5 43C30.3 43 34.7 40.9 38.1 37.9L31.1 32.2C29.2 33.7 26.9 34.5 24.5 34.5C19.1 34.5 14.8 31.1 13.3 26.5L6 33.3C9.3 38.1 16.1 43 25.5 43Z" fill="#4CAF50"/>
                                <path d="M44.5 20H24V28.5H36.7C36.2 30.1 35.2 31.5 33.7 32.2L38.1 37.9C41.4 34.7 44 30.1 44 24C44 22.7 44.3 21.3 44.5 20Z" fill="#1976D2"/>
                              </g>
                            </svg>
                          </span>
                        )}
                        {provider.name === "Facebook" && (
                          <span className="text-lg">📘</span>
                        )}
                        {t.signInWith} {provider.name}
                      </>
                    )}
                  </Button>
                ))
              ) : (
                <div className="flex justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
                </div>
              )}

            </form>
          </div>
        </div>
        {/* Right Side: Gradient background (can be further customized as needed) */}
        <div className="w-full md:w-1/2 min-h-[400px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e3e8ff] to-[#bfcaff] dark:from-[#23263a] dark:via-[#23263a] dark:to-[#181b23] opacity-90 z-0" />
          {/* Right Side Content with arrows and carousel */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 w-full">
            <div className="mb-8 w-full flex justify-center items-center gap-4">
              {/* Backward arrow */}
              <button
                aria-label="Previous"
                onClick={goPrev}
                className="rounded-full p-2 bg-white/80 dark:bg-[#23263a]/80 hover:bg-blue-100 dark:hover:bg-[#23263a] shadow transition-colors"
                style={{ lineHeight: 0 }}
                type="button"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div className="rounded-lg shadow-2xl overflow-hidden bg-white/60 dark:bg-[#23263a]/60 backdrop-blur-lg">
                <Image
                  src={slides[current].image}
                  alt={slides[current].heading}
                  width={480}
                  height={320}
                  className="w-[480px] h-[320px] object-contain rounded-lg"
                  style={{
                    filter: 'brightness(0.98) saturate(1.1) blur(0.2px) drop-shadow(0 0 32px rgba(255,255,255,0.7))',
                  }}
                  priority
                />
              </div>
              {/* Forward arrow */}
              <button
                aria-label="Next"
                onClick={goNext}
                className="rounded-full p-2 bg-white/80 dark:bg-[#23263a]/80 hover:bg-blue-100 dark:hover:bg-[#23263a] shadow transition-colors"
                style={{ lineHeight: 0 }}
                type="button"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <h2 className="font-inter font-semibold text-2xl md:text-3xl text-gray-700 dark:text-gray-200 text-center tracking-normal mb-3">{slides[current].heading}</h2>
            <p className="font-inter font-light text-sm md:text-base text-gray-500/80 dark:text-gray-200/80 text-center max-w-2xl leading-snug mb-1">
              {slides[current].text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}