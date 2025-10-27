import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/providers/SessionProvider";
import { Header } from "../../../components/layout/header";
import { AppSidebar } from "../../../components/layout/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

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
  params: Promise<{ lng: string }>;
}

export default async function NotesLayout({ children, params }: NotesLayoutProps) {
  const session = await getServerSession();
  const resolvedParams = await params;

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Header params={{ lng: resolvedParams.lng }} />
              <div className="px-8 pb-8 pt-4">
                {children}
              </div>
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
