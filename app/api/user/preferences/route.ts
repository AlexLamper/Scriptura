import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const { language, translation, intent } = await request.json();

    if (!language || !translation || !intent) {
      return NextResponse.json(
        { error: "Missing required preferences: language, translation, and intent" },
        { status: 400 }
      );
    }

    // Update user preferences
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          preferences: {
            language,
            translation,
            intent,
            onboardingCompleted: true,
            updatedAt: new Date()
          }
        }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Preferences saved successfully",
      preferences: updatedUser.preferences
    });

  } catch (error) {
    console.error("Error saving user preferences:", error);
    return NextResponse.json(
      { error: "Failed to save preferences" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user || !user.preferences) {
      return NextResponse.json({
        preferences: null,
        onboardingCompleted: false
      });
    }

    return NextResponse.json({
      preferences: user.preferences,
      onboardingCompleted: user.preferences.onboardingCompleted || false
    });

  } catch (error) {
    console.error("Error fetching user preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 }
    );
  }
}
