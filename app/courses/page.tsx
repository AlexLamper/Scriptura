"use client";

import React, { useEffect, useState } from "react";
import { CourseType } from "@/lib/models";

const CoursePage = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const courses: CourseType[] = await response.json();
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-8">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">No courses found</p>
        ) : (
          <ul className="space-y-6">
            {courses.map((course) => (
              <li
                key={course._id.toString()}
                className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{course.description}</p>
                <p className="text-gray-600 dark:text-gray-300">Instructor: {course.instructor}</p>
                <p className="text-gray-600 dark:text-gray-300">Category: {course.category}</p>
                <p className="text-gray-600 dark:text-gray-300">Difficulty: {course.difficulty}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Duration: {course.totalDuration} minutes
                </p>
                <ul className="flex flex-wrap mt-4">
                  {course.tags.map((tag) => (
                    <li
                      key={tag}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
