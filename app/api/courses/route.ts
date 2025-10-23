import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/mongodb';
import Quiz from '../../../models/Quiz';

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');

    if (quizId) {
      // Use .lean() to get a plain JavaScript object
      const quiz = await Quiz.findById(quizId).lean();
      if (!quiz) {
        return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
      }
      return NextResponse.json({ quiz });
    }

    // Fetch quizzes as plain objects
    // Courses are managed through BiblePlan model
    const quizzes = await Quiz.find().lean();

    return NextResponse.json({ courses: [], quizzes });
  } catch (error) {
    console.error('Error fetching courses or quizzes:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    await connectMongoDB();
    
    const { quiz } = await request.json();

    if (!quiz) {
      return NextResponse.json({ message: 'Quiz data is required' }, { status: 400 });
    }

    const newQuiz = new Quiz(quiz);
    await newQuiz.save();

    return NextResponse.json({ newQuiz }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating quiz' }, { status: 500 });
  }
}