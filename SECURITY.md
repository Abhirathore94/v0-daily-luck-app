# Security Guidelines

## What's Safe in This Public Repo

✅ **Safe to commit:**
- All code files (they use environment variables)
- Configuration files (next.config.mjs, tsconfig.json, etc.)
- Public wallet address: `0x71277516A163e8Ba1a57b83F44042A478c5a766D`
- README and documentation

## What's Protected

🔒 **Never commit these (already in .gitignore):**
- `.env`, `.env.local`, `.env.production` files
- API keys (GROQ_API_KEY, etc.)
- Wallet private keys or seed phrases
- Any passwords or tokens
- Personal identification documents

## Environment Variables

The following environment variables are required and should ONLY be set in Vercel dashboard or your local `.env.local` file:

- `GROQ_API_KEY` - Your Groq API key for AI-generated messages
- `NEXT_PUBLIC_APP_URL` - Your deployed app URL (optional, auto-detected on Vercel)

## How to Set Environment Variables

### Local Development
1. Create a `.env.local` file in the root directory (this file is gitignored)
2. Add your keys:
   \`\`\`
   GROQ_API_KEY=your_groq_api_key_here
   \`\`\`

### Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add `GROQ_API_KEY` with your actual key
4. The key will be injected at build time and runtime

## Reporting Security Issues

If you find a security vulnerability, please report it privately by emailing the repository owner rather than creating a public issue.

## Payment Security

- The payment wallet address `0x71277516A163e8Ba1a57b83F44042A478c5a766D` is public by design (it receives payments)
- Users connect their own wallets (MetaMask, Coinbase, Farcaster) via browser extensions
- No private keys are ever stored or transmitted through this application
- All transactions are signed client-side by the user's wallet
