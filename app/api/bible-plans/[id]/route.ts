import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../lib/mongodb';
import BiblePlan from '../../../../models/BiblePlan.js';
import User from '../../../../models/User.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

interface BiblePlanDoc {
  _id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  readings: Array<{
    day: number;
    book: string;
    chapter: number;
    title?: string;
  }>;
  isPublic: boolean;
  createdBy: {
    _id: string;
    name: string;
  };
  enrolledUsers: string[];
  progress: Array<{
    userId: string;
    completedDays: number[];
    lastReadDate?: Date;
  }>;
}

// GET - Fetch a specific Bible plan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectMongoDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = await BiblePlan.findById(id)
      .populate('createdBy', 'name')
      .lean();

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Type assertion for better type safety
    const typedPlan = plan as unknown as BiblePlanDoc;

    // Check if user has access to this plan
    const hasAccess = typedPlan.isPublic || typedPlan.createdBy._id.toString() === user._id.toString();
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Add enrollment status and progress
    const isEnrolled = typedPlan.enrolledUsers.some((userId: string) => userId.toString() === user._id.toString());
    const userProgress = typedPlan.progress.find((p: { userId: string }) => p.userId.toString() === user._id.toString());
    const completedDays = userProgress?.completedDays || [];
    const progressPercentage = typedPlan.duration > 0 ? Math.round((completedDays.length / typedPlan.duration) * 100) : 0;

    const planWithStatus = {
      ...typedPlan,
      isEnrolled,
      completedDays,
      progressPercentage
    };

    return NextResponse.json({ plan: planWithStatus });

  } catch (error) {
    console.error('Error fetching bible plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
