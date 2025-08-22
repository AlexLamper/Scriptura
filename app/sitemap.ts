import { MetadataRoute } from "next";
import connectMongoDB from "../lib/mongodb";
import Course from "../models/Course";
import Quiz from "../models/Quiz";

// Marking the sitemap function as asynchronous so you can fetch dynamic data
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectMongoDB();

  // Fetch courses and quizzes from your database
  const courses = await Course.find().lean();
  const quizzes = await Quiz.find().lean();

  // Define your static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://scriptura-edu.com", lastModified: new Date() },
    { url: "https://scriptura-edu.com/dashboard", lastModified: new Date() },
    { url: "https://scriptura-edu.com/community", lastModified: new Date() },
    { url: "https://scriptura-edu.com/courses", lastModified: new Date() },
    { url: "https://scriptura-edu.com/pricing", lastModified: new Date() },
    { url: "https://scriptura-edu.com/privacy-policy", lastModified: new Date() },
    { url: "https://scriptura-edu.com/profile", lastModified: new Date() },
    { url: "https://scriptura-edu.com/quizzes", lastModified: new Date() },
    { url: "https://scriptura-edu.com/resources", lastModified: new Date() },
    { url: "https://scriptura-edu.com/settings", lastModified: new Date() },
    { url: "https://scriptura-edu.com/terms-of-service", lastModified: new Date() },
  ];

  // Add dynamic course pages
  const courseRoutes = courses.map((course) => ({
    url: `https://scriptura-edu.com/courses/${course._id}`,
    lastModified: course.updatedAt ? new Date(course.updatedAt) : new Date(),
  }));

  // Optionally, if courses have lessons, add their routes too.
  // Adjust the property names as needed based on your Course schema.
  const lessonRoutes = courses.flatMap((course) =>
    course.lessons
      ? course.lessons.map((lesson: { _id: string; updatedAt?: string }) => ({
          url: `https://scriptura-edu.com/courses/${course._id}/lessons/${lesson._id}`,
          lastModified: lesson.updatedAt ? new Date(lesson.updatedAt) : new Date(),
        }))
      : []
  );

  // Add dynamic quiz pages
  const quizRoutes = quizzes.map((quiz) => ({
    url: `https://scriptura-edu.com/quizzes/${quiz._id}`,
    lastModified: quiz.updatedAt ? new Date(quiz.updatedAt) : new Date(),
  }));

  // If you have a separate route for quiz results, include those too
  const quizResultRoutes = quizzes.map((quiz) => ({
    url: `https://scriptura-edu.com/quizzes/${quiz._id}/result`,
    lastModified: quiz.updatedAt ? new Date(quiz.updatedAt) : new Date(),
  }));

  // Combine all routes
  return [
    ...staticRoutes,
    ...courseRoutes,
    ...lessonRoutes,
    ...quizRoutes,
    ...quizResultRoutes,
  ];
}
