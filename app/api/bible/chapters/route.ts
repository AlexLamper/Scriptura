import { NextResponse } from 'next/server';
import { getChapters } from '../../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version') || 'statenvertaling';
  const book = searchParams.get('book');

  if (!book) return NextResponse.json([], { status: 400 });

  const chapters = await getChapters(version, book);
  return NextResponse.json(chapters);
}
