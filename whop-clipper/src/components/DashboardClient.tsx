"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Scissors, LogOut, User, Video, TrendingUp, Settings, Compass, Briefcase, Plus, Check, Crown, Sparkles } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

interface DashboardClientProps {
  session: Session;
}

type TabType = "discover" | "mywork";

export function DashboardClient({ session }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("discover");
  
  // Get user roles from session
  const roles = (session.user as any)?.roles || [];
  const isCreator = roles.includes("creator");
  const isClipper = roles.includes("clipper");
  const isAdmin = roles.includes("admin");

  // Sample campaigns for discover tab
  const discoverCampaigns = [
    {
      id: "1",
      name: "Tech Review Highlights",
      creator: "TechGuru",
      budget: "$500/month",
      clipsNeeded: 20,
      description: "Looking for skilled clippers to highlight key moments from tech review videos",
      tags: ["Tech", "YouTube", "Reviews"]
    },
    {
      id: "2",
      name: "Gaming Montages",
      creator: "GameStreamPro",
      budget: "$300/month",
      clipsNeeded: 15,
      description: "Create exciting gaming montages from live streams",
      tags: ["Gaming", "Twitch", "Montage"]
    },
    {
      id: "3",
      name: "Cooking Tutorials",
      creator: "ChefMaria",
      budget: "$400/month",
      clipsNeeded: 25,
      description: "Clip best moments from cooking tutorials and recipe videos",
      tags: ["Cooking", "Food", "Tutorial"]
    }
  ];

  // Sample my work campaigns
  const myWorkCampaigns = [
    {
      id: "4",
      name: "Podcast Highlights",
      creator: "DailyPodcast",
      status: "In Progress",
      clipsCompleted: 8,
      clipsTotal: 15,
      payment: "$120 earned"
    }
  ];

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
          <div className="flex items-center gap-4">
            {/* Role Badges */}
            <div className="flex items-center gap-2">
              {roles.map((role: string) => (
                <span 
                  key={role}
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    role === "admin" 
                      ? "bg-amber-500/20 text-amber-400" 
                      : role === "creator" 
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-indigo-500/20 text-indigo-400"
                  }`}
                >
                  {role === "admin" && <Crown className="h-3 w-3" />}
                  {role === "creator" && <Sparkles className="h-3 w-3" />}
                  {role}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              )}
              <span className="text-sm text-zinc-300">{session.user?.name}</span>
            </div>
            <SignOutButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-zinc-400">
              Welcome back, {session.user?.name || "Creator"}!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-zinc-800">
            <button
              onClick={() => setActiveTab("discover")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "discover"
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Compass className="h-4 w-4" />
              Discover
              {isCreator && <span className="ml-1 text-xs bg-violet-500/20 px-1.5 py-0.5 rounded">New</span>}
            </button>
            <button
              onClick={() => setActiveTab("mywork")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "mywork"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              My Work
              {isClipper && <span className="ml-1 text-xs bg-indigo-500/20 px-1.5 py-0.5 rounded">Active</span>}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Total Clips</p>
                  <p className="text-3xl font-bold mt-1">0</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-violet-400" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Total Views</p>
                  <p className="text-3xl font-bold mt-1">0</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">This Month</p>
                  <p className="text-3xl font-bold mt-1">$0</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "discover" ? (
            /* Discover Tab - Browse new campaigns to join */
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Available Campaigns</h2>
                {isCreator && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Campaign
                  </button>
                )}
              </div>
              
              {/* Role-based content */}
              {!isClipper && !isCreator ? (
                <div className="text-center py-12">
                  <Video className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No roles assigned yet</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Contact an admin to get access to campaigns
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {discoverCampaigns.map((campaign) => (
                    <div 
                      key={campaign.id}
                      className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5 hover:border-violet-500/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white">{campaign.name}</h3>
                          <p className="text-sm text-zinc-400">by {campaign.creator}</p>
                        </div>
                        <span className="text-sm font-medium text-emerald-400">{campaign.budget}</span>
                      </div>
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                        {campaign.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {campaign.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="text-xs px-2 py-1 rounded bg-zinc-700 text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-zinc-400">
                          {campaign.clipsNeeded} clips needed
                        </span>
                        <button className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
                          Apply <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* My Work Tab - Current campaigns I'm clipping for */
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">My Active Campaigns</h2>
              </div>
              
              {/* Role-based content */}
              {!isClipper ? (
                <div className="text-center py-12">
                  <Scissors className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">Clipper role not enabled</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Enable the clipper role to start working on campaigns
                  </p>
                </div>
              ) : myWorkCampaigns.length > 0 ? (
                <div className="space-y-4">
                  {myWorkCampaigns.map((campaign) => (
                    <div 
                      key={campaign.id}
                      className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-white">{campaign.name}</h3>
                          <p className="text-sm text-zinc-400">by {campaign.creator}</p>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded ${
                          campaign.status === "In Progress" 
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-zinc-700 text-zinc-400"
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-zinc-400">Progress</span>
                          <span className="text-white">{campaign.clipsCompleted}/{campaign.clipsTotal} clips</span>
                        </div>
                        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                            style={{ width: `${(campaign.clipsCompleted / campaign.clipsTotal) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-emerald-400">{campaign.payment}</span>
                        <button className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
                          View Details <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No active campaigns</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Browse the Discover tab to find campaigns to join
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <p className="font-medium">Create New Clip</p>
                  <p className="text-sm text-zinc-400">Upload or paste URL</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Scissors className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <p className="font-medium">AI Auto-Clip</p>
                  <p className="text-sm text-zinc-400">Let AI find highlights</p>
                </div>
              </button>

              <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-sm text-zinc-400">Connect accounts</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Clips */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Clips</h2>
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400">No clips yet</p>
              <p className="text-sm text-zinc-500 mt-1">
                Create your first clip to get started
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ArrowRight component for inline use
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
