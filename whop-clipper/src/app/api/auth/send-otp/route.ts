import { NextRequest, NextResponse } from "next/server";
import { createUser, getUser, updateUser } from "@/lib/userStore";
import { generateOTP, getOTPExpiry, isValidEmail } from "@/lib/otp";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = getUser(email);

    // Generate OTP
    const otpCode = generateOTP();
    const otpExpires = getOTPExpiry();

    if (!user) {
      // Create new user with OTP (not verified yet)
      user = createUser({
        email,
        name: null,
        image: null,
        isVerified: false,
        otpCode,
        otpExpires,
      });
    } else {
      // Update existing user's OTP
      user = updateUser(email, {
        otpCode,
        otpExpires,
      });
    }

    // In production, send the OTP via email
    // For development, we'll log it
    console.log(`[DEV] OTP for ${email}: ${otpCode}`);
    
    // Note: In production, integrate with an email service like:
    // - Resend (resend.com)
    // - SendGrid
    // - AWS SES
    // For now, we simulate the email sending

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // Remove this in production
      devOtp: otpCode,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
