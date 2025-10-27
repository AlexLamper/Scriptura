import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/providers/SessionProvider";
import { Header } from "../../../components/layout/header";
import { AppSidebar } from "../../../components/layout/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Community",
  description:
    "Join the Scriptura community to connect with fellow learners, share insights, and grow together in biblical knowledge.",
  keywords: [
    "Bible community",
    "Scriptura community",
    "Christian forums",
    "Faith discussions",
    "Biblical discussions",
    "Online Christian community",
    "Scripture study groups",
    "Faith-based community",
    "Bible study forums",
    "Christian support groups",
    "Religious community",
    "Spiritual growth forums",
    "Bible study discussions",
    "Christian fellowship",
    "Faith sharing",
    "Scripture insights",
    "Bible study partners",
    "Online faith community",
    "Christian mentorship",
    "Biblical education forums",
    "Faith questions",
    "Scripture Q&A",
    "Bible study resources",
    "Christian networking",
    "Faith-based learning",
    "Scripture interpretation",
    "Bible study events",
    "Christian webinars",
    "Faith-based workshops",
    "Scripture challenges",
    "Bible study plans",
    "Christian book clubs",
    "Faith testimonials",
    "Scripture memorization groups",
    "Bible study tools",
    "Christian podcasts",
    "Faith-based blogs",
    "Scripture commentary",
    "Bible study guides",
    "Christian video series",
    "Faith-based courses",
    "Scripture reading plans",
    "Bible study apps",
    "Christian meditation groups",
    "Faith journaling",
    "Scripture art",
    "Bible study newsletters",
    "Christian retreats",
    "Faith-based social media",
  ],
  openGraph: {
    title: "Scriptura | Community",
    description:
      "Engage with the Scriptura community to deepen your faith and biblical understanding through shared experiences and discussions.",
    url: "https://scriptura-edu.com/community",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-community.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Online Bible Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Community",
    description:
      "Connect with fellow believers in the Scriptura community to share insights and grow in your spiritual journey.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-community.jpg"],
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
    canonical: "https://scriptura-edu.com/community",
    languages: {
      en: "https://scriptura-edu.com/en/community",
      nl: "https://scriptura-edu.nl/nl/community",
    },
  },
};

export default async function CommunityLayout({
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
