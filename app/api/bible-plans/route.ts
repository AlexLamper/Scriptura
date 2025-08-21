import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/connectDB.js';
import BiblePlan from '../../../models/BiblePlan.js';
import User from '../../../models/User.js';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';

// GET - Fetch Bible plans
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type'); // 'public' or 'my'

    let query: Record<string, unknown> = {};

    if (type === 'public') {
      query.isPublic = true;
    } else if (type === 'my') {
      query.createdBy = user._id;
    } else {
      // Default: show both public plans and user's own plans
      query = {
        $or: [
          { isPublic: true },
          { createdBy: user._id }
        ]
      };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const plans = await BiblePlan.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .lean();

    console.log('API: Query used:', JSON.stringify(query, null, 2));
    console.log('API: Found plans count:', plans.length);
    console.log('API: Plans data:', JSON.stringify(plans, null, 2));

    // Add enrollment status and progress for each plan
    const plansWithStatus = plans.map(plan => {
      const isEnrolled = plan.enrolledUsers.some((userId: string) => userId.toString() === user._id.toString());
      const userProgress = plan.progress.find((p: { userId: string }) => p.userId.toString() === user._id.toString());
      const completedDays = userProgress?.completedDays.length || 0;
      const progressPercentage = plan.duration > 0 ? Math.round((completedDays / plan.duration) * 100) : 0;

      return {
        ...plan,
        isEnrolled,
        completedDays,
        progressPercentage
      };
    });

    return NextResponse.json({ plans: plansWithStatus });

  } catch (error) {
    console.error('Error fetching bible plans:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new plan
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, duration, category, readings, isPublic } = body;

    if (!title || !description || !duration || !readings || readings.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only admins can create public plans
    const canCreatePublic = user.isAdmin && isPublic;

    const newPlan = new BiblePlan({
      title,
      description,
      duration,
      category: category || 'evangelie',
      readings,
      isPublic: canCreatePublic || false, // Force false if not admin
      createdBy: user._id
    });

    await newPlan.save();
    await newPlan.populate('createdBy', 'name');

    return NextResponse.json({ plan: newPlan }, { status: 201 });

  } catch (error) {
    console.error('Error creating bible plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a plan (only creator or admin)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('id');

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
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

    // Check if user can delete (creator or admin)
    if (plan.createdBy.toString() !== user._id.toString() && !user.isAdmin) {
      return NextResponse.json({ error: 'Not authorized to delete this plan' }, { status: 403 });
    }

    await BiblePlan.findByIdAndDelete(planId);

    return NextResponse.json({ message: 'Plan deleted successfully' });

  } catch (error) {
    console.error('Error deleting bible plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
