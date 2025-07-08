import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Quiz from "../../../../../models/Quiz";
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

export async function PUT(req: NextRequest, { params }: { params: { quizId: string } }) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  const data = await req.json();
  try {
    const quiz = await Quiz.findByIdAndUpdate(params.quizId, data, { new: true });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { quizId: string } }) {
  const auth = await verifyAdmin();
  if (auth.error) return auth.error;

  try {
    await Quiz.findByIdAndDelete(params.quizId);
    return NextResponse.json({ message: "Quiz deleted" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}
