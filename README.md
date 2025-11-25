# Daily Luck - Farcaster Mini App

AI-powered daily luck score app for Farcaster and Base Network.

## Features

- Personalized daily luck scores based on birth date and time
- AI-generated fortune messages using Groq
- Works in Farcaster Mini Apps and standalone on Base Network
- Beautiful gradient UI with smooth animations

## Environment Variables

Required:
- `GROQ_API_KEY` - Your Groq API key for AI-generated messages

Optional:
- `NEXT_PUBLIC_APP_URL` - Your deployed app URL (defaults to vercel URL)

## Deployment

This app deploys seamlessly to Vercel. Make sure to add your `GROQ_API_KEY` environment variable in the Vercel dashboard.

## Farcaster Mini App
Live at: https://farcaster.xyz/miniapps/nhAj7X6jVFSq/daily-luck

## Tech Stack

- Next.js 16 with React 19
- Farcaster Mini App SDK
- Groq AI for message generation
- TailwindCSS v4
- TypeScript
