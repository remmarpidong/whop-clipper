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

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: (To be determined - Prisma + PostgreSQL recommended)
- **Auth**: (To be determined - NextAuth or Clerk)
- **Video Processing**: FFmpeg, Cloudinary, or Mux
- **AI**: OpenAI API for clip detection and optimization

## 📁 Project Structure

```
whop-clipper/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication routes
│   │   ├── (dashboard)/    # Dashboard routes
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── clips/           # Video clipping components
│   │   ├── dashboard/      # Dashboard components
│   │   └── layout/          # Layout components
│   ├── lib/
│   │   ├── db.ts            # Database client
│   │   ├── auth.ts          # Auth utilities
│   │   └── utils.ts         # Helper functions
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles
├── public/                  # Static assets
├── prisma/                  # Database schema
└── config/                  # Configuration files
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

```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Social Platforms
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
YOUTUBE_API_KEY=

# AI
OPENAI_API_KEY=

# Video Processing
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## 📱 User Flow

1. **Connect Platforms**: Link TikTok, Instagram, and YouTube accounts
2. **Import Content**: Upload video or connect to Whop campaigns
3. **AI Processing**: AI analyzes and suggests clips
4. **Review & Edit**: User reviews AI suggestions, can edit/trim
5. **Publish**: One-click publish to selected platforms
6. **Track**: Monitor performance and earnings

## 🔜 Roadmap

- [ ] User authentication and onboarding
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
