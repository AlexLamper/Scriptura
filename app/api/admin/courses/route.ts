import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Course from "../../../../models/Course";
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

  const courses = await Course.find().lean();
  return NextResponse.json({ courses });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const data = await req.json();
  try {
    const course = new Course(data);
    await course.save();
    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}