import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/connectDB.js';
import User from '../../../models/User.js';
import InductiveStudy from '../../../models/InductiveStudy.js';

export async function POST(request: NextRequest) {
  try {
    const { action, userEmail, book, chapter, version, studyData } = await request.json();

    if (!userEmail || !book || chapter === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (action === 'load') {
      // Find existing inductive study
      const existingStudy = await InductiveStudy.findOne({
        userId: user._id,
        book,
        chapter,
        version
      });

      return NextResponse.json({ 
        study: existingStudy || null 
      });
    }

    if (action === 'save') {
      if (!studyData) {
        return NextResponse.json({ error: 'Study data is required' }, { status: 400 });
      }

      // Find and update existing study or create new one
      const studyEntry = await InductiveStudy.findOneAndUpdate(
        {
          userId: user._id,
          book,
          chapter,
          version
        },
        {
          userId: user._id,
          book,
          chapter,
          version,
          observation: studyData.observation || '',
          interpretation: studyData.interpretation || '',
          application: studyData.application || ''
        },
        {
          new: true,
          upsert: true
        }
      );

      return NextResponse.json({ 
        message: 'Inductive study saved successfully',
        study: studyEntry
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Inductive study API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
