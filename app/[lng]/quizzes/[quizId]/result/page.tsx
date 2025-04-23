"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../../../../../components/ui/button"
import { ArrowLeft, Clock, Trophy, BarChart2 } from "lucide-react"
import { Progress } from "../../../../../components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../components/ui/card"
import { motion } from "framer-motion"

interface QuizHistory {
  date: string
  score: number
  totalQuestions: number
  timeSpent: number
}

export default function QuizResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State to store the parsed parameters
  const [resultData, setResultData] = useState({
    score: 0,
    total: 1,
    timeSpent: 0,
    percentage: 0,
  })

  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([])

  // Parse URL parameters when component mounts or searchParams changes
  useEffect(() => {
    // Get parameters from URL
    const scoreParam = searchParams.get("score")
    const totalParam = searchParams.get("total")
    const timeParam = searchParams.get("time")

    console.log("Raw URL parameters:", { scoreParam, totalParam, timeParam })

    // Parse parameters safely
    const score = scoreParam ? Number.parseInt(scoreParam, 10) : 0
    const total = totalParam ? Number.parseInt(totalParam, 10) : 1
    const timeSpent = timeParam ? Number.parseInt(timeParam, 10) : 0

    // Calculate percentage
    const percentage = Math.round((score / total) * 100)

    console.log("Parsed parameters:", { score, total, timeSpent, percentage })

    // Update state with parsed values
    setResultData({
      score,
      total,
      timeSpent,
      percentage,
    })

    // Store in sessionStorage as a backup
    try {
      sessionStorage.setItem("quiz_result_data", JSON.stringify({ score, total, timeSpent }))
    } catch (err) {
      console.error("Error saving to sessionStorage:", err)
    }
  }, [searchParams])

  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Get performance message based on percentage
  const getPerformanceMessage = () => {
    const { percentage } = resultData
    if (percentage >= 90) return "Excellent!"
    if (percentage >= 75) return "Great job!"
    if (percentage >= 60) return "Good work!"
    if (percentage >= 40) return "Keep practicing!"
    return "You can do better next time!"
  }

  // Load quiz history
  useEffect(() => {
    // Try to load from localStorage
    try {
      const savedHistory = localStorage.getItem("quiz_history")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        console.log("Loaded quiz history on result page:", parsedHistory)
        setQuizHistory(parsedHistory)
      }
    } catch (err) {
      console.error("Error loading quiz history on result page:", err)
    }

    // If URL parameters are missing, try to recover from sessionStorage
    if (!searchParams.get("score") && !searchParams.get("total")) {
      try {
        const savedData = sessionStorage.getItem("quiz_result_data")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          console.log("Recovered data from sessionStorage:", parsedData)

          setResultData({
            score: parsedData.score || 0,
            total: parsedData.total || 1,
            timeSpent: parsedData.timeSpent || 0,
            percentage: Math.round(((parsedData.score || 0) / (parsedData.total || 1)) * 100),
          })
        }
      } catch (err) {
        console.error("Error recovering from sessionStorage:", err)
      }
    }
  }, [searchParams])

  const { score, total, timeSpent, percentage } = resultData

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen max-w-4xl mx-auto py-8 px-4">
      <Button variant="outline" onClick={() => router.push("/quizzes")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
      </Button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-[#18181B] p-8 rounded-lg shadow-lg text-center mb-8"
      >
        <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Quiz Completed!</h1>

        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-300">Score</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">
              {score}/{total}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-300">Percentage</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-200">{percentage}%</p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <p className="text-sm text-purple-600 dark:text-purple-300">Time</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">{formatTime(timeSpent)}</p>
          </div>
        </div>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{getPerformanceMessage()}</p>

        <Progress value={percentage} className="h-3 mb-2" />

        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => router.push(`/quizzes`)}>Try Another Quiz</Button>
          <Button variant="outline" onClick={() => router.back()}>
            Review Answers
          </Button>
        </div>
      </motion.div>

      {quizHistory.length > 0 && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Your Progress
              </CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizHistory.slice(-5).map((entry, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-500">{formatTime(entry.timeSpent)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={(entry.score / entry.totalQuestions) * 100} className="h-2" />
                      <p className="text-sm font-medium">{Math.round((entry.score / entry.totalQuestions) * 100)}%</p>
                    </div>
                    <p className="text-sm mt-1">
                      Score: {entry.score}/{entry.totalQuestions}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
