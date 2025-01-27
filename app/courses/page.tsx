"use client";

import React, { useEffect, useState } from "react";
import { CourseType } from "@/lib/models";

const CoursePage = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

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
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="py-8">
      <div className="lg:max-w-3xl max-w-[95%]">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses found</p>
        ) : (
          <ul className="space-y-6">
            {courses.map((courses) => (
              <li
                key={courses._id.toString()}
                className="border rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {courses.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{courses.description}</p>
                <p className="text-gray-600 dark:text-gray-300">Instructor: {courses.instructor}</p>
                <p className="text-gray-600 dark:text-gray-300">Category: {courses.category}</p>
                <p className="text-gray-600 dark:text-gray-300">Difficulty: {courses.difficulty}</p>
                <p className="text-gray-600 dark:text-gray-300">Duration: {courses.totalDuration} minutes</p>
                <ul className="flex flex-wrap mt-4">
                  {courses.tags.map((tag) => (
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
