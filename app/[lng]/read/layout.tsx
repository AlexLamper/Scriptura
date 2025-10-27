import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/providers/SessionProvider";
import { Header } from "../../../components/layout/header";
import { AppSidebar } from "../../../components/layout/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | User Profile",
  description: "Manage your Scriptura user profile, track your progress, and personalize your biblical learning experience.",
  keywords: [
    "User profile",
  ],
  openGraph: {
    title: "Scriptura | User Profile",
    description: "Access and manage your Scriptura user profile to enhance your personalized biblical learning journey.",
    url: "https://scriptura-edu.com/profile",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - User Profile",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | User Profile",
    description: "Personalize your Scriptura experience by managing your user profile and tracking your biblical learning progress.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://scriptura-edu.com/profile",
    languages: {
      en: "https://scriptura-edu.com/en/profile",
      nl: "https://scriptura-edu.nl/nl/profile",
    },
  },
};

export default async function ReadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng: "" }} />
            <div className="px-8 pb-8 pt-4">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
