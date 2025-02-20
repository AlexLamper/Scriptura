import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script"

export const metadata: Metadata = {
  title: "Scriptura",
  description: "Scriptura is an online learning platform to learn more about the bible.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">
          <div className="min-h-screen mx-auto w-full">
            {children}
          </div>
      </body>
      <Script src="https://js.stripe.com/v3/" />
    </html>
  );
}
