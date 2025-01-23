"use client"

import { CourseGrid } from "@/components/course-grid"
import { NextLessons } from "@/components/next-lessons"
import { CourseRecommendation } from "@/components/course-recommendation"

export default function Home() {
  return (
    <div>
      <CourseGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NextLessons />
        </div>
        <CourseRecommendation />
      </div>
    </div>
  )
}

