import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/authOptions"
import connectMongoDB from "../../../lib/mongodb"
import UserProgress from "../../../models/UserProgress"
import User from "../../../models/User"

// Get user progress for a specific course
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

    // Find the progress for this user and course
    const progress = await UserProgress.findOne({
      user: user._id,
      course: courseId,
    })

    if (!progress) {
      // If no progress exists yet, return default values
      return NextResponse.json({
        completed: false,
        progress: 0,
      })
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching user progress:", error)
    return NextResponse.json({ error: "Failed to fetch user progress" }, { status: 500 })
  }
}

// Create or update user progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId, completed } = await request.json()

    if (!courseId || completed === undefined) {
      return NextResponse.json({ error: "Course ID and completed status are required" }, { status: 400 })
    }

    await connectMongoDB()

    // Find the user by email
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find or create progress record
    let progress = await UserProgress.findOne({
      user: user._id,
      course: courseId,
    })

    if (!progress) {
      // Create new progress record if it doesn't exist
      progress = new UserProgress({
        user: user._id,
        course: courseId,
        completed: completed,
        startedAt: new Date(),
        completedAt: completed ? new Date() : undefined,
        lastAccessedAt: new Date(),
      })
    } else {
      // Update existing progress record
      progress.completed = completed
      progress.lastAccessedAt = new Date()
      
      if (completed && !progress.completedAt) {
        progress.completedAt = new Date()
      } else if (!completed) {
        progress.completedAt = undefined
      }
    }

    await progress.save()

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error updating user progress:", error)
    return NextResponse.json({ error: "Failed to update user progress" }, { status: 500 })
  }
}
