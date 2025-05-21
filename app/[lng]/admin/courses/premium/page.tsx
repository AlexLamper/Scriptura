"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { Button } from "../../../../../components/ui/button"
import { useSession } from "next-auth/react"
import { ShieldCheck, Crown, Check } from "lucide-react"
import { Switch } from "../../../../../components/ui/switch"
import { toast } from "../../../../../hooks/use-toast"

interface Course {
  _id: string
  title: string
  description: string
  category: string
  isPremium: boolean
  imageUrl?: string
}

export default function ManagePremiumCourses() {
  const { data: session } = useSession()
  const router = useRouter()
  interface User {
    isAdmin: boolean
  }
  
    const [user, setUser] = useState<User | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session) {
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
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/")
      }
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (response.ok) {
          const data = await response.json()
          setCourses(data.courses)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
    fetchCourses()
  }, [session, router])

  const togglePremiumStatus = async (courseId: string, currentStatus: boolean) => {
    setUpdating(courseId)
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/premium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isPremium: !currentStatus,
        }),
      })

      if (response.ok) {
        // Update the local state
        setCourses(
          courses.map((course) => (course._id === courseId ? { ...course, isPremium: !currentStatus } : course)),
        )
        toast({
          title: "Success",
          description: `Course is now ${!currentStatus ? "premium" : "free"}`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to update course status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating course:", error)
      toast({
        title: "Error",
        description: "Failed to update course status",
        variant: "destructive",
      })
    } finally {
      setUpdating(null)
    }
  }

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
        <h1 className="text-3xl font-bold">Manage Premium Courses</h1>
        <div className="bg-purple-600 text-white flex items-center gap-1 px-2 py-1 rounded-md">
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Premium Course Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Toggle courses between free and premium status. Premium courses are only accessible to subscribed users.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {courses.map((course) => (
              <Card key={course._id} className="overflow-hidden">
                <div className="flex items-center p-4 border-b">
                  <div className="flex-1">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {course.isPremium ? (
                          <span className="flex items-center text-amber-600">
                            <Crown className="h-4 w-4 mr-1" />
                            Premium
                          </span>
                        ) : (
                          <span className="flex items-center text-green-600">
                            <Check className="h-4 w-4 mr-1" />
                            Free
                          </span>
                        )}
                      </span>
                      <Switch
                        checked={course.isPremium}
                        onCheckedChange={() => togglePremiumStatus(course._id, course.isPremium)}
                        disabled={updating === course._id}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/courses/edit/${course._id}`)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm line-clamp-2">{course.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Back to Dashboard
        </Button>
        <Button onClick={() => router.push("/admin/courses/create")}>Create New Course</Button>
      </div>
    </div>
  )
}
