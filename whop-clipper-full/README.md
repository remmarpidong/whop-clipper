# WhopClipper

AI-powered video clipping tool that transforms long-form content into viral shorts automatically. Built for creators who want to scale their content distribution across TikTok, Instagram Reels, and YouTube Shorts.

## 🎯 Product Overview

WhopClipper is like OpusClip but integrated with Whop clipping campaigns — enabling creators to:
- Upload videos and let AI automatically detect and extract the best moments
- Auto-post clipped content directly to TikTok, Instagram Reels, and YouTube Shorts
- Track earnings from clipped content across platforms
- Manage multiple clipping campaigns through Whop

## 🚀 Features

### Core Features
- **AI-Powered Clip Detection**: Automatically identifies viral-worthy moments using AI analysis
- **Multi-Platform Publishing**: One-click posting to TikTok, Instagram Reels, and YouTube Shorts
- **Campaign Integration**: Works seamlessly with Whop clipping campaigns
- **Earnings Dashboard**: Track revenue from your clipped content
- **Smart Editing**: Auto-captions, trending audio detection, and optimal aspect ratios

### Platform Support
- **TikTok**: Direct posting with trending hashtags
- **Instagram Reels**: Reel creation with cover customization
- **YouTube Shorts**: Automated upload with title optimization

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with Google OAuth + OTP verification
- **User Storage**: JSON file-based (easily replaceable with Supabase/PostgreSQL)
- **Video Processing**: FFmpeg, Cloudinary, or Mux
- **AI**: OpenAI API for clip detection and optimization

## 🔐 Authentication

WhopClipper uses NextAuth.js with Google OAuth for authentication. Each user must also complete an OTP (One-Time Password) verification for additional security.

### Auth Features:
- **Google OAuth**: Sign in with your Google account
- **OTP Verification**: 6-digit code sent to your email for verification
- **Protected Routes**: Dashboard and API routes require authentication
- **Session Management**: JWT-based sessions with access tokens

### Setting up OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy the Client ID and Secret to `.env.local`

## 📁 Project Structure

```
whop-clipper/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Auth routes (NextAuth + OTP)
│   │   │   └── youtube/    # YouTube API routes
│   │   ├── dashboard/       # Protected dashboard
│   │   ├── login/           # Login page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # React components
│   ├── lib/
│   │   ├── auth.ts          # NextAuth configuration
│   │   ├── otp.ts           # OTP utilities
│   │   ├── userStore.ts     # User storage (JSON-based)
│   │   └── utils.ts         # Helper functions
│   ├── types/               # TypeScript types
│   └── middleware.ts        # Route protection
├── public/                  # Static assets
├── data/                    # User data storage (created at runtime)
├── .env.local               # Environment variables
└── package.json
```

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- FFmpeg (for video processing)
- PostgreSQL database

### Installation

```bash
# Clone the repository
cd whop-clipper

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# YouTube OAuth Configuration
YOUTUBE_CLIENT_ID=your_youtube_client_id.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google

# Google API (optional, for additional features)
GOOGLE_API_KEY=your_google_api_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_generate_with_openssl
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure NEXTAUTH_SECRET, run:
```bash
openssl rand -base64 32
```

## 📱 User Flow

1. **Connect Platforms**: Link TikTok, Instagram, and YouTube accounts
2. **Import Content**: Upload video or connect to Whop campaigns
3. **AI Processing**: AI analyzes and suggests clips
4. **Review & Edit**: User reviews AI suggestions, can edit/trim
5. **Publish**: One-click publish to selected platforms
6. **Track**: Monitor performance and earnings

## 🔜 Roadmap

- [x] User authentication with Google OAuth
- [x] OTP email verification
- [x] Protected dashboard routes
- [ ] Social platform OAuth connections
- [ ] Video upload and storage
- [ ] AI clip detection algorithm
- [ ] Video editing UI (trim, captions, effects)
- [ ] Multi-platform publishing
- [ ] Earnings tracking dashboard
- [ ] Whop campaign integration
- [ ] Analytics and insights
- [ ] Team collaboration

## 📄 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ⚡ by Kevin Chen
