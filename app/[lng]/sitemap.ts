import { MetadataRoute } from "next";
import connectMongoDB from "../../lib/mongodb";
import Quiz from "../../models/Quiz";

// Marking the sitemap function as asynchronous so you can fetch dynamic data
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectMongoDB();

  // Fetch quizzes from your database
  const quizzes = await Quiz.find().lean();

  // Define your static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://scriptura-edu.com", lastModified: new Date() },
    { url: "https://scriptura-edu.com/dashboard", lastModified: new Date() },
    { url: "https://scriptura-edu.com/community", lastModified: new Date() },
    { url: "https://scriptura-edu.com/pricing", lastModified: new Date() },
    { url: "https://scriptura-edu.com/privacy-policy", lastModified: new Date() },
    { url: "https://scriptura-edu.com/profile", lastModified: new Date() },
    { url: "https://scriptura-edu.com/quizzes", lastModified: new Date() },
    { url: "https://scriptura-edu.com/resources", lastModified: new Date() },
    { url: "https://scriptura-edu.com/settings", lastModified: new Date() },
    { url: "https://scriptura-edu.com/terms-of-service", lastModified: new Date() },
  ];

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
    ...quizRoutes,
    ...quizResultRoutes,
  ];
}
