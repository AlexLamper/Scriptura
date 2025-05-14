"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Loader2, Crown, Calendar } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface SubscriptionStatusProps {
  userId: string
  lng: string
}

export function SubscriptionStatus({ userId, lng }: SubscriptionStatusProps) {
  const { t } = useTranslation(lng, "profile")
  const [subscription, setSubscription] = useState<{
    status: string
    plan?: string
    renewalDate?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Add this effect to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchSubscription = async () => {
      try {
        // In a real implementation, you would fetch the subscription status from your API
        // For this example, we'll simulate a subscription

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock subscription data (replace with actual API call)
        setSubscription({
          status: "active", // or "inactive", "canceled", etc.
          plan: "Free", // Use a fixed string instead of t() here
          renewalDate: "N/A", // Use a fixed string instead of t() here
        })
      } catch (error) {
        console.error("Error fetching subscription:", error)
        setSubscription(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [mounted, userId]) // Only depend on mounted state and userId

  // Translate the plan and renewal date only when rendering
  const getTranslatedPlan = (plan: string) => {
    if (plan === "Free") return t("free_plan")
    return plan
  }

  const getTranslatedRenewalDate = (date: string) => {
    if (date === "N/A") return t("not_applicable")
    return date
  }

  const getStatusBadge = () => {
    if (!subscription) return null

    switch (subscription.status) {
      case "active":
        return <Badge className="bg-green-500">{t("active")}</Badge>
      case "canceled":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            {t("canceled")}
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            {t("inactive")}
          </Badge>
        )
      default:
        return null
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Card className="dark:bg-[#292b2f] dark:border-none">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="mr-2 h-5 w-5 text-yellow-500" />
          {t("subscription_status")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : subscription ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("status")}:</span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("current_plan")}:</span>
              <span className="font-medium">{getTranslatedPlan(subscription.plan || "")}</span>
            </div>
            {subscription.renewalDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("next_renewal")}:</span>
                <span className="font-medium flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {getTranslatedRenewalDate(subscription.renewalDate)}
                </span>
              </div>
            )}
            {subscription.plan === "Free" && <Button className="w-full mt-4">{t("upgrade_to_premium")}</Button>}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">{t("unable_load_subscription")}</div>
        )}
      </CardContent>
    </Card>
  )
}
