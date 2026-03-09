"use client";

import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { Scissors, LogOut, User, Video, TrendingUp, Settings, Users, Search, Plus, DollarSign, X, ExternalLink } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";
import Link from "next/link";

interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: "active" | "paused" | "completed";
  creatorId: string;
  creatorName: string;
  whopLink?: string;
  payoutRate: number;
  joinedClipperIds: string[];
  createdAt: string;
  hasJoined?: boolean;
}

type Tab = "discover" | "mywork";

export default function DashboardClient({ session }: { session: Session }) {
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [myCampaigns, setMyCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [creating, setCreating] = useState(false);

  // Fetch campaigns
  useEffect(() => {
    fetchCampaigns();
  }, [statusFilter]);

  // Fetch joined campaigns
  useEffect(() => {
    if (session?.user?.id) {
      fetchMyCampaigns();
    }
  }, [session?.user?.id]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`/api/campaigns${params}`);
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyCampaigns = async () => {
    try {
      const res = await fetch("/api/campaigns");
      if (res.ok) {
        const data = await res.json();
        // Filter campaigns where user is a clipper
        const joined = data.filter((c: Campaign) => 
          c.joinedClipperIds?.includes(session.user.id)
        );
        setMyCampaigns(joined);
      }
    } catch (error) {
      console.error("Error fetching my campaigns:", error);
    }
  };

  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const joinCampaign = async (campaignId: string) => {
    setJoinError(null);
    setJoinSuccess(null);
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/join`, {
        method: "POST",
      });
      if (res.ok) {
        // Refresh campaigns
        fetchCampaigns();
        fetchMyCampaigns();
        setJoinSuccess("Successfully joined campaign!");
        setTimeout(() => setJoinSuccess(null), 3000);
      } else {
        const data = await res.json();
        setJoinError(data.error || "Failed to join campaign");
      }
    } catch (error) {
      console.error("Error joining campaign:", error);
      setJoinError("An error occurred while joining");
    }
  };

  const [leaveSuccess, setLeaveSuccess] = useState<string | null>(null);

  const leaveCampaign = async (campaignId: string) => {
    try {
      const res = await fetch(`/api/campaigns/${campaignId}/join`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCampaigns();
        fetchMyCampaigns();
        setLeaveSuccess("Successfully left campaign!");
        setTimeout(() => setLeaveSuccess(null), 3000);
      }
    } catch (error) {
      console.error("Error leaving campaign:", error);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <CreateCampaignModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchCampaigns();
            setCreateSuccess("Campaign created successfully!");
            setTimeout(() => setCreateSuccess(null), 3000);
          }}
        />
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <CampaignDetailModal 
          campaign={selectedCampaign}
          currentUserId={session.user?.id}
          onClose={() => setSelectedCampaign(null)}
          onJoin={() => {
            joinCampaign(selectedCampaign.id);
            setSelectedCampaign(null);
          }}
          onLeave={() => {
            leaveCampaign(selectedCampaign.id);
            setSelectedCampaign(null);
          }}
        />
      )}

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
            <button 
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white hover:from-violet-700 hover:to-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>
          </div>

          {/* Success Message */}
          {createSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
              {createSuccess}
            </div>
          )}

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
              {/* Error/Success Messages */}
              {joinError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {joinError}
                </div>
              )}
              {joinSuccess && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  {joinSuccess}
                </div>
              )}
              {leaveSuccess && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  {leaveSuccess}
                </div>
              )}

              {/* Search/Filter */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-12 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </div>

              {/* Campaign Cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <div className="animate-spin h-8 w-8 border-2 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-zinc-400 mt-4">Loading campaigns...</p>
                  </div>
                ) : filteredCampaigns.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Search className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400">No campaigns available</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Check back later or create your own campaign
                    </p>
                  </div>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <CampaignCard 
                      key={campaign.id} 
                      campaign={campaign} 
                      currentUserId={session.user?.id}
                      onJoin={() => joinCampaign(campaign.id)}
                      onLeave={() => leaveCampaign(campaign.id)}
                      onClick={() => setSelectedCampaign(campaign)}
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            /* My Work Tab - Current campaigns I'm clipping for */
            <div className="space-y-6">
              {/* Success Message */}
              {leaveSuccess && (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  {leaveSuccess}
                </div>
              )}

              {/* Stats */}
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Active Campaigns</p>
                      <p className="text-3xl font-bold mt-1">{myCampaigns.filter(c => c.status === "active").length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                      <Video className="h-6 w-6 text-violet-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Joined Campaigns</p>
                      <p className="text-3xl font-bold mt-1">{myCampaigns.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Potential Earnings</p>
                      <p className="text-3xl font-bold mt-1">
                        ${myCampaigns.reduce((acc, c) => acc + (c.payoutRate || 0), 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* My Campaigns */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h2 className="text-xl font-semibold mb-4">My Campaigns</h2>
                {myCampaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-400">No active campaigns</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Join a campaign in Discover or create your own
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {myCampaigns.map((campaign) => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign} 
                        currentUserId={session.user?.id}
                        onJoin={() => joinCampaign(campaign.id)}
                        onLeave={() => leaveCampaign(campaign.id)}
                        onClick={() => setSelectedCampaign(campaign)}
                        isJoined
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid gap-4 md:grid-cols-2">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left"
                >
                  <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Plus className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-medium">Create Campaign</p>
                    <p className="text-sm text-zinc-400">Start your own campaign</p>
                  </div>
                </button>

                <Link href="/dashboard/settings" className="flex items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors text-left">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium">Settings</p>
                    <p className="text-sm text-zinc-400">Manage your account</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Campaign Card Component
function CampaignCard({ 
  campaign, 
  currentUserId, 
  onJoin, 
  onLeave,
  isJoined = false,
  onClick,
}: { 
  campaign: Campaign;
  currentUserId?: string;
  onJoin: () => void;
  onLeave: () => void;
  isJoined?: boolean;
  onClick?: () => void;
}) {
  const isOwner = campaign.creatorId === currentUserId;
  const hasJoined = campaign.joinedClipperIds?.includes(currentUserId) || isJoined;

  return (
    <div 
      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      {/* Thumbnail placeholder with gradient */}
      <div className="h-32 -mx-6 -mt-6 mb-4 rounded-t-2xl bg-gradient-to-br from-violet-600/20 via-indigo-600/20 to-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className="h-12 w-12 text-zinc-700" />
        </div>
        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            campaign.status === "active" 
              ? "bg-emerald-500/10 text-emerald-400"
              : campaign.status === "paused"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-zinc-500/10 text-zinc-400"
          }`}>
            {campaign.status}
          </span>
        </div>
      </div>
      
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors">{campaign.title}</h3>
      </div>
      
      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
        {campaign.description}
      </p>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1 text-zinc-400">
          <DollarSign className="h-4 w-4" />
          <span>${campaign.budget.toLocaleString()} budget</span>
        </div>
        <div className="flex items-center gap-1 text-zinc-400">
          <TrendingUp className="h-4 w-4" />
          <span>${campaign.payoutRate}/clip</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-zinc-500">
        <Users className="h-4 w-4" />
        <span>{campaign.joinedClipperIds?.length || 0} clipper{campaign.joinedClipperIds?.length !== 1 ? "s" : ""}</span>
        <span>•</span>
        <span>by {campaign.creatorName}</span>
      </div>

      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        {campaign.whopLink && (
          <a
            href={campaign.whopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm"
          >
            View
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {!isOwner && (
          hasJoined ? (
            <button
              onClick={onLeave}
              className="flex-1 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
            >
              Leave
            </button>
          ) : campaign.status === "active" ? (
            <button
              onClick={onJoin}
              className="flex-1 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors text-sm"
            >
              Join Campaign
            </button>
          ) : null
        )}
      </div>
    </div>
  );
}

// Create Campaign Modal
function CreateCampaignModal({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    whopLink: "",
    payoutRate: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          budget: parseFloat(formData.budget),
          whopLink: formData.whopLink || undefined,
          payoutRate: parseFloat(formData.payoutRate),
        }),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create campaign");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Campaign</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Campaign Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter campaign title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              placeholder="Describe your campaign"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Budget ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">
                Payout/Clip ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.payoutRate}
                onChange={(e) => setFormData({ ...formData, payoutRate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Whop Link (optional)
            </label>
            <input
              type="url"
              value={formData.whopLink}
              onChange={(e) => setFormData({ ...formData, whopLink: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="https://whop.com/..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-700 hover:to-indigo-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Campaign Detail Modal
function CampaignDetailModal({ 
  campaign, 
  currentUserId,
  onClose, 
  onJoin,
  onLeave,
}: { 
  campaign: Campaign;
  currentUserId?: string;
  onClose: () => void; 
  onJoin: () => void;
  onLeave: () => void;
}) {
  const isOwner = campaign.creatorId === currentUserId;
  const hasJoined = campaign.joinedClipperIds?.includes(currentUserId);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="h-40 bg-gradient-to-br from-violet-600/30 via-indigo-600/30 to-zinc-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              campaign.status === "active" 
                ? "bg-emerald-500/20 text-emerald-400"
                : campaign.status === "paused"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-zinc-500/20 text-zinc-400"
            }`}>
              {campaign.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
          
          <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{campaign.creatorName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{campaign.joinedClipperIds?.length || 0} clippers</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Created {new Date(campaign.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl bg-zinc-800/50 p-4">
              <p className="text-sm text-zinc-400 mb-1">Budget</p>
              <p className="text-xl font-bold text-emerald-400">${campaign.budget.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-zinc-800/50 p-4">
              <p className="text-sm text-zinc-400 mb-1">Payout/Clip</p>
              <p className="text-xl font-bold text-violet-400">${campaign.payoutRate}</p>
            </div>
            <div className="rounded-xl bg-zinc-800/50 p-4">
              <p className="text-sm text-zinc-400 mb-1">Clips Added</p>
              <p className="text-xl font-bold text-indigo-400">{campaign.joinedClipperIds?.length || 0}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Description</h3>
            <p className="text-zinc-300 whitespace-pre-wrap">{campaign.description}</p>
          </div>

          {campaign.whopLink && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-2">Whop Link</h3>
              <a
                href={campaign.whopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-violet-400 hover:text-violet-300"
              >
                {campaign.whopLink}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {campaign.whopLink && (
              <a
                href={campaign.whopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
              >
                View on Whop
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {!isOwner && (
              hasJoined ? (
                <button
                  onClick={onLeave}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Leave Campaign
                </button>
              ) : campaign.status === "active" ? (
                <button
                  onClick={onJoin}
                  className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-700 hover:to-indigo-700 transition-colors"
                >
                  Join Campaign
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 px-4 py-3 rounded-lg bg-zinc-800 text-zinc-500 cursor-not-allowed"
                >
                  Campaign Unavailable
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
