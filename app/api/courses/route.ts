import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Course from "../../../models/Course";
import Quiz from "../../../models/Quiz";

export async function GET() {
  try {
    await connectMongoDB();

    const courses = await Course.find().lean();
    const quizzes = await Quiz.find().lean();

    return NextResponse.json({ courses, quizzes });
  } catch (error) {
    console.error("Error fetching courses or quizzes:", error);
    return NextResponse.json({ message: "Error fetching courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { course, quiz } = await request.json();

    const newCourse = new Course(course);
    await newCourse.save();

    const newQuiz = new Quiz(quiz);
    await newQuiz.save();

    return NextResponse.json({ newCourse, newQuiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating course" }, { status: 500 });
  }
}
