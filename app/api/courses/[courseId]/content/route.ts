import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import CourseContent from "../../../../../models/CourseContent";

export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    await connectMongoDB();
    const { courseId } = params;

    const contents = await CourseContent.find({ courseId }).sort({ order: 1 }).lean();
    return NextResponse.json(contents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching course content" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    await connectMongoDB();
    const { courseId } = params;
    const contentData = await request.json();

    const newContent = new CourseContent({ ...contentData, courseId });
    await newContent.save();

    return NextResponse.json(newContent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating course content" }, { status: 500 });
  }
}
