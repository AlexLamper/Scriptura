import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script"
import { ThemeProvider } from "../../components/theme-provider"
import { languages } from "../../app/i18n/settings"

export const metadata: Metadata = {
  title: "Scriptura",
  description: "Scriptura is an online learning platform to learn more about the bible.",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <div className="min-h-screen mx-auto w-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
      <Script src="https://js.stripe.com/v3/" />
    </html>
  );
}
