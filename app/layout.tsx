import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "../components/providers/theme-provider";
import { cookieName, fallbackLng } from "./i18n/settings";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
  description:
    "Scriptura is an online learning platform offering a wide range of Bible courses, interactive quizzes, and a supportive community to deepen your biblical knowledge and faith.",
  keywords: [
    "Bible",
    "Online Bible Courses",
    "Bible Study",
    "Biblical Education",
    "Scripture",
    "Faith",
    "Christian Learning",
    "Quizzes",
    "Online Quizzes",
    "Bible Quizzes",
    "Scriptura",
    "Bible Lessons",
    "Bible Courses",
    "Biblical Knowledge",
    "Bible Community",
    "Religious Education",
    "Theology",
    "Christelijk onderwijs",
    "Bijbelstudie",
    "Bijbelcursus",
    "Bijbelse educatie",
    "Bijbelse kennis",
    "Christelijk geloof",
    "Online bijbelcursussen",
    "Online leren",
    "Online onderwijs",
    "Spirituele groei",
    "Geloof",
    "Heilige Schrift",
    "Bijbel",
    "Bible Verses",
    "Bible Quotes",
    "Scripture Study",
    "Online Learning",
    "Educational Platform",
    "Bible Education Platform",
    "Bible Quizzes Platform",
    "Interactive Quizzes",
    "Learning Community",
    "Spiritual Community",
    "Online Community",
    "Biblical Studies",
    "Christian Community",
    "Biblical Courses",
    "Bible Training",
    "Faith Education",
    "Bible Insights",
    "Biblical Insights",
    "Biblical Wisdom",
    "Christian Insights",
    "Bible Trivia",
    "Religious Trivia",
    "Biblical Trivia",
    "Bible Challenges",
    "Learning Bible",
    "Digital Bible Learning",
    "Scripture Learning",
    "Bible Tools",
    "Bible Study Tools",
    "Online Faith Courses",
    "Digital Church",
    "Modern Bible Study",
    "Bible Curriculum",
    "Bible Education Resources",
    "Biblical Resources",
    "Theology Courses",
    "Online Theology",
    "Church Education",
    "Gospel",
    "Online Gospel Studies",
    "Spiritual Learning",
    "Divine Wisdom",
    "Holy Bible Studies",
    "Scripture Education",
    "Bible Community Platform",
    "Christian Platform",
    "Religious Learning Platform",
    "Bible Knowledge Hub",
    "Faith Community",
    "Biblical Community",
    "Bible Study Community",
    "Bible Quiz App",
    "Bible Learning App",
    "Mobile Bible Courses",
    "Mobile Bible Study",
    "Digital Bible Courses",
    "E-Learning Bible",
    "Biblical E-Learning",
    "Faith Based Learning",
    "God’s Word",
    "Divine Learning",
    "Bible App",
    "Christelijk platform",
    "Bijbelse quizzen",
    "Bijbel leren",
    "Geloofscursus",
    "Bijbelse trivia",
    "Bijbelse uitdagingen",
    "Online kerk",
    "Bijbelse wijsheid",
  ],
  openGraph: {
    title:
      "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
    description:
      "Discover comprehensive Bible courses, interactive quizzes, and a vibrant community to enhance your biblical education and spiritual growth.",
    url: "https://scriptura.cloud",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura.cloud/og-image.svg",
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
    title:
      "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
    description:
      "Enhance your biblical knowledge with Scriptura's comprehensive courses, interactive quizzes, and supportive community.",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
    images: ["https://scriptura.cloud/og-image.svg"],
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
    canonical: "https://scriptura.cloud",
  },
  metadataBase: new URL("https://scriptura.cloud"),
};



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value || fallbackLng;

  // Structured Data for search engines using JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://scriptura.cloud",
    logo: "https://scriptura.cloud/favicon.ico",
    name: "Scriptura",
    description:
      "Scriptura is an online learning platform offering a wide range of Bible courses, interactive quizzes, and a supportive community to deepen your biblical knowledge and faith.",
    sameAs: [
      "https://www.facebook.com/YourFacebookPage",
      "https://www.twitter.com/YourTwitterHandle",
      "https://www.instagram.com/YourInstagramHandle",
    ],
  };

  return (
    <html lang={lng}>
      <head>
        <meta charSet="UTF-8" />

        {/* Essential meta tags for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education"
        />
        <meta
          name="keywords"
          content="Bible,Online Bible Courses,Bible Study,Biblical Education,Scripture,Faith,Christian Learning,Quizzes,Online Quizzes,Bible Quizzes,Scriptura,Bible Lessons,Bible Courses,Biblical Knowledge,Bible Community,Religious Education,Theology,Christelijk onderwijs,Bijbelstudie,Bijbelcursus,Bijbelse educatie,Bijbelse kennis,Christelijk geloof,Online bijbelcursussen,Online leren,Online onderwijs,Spirituele groei,Geloof,Heilige Schrift,Bijbel,Bible Verses,Bible Quotes,Scripture Study,Online Learning,Educational Platform,Bible Education Platform,Bible Quizzes Platform,Interactive Quizzes,Learning Community,Spiritual Community,Online Community,Biblical Studies,Christian Community,Biblical Courses,Bible Training,Faith Education,Bible Insights,Biblical Insights,Biblical Wisdom,Christian Insights,Bible Trivia,Religious Trivia,Biblical Trivia,Bible Challenges,Learning Bible,Digital Bible Learning,Scripture Learning,Bible Tools,Bible Study Tools,Online Faith Courses,Digital Church,Modern Bible Study,Bible Curriculum,Bible Education Resources,Biblical Resources,Theology Courses,Online Theology,Church Education,Gospel,Online Gospel Studies,Spiritual Learning,Divine Wisdom,Holy Bible Studies,Scripture Education,Bible Community Platform,Christian Platform,Religious Learning Platform,Bible Knowledge Hub,Faith Community,Biblical Community,Bible Study Community,Bible Quiz App,Bible Learning App,Mobile Bible Courses,Mobile Bible Study,Digital Bible Courses,E-Learning Bible,Biblical E-Learning,Faith Based Learning,God’s Word,Divine Learning,Bible App,Christelijk platform,Bijbelse quizzen,Bijbel leren,Geloofscursus,Bijbelse trivia,Bijbelse uitdagingen,Online kerk,Bijbelse wijsheid"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://scriptura.cloud" />

        {/* Favicons and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`antialiased bg-gray-100 ${inter.variable} ${merriweather.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div id="main-content" className="min-h-screen mx-auto w-full">
            {children}
          </div>
        </ThemeProvider>
        {/* Load External Scripts After Interactive */}
        <Script src="https://js.stripe.com/v3/" strategy="afterInteractive" />
      </body>
    </html>
  );
}
