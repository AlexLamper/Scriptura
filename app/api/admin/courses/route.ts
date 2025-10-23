import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
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

export async function GET() {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  // Courses are managed through BiblePlan model
  // Return empty array as Course model is not used in this application
  return NextResponse.json({ courses: [] });
}

export async function POST() {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  // Courses are managed through BiblePlan model
  return NextResponse.json({ error: "Course management is not available. Use Bible Plans instead." }, { status: 400 });
}