import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "campaigns.json");

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
  clips: any[];
  joinedClipperIds: string[];
  createdAt: number;
  updatedAt: number;
}

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read all campaigns
function readCampaigns(): Campaign[] {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write campaigns
function writeCampaigns(campaigns: Campaign[]): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(campaigns, null, 2));
}

// Generate unique ID
function generateId(): string {
  return `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Create a new campaign
export function createCampaign(data: {
  title: string;
  description: string;
  budget: number;
  status?: "active" | "paused" | "completed";
  creatorId: string;
  creatorName: string;
  whopLink?: string;
  payoutRate: number;
}): Campaign {
  const campaigns = readCampaigns();
  
  const newCampaign: Campaign = {
    id: generateId(),
    title: data.title,
    description: data.description,
    budget: data.budget,
    status: data.status || "active",
    creatorId: data.creatorId,
    creatorName: data.creatorName,
    whopLink: data.whopLink,
    payoutRate: data.payoutRate,
    clips: [],
    joinedClipperIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  campaigns.push(newCampaign);
  writeCampaigns(campaigns);
  return newCampaign;
}

// Get campaign by ID
export function getCampaign(id: string): Campaign | null {
  const campaigns = readCampaigns();
  return campaigns.find((c) => c.id === id) || null;
}

// Get all campaigns
export function getAllCampaigns(): Campaign[] {
  return readCampaigns();
}

// Get campaigns by status
export function getCampaignsByStatus(status: "active" | "paused" | "completed"): Campaign[] {
  const campaigns = readCampaigns();
  return campaigns.filter((c) => c.status === status);
}

// Get campaigns by creator
export function getCampaignsByCreator(creatorId: string): Campaign[] {
  const campaigns = readCampaigns();
  return campaigns.filter((c) => c.creatorId === creatorId);
}

// Update campaign
export function updateCampaign(id: string, updates: Partial<Campaign>): Campaign | null {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex((c) => c.id === id);
  
  if (index === -1) return null;
  
  campaigns[index] = {
    ...campaigns[index],
    ...updates,
    updatedAt: Date.now(),
  };
  
  writeCampaigns(campaigns);
  return campaigns[index];
}

// Delete campaign
export function deleteCampaign(id: string): boolean {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex((c) => c.id === id);
  
  if (index === -1) return false;
  
  campaigns.splice(index, 1);
  writeCampaigns(campaigns);
  return true;
}

// Join a campaign as a clipper
export function joinCampaign(campaignId: string, clipperId: string): Campaign | null {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex((c) => c.id === campaignId);
  
  if (index === -1) return null;
  
  const campaign = campaigns[index];
  
  // Check if already joined
  if (campaign.joinedClipperIds.includes(clipperId)) {
    return campaign;
  }
  
  campaign.joinedClipperIds.push(clipperId);
  campaign.updatedAt = Date.now();
  
  writeCampaigns(campaigns);
  return campaign;
}

// Leave a campaign
export function leaveCampaign(campaignId: string, clipperId: string): Campaign | null {
  const campaigns = readCampaigns();
  const index = campaigns.findIndex((c) => c.id === campaignId);
  
  if (index === -1) return null;
  
  const campaign = campaigns[index];
  campaign.joinedClipperIds = campaign.joinedClipperIds.filter((id) => id !== clipperId);
  campaign.updatedAt = Date.now();
  
  writeCampaigns(campaigns);
  return campaign;
}

// Get campaigns a clipper has joined
export function getJoinedCampaigns(clipperId: string): Campaign[] {
  const campaigns = readCampaigns();
  return campaigns.filter((c) => c.joinedClipperIds.includes(clipperId));
}

// Check if clipper has joined a campaign
export function hasJoinedCampaign(campaignId: string, clipperId: string): boolean {
  const campaign = getCampaign(campaignId);
  if (!campaign) return false;
  return campaign.joinedClipperIds.includes(clipperId);
}
