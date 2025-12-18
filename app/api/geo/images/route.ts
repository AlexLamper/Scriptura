import { NextRequest, NextResponse } from 'next/server';
import { geoDataService } from '../../../../lib/geo-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (!book || !chapter) {
    return NextResponse.json({ error: 'Book and chapter are required' }, { status: 400 });
  }

  try {
    const images = geoDataService.getImagesForChapter(book, parseInt(chapter));
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching geo images:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
