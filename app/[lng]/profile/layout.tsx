import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/SessionProvider";
import { Header } from "../../../components/header";
import { AppSidebar } from "../../../components/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar"

export const metadata: Metadata = {
  title: "Scriptura | Profile",
  description: "Scriptura is an online learning platform to learn more about the bible.",
};

export default async function ProfileLayout({
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
              <Header params={{
              lng: ""
            }} />
              {children}
            </div>
          </SidebarProvider>
        </SessionProvider>
      </div>
  );
}
