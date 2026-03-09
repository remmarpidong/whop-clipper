"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Scissors, LogOut, User, Video, TrendingUp, Settings, Users, Search, Plus } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";
import Link from "next/link";

type Tab = "discover" | "mywork";

export default function DashboardClient({ session }: { session: Session }) {
  const [activeTab, setActiveTab] = useState<Tab>("discover");

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Scissors className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">WhopClipper</span>
          </Link>
          <div className="flex items-center gap-4">
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-2 text-zinc-400">
                Create campaigns or clip for others
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-violet-700 hover:to-indigo-700 transition-colors">
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-800 mb-8">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab("discover")}
                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === "discover"
                    ? "border-violet-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Search className="h-4 w-4" />
                Discover
              </button>
              <button
                onClick={() => setActiveTab("mywork")}
                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === "mywork"
                    ? "border-violet-500 text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Video className="h-4 w-4" />
                My Work
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "discover" ? (
            /* Discover Tab - Browse campaigns to join */
            <div className="space-y-6">
              {/* Search/Filter */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Campaign Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Empty State */}
                <div className="col-span-full text-center py-12">
                  <Search className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No campaigns available yet</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Check back later or create your own campaign
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* My Work Tab - Current campaigns I'm clipping for */
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Active Campaigns</p>
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
                      <p className="text-sm text-zinc-400">Clips Submitted</p>
                      <p className="text-3xl font-bold mt-1">0</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Scissors className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Earnings</p>
                      <p className="text-3xl font-bold mt-1">$0</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* My Campaigns */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-xl font-semibold mb-4">My Campaigns</h2>
                <div className="text-center py-12">
                  <Video className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No active campaigns</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Join a campaign in Discover or create your own
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid gap-4 md:grid-cols-2">
                <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                  <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">Create Campaign</p>
                    <p className="text-sm text-zinc-400">Start your own campaign</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Settings</p>
                    <p className="text-sm text-zinc-400">Manage your account</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
