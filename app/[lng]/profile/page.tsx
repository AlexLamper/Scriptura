"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "../../i18n/client"
import { redirect } from "next/navigation"
import { ProfileForm } from "../../../components/profile/profile-form"
import { ProfileImageUpload } from "../../../components/profile/profile-image-upload"
import { SubscriptionStatus } from "../../../components/profile/subscription-status"
import { use } from "react"
import { getSession } from "next-auth/react"
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
      <div className="w-full pb-6 pt-0 flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-b-2 border-[#262626] dark:border-white"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="w-full pb-6 pt-0">
        <div className="p-4 shadow-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
          <h2 className="font-['Merriweather'] text-lg font-bold text-red-700 dark:text-red-300">{t("error_loading_profile")}</h2>
          <p className="font-['Inter'] mt-2 text-red-600 dark:text-red-400">{error || t("user_not_found")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full pb-6 pt-0">
      <div className="mb-6">
        {/* Header */}
        <div className="p-8 shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a] mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-['Merriweather'] text-2xl lg:text-3xl font-bold text-[#262626] dark:text-white">
                  {t("your_profile")}
                </h1>
                {user.isAdmin && (
                  <span className="text-xs px-2 py-1 bg-purple-600 text-white flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Admin</span>
                  </span>
                )}
              </div>
              <p className="font-['Inter'] text-gray-600 dark:text-gray-300">
                {t("profile_description", { defaultValue: "Manage your account settings and preferences" })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a]">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-['Merriweather'] text-lg font-bold text-[#262626] dark:text-white">
                  {t("personal_information")}
                </h2>
              </div>
              <div className="p-6">
                <ProfileForm 
                  initialName={user.name} 
                  initialEmail={user.email} 
                  initialBio={user.bio || ""} 
                  lng={lng} 
                />
              </div>
            </div>

            {/* Badges Section */}
            <div className="shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a]">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-['Merriweather'] text-lg font-bold text-[#262626] dark:text-white">
                  {t("your_badges", { defaultValue: "Your Badges" })}
                </h2>
              </div>
              <div className="p-6">
                <UserBadges earned={user.badges || []} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a]">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-['Merriweather'] text-lg font-bold text-[#262626] dark:text-white">
                  {t("profile_picture")}
                </h2>
              </div>
              <div className="p-6 flex flex-col items-center">
                <ProfileImageUpload 
                  initialImage={user.image} 
                  userName={user.name} 
                  lng={lng} 
                />
              </div>
            </div>

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
