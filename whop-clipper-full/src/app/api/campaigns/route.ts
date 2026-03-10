import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createCampaign, getAllCampaigns, getCampaignsByStatus } from "@/lib/campaignStore";

export async function GET(request: Request) {
  try {
    // Get status filter from query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "active" | "paused" | "completed" | null;

    let campaigns;
    if (status) {
      campaigns = getCampaignsByStatus(status);
    } else {
      campaigns = getAllCampaigns();
    }

    // Transform to include readable dates
    const transformedCampaigns = campaigns.map((campaign) => ({
      ...campaign,
      createdAt: new Date(campaign.createdAt).toISOString(),
      updatedAt: new Date(campaign.updatedAt).toISOString(),
    }));

    return NextResponse.json(transformedCampaigns);
  } catch (error) {
    console.error("List campaigns error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, budget, whopLink, payoutRate } = body;

    // Validate required fields
    if (!title || !description || budget === undefined || payoutRate === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, budget, payoutRate" },
        { status: 400 }
      );
    }

    // Validate budget and payoutRate
    if (budget < 0 || payoutRate < 0) {
      return NextResponse.json(
        { error: "Budget and payout rate must be non-negative" },
        { status: 400 }
      );
    }

    const campaign = createCampaign({
      title,
      description,
      budget,
      creatorId: session.user.id,
      creatorName: session.user.name || "Unknown",
      whopLink,
      payoutRate,
      status: "active",
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error("Create campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
