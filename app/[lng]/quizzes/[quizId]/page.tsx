"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft, ArrowRight, HelpCircle, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "../../../../components/ui/progress"
import { StudyMaterials } from "../../../../components/study-materials"

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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/courses?quizId=${quizId}`)
        const data = await response.json()
        if (data.quiz) {
          setQuiz(data.quiz)
          setSelectedOptions(new Array(data.quiz.questions.length).fill(null))

          // Check if user has already completed the study for this quiz
          const studyStatus = localStorage.getItem(`quiz_${quizId}_study_completed`)
          if (studyStatus === "true") {
            setStudyCompleted(true)
            setShowStudyMaterials(false)
          }
        } else {
          setError("Quiz not found")
        }
      } catch {
        setError("Error fetching quiz")
      }
    }
    fetchQuiz()
  }, [quizId])

  const handleStudyComplete = () => {
    setStudyCompleted(true)
    setShowStudyMaterials(false)
    // Save study completion status
    localStorage.setItem(`quiz_${quizId}_study_completed`, "true")
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

  if (!quiz) {
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
  if (showStudyMaterials && quiz.studyMaterials?.bibleVerses?.length > 0) {
    return (
      <div className="min-h-screen max-w-4xl mx-auto py-8">
        <Button variant="outline" onClick={() => router.push("/quizzes")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
        </Button>

        <StudyMaterials
          quizTitle={quiz.title}
          bibleVerses={quiz.studyMaterials.bibleVerses}
          summary={quiz.studyMaterials.summary}
          learningObjectives={quiz.studyMaterials.learningObjectives}
          onComplete={handleStudyComplete}
        />
      </div>
    )
  }

  const question = quiz.questions[currentQuestionIndex]
  const hasRelatedVerses = question.relatedVerses && question.relatedVerses.length > 0

  const handleAnswer = (option: string) => {
    if (selectedOptions[currentQuestionIndex] === null) {
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions[currentQuestionIndex] = option
      setSelectedOptions(newSelectedOptions)

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
      router.push(`/quizzes/${quizId}/result?score=${score}&total=${quiz.questions.length}`)
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
      className="min-h-screen max-w-4xl mx-auto py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/quizzes")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
        </Button>

        {studyCompleted && quiz.studyMaterials?.bibleVerses?.length > 0 && (
          <Button variant="outline" onClick={() => setShowStudyMaterials(true)}>
            <BookOpen className="mr-2 h-4 w-4" /> Review Study Materials
          </Button>
        )}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
      >
        {quiz.title}
      </motion.h1>

      <div className="mb-6 space-y-2">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
        <Progress value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} className="w-full" />
        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Score: {score}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8 bg-white dark:bg-[#18181B] rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-white">{question.questionText}</h2>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
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
                      : "bg-gray-100 dark:bg-[#5a5a5dc2] text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#78787dc2]"
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
                className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-md"
              >
                <div className="flex items-center mb-2">
                  <HelpCircle className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Explanation</h3>
                </div>
                <p className="text-blue-800 dark:text-blue-200">{question.explanation}</p>

                {hasRelatedVerses && (
                  <Button
                    variant="link"
                    onClick={toggleRelatedVerses}
                    className="mt-2 text-blue-800 dark:text-blue-200"
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

        <Button onClick={handleNext} disabled={selectedOptions[currentQuestionIndex] === null} variant="default">
          {currentQuestionIndex < quiz.questions.length - 1 ? "Next" : "Finish"}
          {currentQuestionIndex < quiz.questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  )
}

