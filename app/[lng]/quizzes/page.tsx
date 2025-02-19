'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface QuizType {
  _id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  subCategory: string;
  difficulty: string;
  tags: string[];
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }

      const data = await response.json();
      setQuizzes(data.quizzes); // Store all quizzes fetched
      setFilteredQuizzes(data.quizzes); // Initially show all quizzes
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterQuizzes = () => {
    let filtered = [...quizzes];

    if (difficulty) {
      filtered = filtered.filter((quiz) => quiz.difficulty === difficulty);
    }
    if (category) {
      filtered = filtered.filter((quiz) => quiz.category === category);
    }
    if (subCategory) {
      filtered = filtered.filter((quiz) => quiz.subCategory === subCategory);
    }

    setFilteredQuizzes(filtered);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes(); // Re-run the filter whenever a filter changes
  }, [difficulty, category, subCategory]); // Trigger filter when any of these change

  return (
    <div>
      <div className="max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Available Quizzes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-white text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Bijbel">Bijbel</option>
            <option value="Bible">Bible</option>
            <option value="Entire Bible">Entire Bible</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="bg-white text-gray-900 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Sub-Categories</option>
            <option value="Genesis">Genesis</option>
            <option value="Exodus">Exodus</option>
            <option value="Biblical Character">Biblical Character</option>
            <option value="Bible Book">Bible Book</option>
            <option value="Historical Event">Historical Event</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <p className="text-gray-600">No quizzes found</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:bg-gray-50 transition-colors"
              >
                <Link href={`/quizzes/${quiz._id}`}>
                  <div className="cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {quiz.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{quiz.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{quiz.difficulty}</span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{quiz.category}</span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">{quiz.subCategory}</span>
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
