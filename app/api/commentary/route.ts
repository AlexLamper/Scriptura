import { NextResponse } from 'next/server';
import { getCommentary } from '../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get('source') || 'matthew_henry';
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (!book || !chapter) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  const data = await getCommentary(source, book, Number(chapter));
  if (!data) {
    return NextResponse.json({}, { status: 404 });
  }
  
  return NextResponse.json(data);
}
