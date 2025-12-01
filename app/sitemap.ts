import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://scriptura.cloud", lastModified: new Date() },
    { url: "https://scriptura.cloud/study", lastModified: new Date() },
    { url: "https://scriptura.cloud/community", lastModified: new Date() },
    { url: "https://scriptura.cloud/pricing", lastModified: new Date() },
    { url: "https://scriptura.cloud/privacy-policy", lastModified: new Date() },
    { url: "https://scriptura.cloud/profile", lastModified: new Date() },
    { url: "https://scriptura.cloud/resources", lastModified: new Date() },
    { url: "https://scriptura.cloud/settings", lastModified: new Date() },
    { url: "https://scriptura.cloud/terms-of-service", lastModified: new Date() },
  ];

  return staticRoutes;
}
