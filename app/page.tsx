"use client"

import type React from "react"
import { PremiumPrediction } from "@/components/premium-prediction"

import { useEffect, useState } from "react"
import { sdk } from "@farcaster/miniapp-sdk"

type LuckResult = {
  score: number
  label: string
  message: string
}

type BirthInfo = {
  date: string
  time: string
}

function calculateLuckScore(date: Date, birthInfo?: BirthInfo): number {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  let seed = y * 10000 + m * 100 + d

  // If birth info is provided, factor it into the calculation
  if (birthInfo) {
    const birthDate = new Date(birthInfo.date)
    const [hours, minutes] = birthInfo.time.split(":").map(Number)

    const birthSeed =
      birthDate.getFullYear() * 1000 +
      (birthDate.getMonth() + 1) * 100 +
      birthDate.getDate() * 10 +
      hours +
      minutes / 60

    seed = seed * birthSeed
  }

  return Math.round(Math.abs(Math.sin(seed)) * 100)
}

export default function HomePage() {
  const [luck, setLuck] = useState<LuckResult | null>(null)
  const [dateStr, setDateStr] = useState("")
  const [loading, setLoading] = useState(false)
  const [birthInfo, setBirthInfo] = useState<BirthInfo | null>(null)
  const [showBirthForm, setShowBirthForm] = useState(false)
  const [birthDate, setBirthDate] = useState("")
  const [birthTime, setBirthTime] = useState("")
  const [isFarcaster, setIsFarcaster] = useState(false)

  useEffect(() => {
    const storedBirthInfo = localStorage.getItem("birthInfo")
    if (storedBirthInfo) {
      const info = JSON.parse(storedBirthInfo) as BirthInfo
      setBirthInfo(info)
      const today = new Date()
      setDateStr(today.toDateString())
      loadLuck(today, info)
    } else {
      // First-time user, show birth form
      setShowBirthForm(true)
    }

    const initializeFarcaster = async () => {
      try {
        const context = await sdk.context
        console.log("[v0] Farcaster context available:", context)

        await sdk.actions.ready()
        console.log("[v0] Farcaster SDK ready")
        setIsFarcaster(true)
      } catch (error) {
        console.log("[v0] Not in Farcaster environment:", error)
        setIsFarcaster(false)
      }
    }

    // Only initialize if we're likely in Farcaster
    if (typeof window !== "undefined") {
      // Check if we have the Farcaster SDK available
      if (sdk && sdk.context) {
        initializeFarcaster()
      } else {
        // Running standalone (Base app, direct URL, etc.)
        console.log("[v0] Standalone mode - no Farcaster SDK")
        setIsFarcaster(false)
      }
    }
  }, [])

  async function loadLuck(date: Date, info?: BirthInfo) {
    setLoading(true)
    const score = calculateLuckScore(date, info)

    try {
      const response = await fetch("/api/luck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, birthInfo: info }),
      })

      const data = await response.json()
      setLuck({
        score,
        label: data.label,
        message: data.message,
      })
    } catch (error) {
      console.error("[v0] Error loading luck:", error)
      setLuck({
        score,
        label: getFallbackLabel(score),
        message: "Something went wrong, but your luck is still here!",
      })
    } finally {
      setLoading(false)
    }
  }

  function getFallbackLabel(score: number): string {
    if (score >= 80) return "Super Lucky ✨"
    if (score >= 60) return "Good Vibes 😄"
    if (score >= 40) return "Okay-ish 😌"
    if (score >= 20) return "Low Luck 😶"
    return "Rest Mode 😴"
  }

  function handleBirthSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!birthDate || !birthTime) return

    const info: BirthInfo = { date: birthDate, time: birthTime }
    setBirthInfo(info)
    localStorage.setItem("birthInfo", JSON.stringify(info))
    setShowBirthForm(false)

    const today = new Date()
    setDateStr(today.toDateString())
    loadLuck(today, info)
  }

  if (showBirthForm) {
    return (
      <main className="w-full flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur shadow-2xl p-6 space-y-5">
          <header className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Welcome to Daily Luck
            </h1>
            <p className="text-sm text-slate-300">Enter your birth details for personalized luck readings</p>
            {!isFarcaster && (
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1 w-fit mx-auto">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Powered by Base Network
              </div>
            )}
          </header>

          <form onSubmit={handleBirthSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-medium text-slate-300 block">
                Date of Birth
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="birthTime" className="text-sm font-medium text-slate-300 block">
                Time of Birth
              </label>
              <input
                type="time"
                id="birthTime"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25"
            >
              Get My Daily Luck
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center pt-1">
            Your birth info is stored locally and never shared
          </p>
        </div>
      </main>
    )
  }

  if (!luck || loading) {
    return (
      <main className="w-full flex justify-center">
        <div className="w-full max-w-sm p-4 text-center text-slate-300">Loading your daily luck...</div>
      </main>
    )
  }

  return (
    <main className="w-full flex justify-center">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur shadow-2xl p-6 space-y-5">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Daily Luck
          </h1>
          <p className="text-xs text-slate-400">{dateStr}</p>
          <p className="text-xs text-slate-500">AI-powered daily fortune for you</p>
          {!isFarcaster && (
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1 w-fit mx-auto mt-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Powered by Base Network
            </div>
          )}
        </header>

        <section className="flex flex-col items-center gap-4 pt-2">
          <div className="relative">
            <div className="h-36 w-36 rounded-full border-4 border-indigo-500/30 flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
              <div className="h-28 w-28 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-900/80">
                <span className="text-4xl font-bold bg-gradient-to-br from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  {luck.score}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xl font-semibold text-slate-100">{luck.label}</p>
        </section>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-sm text-slate-200 text-center leading-relaxed">{luck.message}</p>
        </div>

        <button
          className="mt-2 w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25"
          onClick={() => {
            const today = new Date()
            loadLuck(today, birthInfo || undefined)
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "🔮 Check Today's Luck"}
        </button>

        {birthInfo && <PremiumPrediction birthInfo={birthInfo} />}

        <p className="text-[10px] text-slate-500 text-center pt-1 flex items-center justify-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Powered by AI • Just for fun
        </p>
      </div>
    </main>
  )
}
