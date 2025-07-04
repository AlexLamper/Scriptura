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
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4">
        <Card className="dark:bg-[#292b2f] dark:border-none">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600">{t("error_loading_profile")}</h2>
            <p className="mt-2">{error || t("user_not_found")}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">{t("your_profile")}</h1>
        {user.isAdmin && (
          <Badge className="bg-purple-600 text-white flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            <span>Admin</span>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 dark:bg-[#292b2f] dark:border-none">
          <CardHeader>
            <CardTitle>{t("personal_information")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm initialName={user.name} initialEmail={user.email} initialBio={user.bio || ""} lng={lng} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="dark:bg-[#292b2f] dark:border-none">
            <CardHeader>
              <CardTitle>{t("profile_picture")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProfileImageUpload initialImage={user.image} userName={user.name} lng={lng} />
            </CardContent>
          </Card>

          <SubscriptionStatus
            userId={user._id.toString()}
            lng={lng}
            subscribed={user.subscribed}
            stripeSubscriptionId={user.stripeSubscriptionId}
            isAdmin={user.isAdmin}
          />
        </div>
      </div>

      <div className="mt-6">
        <Card className="mt-6 dark:bg-[#292b2f] dark:border-none">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <UserBadges earned={user.badges || []} />
          </CardContent>
        </Card>
      </div>

      {user.isAdmin && (
        <div className="mt-6">
          <Card className="dark:bg-[#292b2f] dark:border-none">
            <CardHeader>
              <CardTitle>Admin Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg">
                  Welcome to the admin dashboard. As an admin, you have access to special features:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href={`/${lng}/admin/courses`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">Manage Courses</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Create, edit, and manage premium courses</p>
                  </a>
                  <a
                    href={`/${lng}/admin/users`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">Manage Users</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      View and manage user accounts and subscriptions
                    </p>
                  </a>
                  <a
                    href={`/${lng}/admin/analytics`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      View platform usage and subscription statistics
                    </p>
                  </a>
                  <a
                    href={`/${lng}/admin/settings`}
                    className="block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-2">Platform Settings</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Configure global platform settings</p>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-6">
        <Card className="dark:bg-[#292b2f] dark:border-none">
          <CardHeader>
            <CardTitle>{t("course_progress")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg">{t("course_progress_info")}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-lg">{t("no_enrolled_courses")}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
