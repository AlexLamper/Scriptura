"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { ModeToggle } from "../../../../components/dark-mode-toggle";

const translations = {
  en: {
    title: "Reset Password",
    subtitle: "Enter your email address and we'll send you a link to reset your password.",
    backButton: "Back to Sign In",
    email: "Email",
    sendResetLink: "Send Reset Link",
    sending: "Sending...",
    rememberPassword: "Remember your password?",
    signIn: "Sign in",
    errors: {
      emailRequired: "Please enter your email address",
      invalidEmail: "Please enter a valid email address",
      somethingWrong: "Something went wrong. Please try again.",
    }
  },
  nl: {
    title: "Wachtwoord Resetten",
    subtitle: "Voer je e-mailadres in en we sturen je een link om je wachtwoord te resetten.",
    backButton: "Terug naar Inloggen",
    email: "E-mail",
    sendResetLink: "Reset Link Versturen",
    sending: "Versturen...",
    rememberPassword: "Weet je je wachtwoord weer?",
    signIn: "Inloggen",
    errors: {
      emailRequired: "Voer je e-mailadres in",
      invalidEmail: "Voer een geldig e-mailadres in",
      somethingWrong: "Er ging iets mis. Probeer opnieuw.",
    }
  },
  de: {
    title: "Passwort Zurücksetzen",
    subtitle: "Gib deine E-Mail-Adresse ein und wir senden dir einen Link zum Zurücksetzen deines Passworts.",
    backButton: "Zurück zur Anmeldung",
    email: "E-Mail",
    sendResetLink: "Reset-Link Senden",
    sending: "Senden...",
    rememberPassword: "Erinnerst du dich an dein Passwort?",
    signIn: "Anmelden",
    errors: {
      emailRequired: "Bitte gib deine E-Mail-Adresse ein",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein",
      somethingWrong: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    }
  }
};

export default function ForgotPasswordPage() {
  const params = useParams();
  const lng = params.lng as string;
  const language = (lng === "nl" ? "nl" : lng === "de" ? "de" : "en") as "en" | "nl" | "de";
  const t = translations[language];

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError(t.errors.emailRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t.errors.invalidEmail);
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || t.errors.somethingWrong);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(t.errors.somethingWrong);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Top-left back button */}
      <div className="fixed top-4 left-4 z-30">
        <Link href="/api/auth/signin" className="flex items-center gap-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="inline-block">
            <path d="M12.5 16L7.5 10L12.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {t.backButton}
        </Link>
      </div>

      {/* Top-right theme toggle */}
      <div className="fixed top-4 right-4 z-30">
        <ModeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center bg-[#f6f7ff] dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23] text-gray-900 dark:text-white px-4">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-[#23263a] rounded-2xl shadow-xl border border-gray-200 dark:border-[#23263a] p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
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

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-blue-100 mb-2 text-center">{t.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-200/80 mb-6 text-center">
            {t.subtitle}
          </p>

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">
                {t.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t.email}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold text-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t.sending}
                </span>
              ) : (
                t.sendResetLink
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          <p className="text-sm text-gray-500 dark:text-gray-200/80 mt-6 text-center">
            {t.rememberPassword}{" "}
            <Link href="/api/auth/signin" className="text-blue-600 hover:underline font-medium">
              {t.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
