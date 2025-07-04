"use client"

import { useState, useEffect } from "react"
import { Flame } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"

interface StreakTrackerProps {
  className?: string
}

export default function StreakTracker({ className }: StreakTrackerProps) {
  const [streak, setStreak] = useState(0)
  const [freezes, setFreezes] = useState(0)

  const updateStreak = async (test = false) => {
    const url = test ? "/api/streak?test=true" : "/api/streak"
    const res = await fetch(url, { method: "POST" })
    if (res.ok) {
      const data = await res.json()
      setStreak(data.streak)
      setFreezes(data.freezes)
    }
  }

  useEffect(() => {
    updateStreak()
  }, [])

  const getFlameColor = () => {
    if (streak >= 30) return "text-purple-500"
    if (streak >= 14) return "text-red-500"
    if (streak >= 7) return "text-orange-500"
    return "text-yellow-500"
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={cn("flex items-center gap-1 cursor-pointer", className)}>
          <Flame className={cn("w-5 h-5", getFlameColor())} />
          <span className="text-sm font-semibold">{streak}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Streak Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mt-2">
            <Flame className={cn("w-6 h-6", getFlameColor())} />
            <span className="text-lg font-bold">
              {streak} day{streak !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="w-full mt-4 bg-muted rounded-full h-2 relative">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (streak / 90) * 100)}%` }}
              transition={{ duration: 0.5 }}
            />
            {[30, 60, 90].map((m) => (
              <div
                key={m}
                className="absolute top-0 h-2 w-0.5 bg-muted-foreground/50"
                style={{ left: `${(m / 90) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between w-full text-xs text-muted-foreground mt-1">
            <span>30</span>
            <span>60</span>
            <span>90</span>
          </div>
          <Button size="sm" className="mt-4" onClick={() => updateStreak(true)}>
            Testing +1
          </Button>
          <span className="mt-2 text-xs text-muted-foreground">Freezes: {freezes}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}