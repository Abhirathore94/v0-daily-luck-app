import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

const miniAppEmbed = {
  version: "1",
  imageUrl: `${APP_URL}/api/og`,
  button: {
    title: "Daily Luck",
    action: {
      type: "launch_frame",
      name: "Daily Luck",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.jpg`,
      splashBackgroundColor: "#0f172a",
    },
  },
}

export const metadata: Metadata = {
  title: "Daily Luck - AI Powered Fortune",
  description: "Check your AI-powered daily luck score inside Farcaster.",
  generator: "v0.app",
  ...(APP_URL && APP_URL !== "http://localhost:3000" ? { metadataBase: new URL(APP_URL) } : {}),
  openGraph: {
    title: "Daily Luck - AI Powered Fortune",
    description: "Tap to see your AI-powered luck today ✨",
    images: [
      {
        url: `${APP_URL}/api/og`,
        width: 1200,
        height: 630,
        alt: "Daily Luck App",
      },
    ],
    url: APP_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Luck - AI Powered Fortune",
    description: "Tap to see your AI-powered luck today ✨",
    images: [`${APP_URL}/api/og`],
  },
  other: {
    "fc:miniapp": JSON.stringify(miniAppEmbed),
    "fc:frame": JSON.stringify(miniAppEmbed),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.farcaster.xyz/actions.js" async />
      </head>
      <body className={`${geist.className} bg-slate-950 text-slate-50 antialiased`}>
        <div className="min-h-screen flex items-center justify-center px-3 py-8">{children}</div>
        <Analytics />
      </body>
    </html>
  )
}
