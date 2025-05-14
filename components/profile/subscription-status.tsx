"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Loader2, Crown, Calendar } from "lucide-react"

interface SubscriptionStatusProps {
  userId: string
}

export function SubscriptionStatus({ userId }: SubscriptionStatusProps) {
  const [subscription, setSubscription] = useState<{
    status: string
    plan?: string
    renewalDate?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        // In a real implementation, you would fetch the subscription status from your API
        // For this example, we'll simulate a subscription

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock subscription data (replace with actual API call)
        setSubscription({
          status: "active", // or "inactive", "canceled", etc.
          plan: "Free", // or "Premium", "Pro", etc.
          renewalDate: "N/A", // or actual date for paid plans
        })
      } catch (error) {
        console.error("Error fetching subscription:", error)
        setSubscription(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [userId])

  const getStatusBadge = () => {
    if (!subscription) return null

    switch (subscription.status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "canceled":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Canceled
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-500">
            Inactive
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="dark:bg-[#292b2f] dark:border-none">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Crown className="mr-2 h-5 w-5 text-yellow-500" />
          Subscription Status
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
              <span className="text-muted-foreground">Status:</span>
              {getStatusBadge()}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Plan:</span>
              <span className="font-medium">{subscription.plan}</span>
            </div>
            {subscription.renewalDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next Renewal:</span>
                <span className="font-medium flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {subscription.renewalDate}
                </span>
              </div>
            )}
            {subscription.plan === "Free" && <Button className="w-full mt-4">Upgrade to Premium</Button>}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">Unable to load subscription information</div>
        )}
      </CardContent>
    </Card>
  )
}
