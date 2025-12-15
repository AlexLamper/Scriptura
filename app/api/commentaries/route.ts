import { NextResponse } from 'next/server';
import { getCommentaries } from '../../../lib/local-data';

export async function GET() {
  const commentaries = await getCommentaries();
  return NextResponse.json(commentaries);
}
