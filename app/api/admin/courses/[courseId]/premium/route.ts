import { NextResponse } from "next/server"
import connectMongoDB from "../../../../../../libs/mongodb"
import Course from "../../../../../../models/Course"
import User from "../../../../../../models/User"
import { getServerSession } from "next-auth"

// This route is for toggling a course's premium status (admin only)
export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { courseId } = params

    // Check for admin authentication
    const session = await getServerSession()

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await connectMongoDB()

    // Check if the user is an admin
    const user = await User.findOne({ email: session.user.email })

    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 })
    }

    // Get the premium status from the request body
    const { isPremium } = await req.json()

    if (isPremium === undefined) {
      return NextResponse.json({ error: "isPremium field is required" }, { status: 400 })
    }

    // Find the course and update its premium status
    const course = await Course.findById(courseId)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Update the course's premium status
    course.isPremium = isPremium
    await course.save()

    return NextResponse.json({
      message: `Successfully updated course premium status to ${isPremium}`,
      course,
    })
  } catch (error) {
    console.error("Error updating course premium status:", error)
    return NextResponse.json({ error: "Failed to update course premium status" }, { status: 500 })
  }
}
