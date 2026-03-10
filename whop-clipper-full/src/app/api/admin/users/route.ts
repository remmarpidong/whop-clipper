import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listUsers, updateUserRoles, getUserById } from "@/lib/userStore";
import { UserRole } from "@/types";

// GET /api/admin/users - List all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const currentUser = getUserById((session.user as any)?.id || "");
    if (!currentUser || !currentUser.roles.includes("admin")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const users = listUsers();
    
    // Return users without sensitive data
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ users: safeUsers });
  } catch (error) {
    console.error("List users error:", error);
    return NextResponse.json({ error: "Failed to list users" }, { status: 500 });
  }
}

// PATCH /api/admin/users - Update user roles (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const currentUser = getUserById((session.user as any)?.id || "");
    if (!currentUser || !currentUser.roles.includes("admin")) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const { userId, roles } = await request.json();

    // Validate input
    if (!userId || !roles) {
      return NextResponse.json(
        { error: "User ID and roles are required" },
        { status: 400 }
      );
    }

    // Validate roles
    const validRoles: UserRole[] = ["admin", "creator", "clipper"];
    if (!Array.isArray(roles) || !roles.every((r: string) => validRoles.includes(r as UserRole))) {
      return NextResponse.json(
        { error: "Invalid roles. Must be an array of 'admin', 'creator', or 'clipper'" },
        { status: 400 }
      );
    }

    // Get user to update
    const userToUpdate = getUserById(userId);
    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent removing own admin role
    if (userId === currentUser.id && !roles.includes("admin")) {
      return NextResponse.json(
        { error: "Cannot remove your own admin role" },
        { status: 400 }
      );
    }

    // Update user roles
    const updatedUser = updateUserRoles(userToUpdate.email, roles as UserRole[]);

    return NextResponse.json({
      success: true,
      message: `User roles updated to ${roles.join(", ")}`,
      user: {
        id: updatedUser?.id,
        email: updatedUser?.email,
        roles: updatedUser?.roles,
      },
    });
  } catch (error) {
    console.error("Update user roles error:", error);
    return NextResponse.json(
      { error: "Failed to update user roles" },
      { status: 500 }
    );
  }
}
