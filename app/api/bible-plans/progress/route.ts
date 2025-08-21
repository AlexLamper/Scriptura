import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/connectDB.js';
import BiblePlan from '../../../../models/BiblePlan.js';
import User from '../../../../models/User.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';

// POST - Mark a day as completed
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId, day } = await request.json();
    if (!planId || day === undefined) {
      return NextResponse.json({ error: 'Plan ID and day are required' }, { status: 400 });
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

    // Check if user is enrolled
    const isEnrolled = plan.enrolledUsers.includes(user._id);
    if (!isEnrolled) {
      return NextResponse.json({ error: 'Not enrolled in this plan' }, { status: 400 });
    }

    // Find user's progress
    let userProgress = plan.progress.find(
      (p: { userId: string }) => p.userId.toString() === user._id.toString()
    );

    if (!userProgress) {
      // Create progress entry if it doesn't exist
      userProgress = {
        userId: user._id,
        completedDays: [],
        lastReadDate: new Date()
      };
      plan.progress.push(userProgress);
    }

    // Check if day is already completed
    if (!userProgress.completedDays.includes(day)) {
      userProgress.completedDays.push(day);
      userProgress.completedDays.sort((a: number, b: number) => a - b);
    }

    userProgress.lastReadDate = new Date();
    await plan.save();

    const completedDays = userProgress.completedDays.length;
    const progressPercentage = plan.duration > 0 ? Math.round((completedDays / plan.duration) * 100) : 0;

    return NextResponse.json({ 
      success: true, 
      message: 'Day marked as completed',
      completedDays,
      progressPercentage
    });

  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Mark a day as not completed
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');
    const day = searchParams.get('day');
    
    if (!planId || !day) {
      return NextResponse.json({ error: 'Plan ID and day are required' }, { status: 400 });
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

    // Find user's progress
    const userProgress = plan.progress.find(
      (p: { userId: string }) => p.userId.toString() === user._id.toString()
    );

    if (userProgress) {
      const dayNumber = parseInt(day);
      userProgress.completedDays = userProgress.completedDays.filter(
        (d: number) => d !== dayNumber
      );
      userProgress.lastReadDate = new Date();
      await plan.save();
    }

    const completedDays = userProgress?.completedDays.length || 0;
    const progressPercentage = plan.duration > 0 ? Math.round((completedDays / plan.duration) * 100) : 0;

    return NextResponse.json({ 
      success: true, 
      message: 'Day marked as not completed',
      completedDays,
      progressPercentage
    });

  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
