"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { CheckCircle, BookOpen, Sparkles, Calendar } from "lucide-react"
import { useSession } from "next-auth/react"
import { LoadingSpinner } from "../../../components/ui/loading-spinner"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState("loading")
  const { update } = useSession()

  useEffect(() => {
    // If no sessionId, redirect to subscribe page
    if (!sessionId) {
      console.log("[Success] No sessionId provided, redirecting to subscribe")
      router.replace("/subscribe")
      return
    }

    // Verify the session and update the user's subscription status
    const verifySession = async () => {
      try {
        console.log("[Success] Verifying session:", sessionId)
        
        // First, verify the subscription through our API
        const response = await fetch("/api/verify-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          console.log("[Success] Subscription verified")
          // Update the session to reflect the new subscription status
          await update()
          setStatus("success")
        } else {
          console.error("[Success] Verification failed, redirecting to subscribe")
          // If verification fails, redirect to subscribe
          router.replace("/subscribe")
        }
      } catch (err) {
        console.error("[Success] Error verifying subscription:", err)
        // If error, redirect to subscribe
        router.replace("/subscribe")
      }
    }

    verifySession()
  }, [sessionId, router, update])

  return (
    <div className="w-full pb-6 pt-0">
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-black px-4">
        <div className="w-full max-w-2xl">
          {status === "loading" ? (
            <LoadingSpinner fullHeight message="Verifying your subscription..." />
          ) : (
            <div className="shadow-lg border dark:shadow-gray-900/20 bg-white dark:bg-[#23263a]">
              {/* Header */}
              <div className="p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h1 className="text-3xl font-['Merriweather'] font-bold text-center text-[#262626] dark:text-white mb-2">
                  Subscription Successful!
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 font-['Inter']">
                  Welcome to Scriptura Pro
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-xl font-['Merriweather'] font-semibold text-center text-[#262626] dark:text-white mb-3">
                  Your Pro subscription is now active!
                </h2>

                <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8 font-['Inter']">
                  Thank you for subscribing to Scriptura Pro. Your journey to deeper biblical understanding begins now.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d2e] shadow-sm">
                    <div className="flex items-center mb-3">
                      <BookOpen className="h-5 w-5 text-[#798777] mr-3" />
                      <h3 className="font-['Merriweather'] font-semibold text-[#262626] dark:text-white">Full Course Access</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                      Unlock all premium Bible courses and study materials
                    </p>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d2e] shadow-sm">
                    <div className="flex items-center mb-3">
                      <Sparkles className="h-5 w-5 text-[#798777] mr-3" />
                      <h3 className="font-['Merriweather'] font-semibold text-[#262626] dark:text-white">Advanced Features</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                      Enjoy note-taking, bookmarking, and personalized study plans
                    </p>
                  </div>

                  <div className="p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1d2e] shadow-sm">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 text-[#798777] mr-3" />
                      <h3 className="font-['Merriweather'] font-semibold text-[#262626] dark:text-white">Monthly Billing</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                      Your subscription will renew automatically for €9.99/month
                    </p>
                  </div>
                </div>

                {sessionId && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center font-['Inter'] mb-8">
                    Reference: {sessionId.substring(0, 16)}...
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-center gap-4">
                  <Link href="/study">
                    <Button className="bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] rounded-none">
                      Go to Study
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-['Inter'] rounded-none">
                      Explore Courses
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
