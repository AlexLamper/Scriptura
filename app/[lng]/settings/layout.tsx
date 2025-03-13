import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Settings",
  description:
    "Manage your Scriptura account settings, including profile information, privacy preferences, and notification preferences, to enhance your learning experience.",
  keywords: [
    "Scriptura settings",
    "account settings",
    "profile management",
    "privacy preferences",
    "notification settings",
    "user preferences",
    "learning platform settings",
    "Scriptura account",
    "user profile",
    "account privacy",
    "notification preferences",
    "Scriptura notifications",
    "user dashboard",
    "account customization",
    "profile settings",
    "learning preferences",
    "Scriptura profile",
    "user account management",
    "platform settings",
    "Scriptura dashboard",
    "account security",
    "user privacy",
    "notification controls",
    "Scriptura notifications",
    "preferences management",
    "user customization",
    "account personalization",
    "profile customization",
    "learning experience",
    "Scriptura features",
    "user settings",
    "account overview",
    "profile overview",
    "notification management",
    "Scriptura preferences",
    "user controls",
    "platform customization",
    "Scriptura security",
    "account activity",
    "user engagement",
    "learning tools",
    "Scriptura tools",
    "user interface",
    "platform interface",
    "account support",
    "user support",
    "Scriptura help",
    "settings management",
  ],
  openGraph: {
    title: "Scriptura | Account Settings",
    description:
      "Customize your Scriptura experience by managing your account settings, including profile details, privacy options, and notification preferences.",
    url: "https://scriptura-edu.com/settings",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-settings.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura Account Settings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Account Settings",
    description:
      "Adjust your Scriptura account settings to personalize your learning journey, including profile information, privacy settings, and notifications.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-settings.jpg"],
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
    canonical: "https://scriptura-edu.com/settings",
    languages: {
      en: "https://scriptura-edu.com/en/settings",
      nl: "https://scriptura-edu.nl/nl/settings",
    },
  },
};

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2] p-8">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng: "" }} />
            {children}
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
