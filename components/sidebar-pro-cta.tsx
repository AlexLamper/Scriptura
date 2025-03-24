"use client"

import { useState } from "react"
import { Sparkles, ChevronRight, Check } from "lucide-react"
import { Button } from "../components/ui/button"
import getStripe from "../utils/stripe"

export default function SidebarProCTA() {
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({ sessionId })

      if (error) {
        console.error("Stripe checkout error:", error)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-auto px-3 pb-4">
      <div
        className={`bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-lg shadow-sm border dark:border-indigo-900/30 overflow-hidden transition-all duration-300 ${
          expanded ? "pb-4" : ""
        }`}
      >
        <div className="p-3 cursor-pointer flex items-center justify-between" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="font-medium">Try Scriptura Pro Now!</span>
          </div>
          <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />
        </div>

        {expanded && (
          <div className="px-3 space-y-3">
            <div className="text-sm">Unlock premium features for just €9.99/month</div>

            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-1.5 mt-0.5 text-indigo-400" />
                <span>Access all 40+ Bible courses</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-1.5 mt-0.5 text-indigo-400" />
                <span>Advanced study tools</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-1.5 mt-0.5 text-indigo-400" />
                <span>Ad-free experience</span>
              </li>
            </ul>

            <div className="pt-1">
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full"
                size="sm"
              >
                {loading ? "Processing..." : "Get Started"}
              </Button>
            </div>

            <div className="text-xs text-center">Cancel anytime. No commitment.</div>
          </div>
        )}
      </div>
    </div>
  )
}

