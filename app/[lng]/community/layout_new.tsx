import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../../../components/providers/SessionProvider";
import { Header } from "../../../components/layout/header";
import { AppSidebar } from "../../../components/layout/app-sidebar";
import { SidebarProvider } from "../../../components/ui/sidebar";
import { generatePageMetadata } from "../../../lib/pageMetadata";

interface CommunityLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  return generatePageMetadata('community', lng);
}

export default async function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const session = await getServerSession();
  const { lng } = await params;

  return (
    <div className="antialiased bg-gray-100 dark:bg-[#18181bf2]">
      <SessionProvider session={session}>
        <SidebarProvider>
          <AppSidebar />
          <div className="min-h-screen mx-auto w-full">
            <Header params={{ lng }} />
            <div className="px-8 pb-8 pt-4">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </div>
  );
}
