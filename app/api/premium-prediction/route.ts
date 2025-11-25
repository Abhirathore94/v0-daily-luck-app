import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { accuracy, birthInfo, txHash } = await request.json()

    console.log("[v0] Generating premium prediction:", { accuracy, txHash })

    const birthDate = new Date(birthInfo.date)
    const zodiacSign = getZodiacSign(birthDate)
    const [hours] = birthInfo.time.split(":").map(Number)
    const timeOfDay = hours < 6 ? "early morning" : hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening"

    const prompt = `You are a mystical fortune teller with ${accuracy}% accuracy in predicting life events.

Birth Details:
- Date: ${birthInfo.date}
- Time: ${birthInfo.time} (${timeOfDay})
- Zodiac: ${zodiacSign}

Create a detailed ${accuracy}% accuracy prediction about their future life events. Include:
${accuracy >= 50 ? "- Career and professional developments\n- Health and wellness outlook" : ""}
${accuracy >= 70 ? "- Romantic and relationship predictions\n- Financial opportunities\n- Lucky numbers for the period" : ""}
${accuracy >= 92 ? "- Major life events timeline\n- Dream interpretation guidance\n- Personalized spiritual rituals" : ""}

Write 3-4 paragraphs in a mystical, engaging tone. Be specific and personalized based on their birth time and zodiac sign.`

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.8,
      maxTokens: 500,
    })

    return NextResponse.json({ prediction: text })
  } catch (error) {
    console.error("[v0] Error generating premium prediction:", error)
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 })
  }
}

function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
  return "Pisces"
}
