import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCampaign, joinCampaign, leaveCampaign, hasJoinedCampaign } from "@/lib/campaignStore";
import { getUserById, userHasRole } from "@/lib/userStore";

// POST - Join a campaign
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Check if user has clipper role
    const user = getUserById(session.user.id);
    if (!user || !userHasRole(user, "clipper")) {
      return NextResponse.json(
        { error: "Only users with clipper role can join campaigns" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const campaign = getCampaign(id);

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Check if campaign is active
    if (campaign.status !== "active") {
      return NextResponse.json(
        { error: "Campaign is not active" },
        { status: 400 }
      );
    }

    const updatedCampaign = joinCampaign(id, session.user.id);

    return NextResponse.json({
      success: true,
      campaign: {
        ...updatedCampaign,
        createdAt: new Date(updatedCampaign!.createdAt).toISOString(),
        updatedAt: new Date(updatedCampaign!.updatedAt).toISOString(),
      },
    });
  } catch (error) {
    console.error("Join campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Leave a campaign
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const campaign = getCampaign(id);

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    const updatedCampaign = leaveCampaign(id, session.user.id);

    return NextResponse.json({
      success: true,
      campaign: {
        ...updatedCampaign,
        createdAt: new Date(updatedCampaign!.createdAt).toISOString(),
        updatedAt: new Date(updatedCampaign!.updatedAt).toISOString(),
      },
    });
  } catch (error) {
    console.error("Leave campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
