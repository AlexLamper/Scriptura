"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface QuestionType {
  questionText: string
  options: string[]
  correctAnswer: string
  explanation?: string
}

interface QuizData {
  _id: string
  title: string
  questions: QuestionType[]
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
  const router = useRouter()

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/courses?quizId=${quizId}`)
        const data = await response.json()
        if (data.quiz) {
          setQuiz(data.quiz)
          setSelectedOptions(new Array(data.quiz.questions.length).fill(null))
        } else {
          setError("Quiz not found")
        }
      } catch {
        setError("Error fetching quiz")
      }
    }
    fetchQuiz()
  }, [quizId])

  if (error) {
    return <p className="text-red-500 mt-10">{error}</p>
  }
  if (!quiz) {
    return <p className="mt-10">Loading quiz...</p>
  }

  const question = quiz.questions[currentQuestionIndex]

  const handleAnswer = (option: string) => {
    if (selectedOptions[currentQuestionIndex] === null) {
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions[currentQuestionIndex] = option
      setSelectedOptions(newSelectedOptions)

      if (option === question.correctAnswer) {
        setScore((prevScore) => prevScore + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      router.push(`/quizzes/${quizId}/result?score=${score}&total=${quiz.questions.length}`)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleForward = () => {
    if (currentQuestionIndex < quiz.questions.length - 1 && selectedOptions[currentQuestionIndex] !== null) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  return (
    <div className="min-h-screen lg:max-w-[60%] max-w-[95%]">
      <Button variant="outline" onClick={() => router.push("/quizzes")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Quizzes
      </Button>

      <h1 className="text-4xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-2">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>
      <p className="mb-6">Score: {score}</p>

      <div className="mb-6">
        <h2 className="text-2xl mb-4">{question.questionText}</h2>
        <div className="flex flex-col gap-3 text-white">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`p-3 rounded-md transition-colors ${
                selectedOptions[currentQuestionIndex] === option
                  ? option === question.correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : selectedOptions[currentQuestionIndex] !== null && option === question.correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => handleAnswer(option)}
              disabled={selectedOptions[currentQuestionIndex] !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedOptions[currentQuestionIndex] && question.explanation && (
          <p className="mt-4 text-gray-800">Explanation: {question.explanation}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={handleBack} disabled={currentQuestionIndex === 0} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Button onClick={handleNext} disabled={selectedOptions[currentQuestionIndex] === null} variant="default">
          {currentQuestionIndex < quiz.questions.length - 1 ? "Next" : "Finish"}
        </Button>

        <Button
          onClick={handleForward}
          disabled={
            currentQuestionIndex === quiz.questions.length - 1 || selectedOptions[currentQuestionIndex] === null
          }
          variant="outline"
        >
          Forward <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

