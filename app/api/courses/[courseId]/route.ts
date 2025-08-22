import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';
import Course from '../../../../models/Course';
import { getServerSession } from "next-auth"
import User from "../../../../models/User"

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
    
    const course = await Course.findById(courseId).lean();

    if (!course) {
      console.log('Course not found with ID:', courseId);
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    // Check if course is premium and user is subscribed
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((course as any).isPremium) {
      const session = await getServerSession()

      if (!session || !session.user?.email) {
        // Return course data but mark it as premium for UI handling
        return NextResponse.json({
          ...course,
          isPremium: true,
        })
      }

      const user = await User.findOne({ email: session.user.email })

      if (!user || !user.subscribed) {
        // Return course data but mark it as premium for UI handling
        return NextResponse.json({
          ...course,
          isPremium: true,
        })
      }
    }
    
    console.log('Course found:', course);
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
  }
}
