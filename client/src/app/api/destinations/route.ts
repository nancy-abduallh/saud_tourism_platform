import { NextResponse } from 'next/server';
import { getDestinations } from '@/lib/db';

export async function GET() {
  const destinations = await getDestinations();
  return NextResponse.json(destinations);
}
