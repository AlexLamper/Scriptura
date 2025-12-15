import { NextResponse } from 'next/server';
import { getBooks } from '../../../../lib/local-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version') || 'statenvertaling'; // Default version
  const books = await getBooks(version);
  return NextResponse.json(books);
}
