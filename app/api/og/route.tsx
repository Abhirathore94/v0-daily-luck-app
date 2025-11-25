import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4c51bf 0%, #6b46c1 50%, #9333ea 100%)",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          fontSize: 48,
          opacity: 0.9,
          marginBottom: 24,
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        🔮 Farcaster Mini App
      </div>
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          marginBottom: 24,
          background: "linear-gradient(to right, #e0e7ff, #fce7f3)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Daily Luck
      </div>
      <div
        style={{
          fontSize: 36,
          opacity: 0.95,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        AI-Powered Fortune • Tap to check your luck today ✨
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
