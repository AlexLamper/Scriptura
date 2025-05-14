"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "../components/ui/card"
import { Flame, Trophy, Star, Award } from "lucide-react"
import { cn } from "../lib/utils"

interface StreakTrackerProps {
  className?: string
}

export default function StreakTracker({ className }: StreakTrackerProps) {
  // Hardcoded streak value
  const [streak, setStreak] = useState(14)

  // Demo function to increment streak on click
  const incrementStreak = () => {
    setStreak((prev) => prev + 1)
  }

  // Determine flame size and color based on streak
  const getFlameColor = () => {
    if (streak >= 30) return "text-purple-500"
    if (streak >= 14) return "text-red-500"
    if (streak >= 7) return "text-orange-500"
    return "text-yellow-500"
  }

  // Get milestone icon based on streak
  const getMilestoneIcon = () => {
    if (streak >= 30) return <Trophy className="w-4 h-4 text-purple-500" />
    if (streak >= 14) return <Award className="w-4 h-4 text-red-500" />
    if (streak >= 7) return <Star className="w-4 h-4 text-orange-500" />
    return null
  }

  return (
    <Card className={cn("w-auto hover:shadow-md transition-shadow duration-300", className)} onClick={incrementStreak}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Flame className={cn("w-6 h-6", getFlameColor())} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={streak}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  className="font-bold text-xl"
                >
                  {streak}
                </motion.span>
              </AnimatePresence>
              <span className="ml-1 text-sm text-muted-foreground">day{streak !== 1 ? "s" : ""}</span>
            </motion.div>
          </div>

          {/* Streak progress visualization */}
          <div className="w-full mt-2 bg-muted rounded-full h-1.5">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-red-500 h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (streak / 30) * 100)}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>

          {/* Milestone indicator */}
          <AnimatePresence>
            {getMilestoneIcon() && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-1 mt-2 text-xs"
              >
                {getMilestoneIcon()}
                <span className="text-muted-foreground">
                  {streak >= 30 ? "Amazing!" : streak >= 14 ? "Great work!" : "Good start!"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
