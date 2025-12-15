import { NextResponse } from 'next/server';
import { getBooks, getChapters, getChapter } from '../../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const versionParam = searchParams.get('version');
  
  const version = versionParam || 'statenvertaling';

  try {
      const books = await getBooks(version);
      if (books.length === 0) {
          // Fallback if requested version not found, try statenvertaling
           const fallbackBooks = await getBooks('statenvertaling');
           if (fallbackBooks.length === 0) {
               return NextResponse.json({ error: 'No bibles available' }, { status: 404 });
           }
           // If we fell back, we should probably use that version
           // But for now let's just error if the specific version is missing to avoid confusion
           // Or better, just return error.
           return NextResponse.json({ error: `Version ${version} not found` }, { status: 404 });
      }
      
      const randomBook = books[Math.floor(Math.random() * books.length)];
      
      const chapters = await getChapters(version, randomBook);
      if (chapters.length === 0) return NextResponse.json({ error: 'No chapters found' }, { status: 404 });
      
      const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
      
      const chapterData = await getChapter(version, randomBook, randomChapter);
      if (!chapterData || !chapterData.verses) return NextResponse.json({ error: 'No verses found' }, { status: 404 });
      
      const verseKeys = Object.keys(chapterData.verses);
      if (verseKeys.length === 0) return NextResponse.json({ error: 'No verses found' }, { status: 404 });
      
      const randomVerseNum = verseKeys[Math.floor(Math.random() * verseKeys.length)];
      const verseText = chapterData.verses[randomVerseNum];
      
      return NextResponse.json({
          text: verseText,
          reference: `${randomBook} ${randomChapter}:${randomVerseNum}`,
          version: version,
          book: randomBook,
          chapter: randomChapter,
          verse: randomVerseNum
      });
  } catch (error) {
      console.error('Error getting day text:', error);
      return NextResponse.json({ error: 'Failed to get day text' }, { status: 500 });
  }
}
