"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SearchForm } from "./search-form"
import { useTranslation } from "../app/i18n/client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar"
import { Home, BookOpen, User, Briefcase, Settings, Users, BookText, StickyNote
  } from "lucide-react"
import SidebarProCTA from "./sidebar-pro-cta"
import React, { useEffect, useState } from 'react';

// Main navigation items/links with translation keys
const mainNavItems = [
  {
    titleKey: "dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    titleKey: "study",
    url: "/study",
    icon: BookText,
  },
  {
    titleKey: "notes",
    url: "/notes",
    icon: StickyNote,
  },
  {
    titleKey: "courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    titleKey: "profile",
    url: "/profile",
    icon: User,
  },
  {
    titleKey: "resources",
    url: "/resources",
    icon: Briefcase,
  },
  {
    titleKey: "settings",
    url: "/settings",
    icon: Settings,
  },
  {
    titleKey: "community",
    url: "/community",
    icon: Users,
  },
]

export function AppSidebar({ ...props }) {
  const params = useParams()
  const lang = params.lng || "en"
  const { t } = useTranslation(lang as string, "sidebar")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const prependLang = (url: string) => `/${lang}${url}`

  // Check if dark mode is active
  useEffect(() => {
    setIsClient(true)
    
    const checkDarkMode = () => {
      const darkModeActive = document.documentElement.classList.contains('dark')
      setIsDarkMode(darkModeActive)
    }

    checkDarkMode()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    // Also listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => {
      if (!document.documentElement.classList.contains('light') && !document.documentElement.classList.contains('dark')) {
        setIsDarkMode(mediaQuery.matches)
      }
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <Sidebar
      {...props}
      className="dark:border-r-[#91969e52] font-sans text-gray-800 dark:text-gray-200"
      style={{
        backgroundColor: isClient && isDarkMode ? '#181b23' : '#ffffff',
        '--sidebar-background': isClient && isDarkMode ? '#181b23' : '#ffffff',
      } as React.CSSProperties}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="ml-2 flex flex-col gap-0.5 leading-none">
                  <Link href={prependLang("/")}>
                    <span className="font-bold text-lg">Scriptura</span>
                  </Link>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild>
                    <Link href={prependLang(item.url)}>
                      <span className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-500" />
                        <span className="text-gray-700/95 dark:text-gray-300 font-normal text-base">{t(item.titleKey)}</span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      <SidebarProCTA />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}