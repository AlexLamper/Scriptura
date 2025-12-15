import { NextResponse } from 'next/server';
import { getBibleSummary } from '../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');

  if (!book) return NextResponse.json({ error: 'Missing book param' }, { status: 400 });

  const data = await getBibleSummary(book);
  if (!data) return NextResponse.json({ error: 'Summary not found' }, { status: 404 });
  
  return NextResponse.json({ summary: data });
}
