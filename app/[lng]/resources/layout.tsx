import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Bible Study Resources",
  description:
    "Explore a comprehensive collection of Bible study resources on Scriptura to deepen your understanding of the scriptures.",
  keywords: [
    "Bible study resources",
    "Scriptura resources",
    "Biblical study materials",
    "Scripture study tools",
    "Online Bible resources",
    "Bible study guides",
    "Bible commentaries",
    "Bible study plans",
    "Biblical reference materials",
    "Bible dictionaries",
    "Bible concordances",
    "Bible study articles",
    "Bible study videos",
    "Bible study podcasts",
    "Bible study courses",
    "Bible study apps",
    "Bible study software",
    "Bible study worksheets",
    "Bible study journals",
    "Bible study groups",
    "Bible study forums",
    "Bible study blogs",
    "Bible study newsletters",
    "Bible study webinars",
    "Bible study workshops",
    "Bible study conferences",
    "Bible study events",
    "Bible study tools online",
    "Bible study resources for beginners",
    "Bible study resources for kids",
    "Bible study resources for teens",
    "Bible study resources for adults",
    "Bible study resources for small groups",
    "Bible study resources for churches",
    "Bible study resources for families",
    "Bible study resources for educators",
    "Bible study resources for pastors",
    "Bible study resources for women",
    "Bible study resources for men",
    "Bible study resources for seniors",
    "Bible study resources for youth",
    "Bible study resources for college students",
    "Bible study resources for new believers",
    "Bible study resources for spiritual growth",
    "Bible study resources for daily devotionals",
    "Bible study resources for in-depth study",
    "Bible study resources for personal growth",
    "Bible study resources for group discussions",
    "Bible study resources for Bible literacy",
  ],
  openGraph: {
    title: "Scriptura | Comprehensive Bible Study Resources",
    description:
      "Access Scriptura's extensive library of Bible study resources to enrich your scriptural knowledge and spiritual journey.",
    url: "https://scriptura-edu.com/resources",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-resources.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Comprehensive Bible Study Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Comprehensive Bible Study Resources",
    description:
      "Discover a wealth of Bible study materials on Scriptura to enhance your understanding and engagement with the scriptures.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-resources.jpg"],
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
    canonical: "https://scriptura-edu.com/resources",
    languages: {
      en: "https://scriptura-edu.com/en/resources",
      nl: "https://scriptura-edu.nl/nl/resources",
    },
  },
};

export default async function ResourcesLayout({
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
