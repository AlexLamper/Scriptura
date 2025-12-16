import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/providers/SessionProvider";
import { Header } from "../../components/layout/header";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";

export const metadata: Metadata = {
  title: {
    absolute: "Scriptura | Read",
  },
  description: "Read and study the Bible online with Scriptura. Access multiple translations and study tools.",
  keywords: [
    "User profile",
  ],
  openGraph: {
    title: "Scriptura | User Profile",
    description: "Access and manage your Scriptura user profile to enhance your personalized biblical learning journey.",
    url: "https://scriptura.cloud/profile",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura.cloud/og-profile.jpg",
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
    images: ["https://scriptura.cloud/og-profile.jpg"],
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
    canonical: "https://scriptura.cloud/profile",
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
            <div className="lg:px-4 lg:pb-4 lg:pt-2 px-1 pb-1 pt-1">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
