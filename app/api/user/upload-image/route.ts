import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/User";
import { authOptions } from "../../../../lib/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        image: imageUrl,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Profile image updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile image:", error);
    return NextResponse.json(
      { message: "Error updating profile image" },
      { status: 500 }
    );
  }
}
