import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgentSetup | AI Operations for Australian Real Estate Agents",
  description:
    "AgentSetup responds to every lead in 90 seconds, 24 hours a day. AI-powered follow-up, CRM management, proposals, and briefings built by real estate agents for real estate agents.",
  keywords: [
    "real estate AI",
    "real estate automation",
    "AI lead follow-up",
    "Australian real estate",
    "real estate CRM",
    "AgentSetup",
  ],
  openGraph: {
    title: "AgentSetup | AI Operations for Australian Real Estate Agents",
    description:
      "Every lead that comes in after hours is a listing you lose to a faster agent. AgentSetup responds in 90 seconds, 24/7.",
    type: "website",
    locale: "en_AU",
    siteName: "AgentSetup",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentSetup | AI Operations for Australian Real Estate Agents",
    description:
      "Every lead that comes in after hours is a listing you lose to a faster agent. AgentSetup responds in 90 seconds, 24/7.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
