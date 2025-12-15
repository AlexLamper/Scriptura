import { NextResponse } from 'next/server';
import { getVersions } from '../../../../lib/local-data';

export async function GET() {
  const versions = await getVersions();
  return NextResponse.json(versions);
}
