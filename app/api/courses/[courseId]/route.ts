import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Course from "../../../../models/Course";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";

interface CourseType {
  _id: string;
  isPremium?: boolean;
  [key: string]: unknown;
}

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    await connectMongoDB();
    const { courseId } = params;
    const course = await Course.findById(courseId).lean() as CourseType | null;
    if (!course || Array.isArray(course)) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Premium check
    if (course.isPremium) {
      const session = await getServerSession();
      if (!session || !session.user?.email) {
        return NextResponse.json({ ...course, isPremium: true });
      }
    // Premium check
    if (course.isPremium) {
      const session = await getServerSession();
      if (!session || !session.user?.email) {
        return NextResponse.json({ ...course, isPremium: true });
      }

      const user = await User.findOne({ email: session.user.email });
      if (!user || !user.subscribed) {
        return NextResponse.json({ ...course, isPremium: true });
      }
    }

    return NextResponse.json(course);
  } 
} catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ message: "Error fetching course" }, { status: 500 });
  }
}
