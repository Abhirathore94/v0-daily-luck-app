import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { score, birthInfo } = await req.json()

    let category = "neutral"
    let label = "Neutral Day 🙂"

    if (score >= 80) {
      category = "super lucky"
      label = "Super Lucky ✨"
    } else if (score >= 60) {
      category = "good vibes"
      label = "Good Vibes 😄"
    } else if (score >= 40) {
      category = "okay"
      label = "Okay-ish 😌"
    } else if (score >= 20) {
      category = "low luck"
      label = "Low Luck 😶"
    } else {
      category = "rest mode"
      label = "Rest Mode 😴"
    }

    const birthContext = birthInfo
      ? ` This reading is personalized based on their birth date (${birthInfo.date}) and time (${birthInfo.time}).`
      : ""

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `You are a mystical fortune teller. Generate a short, personalized daily luck message (max 25 words) for someone whose luck score is ${score}/100 (${category}).${birthContext} Be creative, encouraging, and slightly mystical. Don't mention the score or category explicitly.`,
      maxTokens: 60,
    })

    return Response.json({
      score,
      label,
      message: text.trim(),
    })
  } catch (error) {
    console.error("[v0] Error generating luck message:", error)

    return Response.json({
      score: 50,
      label: "Neutral Day 🙂",
      message: "The cosmos is mysterious today. Trust your instincts and move forward with confidence.",
    })
  }
}
