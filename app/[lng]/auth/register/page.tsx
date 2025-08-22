"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { ModeToggle } from "../../../../components/dark-mode-toggle";

const translations = {
  en: {
    title: "Create Account",
    subtitle: "Join Scriptura and start your spiritual journey",
    backButton: "Back to Sign In",
    name: "Full Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    createAccount: "Create Account",
    creating: "Creating Account...",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign in",
    passwordRequirements: "Password must be at least 8 characters long",
    errors: {
      allFieldsRequired: "All fields are required",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 8 characters long",
      invalidEmail: "Please enter a valid email address",
      userExists: "User with this email already exists",
      registrationFailed: "Registration failed. Please try again.",
    }
  },
  nl: {
    title: "Account Aanmaken",
    subtitle: "Word lid van Scriptura en begin je spirituele reis",
    backButton: "Terug naar Inloggen",
    name: "Volledige Naam",
    email: "E-mail",
    password: "Wachtwoord",
    confirmPassword: "Bevestig Wachtwoord",
    createAccount: "Account Aanmaken",
    creating: "Account Aanmaken...",
    alreadyHaveAccount: "Heb je al een account?",
    signIn: "Inloggen",
    passwordRequirements: "Wachtwoord moet minimaal 8 tekens lang zijn",
    errors: {
      allFieldsRequired: "Alle velden zijn verplicht",
      passwordMismatch: "Wachtwoorden komen niet overeen",
      passwordTooShort: "Wachtwoord moet minimaal 8 tekens lang zijn",
      invalidEmail: "Voer een geldig e-mailadres in",
      userExists: "Gebruiker met dit e-mailadres bestaat al",
      registrationFailed: "Registratie mislukt. Probeer opnieuw.",
    }
  },
  de: {
    title: "Konto Erstellen",
    subtitle: "Tritt Scriptura bei und beginne deine spirituelle Reise",
    backButton: "Zurück zur Anmeldung",
    name: "Vollständiger Name",
    email: "E-Mail",
    password: "Passwort",
    confirmPassword: "Passwort Bestätigen",
    createAccount: "Konto Erstellen",
    creating: "Konto Erstellen...",
    alreadyHaveAccount: "Hast du bereits ein Konto?",
    signIn: "Anmelden",
    passwordRequirements: "Passwort muss mindestens 8 Zeichen lang sein",
    errors: {
      allFieldsRequired: "Alle Felder sind erforderlich",
      passwordMismatch: "Passwörter stimmen nicht überein",
      passwordTooShort: "Passwort muss mindestens 8 Zeichen lang sein",
      invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein",
      userExists: "Benutzer mit dieser E-Mail existiert bereits",
      registrationFailed: "Registrierung fehlgeschlagen. Bitte versuche es erneut.",
    }
  }
};

export default function RegisterPage() {
  const params = useParams();
  const lng = params.lng as string;
  const language = (lng === "nl" ? "nl" : lng === "de" ? "de" : "en") as "en" | "nl" | "de";
  const t = translations[language];
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t.errors.allFieldsRequired);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.errors.invalidEmail);
      return false;
    }

    if (formData.password.length < 8) {
      setError(t.errors.passwordTooShort);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t.errors.passwordMismatch);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, redirect to sign in
        router.push("/api/auth/signin?message=Registration successful! Please sign in.");
      } else {
        setError(data.error || t.errors.registrationFailed);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(t.errors.registrationFailed);
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
          <p className="text-sm text-gray-500 dark:text-gray-200/80 mb-6 text-center">{t.subtitle}</p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="text-left">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">
                {t.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t.name}
              />
            </div>

            {/* Email Field */}
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">
                {t.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={t.email}
              />
            </div>

            {/* Password Field */}
            <div className="text-left">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">
                {t.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={t.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.passwordRequirements}</p>
            </div>

            {/* Confirm Password Field */}
            <div className="text-left">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-blue-100 mb-1">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#181b23] text-gray-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={t.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold text-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t.creating}
                </span>
              ) : (
                t.createAccount
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-sm text-gray-500 dark:text-gray-200/80 mt-6 text-center">
            {t.alreadyHaveAccount}{" "}
            <Link href="/api/auth/signin" className="text-blue-600 hover:underline font-medium">
              {t.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
