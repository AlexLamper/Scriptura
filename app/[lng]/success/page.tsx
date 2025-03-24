"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    if (sessionId) {
      // You could verify the session here by calling your API
      // For simplicity, we're just setting success after a delay
      const timer = setTimeout(() => {
        setStatus("success")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [sessionId])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Subscription Successful!</CardTitle>
          <CardDescription>Thank you for subscribing to our premium plan.</CardDescription>
        </CardHeader>
        <CardContent>
          {status === "loading" ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-green-600"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <p>Your subscription has been activated. You now have access to all premium features.</p>
              {sessionId && <p className="text-sm text-gray-500">Session ID: {sessionId}</p>}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

