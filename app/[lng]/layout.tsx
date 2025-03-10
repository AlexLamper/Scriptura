import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "../../components/theme-provider";
import { languages } from "../../app/i18n/settings";

export const metadata: Metadata = {
  title: "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
  description:
    "Scriptura is an online learning platform offering a wide range of Bible courses, interactive quizzes, and a supportive community to deepen your biblical knowledge and faith.",
  keywords: [
    "Bible",
    "Online Learning",
    "Scripture",
    "Courses",
    "Quizzes",
    "Bible Study",
    "Biblical Education",
    "Christian Learning",
    "Faith",
    "Scriptura",
  ],
  openGraph: {
    title: "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
    description:
      "Discover comprehensive Bible courses, interactive quizzes, and a vibrant community to enhance your biblical education and spiritual growth.",
    url: "https://scriptura-edu.com",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Scriptura - Online Bible Courses and Quizzes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
    description:
      "Enhance your biblical knowledge with Scriptura's comprehensive courses, interactive quizzes, and supportive community.",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
    images: ["https://scriptura-edu.com/og-image.jpg"],
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
    canonical: "https://scriptura-edu.com",
    languages: {
      en: "https://scriptura-edu.com",
      nl: "https://scriptura-edu.nl",
    },
  },
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Essential meta tags for responsiveness and icons */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-gray-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen mx-auto w-full">{children}</div>
        </ThemeProvider>
        {/* Load external scripts after interactive to not block initial rendering */}
        <Script src="https://js.stripe.com/v3/" strategy="afterInteractive" />
      </body>
    </html>
  );
}
