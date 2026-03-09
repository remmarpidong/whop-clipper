export type Platform = "tiktok" | "instagram" | "youtube";

export interface Clip {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  thumbnail?: string;
  platform: Platform[];
  status: "draft" | "processing" | "published" | "failed";
  createdAt: Date;
  publishedAt?: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  sourceUrl?: string;
  clips: Clip[];
  createdAt: Date;
}

export interface Earnings {
  id: string;
  clipId: string;
  platform: Platform;
  amount: number;
  currency: string;
  date: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  connectedPlatforms: Platform[];
}
