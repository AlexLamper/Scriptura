import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/connectDB.js';
import BiblePlan from '../../../../models/BiblePlan.js';
import User from '../../../../models/User.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

// POST - Enroll in a plan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();
    if (!planId) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = await BiblePlan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Check if user is already enrolled
    const isAlreadyEnrolled = plan.enrolledUsers.includes(user._id);
    if (isAlreadyEnrolled) {
      return NextResponse.json({ error: 'Already enrolled in this plan' }, { status: 400 });
    }

    // Add user to enrolled users
    plan.enrolledUsers.push(user._id);
    
    // Initialize progress for the user
    plan.progress.push({
      userId: user._id,
      completedDays: [],
      lastReadDate: new Date()
    });

    await plan.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully enrolled in plan',
      planId: plan._id 
    });

  } catch (error) {
    console.error('Error enrolling in plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Unenroll from a plan
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');
    
    if (!planId) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const plan = await BiblePlan.findById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    // Remove user from enrolled users
    plan.enrolledUsers = plan.enrolledUsers.filter(
      (userId: string) => userId.toString() !== user._id.toString()
    );
    
    // Remove user's progress
    plan.progress = plan.progress.filter(
      (p: { userId: string }) => p.userId.toString() !== user._id.toString()
    );

    await plan.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully unenrolled from plan',
      planId: plan._id 
    });

  } catch (error) {
    console.error('Error unenrolling from plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}