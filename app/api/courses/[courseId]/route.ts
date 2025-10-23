import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';

export async function GET(request: Request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
    console.log('MongoDB connected successfully');
    
    const url = new URL(request.url);
    const courseId = url.pathname.split('/').pop();
    
    console.log('Fetching course with ID:', courseId);
    
    if (!courseId) {
      return NextResponse.json({ message: 'Course ID is required' }, { status: 400 });
    }
    
    // Courses are managed through BiblePlan model
    return NextResponse.json({ message: 'Course not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
  }
}
