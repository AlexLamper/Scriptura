import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../components/providers/SessionProvider";
import { Header } from "../../components/layout/header";
import { AppSidebar } from "../../components/layout/app-sidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import { generatePageMetadata } from "../../lib/pageMetadata";

import { cookies } from "next/headers";
import { cookieName, fallbackLng } from "../i18n/settings";

interface ResourcesLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value || fallbackLng;
  return generatePageMetadata('resources', lng);
}

export default async function ResourcesLayout({
  children,
}: ResourcesLayoutProps) {
  const session = await getServerSession();
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value || fallbackLng;

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng }} />
            <div className="lg:px-4 lg:pb-4 lg:pt-2 px-1 pb-1 pt-1">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
