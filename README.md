# Daily Luck - AI-Powered Farcaster Mini App

Get your personalized daily luck score with AI-generated mystical messages and future predictions.

## Features

- Daily luck calculation based on date and birth information
- AI-powered personalized messages using Groq
- Birth date and time collection for accurate readings
- Premium future predictions with three accuracy tiers (50%, 70%, 92%)
- Wallet integration for premium features (MetaMask, Coinbase Wallet, Farcaster Wallet)
- Works seamlessly on Farcaster and Base Network
- Responsive design with smooth animations

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **AI:** Groq (Llama 3.3) via AI SDK
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Blockchain:** Base Network (Layer 2)
- **Mini App SDK:** Farcaster Mini App SDK

## Environment Variables

The following environment variable is required:

- `GROQ_API_KEY` - Your Groq API key for AI-generated messages

**Important:** Never commit your `.env` files. Set environment variables in Vercel dashboard for deployment.

## Local Development

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env.local` file and add your Groq API key:
   \`\`\`
   GROQ_API_KEY=your_groq_api_key_here
   \`\`\`
4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This app deploys seamlessly to Vercel. Make sure to add your `GROQ_API_KEY` environment variable in the Vercel dashboard.

## Farcaster Mini App

Live at: https://farcaster.xyz/miniapps/nhAj7X6jVFSq/daily-luck

The app includes a properly configured `/.well-known/farcaster.json` manifest for Farcaster Mini App integration.

## Premium Features

Premium predictions are available in three tiers:
- **50% Accuracy** - $0.99 (3 predictions)
- **70% Accuracy** - $4.99 (5 predictions)
- **92% Accuracy** - $9.99 (10 predictions)

Payments are processed on Base Network to: `0x71277516A163e8Ba1a57b83F44042A478c5a766D`

## Security

Please review [SECURITY.md](SECURITY.md) for important security guidelines. This repository does not contain any private keys, API keys, or sensitive information.

## License

MIT License - Feel free to use this project as you wish.
