"use client"

import { Button } from "../../../components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useToast } from "../../../hooks/use-toast"
import getStripe from "../../../lib/stripe-client"

export default function SubscribePage() {
  const { t } = useTranslation("subscribe")
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const sellingPoints = t("selling_points", { returnObjects: true }) as string[]
  const features = t("features", { returnObjects: true }) as string[]

  const handleCheckout = async () => {
    if (!session) {
      toast({
        title: "Not logged in",
        description: "Please sign in to subscribe.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Don't need to pass priceId - the API will get it from environment variables
      console.log("[Subscribe] Starting checkout process")

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[Subscribe] Checkout API error:", errorData)
        throw new Error(errorData?.error || "Failed to start checkout")
      }

      const data = await response.json()
      console.log("[Subscribe] Checkout session created:", data.sessionId)

      if (!data.sessionId) {
        throw new Error("No session ID returned from checkout")
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error("Failed to load Stripe")
      }

      console.log("[Subscribe] Redirecting to Stripe checkout")
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
      if (error) {
        throw error
      }
    } catch (error) {
      console.error("[Subscribe] Checkout error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start checkout",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mt-12 flex flex-col items-center justify-center bg-white dark:bg-black overflow-hidden">
      <div className="w-full max-w-lg text-center px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-['Merriweather'] font-bold text-gray-800 dark:text-white mb-2">
            {t("title")}
          </h1>
          <p className="text-lg font-['Inter'] text-gray-600 dark:text-gray-500">
            {t("subtitle")}
          </p>
        </header>

        <div className="bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <div className="text-5xl font-['Merriweather'] font-bold text-gray-800 dark:text-white mb-1">
              €9.99
            </div>
            <div className="text-gray-600 dark:text-gray-500 font-['Inter'] text-xs">
              {t("billing_info")}
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleCheckout}
            disabled={loading || !session}
            className="w-full px-4 py-4 bg-[#798777] hover:bg-[#6a7a68] text-white font-['Inter'] font-normal text-lg rounded-none"
          >
            {loading ? "Processing..." : t("cta")}
            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
          </Button>

          <div className="space-y-2 mt-5">
            {sellingPoints.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-xs font-['Inter'] text-gray-600 dark:text-gray-500"
              >
                <CheckCircle className="h-3 w-3 mr-2 text-[#798777] dark:text-[#9aaa98]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-10 text-gray-700 dark:text-gray-400 font-['Inter'] text-sm leading-relaxed max-w-md mx-auto">
          <p className="mb-3">{t("description")}</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}