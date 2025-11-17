import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/providers/SessionProvider";
import { Header } from "../../../components/layout/header";
import { AppSidebar } from "../../../components/layout/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";
import { generatePageMetadata } from "../../../lib/pageMetadata";

interface StudyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  return generatePageMetadata('study', lng);
}

export default async function StudyLayout({
  children,
  params,
}: StudyLayoutProps) {
  const session = await getServerSession();
  const { lng } = await params;

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
