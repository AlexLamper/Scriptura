import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../lib/authOptions"
import connectMongoDB from "../../../../lib/mongodb"
import UserProgress from "../../../../models/UserProgress"
import User from "../../../../models/User"
import Course from "../../../../models/Course"

// Calculate progress percentage for a course
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const courseId = url.searchParams.get("courseId")

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    await connectMongoDB()

    // Find the user by email
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get the course to find total number of lessons
    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const totalLessons = course.lessons?.length || 0

    if (totalLessons === 0) {
      return NextResponse.json({ progressPercentage: 0 })
    }

    // Find the progress for this user and course
    const progress = await UserProgress.findOne({
      user: user._id,
      course: courseId,
    })

    if (!progress) {
      return NextResponse.json({ progressPercentage: 0 })
    }

    // Calculate percentage
    const completedCount = progress.completedLessons.length
    const progressPercentage = Math.round((completedCount / totalLessons) * 100)

    return NextResponse.json({
      progressPercentage,
      completedLessons: progress.completedLessons,
      lastAccessedLesson: progress.lastAccessedLesson,
    })
  } catch (error) {
    console.error("Error calculating progress:", error)
    return NextResponse.json({ error: "Failed to calculate progress" }, { status: 500 })
  }
}
