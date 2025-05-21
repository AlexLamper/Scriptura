import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Crown, ShieldCheck } from "lucide-react"
import Link from "next/link"

interface SubscriptionStatusProps {
  userId: string
  lng: string
  subscribed?: boolean
  stripeSubscriptionId?: string
  isAdmin?: boolean
}

export function SubscriptionStatus({
  lng,
  subscribed = false,
  stripeSubscriptionId,
  isAdmin = false,
}: SubscriptionStatusProps) {
  return (
    <Card className="dark:bg-[#292b2f] dark:border-none">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Subscription Status</span>
          {isAdmin && (
            <Badge className="bg-purple-600 text-white flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>Admin</span>
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {subscribed ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500 text-white flex items-center gap-1">
                <Crown className="h-3 w-3" />
                <span>Premium</span>
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-300">Active</span>
            </div>
            <p className="text-sm">
              You have an active premium subscription. Enjoy access to all premium courses and features!
            </p>
            <div className="text-xs text-gray-500">
              {stripeSubscriptionId && <p>Subscription ID: {stripeSubscriptionId}</p>}
            </div>
            <Link href={`/${lng}/account/billing`}>
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              {isAdmin
                ? "As an admin, you have access to all premium content without a subscription."
                : "Upgrade to premium to access exclusive courses and features."}
            </p>
            {!isAdmin && (
              <Link href={`/${lng}/pricing`}>
                <Button className="w-full">Upgrade to Premium</Button>
              </Link>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
