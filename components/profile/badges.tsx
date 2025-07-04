"use client"

import {
  BadgeCheck,
  Flame,
  Star,
  BookOpen,
  Trophy,
  Crown,
  Users,
  MessageCircle,
  Camera,
  CheckCircle,
  Heart,
  FlaskConical,
  Gift,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { cn } from "../../lib/utils"
import { JSX } from "react"

interface BadgeInfo {
  id: string
  icon: JSX.Element
  description: string
}

const badges: BadgeInfo[] = [
  { id: "streak30", icon: <Flame />, description: "30 day streak" },
  { id: "streak60", icon: <Flame />, description: "60 day streak" },
  { id: "streak90", icon: <Flame />, description: "90 day streak" },
  { id: "streak120", icon: <Flame />, description: "120 day streak" },
  { id: "verified", icon: <BadgeCheck />, description: "Verified user" },
  { id: "contributor", icon: <Star />, description: "Course contributor" },
  { id: "completed1", icon: <BookOpen />, description: "Complete 1 course" },
  { id: "completed5", icon: <BookOpen />, description: "Complete 5 courses" },
  { id: "completed10", icon: <BookOpen />, description: "Complete 10 courses" },
  { id: "points100", icon: <Trophy />, description: "Earn 100 quiz points" },
  { id: "points500", icon: <Trophy />, description: "Earn 500 quiz points" },
  { id: "points1000", icon: <Trophy />, description: "Earn 1000 quiz points" },
  { id: "premium", icon: <Crown />, description: "Premium subscriber" },
  { id: "invite", icon: <Users />, description: "Invite a friend" },
  { id: "commenter", icon: <MessageCircle />, description: "Post a comment" },
  { id: "profilepic", icon: <Camera />, description: "Upload a profile picture" },
  { id: "firstlesson", icon: <CheckCircle />, description: "Complete first lesson" },
  { id: "community", icon: <Heart />, description: "Join the community" },
  { id: "tester", icon: <FlaskConical />, description: "Beta tester" },
  { id: "anniversary", icon: <Gift />, description: "One year anniversary" },
]

interface UserBadgesProps {
  earned: string[]
}

export default function UserBadges({ earned }: UserBadgesProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {badges.map((b) => (
        <TooltipProvider key={b.id} delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "p-2 rounded-md border flex items-center justify-center",
                  earned.includes(b.id)
                    ? "bg-amber-400 text-white"
                    : "bg-muted text-muted-foreground opacity-50"
                )}
              >
                {b.icon}
              </div>
            </TooltipTrigger>
            <TooltipContent>{b.description}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}