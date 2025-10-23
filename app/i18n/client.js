"use client"

import { useEffect } from "react"
import i18next from "i18next"
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next"
import { useCookies } from "react-cookie"
import resourcesToBackend from "i18next-resources-to-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { getOptions, languages, cookieName } from "./settings"

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // detect language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
      lookupFromPathIndex: 0,
      excludeCacheFor: ["csp", "images"], // Ensures static paths are untouched
    },
    preload: runsOnServerSide ? languages : [],
  })


export function useTranslation(lng, ns, options) {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret

  // Handle server-side language change
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  // Always call hooks - never conditionally
  // Sync language change on client side
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    const timer = setTimeout(() => {
      i18n.changeLanguage(lng)
    }, 0)
    return () => clearTimeout(timer)
  }, [lng]) // Only depend on lng, not i18n object

  // Sync cookie with language
  useEffect(() => {
    if (!lng || cookies.i18next === lng) return
    setCookie(cookieName, lng, { path: "/" })
  }, [lng, cookies.i18next, setCookie])

  return ret
}

