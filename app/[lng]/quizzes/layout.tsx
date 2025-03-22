import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Quizzes",
  description:
    "Engage with interactive Bible quizzes on Scriptura to test and deepen your biblical knowledge.",
  keywords: [
    "Bible quizzes",
    "Scriptura quizzes",
    "Interactive Bible quizzes",
    "Bible trivia",
    "Scripture quizzes",
    "Biblical knowledge tests",
    "Online Bible quizzes",
    "Bible quiz challenges",
    "Bible study quizzes",
    "Bible knowledge assessments",
    "Bible quiz platform",
    "Christian quizzes",
    "Faith quizzes",
    "Bible learning quizzes",
    "Bible quiz games",
    "Bible quiz questions",
    "Bible quiz app",
    "Bible quiz online",
    "Bible quiz for kids",
    "Bible quiz for adults",
    "Bible quiz competition",
    "Bible quiz questions and answers",
    "Bible quiz multiple choice",
    "Bible quiz interactive",
    "Bible quiz fun",
    "Bible quiz educational",
    "Bible quiz community",
    "Bible quiz challenges",
    "Bible quiz tests",
    "Bible quiz assessments",
    "Bible quiz knowledge",
    "Bible quiz scripture",
    "Bible quiz faith",
    "Bible quiz learning",
    "Bible quiz study",
    "Bible quiz engagement",
    "Bible quiz platform",
    "Bible quiz resources",
    "Bible quiz tools",
    "Bible quiz education",
    "Bible quiz growth",
    "Bible quiz development",
    "Bible quiz enrichment",
    "Bible quiz exploration",
    "Bible quiz discovery",
    "Bible quiz insights",
    "Bible quiz wisdom",
    "Bible quiz understanding",
    "Bible quiz enlightenment",
  ],
  openGraph: {
    title: "Scriptura | Interactive Bible Quizzes",
    description:
      "Challenge yourself with Scriptura's interactive Bible quizzes and enhance your understanding of the scriptures.",
    url: "https://scriptura-edu.com/quizzes",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-quizzes.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Interactive Bible Quizzes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Interactive Bible Quizzes",
    description:
      "Test your biblical knowledge with Scriptura's engaging and interactive Bible quizzes.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-quizzes.jpg"],
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
    canonical: "https://scriptura-edu.com/quizzes",
    languages: {
      en: "https://scriptura-edu.com/en/quizzes",
      nl: "https://scriptura-edu.nl/nl/quizzes",
    },
  },
};

export default async function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
        <SessionProvider session={session}>
          <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen mx-auto w-full">
              <Header params={{
              lng: ""
            }} />
              <div className="px-8 pb-8 pt-4">
                {children}
              </div>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </div>
  );
}
