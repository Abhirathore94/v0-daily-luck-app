"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, Sparkles, Check } from "lucide-react"

type PremiumTier = {
  accuracy: number
  price: string
  priceWei: string
  features: string[]
}

const TIERS: PremiumTier[] = [
  {
    accuracy: 50,
    price: "0.99",
    priceWei: "990000000000000", // 0.00099 ETH
    features: ["3-month outlook", "Career insights", "Health tips"],
  },
  {
    accuracy: 70,
    price: "4.99",
    priceWei: "4990000000000000", // 0.00499 ETH
    features: ["6-month outlook", "Love predictions", "Financial advice", "Lucky numbers"],
  },
  {
    accuracy: 92,
    price: "9.99",
    priceWei: "9990000000000000", // 0.00999 ETH
    features: ["12-month outlook", "Life events timeline", "Dream analysis", "Personalized rituals"],
  },
]

const PAYMENT_ADDRESS = "0x71277516A163e8Ba1a57b83F44042A478c5a766D"

export function PremiumPrediction({ birthInfo }: { birthInfo: { date: string; time: string } }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [purchasedTier, setPurchasedTier] = useState<number | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)

  async function connectWallet() {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        alert("Please install MetaMask, Coinbase Wallet, or another Web3 wallet to continue")
        return
      }

      setLoading(true)
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      // Switch to Base network (chainId: 8453)
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x2105" }], // 8453 in hex
        })
      } catch (switchError: any) {
        // Chain not added, try to add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x2105",
                chainName: "Base",
                nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: ["https://basescan.org"],
              },
            ],
          })
        }
      }

      setWalletAddress(accounts[0])
    } catch (error) {
      console.error("[v0] Wallet connection error:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function purchaseTier(tierIndex: number) {
    if (!walletAddress) {
      await connectWallet()
      return
    }

    const tier = TIERS[tierIndex]
    setLoading(true)

    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: walletAddress,
            to: PAYMENT_ADDRESS,
            value: tier.priceWei,
          },
        ],
      })

      console.log("[v0] Transaction sent:", txHash)

      // Generate premium prediction
      const response = await fetch("/api/premium-prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accuracy: tier.accuracy,
          birthInfo,
          txHash,
        }),
      })

      const data = await response.json()
      setPrediction(data.prediction)
      setPurchasedTier(tierIndex)
    } catch (error) {
      console.error("[v0] Purchase error:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (prediction) {
    return (
      <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 space-y-4">
        <div className="flex items-center gap-2 text-purple-300">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Premium {TIERS[purchasedTier!].accuracy}% Prediction</h3>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">{prediction}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Unlock Your Future
        </h3>
        <p className="text-xs text-slate-400">Get AI-powered predictions about your life events</p>
      </div>

      {!walletAddress ? (
        <Button
          onClick={connectWallet}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {loading ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-green-400 text-center">
            Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
        </div>
      )}

      <div className="grid gap-3">
        {TIERS.map((tier, index) => (
          <Card
            key={index}
            className="p-4 bg-slate-800/30 border-slate-700/50 hover:border-purple-500/50 transition-all cursor-pointer"
            onClick={() => purchaseTier(index)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xl font-bold text-purple-300">{tier.accuracy}% Accuracy</div>
                <div className="text-2xl font-bold mt-1">${tier.price}</div>
                <div className="text-xs text-slate-500">Base Network ETH</div>
              </div>
              <Button
                size="sm"
                disabled={loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
              >
                {loading ? "..." : "Buy"}
              </Button>
            </div>
            <ul className="space-y-1.5">
              {tier.features.map((feature, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <p className="text-[10px] text-slate-500 text-center">
        Payments are processed on Base Network. MetaMask, Coinbase Wallet, and Farcaster Wallet supported.
      </p>
    </div>
  )
}
