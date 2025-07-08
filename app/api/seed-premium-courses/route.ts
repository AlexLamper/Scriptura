import { NextResponse } from "next/server"
import connectMongoDB from "../../../lib/mongodb"
import Course from "../../../models/Course"
import User from "../../../models/User"
import { getServerSession } from "next-auth"

// This is an admin-only route to mark some courses as premium
export async function POST() {
  try {
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

    // Get some courses to mark as premium (for example, the first 3)
    const coursesToUpdate = await Course.find().limit(3)

    if (!coursesToUpdate.length) {
      return NextResponse.json({ message: "No courses found to update" }, { status: 404 })
    }

    // Update the courses to be premium
    const updatePromises = coursesToUpdate.map((course) => Course.findByIdAndUpdate(course._id, { isPremium: true }))

    await Promise.all(updatePromises)

    return NextResponse.json({
      message: `Successfully marked ${updatePromises.length} courses as premium`,
    })
  } catch (error) {
    console.error("Error marking courses as premium:", error)
    return NextResponse.json({ error: "Failed to mark courses as premium" }, { status: 500 })
  }
}
