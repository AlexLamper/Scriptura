"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog"
import { Button } from "./ui/button"

interface GuideProps {
  forceOpen?: boolean
}

export default function OnboardingGuide({ forceOpen = false }: GuideProps) {
  const [open, setOpen] = useState(forceOpen)

  useEffect(() => {
    if (forceOpen) {
      setOpen(true)
      return
    }
    const seen = typeof window !== "undefined" ? localStorage.getItem("guide_seen") : "true"
    if (!seen) {
      setOpen(true)
      localStorage.setItem("guide_seen", "true")
    }
  }, [forceOpen])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Scriptura</DialogTitle>
          <DialogDescription>
            Browse the courses section on your dashboard to start learning at your own pace.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Got it!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
