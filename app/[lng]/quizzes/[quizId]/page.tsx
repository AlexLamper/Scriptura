'use client';
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

interface QuestionType {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizData {
  _id: string;
  title: string;
  questions: QuestionType[];
}

interface QuizPageParams {
  quizId: string;
}

export default function QuizPage({ params }: { params: Promise<QuizPageParams> }) {
  // Unwrap the promise using React.use() to extract the quizId
  const { quizId } = use(params);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/courses?quizId=${quizId}`);
        const data = await response.json();
        if (data.quiz) {
          setQuiz(data.quiz);
        } else {
          setError('Quiz not found');
        }
      } catch {
        setError('Error fetching quiz');
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (error) {
    return <p className="text-red-500 mt-10">{error}</p>;
  }
  if (!quiz) {
    return <p className="mt-10">Loading quiz...</p>;
  }

  const question = quiz.questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    if (option === question.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      router.push(`/quizzes/${quizId}/result?score=${score}&total=${quiz.questions.length}`);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mt-6 mb-4">
        {quiz.title}
      </h1>
      <p className="mb-2">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>
      <p className="mb-6">Score: {score}</p>
      <div className="">
        <h2 className="text-2xl mb-4">
          {question.questionText}
        </h2>
        <div className="flex flex-col gap-3 text-white lg:max-w-[60%] max-w-[95%]">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`p-3 rounded-md transition-colors ${
                selectedOption === option
                  ? option === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedOption && question.explanation && (
          <p className="mt-4 text-gray-800">
            Explanation: {question.explanation}
          </p>
        )}
        <button
          className="mt-6 bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded hover:cursor-pointer transition-colors"
          onClick={handleNext}
          disabled={!selectedOption}
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
}
