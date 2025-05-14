import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/User";
import { authOptions } from "../../../../lib/authOptions";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, bio } = await request.json();
    
    await connectMongoDB();
    
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        name,
        bio,
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
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
