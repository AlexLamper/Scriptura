import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Quiz from "../../../../models/Quiz";
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

  const quizzes = await Quiz.find().lean();
  return NextResponse.json({ quizzes });
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const data = await req.json();
  try {
    const quiz = new Quiz(data);
    await quiz.save();
    return NextResponse.json({ quiz }, { status: 201 });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
  }
}
