import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Dashboard",
  description:
    "Access your personalized dashboard on Scriptura to manage courses, track progress, and engage with the community.",
  keywords: [
    "Scriptura dashboard",
    "User dashboard",
    "Personalized dashboard",
    "Course management",
    "Progress tracking",
    "Community engagement",
    "Bible courses",
    "Learning dashboard",
    "User profile",
    "Account settings",
    "Dashboard analytics",
    "Learning progress",
    "Course completion",
    "Quiz performance",
    "Interactive dashboard",
    "Dashboard features",
    "User notifications",
    "Dashboard customization",
    "Learning journey",
    "Scriptura profile",
    "User achievements",
    "Dashboard insights",
    "Educational dashboard",
    "Dashboard navigation",
    "User interface",
    "Dashboard design",
    "Responsive dashboard",
    "Dashboard accessibility",
    "User experience",
    "Dashboard updates",
    "Learning goals",
    "Dashboard tools",
    "User support",
    "Dashboard tutorials",
    "Dashboard resources",
    "Learning milestones",
    "User community",
    "Dashboard feedback",
    "Dashboard optimization",
    "User engagement",
    "Dashboard security",
    "Learning analytics",
    "Dashboard performance",
    "User activity",
    "Dashboard personalization",
    "Learning dashboard features",
    "User dashboard benefits",
    "Dashboard enhancements",
    "Scriptura user dashboard",
    "Dashboard best practices",
  ],
  openGraph: {
    title: "Scriptura | User Dashboard",
    description:
      "Manage your courses, track learning progress, and connect with the Scriptura community through your personalized dashboard.",
    url: "https://scriptura-edu.com/dashboard",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - User Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | User Dashboard",
    description:
      "Access your Scriptura dashboard to manage courses, monitor progress, and engage with the community.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-dashboard.jpg"],
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
    canonical: "https://scriptura-edu.com/dashboard",
    languages: {
      en: "https://scriptura-edu.com/en/dashboard",
      nl: "https://scriptura-edu.nl/nl/dashboard",
    },
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-50 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng: "" }} />
            <div className="p-8">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
