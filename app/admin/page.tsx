"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useSession } from "next-auth/react"
import { ShieldCheck, Users, BookOpen, BarChart3, Settings } from "lucide-react"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  type User = {
    isAdmin: boolean
  }
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [premiumUsers, setPremiumUsers] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0)
  const [premiumCourses, setPremiumCourses] = useState(0)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) {
        router.push("/api/auth/signin")
        return
      }

      try {
        const response = await fetch("/api/user")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)

          // If user is not an admin, redirect to home
          if (!data.user.isAdmin) {
            router.push("/")
          }
        } else {
          router.push("/")
          return
        }

        const usersRes = await fetch("/api/admin/users")
        if (usersRes.ok) {
          const data = await usersRes.json()
          setTotalUsers(data.users.length)
          setPremiumUsers(data.users.filter((u: { subscribed: boolean }) => u.subscribed).length)
        }

        const coursesRes = await fetch("/api/admin/courses")
        if (coursesRes.ok) {
          const data = await coursesRes.json()
          setTotalCourses(data.courses.length)
          setPremiumCourses(data.courses.filter((c: { isPremium: boolean }) => c.isPremium).length)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [session?.user, router])

  if (loading) {
    return (
      <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user?.isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen w-full mx-auto px-4 pt-2 pb-4">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-md">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{totalUsers}</h3>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Premium Users</p>
                <h3 className="text-2xl font-bold">{premiumUsers}</h3>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Courses</p>
                <h3 className="text-2xl font-bold">{totalCourses}</h3>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Premium Courses</p>
                <h3 className="text-2xl font-bold">{premiumCourses}</h3>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={() => router.push("/admin/courses/create")}
                className="flex items-center justify-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Create Course</span>
              </Button>
              <Button
                onClick={() => router.push("/admin/courses/premium")}
                className="flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Manage Premium</span>
              </Button>
              <Button onClick={() => router.push("/admin/users")} className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                <span>Manage Users</span>
              </Button>
              <Button
                onClick={() => router.push("/admin/analytics")}
                className="flex items-center justify-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New course published</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">New premium subscription</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => router.push("/admin/courses")}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold">Course Management</h3>
                  <p className="text-xs text-gray-500 mt-1">Create, edit and manage courses</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => router.push("/admin/users")}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold">User Management</h3>
                  <p className="text-xs text-gray-500 mt-1">Manage users and permissions</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => router.push("/admin/analytics")}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold">Analytics</h3>
                  <p className="text-xs text-gray-500 mt-1">View platform statistics</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => router.push("/admin/settings")}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Settings className="h-8 w-8 mb-2 text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-xs text-gray-500 mt-1">Configure platform settings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
