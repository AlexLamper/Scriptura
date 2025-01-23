import React from 'react';
import Link from 'next/link';

type Course = {
  _id: string;
  title: string;
  description: string;
};

const fetchCourses = async (): Promise<Course[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }

  const response = await fetch(`${baseUrl}/api/courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return response.json();
};

const CoursesPage = async () => {
  let courses: Course[] = [];

  try {
    courses = await fetchCourses();
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="">
        <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <Link href={`/courses/${course._id}`}>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-pink-600 transition-colors">{course.title}</h2>
                    <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                  </div>
                  <div className="bg-gray-100 p-4 text-pink-600 font-medium hover:bg-pink-100 transition-colors">
                    <span>View Details</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
