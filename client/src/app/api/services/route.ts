import { NextResponse } from 'next/server';
import { getVipServices } from '@/lib/db';

export async function GET() {
  const services = await getVipServices();
  return NextResponse.json(services);
}
