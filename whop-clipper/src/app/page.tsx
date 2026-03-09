import {
  Scissors,
  Share2,
  TrendingUp,
  Zap,
  ArrowRight,
  Play,
  Check,
} from "lucide-react";

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
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Pricing
            </a>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-violet-700 hover:to-indigo-700"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
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
              optimized for TikTok, Instagram Reels, and YouTube Shorts. Maximize your 
              reach and grow your Whop audience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-base font-medium transition-colors"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-base font-medium transition-colors"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              No credit card required • 14-day free trial
            </p>
          </div>

          {/* Hero Image/Preview */}
          <div className="mt-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-2xl opacity-30" />
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="aspect-video flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                    <Play className="h-8 w-8 text-zinc-400" />
                  </div>
                  <p className="text-zinc-500">Video Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything You Need to Go Viral
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Powerful AI tools designed specifically for Whop creators to maximize 
              their content reach and revenue.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <Scissors className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Smart Clipping</h3>
              <p className="text-zinc-400">
                Our AI analyzes your videos to automatically identify the most 
                engaging moments and create perfect clips optimized for each platform.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                <Share2 className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform Posting</h3>
              <p className="text-zinc-400">
                One-click posting to TikTok, Instagram Reels, YouTube Shorts, 
                and more. Customize captions and hashtags for each platform.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earnings Tracking</h3>
              <p className="text-zinc-400">
                Track how your clips drive traffic and sales to your Whop. 
                Monitor conversions, revenue, and ROI in real-time dashboards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              How WhopClipper Works
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Content</h3>
              <p className="text-zinc-400">
                Link your YouTube channel or upload your videos directly. 
                WhopClipper supports videos of any length.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generates Clips</h3>
              <p className="text-zinc-400">
                Our AI identifies the most engaging moments and creates 
                optimized clips automatically for each platform.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Publish & Track</h3>
              <p className="text-zinc-400">
                One-click post to all platforms and watch your growth 
                with detailed analytics and earnings tracking.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-base font-medium transition-colors"
            >
              Start Creating Clips
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-zinc-300">Starter</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-zinc-400 ml-2">/month</span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">Perfect for getting started</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "50 clips per month",
                  "Basic AI clipping",
                  "2 social platforms",
                  "Basic analytics",
                  "Email support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-zinc-300">
                    <Check className="mr-3 h-4 w-4 text-violet-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 block w-full rounded-lg border border-zinc-700 py-2 text-center text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                Start Free Trial
              </a>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl border border-violet-500/50 bg-zinc-900/50 p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center rounded-full bg-violet-600 px-3 py-1 text-xs font-medium text-white">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">Pro</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-zinc-400 ml-2">/month</span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">For serious creators</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "200 clips per month",
                  "Advanced AI clipping",
                  "All social platforms",
                  "Advanced analytics",
                  "Earnings tracking",
                  "Priority support",
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-zinc-300">
                    <Check className="mr-3 h-4 w-4 text-violet-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 block w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 py-2 text-center text-sm font-medium text-white transition-colors hover:from-violet-700 hover:to-indigo-700"
              >
                Start Free Trial
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-zinc-300">Business</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-zinc-400 ml-2">/month</span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">For teams and agencies</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited clips",
                  "Premium AI features",
                  "All platforms + API",
                  "Full analytics suite",
                  "Earnings tracking",
                  "Dedicated support",
                  "Custom branding",
                ].map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-zinc-300">
                    <Check className="mr-3 h-4 w-4 text-violet-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 block w-full rounded-lg border border-zinc-700 py-2 text-center text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Grow Your Whop Audience?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            Join thousands of creators who are already using WhopClipper to 
            maximize their content reach and revenue.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg h-14 px-10 text-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-medium transition-colors"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <p className="mt-4 text-sm text-zinc-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
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
            <p className="text-sm text-zinc-500">
              © 2026 WhopClipper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
