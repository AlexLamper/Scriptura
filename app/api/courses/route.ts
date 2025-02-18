import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import Course from '../../../models/Course';
import Quiz from '../../../models/Quiz';

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');

    const query: { [key: string]: string | null } = {};

    if (language) query.language = language;
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    const quizzes = await Quiz.find(query);

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json({ message: 'Error fetching quizzes' }, { status: 500 });
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