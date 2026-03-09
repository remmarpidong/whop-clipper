"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Play, Video, Clock, ExternalLink, Loader2 } from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  channelThumbnail: string;
}

interface Channel {
  id: string;
  title: string;
  thumbnail: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  useEffect(() => {
    if (session?.accessToken) {
      fetchVideos();
    }
  }, [session]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/youtube/videos");
      const data = await response.json();
      if (response.ok) {
        setVideos(data.videos);
        setChannel(data.channel);
      } else {
        console.error("Error fetching videos:", data.error);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!session) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">WhopClipper</h1>
          <p className="text-zinc-400 mb-8">
            Connect your YouTube channel and turn your videos into viral clips
            for TikTok, Instagram, and YouTube Shorts.
          </p>
          <button
            onClick={() => signIn("youtube", { callbackUrl: "/" })}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Connect YouTube Channel
          </button>
        </div>
      </div>
    );
  }

  // Authenticated - show dashboard
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white">WhopClipper</span>
            </div>
            <div className="flex items-center gap-4">
              {channel && (
                <div className="flex items-center gap-2">
                  {channel.thumbnail && (
                    <img
                      src={channel.thumbnail}
                      alt={channel.title}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-zinc-300 text-sm">{channel.title}</span>
                </div>
              )}
              <button
                onClick={() => signOut()}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{videos.length}</p>
                <p className="text-zinc-400 text-sm">Total Videos</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-zinc-400 text-sm">Clips Created</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-zinc-400 text-sm">Published</p>
              </div>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Videos</h2>
            <button
              onClick={fetchVideos}
              disabled={loading}
              className="text-sm text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
            </div>
          ) : videos.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Video className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-400">No videos found on your channel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer group"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium line-clamp-2 mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-zinc-500">
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video relative">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                {selectedVideo.title}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                {selectedVideo.channelThumbnail && (
                  <img
                    src={selectedVideo.channelThumbnail}
                    alt={selectedVideo.channelTitle}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="text-zinc-400 text-sm">
                  {selectedVideo.channelTitle}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500 text-sm">
                  {formatDate(selectedVideo.publishedAt)}
                </span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                {selectedVideo.description || "No description available."}
              </p>

              {/* Clip Preview UI - Placeholder for AI Clipping */}
              <div className="bg-zinc-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Create Clip
                </h3>
                <p className="text-zinc-400 text-sm mb-4">
                  AI-powered clipping will automatically detect highlights and
                  add captions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 min-w-[200px] bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors">
                    Generate AI Clips
                  </button>
                  <button className="flex-1 min-w-[200px] bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-3 px-4 rounded-xl transition-colors">
                    Open in YouTube
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
