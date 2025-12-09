import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/providers/SessionProvider";
import { Header } from "../../components/layout/header";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | My Notes & Highlights",
  description:
    "Manage all your Bible study notes and highlights in one place. Search, organize, and review your spiritual insights.",
  keywords: [
    "Bible notes",
    "Scripture highlights",
    "Bible study notes",
    "Spiritual journal",
    "Note taking",
    "Bible highlights",
    "Scripture study",
    "Personal notes",
    "Bible journaling",
    "Study notes",
    "Scripture insights",
    "Bible annotations",
    "Spiritual notes",
    "Bible study tools",
    "Note organization",
    "Scripture management",
    "Bible study journal",
    "Personal reflections",
    "Scripture collection",
    "Bible verse notes"
  ],
  openGraph: {
    title: "Scriptura | My Notes & Highlights",
    description:
      "Organize and manage your Bible study notes and highlights with Scriptura's powerful note-taking system.",
    url: "https://scriptura-edu.com/notes",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-notes.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Bible Study Notes & Highlights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | My Notes & Highlights",
    description:
      "Manage your Bible study notes and highlights with Scriptura's note organization system.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-notes.jpg"],
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
};

interface NotesLayoutProps {
  children: React.ReactNode;
}

export default async function NotesLayout({ children }: NotesLayoutProps) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-background">
      <SessionProvider session={session}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <div className="lg:px-4 lg:pb-4 lg:pt-2 px-1 pb-1 pt-1">
                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
