"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SearchForm } from "./search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar"
import { Home, BookOpen, Timer, User, Briefcase, Settings, Users, Layers, ListCheckIcon,
  } from "lucide-react"
import SidebarProCTA from "./sidebar-pro-cta"

// Main navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
  {
    title: "Quizzes",
    url: "/quizzes",
    icon: Timer,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Resources",
    url: "/resources",
    icon: Briefcase,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
]

// Additional sections
const additionalSections = [
  {
    title: "Extras",
    items: [
      {
        title: "Terms of Service",
        url: "/terms-of-service",
        icon: Layers,
      },
      {
        title: "Privacy Policy",
        url: "/privacy-policy",
        icon: ListCheckIcon,
      },
    ],
  },
]

export function AppSidebar({ ...props }) {
  const params = useParams()
  const lang = params.lng || "en"

  const prependLang = (url: string) => `/${lang}${url}`

  return (
    <Sidebar {...props} className="dark:border-r-[#91969e52]">
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
                    <span className="font-semibold">Scriptura</span>
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
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={prependLang(item.url)}>
                      <span className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Additional Sections */}
        {additionalSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={prependLang(item.url)}>
                        <span className="flex items-center space-x-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      <SidebarProCTA />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

