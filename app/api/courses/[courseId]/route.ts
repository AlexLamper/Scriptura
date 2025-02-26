import { NextResponse } from "next/server"
import connectMongoDB from "../../../../libs/mongodb"
import Course from "../../../../models/Course"

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    console.log("Connecting to MongoDB...")
    await connectMongoDB()
    console.log("MongoDB connected successfully")

    const courseId = params.courseId
    console.log("Fetching course with ID:", courseId)

    const course = await Course.findById(courseId).lean()

    if (!course) {
      console.log("Course not found with ID:", courseId)
      return NextResponse.json({ message: "Course not found" }, { status: 404 })
    }

    console.log("Course found:", course)
    return NextResponse.json(course)
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ message: "Error fetching course" }, { status: 500 })
  }
}

