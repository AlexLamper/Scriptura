import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Quiz from "../../../models/Quiz";

export async function GET() {
  try {
    await connectMongoDB();
    const quizzes = await Quiz.find({
      $or: [{ isPublic: true }, { isPublic: { $exists: false } }],
    }).lean();
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return NextResponse.json(
      { message: "Error fetching quizzes" },
      { status: 500 }
    );
  }
}
