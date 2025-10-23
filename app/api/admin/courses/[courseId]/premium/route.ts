import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "../../../../../../lib/mongodb"
import User from "../../../../../../models/User"
import { getServerSession } from "next-auth"

// This route is deprecated - courses are managed through BiblePlan model
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // Await the dynamic route parameter
    await params

    // Check for admin authentication
    const session = await getServerSession()
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await connectMongoDB()

    // Verify that the user is an admin
    const user = await User.findOne({ email: session.user.email })
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    // Courses are managed through BiblePlan model
    return NextResponse.json({ error: "Course management is not available. Use Bible Plans instead." }, { status: 400 })
  } catch (error) {
    console.error("Error updating course premium status:", error)
    return NextResponse.json(
      { error: "Failed to update course premium status" },
      { status: 500 }
    )
  }
}