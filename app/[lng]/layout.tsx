import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "../../components/providers/theme-provider";
import { languages } from "../../app/i18n/settings";

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
    url: "https://scriptura-edu.com",
    siteName: "Scriptura",
    images: [
      {
        url: "https://scriptura-edu.com/og-image.svg",
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
    images: ["https://scriptura-edu.com/og-image.svg"],
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
}: Readonly<{ children: React.ReactNode }>) {
  // Structured Data for search engines using JSON-LD
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://scriptura-edu.com",
    logo: "https://scriptura-edu.com/favicon.ico",
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
    <html lang="en">
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
        <link rel="canonical" href="https://scriptura-edu.com" />

        {/* Alternate language tags */}
        <link rel="alternate" hrefLang="en" href="https://scriptura-edu.com" />
        <link rel="alternate" hrefLang="nl" href="https://scriptura-edu.nl" />

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
      <body className="antialiased bg-gray-100">
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
