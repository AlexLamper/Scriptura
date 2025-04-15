"use client"

import { useEffect, useState, useCallback } from "react"
import { Progress } from "./ui/progress"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BookOpen, CheckCircle2, Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface CourseProgressProps {
  courseId: string
  lng: string
}

export default function CourseProgress({ courseId, lng }: CourseProgressProps) {
  const [progress, setProgress] = useState(0)
  const [lastAccessedLesson, setLastAccessedLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [totalLessons, setTotalLessons] = useState(0)
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  const router = useRouter()

  // Create a memoized fetch function to avoid recreating it on every render
  const fetchProgressData = useCallback(async () => {
    if (status !== "authenticated" || !courseId) {
      setLoading(false)
      return
    }

    setLoading(true)
    console.log("Fetching progress data for course:", courseId)

    try {
      // Fetch course to get total lessons
      const courseResponse = await fetch(`/api/courses/${courseId}`)
      if (courseResponse.ok) {
        const courseData = await courseResponse.json()
        const lessonCount = courseData.lessons?.length || 0
        setTotalLessons(lessonCount)
        console.log(`Course has ${lessonCount} lessons`)
      } else {
        console.error("Failed to fetch course data:", await courseResponse.text())
      }

      // Directly fetch user progress
      const progressResponse = await fetch(`/api/user-progress?courseId=${courseId}`)
      if (progressResponse.ok) {
        const progressData = await progressResponse.json()
        console.log("Raw progress data:", progressData)

        const completed = progressData.completedLessons || []
        setCompletedLessons(completed)
        setLastAccessedLesson(progressData.lastAccessedLesson || 0)

        // Calculate percentage manually to ensure it's correct
        if (totalLessons > 0) {
          const calculatedPercentage = Math.round((completed.length / totalLessons) * 100)
          setProgress(calculatedPercentage)
          console.log(`Calculated progress: ${calculatedPercentage}% (${completed.length}/${totalLessons})`)
        }
      } else {
        console.error("Failed to fetch user progress:", await progressResponse.text())
      }
    } catch (error) {
      console.error("Error fetching progress:", error)
    } finally {
      setLoading(false)
    }
  }, [courseId, status, totalLessons])

  useEffect(() => {
    fetchProgressData()

    // Set up an interval to refresh progress data every 10 seconds
    const intervalId = setInterval(fetchProgressData, 10000)

    return () => clearInterval(intervalId)
  }, [fetchProgressData])

  const handleContinue = () => {
    router.push(`/${lng}/courses/${courseId}/lessons/${lastAccessedLesson}`)
  }

  if (loading && status === "loading") {
    return (
      <div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="flex justify-between mb-4">
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    )
  }

  // If not logged in, show login prompt
  if (status === "unauthenticated") {
    return (
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Sign in to track your progress</p>
        <Button
          className="w-full mb-3"
          onClick={() => router.push(`/auth/signin?callbackUrl=/${lng}/courses/${courseId}`)}
        >
          Sign In to Continue
        </Button>
      </div>
    )
  }

  // If there are no lessons, show a message
  if (totalLessons === 0) {
    return (
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">This course doesn&apos;t have any lessons yet.</p>
        <Button variant="outline" className="w-full">
          Download Materials
        </Button>
      </div>
    )
  }

  const getProgressColor = () => {
    if (progress >= 75) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-gray-500"
  }

  // Calculate progress percentage directly here as well to ensure it's correct
  const calculatedProgress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Progress
                value={calculatedProgress}
                className={`mb-2 h-2 ${calculatedProgress > 0 ? getProgressColor() : ""}`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {completedLessons.length} of {totalLessons} lessons completed
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm">{calculatedProgress}% complete</p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <CheckCircle2 className="h-4 w-4 mr-1" />
          <span>
            {completedLessons.length}/{totalLessons}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span>Last accessed: Lesson {lastAccessedLesson + 1}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>
            {completedLessons.length === 0
              ? "Start your learning journey"
              : completedLessons.length === totalLessons
                ? "Course completed!"
                : `${totalLessons - completedLessons.length} lessons remaining`}
          </span>
        </div>
      </div>

      <Button
        className={`w-full mb-3 ${completedLessons.length === totalLessons ? "bg-green-600 hover:bg-green-700" : ""}`}
        onClick={handleContinue}
      >
        {completedLessons.length === 0
          ? "Start Course"
          : completedLessons.length === totalLessons
            ? "Review Course"
            : "Continue Learning"}
      </Button>

      <Button variant="outline" className="w-full">
        Download Materials
      </Button>
    </div>
  )
}
