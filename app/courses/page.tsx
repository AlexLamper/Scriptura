// app/courses/page.tsx

import React from 'react';
import connectMongoDB from '@/libs/mongodb';
import Course from '@/models/Course';
import { CourseGrid } from '@/components/course-grid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const categories = ["Old Testament", "New Testament", "Biblical History", "Theology", "Christian Living"];

export default async function CoursesPage() {
  await connectMongoDB();

  let courses = [];

  try {
    courses = await Course.find();
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Bible Study Courses</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="relative w-full md:w-96">
          <Input type="search" placeholder="Search courses" className="pl-10" />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>
      </div>
      <CourseGrid courses={courses} />
    </div>
  );
}
