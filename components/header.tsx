"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Menu, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useTranslation } from "../app/i18n/client"

interface HeaderProps {
  params: {
    lng: string
  }
}

export function Header({ params: { lng } }: HeaderProps) {
  const { t } = useTranslation(lng, "header")
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>{t("loading")}</div>
  }

  if (!session) {
    return null
  }

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {t("welcome_to")} <span className="text-red-500">Scriptura</span>
          {session.user?.name && <span className="hidden sm:inline">, {session.user.name}!</span>}
        </h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm hidden lg:block">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: `/${lng}` })}
              aria-label={t("sign_out")}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={t("user_avatar")} />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-gray-500 text-[0.8rem]">{session.user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: `/${lng}` })}
              aria-label={t("sign_out")}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

