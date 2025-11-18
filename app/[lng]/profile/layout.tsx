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
    "Scriptura profile",
    "Profile management",
    "Account settings",
    "User dashboard",
    "Profile customization",
    "Learning progress",
    "Biblical learning profile",
    "Profile preferences",
    "User account",
    "Profile updates",
    "Personal information",
    "Profile security",
    "Profile privacy",
    "Profile notifications",
    "Profile achievements",
    "Profile badges",
    "Profile statistics",
    "Profile insights",
    "Profile activity",
    "Profile history",
    "Profile settings",
    "Profile customization options",
    "Profile themes",
    "Profile avatars",
    "Profile pictures",
    "Profile cover photos",
    "Profile bio",
    "Profile interests",
    "Profile connections",
    "Profile followers",
    "Profile following",
    "Profile messages",
    "Profile inbox",
    "Profile comments",
    "Profile posts",
    "Profile likes",
    "Profile bookmarks",
    "Profile favorites",
    "Profile reviews",
    "Profile ratings",
    "Profile feedback",
    "Profile support",
    "Profile help",
    "Profile tutorials",
    "Profile guides",
    "Profile FAQs",
    "Profile resources",
    "Profile community",
    "Profile forums",
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

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const session = await getServerSession();
  const { lng } = await params;

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng }} />
            <div className="lg:px-4 lg:pb-4 lg:pt-2 px-1 pb-1 pt-1">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
