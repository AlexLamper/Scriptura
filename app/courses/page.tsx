import React from 'react';

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
    <div>
      <h1>Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              {/* Add more course details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CoursesPage;
