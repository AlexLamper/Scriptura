import { getServerSession } from "next-auth";
import SessionProvider from "../../../../components/SessionProvider";
import { ThemeProvider } from "../../../../components/theme-provider";

export default async function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="antialiased">
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen mx-auto w-full">
            {children}
          </div>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
}
