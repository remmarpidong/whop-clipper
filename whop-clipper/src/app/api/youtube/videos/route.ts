import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const accessToken = session.accessToken as string;

    // Fetch channel info first to get the channel ID
    const channelResponse = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&mine=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!channelResponse.ok) {
      const error = await channelResponse.json();
      return NextResponse.json(
        { error: error.error?.message || "Failed to fetch channel" },
        { status: channelResponse.status }
      );
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      return NextResponse.json(
        { error: "No YouTube channel found" },
        { status: 404 }
      );
    }

    const channel = channelData.items[0];
    const channelId = channel.id;
    const channelTitle = channel.snippet.title;
    const channelThumbnail = channel.snippet.thumbnails?.default?.url;

    // Fetch videos from the channel's uploads playlist
    const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!videosResponse.ok) {
      const error = await videosResponse.json();
      return NextResponse.json(
        { error: error.error?.message || "Failed to fetch videos" },
        { status: videosResponse.status }
      );
    }

    const videosData = await videosResponse.json();

    // Transform videos to our format
    const videos = (videosData.items || []).map((item: any) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelId,
      channelTitle,
      channelThumbnail,
    }));

    return NextResponse.json({
      channel: {
        id: channelId,
        title: channelTitle,
        thumbnail: channelThumbnail,
      },
      videos,
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
