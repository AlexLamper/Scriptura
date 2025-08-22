"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../i18n/client"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { ProfileForm } from "../../../components/profile/profile-form"
import { ProfileImageUpload } from "../../../components/profile/profile-image-upload"
import { SubscriptionStatus } from "../../../components/profile/subscription-status"
import { use } from "react"
import { getSession } from "next-auth/react"
import { Badge } from "../../../components/ui/badge"
import { ShieldCheck } from "lucide-react"
import UserBadges from "../../../components/profile/badges"

export default function ProfilePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "profile")
  interface User {
    name: string
    email: string
    bio?: string
    image?: string
    _id: string
    enrolledCourses?: string[]
    subscribed?: boolean
    stripeSubscriptionId?: string
    isAdmin?: boolean
    badges?: string[]
  }

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Add this effect to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    async function fetchUserData() {
      try {
        const session = await getSession()

        if (!session || !session.user) {
          return redirect("/api/auth/signin")
        }

        const response = await fetch("/api/user")
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }

        const data = await response.json()
        if (!data.user) {
          throw new Error("User not found")
        }

        setUser(data.user)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [mounted]) // Only depend on mounted state

  if (!mounted || loading) {
    return (
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4 flex items-center justify-center dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4 dark:bg-gradient-to-b dark:from-[#0d0f17] dark:to-[#181b23]">
        <Card className="dark:bg-[#292b2f] dark:border-gray-700/40 dark:shadow-lg dark:shadow-gray-600/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">{t("error_loading_profile")}</h2>
            <p className="mt-2 text-gray-600 dark:text-blue-200">{error || t("user_not_found")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t("your_profile")}
            </h1>
            {user.isAdmin && (
              <Badge className="bg-purple-600 text-white flex items-center gap-1 shadow-sm">
                <ShieldCheck className="h-3 w-3" />
                <span>Admin</span>
              </Badge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {t("profile_description", { defaultValue: "Manage your account settings and preferences" })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">
                  {t("personal_information")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ProfileForm 
                  initialName={user.name} 
                  initialEmail={user.email} 
                  initialBio={user.bio || ""} 
                  lng={lng} 
                />
              </CardContent>
            </Card>

            {/* Badges Section */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">
                  {t("your_badges", { defaultValue: "Your Badges" })}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <UserBadges earned={user.badges || []} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <CardTitle className="text-gray-900 dark:text-white">
                  {t("profile_picture")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center">
                <ProfileImageUpload 
                  initialImage={user.image} 
                  userName={user.name} 
                  lng={lng} 
                />
              </CardContent>
            </Card>

            {/* Subscription */}
            <SubscriptionStatus
              userId={user._id.toString()}
              lng={lng}
              subscribed={user.subscribed}
              stripeSubscriptionId={user.stripeSubscriptionId}
              isAdmin={user.isAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
