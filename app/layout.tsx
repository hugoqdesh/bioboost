import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zylo | Link in Bio",
  description:
    "Zylo is a new unique link in bio service for social media platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-[1200px] mx-auto">
          <SessionProvider>{children}</SessionProvider>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
