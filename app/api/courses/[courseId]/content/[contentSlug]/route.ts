import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import CourseContent from "../../../../../../models/CourseContent";

export async function GET(request: Request, { params }: { params: { courseId: string; contentSlug: string } }) {
  try {
    await connectMongoDB();
    const { courseId, contentSlug } = params;

    const content = await CourseContent.findOne({ courseId, slug: contentSlug }).lean();
    if (!content) {
      return NextResponse.json({ message: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching content" }, { status: 500 });
  }
}
