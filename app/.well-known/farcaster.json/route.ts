import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://v0-daily-luck-app.vercel.app"

  const manifest = {
    accountAssociation: {
      header:
        "eyJmaWQiOjkwMzI3MywidHlwZSI6ImF1dGgiLCJrZXkiOiIweDcxMjc3NTE2QTE2M2U4QmExYTU3YjgzRjQ0MDQyQTQ3OGM1YTc2NkQifQ",
      payload: "eyJkb21haW4iOiJ2MC1kYWlseS1sdWNrLWFwcC52ZXJjZWwuYXBwIn0",
      signature: "WbtehCmvcw6ZDdxRC1ktOHuvNX/aAhqc10iMAgHKwR1p5WRX635pwdCY7TVCSngEvVTea3zPcYBQWdANhgJKOxs=",
    },
    miniapp: {
      version: "1",
      name: "Daily Luck",
      iconUrl: `${baseUrl}/icon.jpg`,
      homeUrl: baseUrl,
      imageUrl: `${baseUrl}/api/og`,
      buttonTitle: "Check Your Luck",
      splashImageUrl: `${baseUrl}/splash.jpg`,
      splashBackgroundColor: "#0f172a",
      subtitle: "AI-powered daily fortune",
      description: "Get your personalized daily luck score with AI-generated messages inside Farcaster and Base.",
      primaryCategory: "entertainment",
      tags: ["fun", "daily", "luck", "ai", "fortune"],
      heroImageUrl: `${baseUrl}/api/og`,
      ogTitle: "Daily Luck - AI Powered",
      ogDescription: "Get your personalized daily luck score with AI-generated messages.",
      ogImageUrl: `${baseUrl}/api/og`,
    },
    baseBuilder: {
      ownerAddress: "0xC165B30B15E2CE6F4786737b2daf5a533892E5C8",
    },
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  })
}
