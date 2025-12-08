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
    lng: undefined,
    detection: {
      order: ["cookie", "htmlTag", "navigator"],
      caches: ["cookie"],
      cookieName: cookieName,
    },
    preload: runsOnServerSide ? languages : [],
  })

export function useTranslation(ns, options) {
  const [cookies, setCookie] = useCookies([cookieName])
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  const lng = i18n.resolvedLanguage

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    if (!lng) return
    if (cookies[cookieName] === lng) return
    setCookie(cookieName, lng, { path: '/' })
  }, [lng, cookies, setCookie])

  // Sync cookie with language
  useEffect(() => {
    if (!lng || cookies.i18next === lng) return
    setCookie(cookieName, lng, { path: "/" })
  }, [lng, cookies.i18next, setCookie])

  return ret
}

