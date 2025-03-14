import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Courses",
  description:
    "Explore comprehensive Bible courses on Scriptura to deepen your understanding of the scriptures.",
  keywords: [
    "Bible courses",
    "Scriptura courses",
    "Online Bible courses",
    "Biblical studies",
    "Scripture courses",
    "Christian education",
    "Faith courses",
    "Bible study programs",
    "Biblical education",
    "Bible learning",
    "Bible study online",
    "Bible course certification",
    "Bible course for beginners",
    "Advanced Bible courses",
    "Bible theology courses",
    "Bible history courses",
    "Bible doctrine courses",
    "Bible interpretation courses",
    "Bible literacy courses",
    "Bible ministry courses",
    "Bible teaching courses",
    "Bible training programs",
    "Bible discipleship courses",
    "Bible leadership courses",
    "Bible counseling courses",
    "Bible preaching courses",
    "Bible evangelism courses",
    "Bible hermeneutics courses",
    "Bible exegesis courses",
    "Bible apologetics courses",
    "Bible prophecy courses",
    "Bible survey courses",
    "Bible book studies",
    "Old Testament courses",
    "New Testament courses",
    "Gospel studies",
    "Pauline epistles courses",
    "Pentateuch courses",
    "Wisdom literature courses",
    "Prophetic books courses",
    "Biblical languages courses",
    "Hebrew courses",
    "Greek courses",
    "Bible cultural context courses",
    "Bible archaeology courses",
    "Bible geography courses",
    "Bible literature courses",
    "Bible poetry courses",
    "Bible narrative courses",
    "Bible law courses",
    "Bible ethics courses",
  ],
  openGraph: {
    title: "Scriptura | Comprehensive Bible Courses",
    description:
      "Enroll in Scriptura's comprehensive Bible courses to enhance your scriptural knowledge and spiritual growth.",
    url: "https://scriptura-edu.com/courses",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-courses.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Comprehensive Bible Courses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Comprehensive Bible Courses",
    description:
      "Deepen your scriptural understanding with Scriptura's comprehensive and engaging Bible courses.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-courses.jpg"],
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
    canonical: "https://scriptura-edu.com/courses",
    languages: {
      en: "https://scriptura-edu.com/en/courses",
      nl: "https://scriptura-edu.nl/nl/courses",
    },
  },
};

export default async function CoursesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2] p-8">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng }} />
            {children}
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
