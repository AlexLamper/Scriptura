"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslation } from "../../../app/i18n/client"
import { use } from "react";

interface QuizType {
  _id: string
  title: string
  description: string
  language: string
  category: string
  subCategory: string
  difficulty: string
  tags: string[]
}

export default function QuizzesPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "quizzes");

  const [quizzes, setQuizzes] = useState<QuizType[]>([])
  const [filteredQuizzes, setFilteredQuizzes] = useState<QuizType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [difficulty, setDifficulty] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [subCategory, setSubCategory] = useState<string>("")

  const fetchQuizzes = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/courses")
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes")
      }

      const data = await response.json()
      setQuizzes(data.quizzes) // Store all quizzes fetched
      setFilteredQuizzes(data.quizzes) // Initially show all quizzes
    } catch (error) {
      console.error("Error fetching quizzes:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterQuizzes = () => {
    let filtered = [...quizzes]

    if (difficulty) {
      filtered = filtered.filter((quiz) => quiz.difficulty === difficulty)
    }
    if (category) {
      filtered = filtered.filter((quiz) => quiz.category === category)
    }
    if (subCategory) {
      filtered = filtered.filter((quiz) => quiz.subCategory === subCategory)
    }

    setFilteredQuizzes(filtered)
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  useEffect(() => {
    filterQuizzes() // Re-run the filter whenever a filter changes
  }, [difficulty, category, subCategory]) // Only include necessary dependencies

  return (
    <div className="min-h-screen pt-4">
      <div className="max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">{t("available_quizzes")}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-white dark:bg-[rgb(24,24,27)] text-gray-900 dark:text-white p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("all_difficulties")}</option>
            <option value="beginner">{t("beginner")}</option>
            <option value="intermediate">{t("intermediate")}</option>
            <option value="hard">{t("hard")}</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white dark:bg-[rgb(24,24,27)] text-gray-900 dark:text-white p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("all_categories")}</option>
            <option value="Bijbel">{t("bijbel")}</option>
            <option value="Bible">{t("bible")}</option>
            <option value="Entire Bible">{t("entire_bible")}</option>
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="bg-white dark:bg-[rgb(24,24,27)] text-gray-900 dark:text-white p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{t("all_subcategories")}</option>
            <option value="Genesis">{t("genesis")}</option>
            <option value="Exodus">{t("exodus")}</option>
            <option value="Biblical Character">{t("biblical_character")}</option>
            <option value="Bible Book">{t("bible_book")}</option>
            <option value="Historical Event">{t("historical_event")}</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">{t("no_quizzes_found")}</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <li
                key={quiz._id}
                className="bg-white dark:bg-[#2C2C33] rounded-lg shadow-lg p-6 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/${lng}/quizzes/${quiz._id}`}>
                  <div className="cursor-pointer">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{quiz.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{quiz.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {quiz.difficulty}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {quiz.category}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {quiz.subCategory}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

