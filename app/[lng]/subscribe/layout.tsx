import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";

export const metadata: Metadata = {
  title: "Scriptura | Subscribe",
  description: "Subscribe to Scriptura for exclusive biblical learning resources and personalized content.",
  keywords: [
    "Subscribe",
    "Scriptura subscription",
    "Subscription benefits",
    "Biblical learning subscription",
    "Exclusive content",
    "Learning resources",
    "Personalized content",
    "Subscription plans",
    "Membership options",
    "Scriptura membership",
    "Learning community",
    "Subscription features",
    "Access to courses",
    "Premium content",
    "Subscription pricing",
    "Subscription tiers",
    "Subscription details",
    "Subscription management",
    "Subscription cancellation",
    "Subscription renewal",
    "Subscription support",
    "Subscription help",
    "Subscription FAQs",
    "Subscription terms",
    "Subscription conditions",
    "Subscription policies",
    "Subscription security",
    "Subscription privacy",
    "Subscription data protection",
    "Subscription user rights",
    "Subscription user experience",
    "Subscription user interface",
    "Subscription user feedback",
    "Subscription user reviews",
    "Subscription user testimonials",
    "Subscription user satisfaction",
    "Subscription user engagement",
    "Subscription user retention",
    "Subscription user loyalty",
    "Subscription user growth",
    "Subscription user acquisition",
  ],
  openGraph: {
    title: "Scriptura | Subscribe",
    description: "Subscribe to Scriptura for exclusive biblical learning resources and personalized content.",
    url: "https://scriptura-edu.com/profile",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Subscribe",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura | Subscribe",
    description: "Subscribe to Scriptura for exclusive biblical learning resources and personalized content.",
    site: "@ScripturaEdu",
    creator: "@ScripturaEdu",
    images: ["https://scriptura-edu.com/og-Subscribe.jpg"],
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
    canonical: "https://scriptura-edu.com/Subscribe",
    languages: {
      en: "https://scriptura-edu.com/en/Subscribe",
      nl: "https://scriptura-edu.nl/nl/Subscribe",
    },
  },
};

export default async function SubscribeLayout({
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
