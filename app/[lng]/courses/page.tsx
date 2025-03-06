"use client"

import { useEffect, useState } from "react"
import type { CourseType } from "../../../lib/models"
import { motion } from "framer-motion"
import { Search, BookOpen, Clock, User, Tag, ArrowRight, LanguagesIcon } from "lucide-react"
import Link from "next/link"

const CoursePage = () => {
  const [courses, setCourses] = useState<CourseType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        if (Array.isArray(data.courses)) {
          setCourses(data.courses)
        } else {
          console.error("Fetched data is not an array:", data)
        }
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen pt-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">Explore Our Courses</h1>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[rgb(24,24,27)] dark:border-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={20} />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#2C2C33] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <Link href={`/courses/${course._id}`} className="block h-full">
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{course.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                  <div className="flex items-center mb-2">
                    <User className="text-blue-500 mr-2" size={16} />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Instructor: {course.instructor}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <BookOpen className="text-green-500 mr-2" size={16} />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Category: {course.category}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Tag className="text-yellow-500 mr-2" size={16} />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Difficulty: {course.difficulty}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <LanguagesIcon className="text-red-500 mr-2" size={16} />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Language: {course.language}</p>
                  </div>
                  <div className="flex items-center mb-4">
                    <Clock className="text-purple-500 mr-2" size={16} />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Duration: {course.totalDuration} minutes</p>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center">
                      View Course
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No courses found. Try adjusting your search.
        </p>
      )}
    </div>
  )
}

export default CoursePage

