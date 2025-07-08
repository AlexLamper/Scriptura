import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import Course from '../../../models/Course';
import Quiz from '../../../models/Quiz';
import { getServerSession } from 'next-auth';
import User from '../../../models/User';

export async function GET(request: Request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get('quizId');

    if (quizId) {
      const quiz = await Quiz.findById(quizId).lean();
      if (!quiz) {
        return NextResponse.json({ message: 'Quiz not found' }, { status: 404 });
      }

      if (!quiz.isPublic) {
        const session = await getServerSession();
        let isAdmin = false;
        if (session && session.user?.email) {
          const user = await User.findOne({ email: session.user.email });
          isAdmin = !!user?.isAdmin;
        }
        if (!isAdmin) {
          return NextResponse.json({ message: 'Quiz not available' }, { status: 403 });
        }
      }

      if (quiz.isPremium) {
        const session = await getServerSession();
        if (!session || !session.user?.email) {
          return NextResponse.json({ ...quiz, isPremium: true });
        }
        const user = await User.findOne({ email: session.user.email });
        if (!user || !user.subscribed) {
          return NextResponse.json({ ...quiz, isPremium: true });
        }
      }

      return NextResponse.json({ quiz });
    }

    // Fetch courses and quizzes as plain objects
    const courses = await Course.find().lean();
    const quizzes = await Quiz.find({
      $or: [{ isPublic: true }, { isPublic: { $exists: false } }],
    }).lean();

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