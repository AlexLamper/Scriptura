import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scriptura - Online Bible Courses, Quizzes & Community for Biblical Education",
  description: "Scriptura is an online learning platform offering a wide range of Bible courses, interactive quizzes, and a supportive community to deepen your biblical knowledge and faith.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}