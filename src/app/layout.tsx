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
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "AgentSetup | AI Operations for Australian Real Estate Agents",
    description:
      "Every lead that comes in after hours is a listing you lose to a faster agent. AgentSetup responds in 90 seconds, 24/7.",
    type: "website",
    locale: "en_AU",
    siteName: "AgentSetup",
    url: "https://avaracollective.com",
    images: [
      {
        url: "https://avaracollective.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AgentSetup - Your AI ops team. Built by agents.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentSetup | AI Operations for Australian Real Estate Agents",
    description:
      "Every lead that comes in after hours is a listing you lose to a faster agent. AgentSetup responds in 90 seconds, 24/7.",
    images: ["https://avaracollective.com/og-image.png"],
  },
  metadataBase: new URL("https://avaracollective.com"),
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
