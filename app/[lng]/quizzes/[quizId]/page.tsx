'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface QuestionType {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizData {
  title: string;
  questions: QuestionType[];
}

export default function QuizPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = React.use(params);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/courses?quizId=${quizId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        if (data.quiz) {
          setQuiz(data.quiz);
        } else {
          console.error('Quiz not found');
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <p>Loading...</p>;

  const question = quiz.questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption === question.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz Completed! Your score: ${score + (selectedOption === question.correctAnswer ? 1 : 0)} / ${quiz.questions.length}`);
      router.push('/quizzes');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
      <h2 className="text-lg font-semibold mb-4">{question.questionText}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-2 border rounded ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  );
}
