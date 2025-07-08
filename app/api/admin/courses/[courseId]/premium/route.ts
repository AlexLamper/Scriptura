import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "../../../../../../lib/mongodb"
import Course from "../../../../../../models/Course"
import User from "../../../../../../models/User"
import { getServerSession } from "next-auth"

// This route toggles a course's premium status (admin only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // Await the dynamic route parameter
    const { courseId } = await params

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

    // Extract the requested premium flag from the body
    const { isPremium } = await req.json()
    if (isPremium === undefined) {
      return NextResponse.json({ error: "isPremium field is required" }, { status: 400 })
    }

    // Locate the course and update its premium status
    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    course.isPremium = isPremium
    await course.save()

    return NextResponse.json({
      message: `Successfully updated course premium status to ${isPremium}`,
      course,
    })
  } catch (error) {
    console.error("Error updating course premium status:", error)
    return NextResponse.json(
      { error: "Failed to update course premium status" },
      { status: 500 }
    )
  }
}