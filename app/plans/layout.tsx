import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/providers/SessionProvider";
import { Header } from "../../components/layout/header";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Bible Reading Plans",
  description: "Discover and follow structured Bible reading plans to enhance your spiritual journey with Scriptura.",
  keywords: [
    "Bible reading plans",
    "Scripture study",
    "Biblical learning",
    "Reading schedule",
    "Spiritual growth"
  ],
  openGraph: {
    title: "Scriptura | Bible Reading Plans",
    description: "Access structured Bible reading plans to deepen your understanding of Scripture through guided study.",
    url: "https://scriptura-edu.com/plans",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-plans.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Bible Reading Plans",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Bible Reading Plans",
    description: "Follow structured Bible reading plans to enhance your spiritual journey with guided Scripture study.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-plans.jpg"],
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
    canonical: "https://scriptura-edu.com/plans",
  },
};

export default async function PlansLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-background">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng: "" }} />
            <div className="lg:px-4 lg:pb-4 lg:pt-2 px-1 pb-1 pt-1">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
