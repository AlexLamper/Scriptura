import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

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
      <body className="antialiased bg-gray-100">
        <SessionProvider session={session}>
          <SidebarProvider>
            <AppSidebar />
            <div className="min-h-screen mx-auto w-full pl-4 pt-6 pr-12">
              <SidebarTrigger />
              <Header />
              {children}
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
