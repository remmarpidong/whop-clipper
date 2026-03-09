import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCampaign, updateCampaign, deleteCampaign, joinCampaign, leaveCampaign, hasJoinedCampaign } from "@/lib/campaignStore";
import { getUserById, userHasRole } from "@/lib/userStore";

// GET - Get a single campaign by ID
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
    let isOwner = false;
    if (session?.user?.id) {
      hasJoined = hasJoinedCampaign(id, session.user.id);
      isOwner = campaign.creatorId === session.user.id;
    }

    // Transform to include readable dates
    const transformedCampaign = {
      ...campaign,
      createdAt: new Date(campaign.createdAt).toISOString(),
      updatedAt: new Date(campaign.updatedAt).toISOString(),
      hasJoined,
      isOwner,
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

// PUT - Update a campaign (full update)
export async function PUT(
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

    // Check if user is the creator or admin
    const user = getUserById(session.user.id);
    const isAdmin = user && userHasRole(user, "admin");
    const isOwner = campaign.creatorId === session.user.id;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Not authorized to update this campaign" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, budget, status, whopLink, payoutRate } = body;

    // Validate fields
    if (budget !== undefined && budget < 0) {
      return NextResponse.json(
        { error: "Budget must be non-negative" },
        { status: 400 }
      );
    }

    if (payoutRate !== undefined && payoutRate < 0) {
      return NextResponse.json(
        { error: "Payout rate must be non-negative" },
        { status: 400 }
      );
    }

    if (status && !["active", "paused", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedCampaign = updateCampaign(id, {
      ...(title && { title }),
      ...(description && { description }),
      ...(budget !== undefined && { budget }),
      ...(status && { status }),
      ...(whopLink !== undefined && { whopLink }),
      ...(payoutRate !== undefined && { payoutRate }),
    });

    return NextResponse.json({
      success: true,
      campaign: {
        ...updatedCampaign,
        createdAt: new Date(updatedCampaign!.createdAt).toISOString(),
        updatedAt: new Date(updatedCampaign!.updatedAt).toISOString(),
      },
    });
  } catch (error) {
    console.error("Update campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Partial update a campaign
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // PATCH is handled the same as PUT - partial updates
  return PUT(request, params);
}

// DELETE - Delete a campaign
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

    // Check if user is the creator or admin
    const user = getUserById(session.user.id);
    const isAdmin = user && userHasRole(user, "admin");
    const isOwner = campaign.creatorId === session.user.id;

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Not authorized to delete this campaign" },
        { status: 403 }
      );
    }

    const deleted = deleteCampaign(id);

    if (deleted) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to delete campaign" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Delete campaign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
