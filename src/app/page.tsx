import { Scissors, Share2, TrendingUp, Zap, ArrowRight, Play, Check } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">WhopClipper</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="#" className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-violet-700 hover:to-indigo-700">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-400 border border-violet-500/20 mb-6">
              <Zap className="mr-1 h-3 w-3" />
              AI-Powered Video Clipping
            </span>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Transform Your Whop Campaigns with{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Viral Video Clips
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Automatically turn your long-form content into short, shareable clips 
              optimized for TikTok, Instagram Reels, and YouTube Shorts.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#" className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-base font-medium transition-colors">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#" className="inline-flex items-center justify-center rounded-lg h-12 px-8 border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-base font-medium transition-colors">
                <Play className="mr-2 h-4 w-4" /> Watch Demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-500">No credit card required • 14-day free trial</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything You Need to Go Viral</h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">Powerful AI tools for Whop creators.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <Scissors className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Smart Clipping</h3>
              <p className="text-zinc-400">Automatically identify the most engaging moments.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                <Share2 className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform Posting</h3>
              <p className="text-zinc-400">One-click posting to TikTok, Instagram, YouTube.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earnings Tracking</h3>
              <p className="text-zinc-400">Track conversions, revenue, and ROI in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, Transparent Pricing</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="text-lg font-semibold text-zinc-300">Starter</h3>
              <div className="mt-4 flex items-baseline justify-center"><span className="text-4xl font-bold">$19</span><span className="text-zinc-400 ml-2">/month</span></div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />50 clips/month</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />Basic AI</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />2 platforms</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-violet-500/50 bg-zinc-900/50 p-6 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-violet-600 px-3 py-1 text-xs font-medium text-white">Most Popular</span>
              <h3 className="text-lg font-semibold text-white">Pro</h3>
              <div className="mt-4 flex items-baseline justify-center"><span className="text-4xl font-bold">$49</span><span className="text-zinc-400 ml-2">/month</span></div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />200 clips/month</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />Advanced AI</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />All platforms</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="text-lg font-semibold text-zinc-300">Business</h3>
              <div className="mt-4 flex items-baseline justify-center"><span className="text-4xl font-bold">$99</span><span className="text-zinc-400 ml-2">/month</span></div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />Unlimited clips</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />Premium AI</li>
                <li className="flex items-center text-sm text-zinc-300"><Check className="mr-3 h-4 w-4 text-violet-400" />API access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600">
                <Scissors className="h-3 w-3 text-white" />
              </div>
              <span className="font-semibold">WhopClipper</span>
            </div>
            <p className="text-sm text-zinc-500">© 2026 WhopClipper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
