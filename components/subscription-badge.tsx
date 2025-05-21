import { Crown } from "lucide-react"
import { Badge } from "./ui/badge"

interface SubscriptionBadgeProps {
  isSubscribed: boolean
}

export function SubscriptionBadge({ isSubscribed }: SubscriptionBadgeProps) {
  if (!isSubscribed) return null

  return (
    <Badge className="bg-amber-500 text-white flex items-center gap-1 ml-2">
      <Crown className="h-3 w-3" />
      <span>Pro</span>
    </Badge>
  )
}
