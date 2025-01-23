import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Lesson from '@/models/Lesson';

export async function GET() {
  try {
    await connectMongoDB();
    const lessons = await Lesson.find();
    return NextResponse.json(lessons);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching lessons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const lessonData = await request.json();
    const newLesson = new Lesson(lessonData);
    await newLesson.save();
    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating lesson' }, { status: 500 });
  }
}
