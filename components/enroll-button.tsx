"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface EnrollButtonProps {
  courseId: string
  lng: string
  buttonText: string
  enrolledText: string
  signInText: string
  className?: string
}

export function EnrollButton({
  courseId,
  lng,
  buttonText,
  enrolledText,
  signInText,
  className = "",
}: EnrollButtonProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null)

  const handleEnroll = async () => {
    if (status === "unauthenticated") {
      router.push(`/${lng}/auth/signin?callbackUrl=/${lng}/courses/${courseId}`)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to enroll")
      }

      setEnrolled(true)
      router.refresh()
    } catch (err) {
      console.error("Error enrolling:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Button disabled className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {buttonText}
      </Button>
    )
  }

  if (enrolled) {
    return (
      <Button
        variant="outline"
        className={className}
        onClick={() => router.push(`/${lng}/courses/${courseId}`)}
      >
        {enrolledText}
      </Button>
    )
  }

  return (
    <Button onClick={handleEnroll} className={className}>
      {status === "unauthenticated" ? signInText : buttonText}
    </Button>
  )
}
