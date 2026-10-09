import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { serializeBoat } from '@/lib/boats';

export const dynamic = 'force-dynamic';

export async function GET() {
  const boats = await db.boat.findMany({ where: { status: 'ACTIVE' }, orderBy: { createdAt: 'asc' } });
  return NextResponse.json({ boats: boats.map(serializeBoat) });
}
