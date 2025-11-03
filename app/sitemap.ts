import { MetadataRoute } from "next";

// Define static routes for the sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  // Define your static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://scriptura-edu.com", lastModified: new Date() },
    { url: "https://scriptura-edu.com/study", lastModified: new Date() },
    { url: "https://scriptura-edu.com/community", lastModified: new Date() },
    { url: "https://scriptura-edu.com/pricing", lastModified: new Date() },
    { url: "https://scriptura-edu.com/privacy-policy", lastModified: new Date() },
    { url: "https://scriptura-edu.com/profile", lastModified: new Date() },
    { url: "https://scriptura-edu.com/resources", lastModified: new Date() },
    { url: "https://scriptura-edu.com/settings", lastModified: new Date() },
    { url: "https://scriptura-edu.com/terms-of-service", lastModified: new Date() },
  ];

  return staticRoutes;
}
