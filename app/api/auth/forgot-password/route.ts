import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: "If an account with this email exists, you will receive a password reset link." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token
    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpires,
    });

    // TODO: Send email with reset link
    // In a real application, you would send an email here
    // For now, we'll just log the reset token (for development only)
    console.log(`Password reset token for ${email}: ${resetToken}`);
    console.log(`Reset link: ${process.env.NEXTAUTH_URL}/en/auth/reset-password?token=${resetToken}`);

    return NextResponse.json(
      { message: "If an account with this email exists, you will receive a password reset link." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
