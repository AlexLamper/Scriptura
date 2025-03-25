"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Progress } from "../../../../components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { useTranslation } from "../../../../app/i18n/client";
import { ArrowLeft } from "lucide-react";

type CourseType = {
  _id: string;
  title: string;
  description: string;
  instructor: string | { _id: string; name: string; email?: string };
  category: string;
  difficulty: string;
  totalDuration: number;
  tags: string[];
  lessons?: { title: string; duration: number; content: string }[];
};

export default function CoursePage({
  params,
}: {
  params: Promise<{ lng: string; courseId: string }>;
}) {
  // Unwrap the params promise using use()
  const { lng, courseId } = use(params);
  const { t } = useTranslation(lng, "course");

  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(`Fetching course with ID: ${courseId}`);
        const response = await fetch(`/api/courses/${courseId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch course");
        }

        const data = await response.json();
        console.log("Course data received:", data);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {t("loading")}
        </span>
        <div className="w-12 h-12 border-4 border-[#1f2937] border-t-transparent rounded-full animate-spin mt-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <Button onClick={() => window.history.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">{t("course_not_found")}</div>
        <Button onClick={() => window.history.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("go_back")}
        </Button>
      </div>
    );
  }

  // Handle instructor which might be an object or a string
  const instructorName =
    typeof course.instructor === "object"
      ? course.instructor._id.toString()
      : course.instructor;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-2">
        <Button onClick={() => window.location.href = `/courses`} className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">{course.title}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-gray-200 dark:bg-[#3d3d3ff2]">
              <CardHeader>
                <CardTitle>{t("course_details")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>
                    {t("instructor")}: {instructorName}
                  </span>
                  <span>
                    {t("category")}: {course.category}
                  </span>
                  <span>
                    {t("difficulty")}: {course.difficulty}
                  </span>
                  <span>
                    {t("duration")}: {course.totalDuration} {t("minutes")}
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">{t("tags")}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {course.lessons && course.lessons.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">{t("lessons")}:</h3>
                    <div className="space-y-2">
                      {course.lessons.map((lesson, index) => (
                        <Link
                          href={`/${lng}/courses/${courseId}/lessons/${index}`}
                          key={index}
                        >
                          <div className="p-3 bg-white dark:bg-[#2C2C33] rounded hover:bg-gray-100 dark:hover:bg-[#1c1c1e] transition cursor-pointer">
                            {lesson.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-gray-200 dark:bg-[#3d3d3ff2]">
              <CardHeader>
                <CardTitle>{t("course_progress")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="mb-2" />
                <p className="text-sm mb-4">
                  33% {t("complete")}
                </p>
                <Button className="w-full">{t("continue_course")}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
