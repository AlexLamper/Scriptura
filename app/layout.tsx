import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Scriptura",
  description: "Scriptura is an online learning platform to learn more about the bible.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the session from the server
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="antialiased">
        {/* Pass session to the SessionProvider */}
        <SessionProvider session={session}>
          <div className="bg-gray-100 min-h-screen mx-auto p-6">
            <Header />
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
