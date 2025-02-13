'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface QuizType {
  _id: string;
  title: string;
  description: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data.quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes found</p>
        ) : (
          <ul className="space-y-6">
            {quizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <Link href={`/quizzes/${quiz._id}`}>
                  <div className="cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      {quiz.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{quiz.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
