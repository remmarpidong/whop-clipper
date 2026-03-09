import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCampaign, joinCampaign, leaveCampaign, hasJoinedCampaign } from "@/lib/campaignStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = getCampaign(id);

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Check if current user has joined
    const session = await getServerSession(authOptions);
    let hasJoined = false;
    if (session?.user?.id) {
      hasJoined = hasJoinedCampaign(id, session.user.id);
    }

    // Transform to include readable dates
    const transformedCampaign = {
      ...campaign,
      createdAt: new Date(campaign.createdAt).toISOString(),
      updatedAt: new Date(campaign.updatedAt).toISOString(),
      hasJoined,
    };

    return NextResponse.json(transformedCampaign);
  } catch (error) {
    console.error("Get campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
