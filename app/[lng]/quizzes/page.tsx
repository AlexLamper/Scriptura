'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface QuizType {
  _id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  subCategory: string;
  difficulty: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');

  const params = useParams();
  const lang = params.lang as string;

  useEffect(() => {
    setLanguage(lang);
    fetchQuizzes();
  }, [lang]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        language,
        difficulty,
        category,
        subCategory,
      }).toString();
      const response = await fetch(`/api/courses?${queryParams}`);
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

  useEffect(() => {
    fetchQuizzes();
  }, [language, difficulty, category, subCategory]);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Available Quizzes</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-[#111827] text-white p-2 rounded"
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#111827] text-white p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="Old Testament">Old Testament</option>
            <option value="New Testament">New Testament</option>
            <option value="Entire Bible">Entire Bible</option>
          </select>
          
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="bg-[#111827] text-white p-2 rounded"
          >
            <option value="">All Sub-Categories</option>
            <option value="Biblical Character">Biblical Character</option>
            <option value="Bible Book">Bible Book</option>
            <option value="Historical Event">Historical Event</option>
          </select>
          
          <button
            onClick={fetchQuizzes}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <p className="text-gray-400">No quizzes found</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="border border-gray-700 rounded-lg shadow-lg p-6 bg-[#111827] hover:bg-gray-800 transition-colors"
              >
                <Link href={`/${lang}/quizzes/${quiz._id}`}>
                  <div className="cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2 text-red-500">
                      {quiz.title}
                    </h2>
                    <p className="text-gray-300 mb-2">{quiz.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-gray-700 px-2 py-1 rounded">{quiz.difficulty}</span>
                      <span className="bg-gray-700 px-2 py-1 rounded">{quiz.category}</span>
                      <span className="bg-gray-700 px-2 py-1 rounded">{quiz.subCategory}</span>
                    </div>
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