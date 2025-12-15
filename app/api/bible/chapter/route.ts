import { NextResponse } from 'next/server';
import { getChapter } from '../../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version') || 'statenvertaling';
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (!book || !chapter) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  const data = await getChapter(version, book, Number(chapter));
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  return NextResponse.json(data);
}
