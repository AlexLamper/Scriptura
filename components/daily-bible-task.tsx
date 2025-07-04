"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Check } from "lucide-react"
import { useTranslation } from "../app/i18n/client"

interface DailyBibleTaskProps {
  params: {
    lng: string
  }
}

interface Task {
  day: number
  passage: string
  theme: string
  text?: string
  questions: string[]
}

export default function DailyBibleTask({ params: { lng } }: DailyBibleTaskProps) {
  const [task, setTask] = useState<Task | null>(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation(lng, "daily-bible-task")

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch("/api/daily-tasks")
        if (!res.ok) throw new Error("Failed to fetch task")
        const data = await res.json()
        setTask(data.task)
        setCompleted(data.completed)
      } catch (err) {
        console.error("Error fetching daily task:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [])

  const handleComplete = async () => {
    try {
      const res = await fetch("/api/daily-tasks", { method: "POST" })
      if (res.ok) {
        setCompleted(true)
      }
    } catch (err) {
      console.error("Error updating progress:", err)
    }
  }

  if (loading) {
    return (
      <Card className="mb-8 border border-border dark:border-[#91969e52] bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <CardContent className="p-6">{t("loading")}</CardContent>
      </Card>
    )
  }

  if (!task) return null

  return (
    <Card className="mb-8 border border-border dark:border-[#91969e52] bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-1">{t("title")}</h2>
        <p className="text-sm text-muted-foreground mb-2">
          {task.passage} - {task.theme}
        </p>
        {task.text && (
          <pre className="whitespace-pre-wrap mb-4 text-sm">{task.text}</pre>
        )}
        <ul className="list-disc pl-5 space-y-2 mb-2">
          {task.questions.map((q, idx) => (
            <li key={idx}>{q}</li>
          ))}
        </ul>
        <Button onClick={handleComplete} disabled={completed} className="gap-2">
          {completed && <Check className="w-4 h-4" />}
          {completed ? t("completed") : t("complete")}
        </Button>
      </CardContent>
    </Card>
  )
}