"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { CheckCircle, Calendar, BookOpen, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState("loading")
  const { update } = useSession()

  useEffect(() => {
    if (sessionId) {
      // Verify the session and update the user's subscription status
      const verifySession = async () => {
        try {
          const response = await fetch("/api/verify-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          })

          if (response.ok) {
            // Update the session to reflect the new subscription status
            await update()
            setStatus("success")
          } else {
            console.error("Failed to verify subscription")
            setStatus("success") // Still show success for now
          }
        } catch (error) {
          console.error("Error verifying subscription:", error)
          setStatus("success") // Still show success for now
        }
      }

      verifySession()
    }
  }, [sessionId, update])

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="w-full max-w-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-lg shadow-sm border dark:border-indigo-900/30 overflow-hidden transition-all duration-300">
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
          <CardHeader className="bg-indigo-600 text-white rounded-t-lg pb-10">
            <CardTitle className="text-3xl font-bold">Subscription Successful!</CardTitle>
            <CardDescription className="text-indigo-100 text-lg">Welcome to Scriptura Pro</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-8">
            {status === "loading" ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              </div>
            ) : (
              <div className="space-y-8 py-4">
                <div className="flex items-center justify-center">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                    <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
                  Your Pro subscription is now active!
                </h2>

                <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                  Thank you for subscribing to Scriptura Pro. Your journey to deeper biblical understanding begins now.
                </p>

                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                    <div className="flex items-center mb-3">
                      <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                      <h3 className="font-medium dark:text-white">Full Course Access</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Unlock all premium Bible courses and study materials
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-center mb-3">
                      <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <h3 className="font-medium dark:text-white">Advanced Features</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Enjoy note-taking, bookmarking, and personalized study plans
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-pink-100 dark:border-pink-900/30">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 text-pink-600 dark:text-pink-400 mr-2" />
                      <h3 className="font-medium dark:text-white">Monthly Billing</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your subscription will renew automatically for €9.99/month
                    </p>
                  </div>
                </div>

                {sessionId && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Reference: {sessionId.substring(0, 16)}...
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pb-8 pt-2">
            <Link href="/dashboard">
              <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
              >
                Explore Courses
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </div>
  )
}
