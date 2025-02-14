import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import Course from '../../../models/Course';
import Quiz from '../../../models/Quiz';

export async function GET(request: Request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');

    if (quizId) {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
      }
      return NextResponse.json({ quiz });
    }

    const courses = await Course.find();
    console.log('Courses fetched:', courses);

    const quizzes = await Quiz.find();
    console.log('Quizzes fetched:', quizzes);

    return NextResponse.json({ courses, quizzes });
  } catch (error) {
    console.error('Error fetching courses or quizzes:', error);
    return NextResponse.json({ message: 'Error fetching courses' }, { status: 500 });
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
    return NextResponse.json({ message: 'Error creating course' }, { status: 500 });
  }
}