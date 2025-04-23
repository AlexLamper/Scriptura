"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft, ArrowRight, HelpCircle, BookOpen, Bookmark, Clock, BarChart2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "../../../../components/ui/progress"
import { StudyMaterials } from "../../../../components/study-materials"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"

interface BibleVerse {
  reference: string
  text: string
  translation: string
}

interface QuestionType {
  questionText: string
  options: string[]
  correctAnswer: string
  explanation?: string
  relatedVerses?: string[]
}

interface QuizData {
  _id: string
  title: string
  questions: QuestionType[]
  studyMaterials?: {
    bibleVerses: BibleVerse[]
    summary?: string
    learningObjectives?: string[]
  }
}

interface QuizPageParams {
  quizId: string
}

interface QuizHistory {
  date: string
  score: number
  totalQuestions: number
  timeSpent: number // in seconds
}

interface BookmarkedQuestion {
  quizId: string
  questionIndex: number
  questionText: string
}

export default function QuizPage({ params }: { params: Promise<QuizPageParams> }) {
  const { quizId } = use(params)
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([])
  const [score, setScore] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showStudyMaterials, setShowStudyMaterials] = useState(true)
  const [studyCompleted, setStudyCompleted] = useState(false)
  const [showRelatedVerses, setShowRelatedVerses] = useState(false)
  const router = useRouter()

  // New state variables for the requested features
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<BookmarkedQuestion[]>([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([])
  const [randomizedOptions, setRandomizedOptions] = useState<string[][]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Debug logs to verify state
  useEffect(() => {
    console.log("Timer:", timer)
    console.log("Is timer running:", isTimerRunning)
    console.log("Bookmarked questions:", bookmarkedQuestions)
    console.log("Randomized options:", randomizedOptions)
    console.log("Show study materials:", showStudyMaterials)
    console.log("Study completed:", studyCompleted)
  }, [timer, isTimerRunning, bookmarkedQuestions, randomizedOptions, showStudyMaterials, studyCompleted])

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/courses?quizId=${quizId}`)
        const data = await response.json()

        if (data.quiz) {
          console.log("Fetched quiz data:", data.quiz)
          setQuiz(data.quiz)
          setSelectedOptions(new Array(data.quiz.questions.length).fill(null))

          // Check if user has already completed the study for this quiz
          const studyStatus = localStorage.getItem(`quiz_${quizId}_study_completed`)
          if (studyStatus === "true") {
            setStudyCompleted(true)
            setShowStudyMaterials(false)
          }

          // Load bookmarked questions from localStorage
          loadBookmarkedQuestions()

          // Load quiz history from localStorage
          loadQuizHistory()

          // Randomize options for each question
          randomizeOptions(data.quiz.questions)
        } else {
          setError("Quiz not found")
        }
      } catch (err) {
        console.error("Error fetching quiz:", err)
        setError("Error fetching quiz")
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuiz()

    // Start the timer when the quiz begins (after study materials)
    if (!showStudyMaterials && studyCompleted) {
      setIsTimerRunning(true)
    }

    return () => {
      // Save timer value when component unmounts
      if (timer > 0) {
        saveQuizProgress()
      }
    }
  }, [quizId])

  // Update timer state when study materials are hidden and study is completed
  useEffect(() => {
    if (!showStudyMaterials && studyCompleted && !isTimerRunning) {
      setIsTimerRunning(true)
    }
  }, [showStudyMaterials, studyCompleted, isTimerRunning])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning])

  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Randomize options for all questions
  const randomizeOptions = (questions: QuestionType[]) => {
    if (!questions || questions.length === 0) return

    console.log("Randomizing options for questions:", questions.length)

    const randomizedOptionsArray: string[][] = []

    questions.forEach((question) => {
      // Create a copy of options and shuffle them
      const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5)
      randomizedOptionsArray.push(shuffledOptions)

      console.log("Original options:", question.options)
      console.log("Shuffled options:", shuffledOptions)
    })

    setRandomizedOptions(randomizedOptionsArray)
  }

  // Load bookmarked questions from localStorage
  const loadBookmarkedQuestions = () => {
    try {
      const savedBookmarks = localStorage.getItem("bookmarked_questions")
      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks)
        setBookmarkedQuestions(parsedBookmarks)
        console.log("Loaded bookmarks:", parsedBookmarks)
      }
    } catch (err) {
      console.error("Error loading bookmarks:", err)
    }
  }

  // Save bookmarked questions to localStorage
  const saveBookmarkedQuestions = (bookmarks: BookmarkedQuestion[]) => {
    try {
      localStorage.setItem("bookmarked_questions", JSON.stringify(bookmarks))
      console.log("Saved bookmarks:", bookmarks)
    } catch (err) {
      console.error("Error saving bookmarks:", err)
    }
  }

  // Toggle bookmark for current question
  const toggleBookmark = () => {
    if (!quiz) return

    const currentQuestion = quiz.questions[currentQuestionIndex]
    const existingBookmarkIndex = bookmarkedQuestions.findIndex(
      (bq) => bq.quizId === quizId && bq.questionIndex === currentQuestionIndex,
    )

    let updatedBookmarks: BookmarkedQuestion[]

    if (existingBookmarkIndex >= 0) {
      // Remove bookmark
      updatedBookmarks = bookmarkedQuestions.filter((_, index) => index !== existingBookmarkIndex)
    } else {
      // Add bookmark
      updatedBookmarks = [
        ...bookmarkedQuestions,
        {
          quizId,
          questionIndex: currentQuestionIndex,
          questionText: currentQuestion.questionText,
        },
      ]
    }

    setBookmarkedQuestions(updatedBookmarks)
    saveBookmarkedQuestions(updatedBookmarks)
  }

  // Check if current question is bookmarked
  const isCurrentQuestionBookmarked = (): boolean => {
    return bookmarkedQuestions.some((bq) => bq.quizId === quizId && bq.questionIndex === currentQuestionIndex)
  }

  // Load quiz history from localStorage
  const loadQuizHistory = () => {
    try {
      const savedHistory = localStorage.getItem("quiz_history")
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory)
        setQuizHistory(parsedHistory)
        console.log("Loaded quiz history:", parsedHistory)
      }
    } catch (err) {
      console.error("Error loading quiz history:", err)
    }
  }

  // Save quiz history to localStorage
  const saveQuizHistory = (history: QuizHistory[]) => {
    try {
      localStorage.setItem("quiz_history", JSON.stringify(history))
      console.log("Saved quiz history:", history)
    } catch (err) {
      console.error("Error saving quiz history:", err)
    }
  }

  // Save current quiz progress
  const saveQuizProgress = () => {
    // We'll save the progress when the quiz is completed in handleNext
    // This is just a placeholder for saving partial progress if needed
  }

  // Navigate to a bookmarked question
  const goToBookmarkedQuestion = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex)
    setShowDashboard(false)
  }

  const handleStudyComplete = () => {
    setStudyCompleted(true)
    setShowStudyMaterials(false)
    // Save study completion status
    localStorage.setItem(`quiz_${quizId}_study_completed`, "true")
    // Start the timer when study is completed
    setIsTimerRunning(true)
  }

  const handleBackToQuizzes = () => {
    router.push("/quizzes")
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen"
      >
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </motion.div>
    )
  }

  if (isLoading || !quiz) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </motion.div>
    )
  }

  // Show study materials if available and not completed
  if (
    showStudyMaterials &&
    quiz.studyMaterials &&
    quiz.studyMaterials.bibleVerses &&
    quiz.studyMaterials.bibleVerses.length > 0
  ) {
    console.log("Rendering study materials")
    return (
      <StudyMaterials
        quizTitle={quiz.title}
        bibleVerses={quiz.studyMaterials.bibleVerses}
        summary={quiz.studyMaterials.summary}
        learningObjectives={quiz.studyMaterials.learningObjectives}
        onComplete={handleStudyComplete}
        onBack={handleBackToQuizzes}
      />
    )
  }

  // Show dashboard if requested
  if (showDashboard) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => setShowDashboard(false)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quiz
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Your Progress Dashboard</h1>

        <Tabs defaultValue="history">
          <TabsList className="mb-4">
            <TabsTrigger value="history">Quiz History</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarked Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance History</CardTitle>
                <CardDescription>Track your progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                {quizHistory.length > 0 ? (
                  <div className="space-y-4">
                    {quizHistory.map((entry, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Time: {formatTime(entry.timeSpent)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={(entry.score / entry.totalQuestions) * 100} className="h-2" />
                          <p className="text-sm font-medium">
                            {Math.round((entry.score / entry.totalQuestions) * 100)}%
                          </p>
                        </div>
                        <p className="text-sm mt-1">
                          Score: {entry.score}/{entry.totalQuestions}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No quiz history available yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarks">
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Questions</CardTitle>
                <CardDescription>Review questions you&apos;ve marked for later</CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarkedQuestions.filter((bq) => bq.quizId === quizId).length > 0 ? (
                  <div className="space-y-3">
                    {bookmarkedQuestions
                      .filter((bq) => bq.quizId === quizId)
                      .map((bookmark, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => goToBookmarkedQuestion(bookmark.questionIndex)}
                        >
                          <div className="flex items-start gap-2">
                            <Bookmark className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                            <div>
                              <p className="font-medium">Question {bookmark.questionIndex + 1}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{bookmark.questionText}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No bookmarked questions for this quiz.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const question = quiz.questions[currentQuestionIndex]
  const hasRelatedVerses = question.relatedVerses && question.relatedVerses.length > 0

  // Get randomized options for current question
  const currentOptions = randomizedOptions[currentQuestionIndex] || question.options

  const handleAnswer = (option: string) => {
    if (selectedOptions[currentQuestionIndex] === null) {
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions[currentQuestionIndex] = option
      setSelectedOptions(newSelectedOptions)

      // Check if the selected option is the correct answer
      if (option === question.correctAnswer) {
        setScore((prevScore) => prevScore + 1)
      }
      setShowExplanation(true)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowExplanation(false)
      setShowRelatedVerses(false)
    } else {
      // Quiz completed - save history
      setIsTimerRunning(false)

      const newHistoryEntry: QuizHistory = {
        date: new Date().toISOString(),
        score,
        totalQuestions: quiz.questions.length,
        timeSpent: timer,
      }

      const updatedHistory = [...quizHistory, newHistoryEntry]
      setQuizHistory(updatedHistory)
      saveQuizHistory(updatedHistory)

      // Log the values being passed to ensure they're correct
      console.log("Redirecting to results with:", {
        score,
        total: quiz.questions.length,
        time: timer,
      })

      // Use a more reliable way to construct the URL with parameters
      const searchParams = new URLSearchParams()
      searchParams.set("score", score.toString())
      searchParams.set("total", quiz.questions.length.toString())
      searchParams.set("time", timer.toString())

      router.push(`/quizzes/${quizId}/result?${searchParams.toString()}`)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setShowExplanation(false)
      setShowRelatedVerses(false)
    }
  }

  const toggleRelatedVerses = () => {
    setShowRelatedVerses(!showRelatedVerses)
  }

  // Find related Bible verses for the current question
  const relatedVerses = question.relatedVerses
    ?.map((reference) => {
      return quiz.studyMaterials?.bibleVerses.find((verse) => verse.reference === reference)
    })
    .filter(Boolean) as BibleVerse[] | undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen mx-auto py-4"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/quizzes")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
          </Button>

          {studyCompleted && quiz.studyMaterials?.bibleVerses?.length > 0 && (
            <Button variant="outline" onClick={() => setShowStudyMaterials(true)}>
              <BookOpen className="mr-2 h-4 w-4" /> Review Study Materials
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowDashboard(true)}>
            <BarChart2 className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
      >
        {quiz.title}
      </motion.h1>

      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>

          <Button
            variant={isCurrentQuestionBookmarked() ? "default" : "outline"}
            size="sm"
            onClick={toggleBookmark}
            className={
              isCurrentQuestionBookmarked()
                ? "bg-[#0f172a] hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-700"
                : "border-gray-400 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
            }
          >
            <Bookmark className={`h-5 w-5 ${isCurrentQuestionBookmarked() ? "fill-white" : ""}`} />
            <span className="ml-1">{isCurrentQuestionBookmarked() ? "Bookmarked" : "Bookmark"}</span>
          </Button>
        </div>
        <Progress
          value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
          className="w-full bg-gray-100 dark:bg-gray-700"
        >
          <div className="h-full rounded-full bg-[#0f172a] dark:bg-blue-600" />
        </Progress>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formatTime(timer)}</span>
        </div>
        <p className="text-lg font-semibold text-[#0f172a] dark:text-blue-400">Score: {score}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-white dark:bg-[#2a2b2f] rounded-lg shadow-lg p-6 border border-gray-100 dark:border-[#91969e52]"
        >
          <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-white">{question.questionText}</h2>
          <div className="flex flex-col gap-3">
            {currentOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-md transition-colors ${
                  selectedOptions[currentQuestionIndex] === option
                    ? option === question.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : selectedOptions[currentQuestionIndex] !== null && option === question.correctAnswer
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 dark:bg-[#1f2937] text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#374151]"
                }`}
                onClick={() => handleAnswer(option)}
                disabled={selectedOptions[currentQuestionIndex] !== null}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showExplanation && question.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-[#e9ebfa] dark:bg-blue-900/30 rounded-md"
              >
                <div className="flex items-center mb-2">
                  <HelpCircle className="text-[#0f172a] dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-[#0f172a] dark:text-blue-200">Explanation</h3>
                </div>
                <p className="text-[#0f172a] dark:text-blue-200">{question.explanation}</p>

                {hasRelatedVerses && (
                  <Button
                    variant="link"
                    onClick={toggleRelatedVerses}
                    className="mt-2 text-[#0f172a] dark:text-blue-200"
                  >
                    {showRelatedVerses ? "Hide Related Verses" : "Show Related Verses"}
                  </Button>
                )}
              </motion.div>
            )}

            {showRelatedVerses && relatedVerses && relatedVerses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-md"
              >
                <div className="flex items-center mb-2">
                  <BookOpen className="text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Related Bible Verses</h3>
                </div>
                <div className="space-y-4">
                  {relatedVerses.map((verse, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-4">
                      <p className="font-semibold text-green-800 dark:text-green-200">
                        {verse.reference} ({verse.translation})
                      </p>
                      <p className="text-green-800 dark:text-green-200">{verse.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedOptions[currentQuestionIndex] === null}
          className="bg-[#0f172a] hover:bg-[#1e293b] dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? "Next" : "Finish"}
          {currentQuestionIndex < quiz.questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  )
}
