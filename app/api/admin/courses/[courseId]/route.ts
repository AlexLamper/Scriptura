import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Course from "../../../../../models/Course";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth";

async function verifyAdmin() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return { error: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) };
  }
  await connectMongoDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user || !user.isAdmin) {
    return { error: NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 }) };
  }
  return { user };
}

// Extract courseId from URL
function getCourseIdFromUrl(req: NextRequest): string | null {
  const pathSegments = req.nextUrl.pathname.split("/");
  const courseId = pathSegments[pathSegments.length - 1];
  return courseId || null;
}

export async function PUT(req: NextRequest) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const courseId = getCourseIdFromUrl(req);
  if (!courseId) {
    return NextResponse.json({ error: "Missing course ID in URL" }, { status: 400 });
  }

  const data = await req.json();

  try {
    const course = await Course.findByIdAndUpdate(courseId, data, { new: true });
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json({ course });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const courseId = getCourseIdFromUrl(req);
  if (!courseId) {
    return NextResponse.json({ error: "Missing course ID in URL" }, { status: 400 });
  }

  try {
    await Course.findByIdAndDelete(courseId);
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
