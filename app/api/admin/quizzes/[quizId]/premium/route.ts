import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import Quiz from "../../../../../../models/Quiz";
import User from "../../../../../../models/User";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest, { params }: { params: { quizId: string } }) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await connectMongoDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
    }

    const { isPremium } = await req.json();
    if (isPremium === undefined) {
      return NextResponse.json({ error: "isPremium field is required" }, { status: 400 });
    }

    const quiz = await Quiz.findById(params.quizId);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    quiz.isPremium = isPremium;
    await quiz.save();

    return NextResponse.json({ message: `Successfully updated quiz premium status to ${isPremium}`, quiz });
  } catch (error) {
    console.error("Error updating quiz premium status:", error);
    return NextResponse.json({ error: "Failed to update quiz premium status" }, { status: 500 });
  }
}
