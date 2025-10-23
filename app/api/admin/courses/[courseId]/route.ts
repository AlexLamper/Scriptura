import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/mongodb";
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

  // Courses are managed through BiblePlan model
  return NextResponse.json({ error: "Course management is not available. Use Bible Plans instead." }, { status: 400 });
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const courseId = getCourseIdFromUrl(req);
  if (!courseId) {
    return NextResponse.json({ error: "Missing course ID in URL" }, { status: 400 });
  }

  // Courses are managed through BiblePlan model
  return NextResponse.json({ error: "Course management is not available. Use Bible Plans instead." }, { status: 400 });
}
