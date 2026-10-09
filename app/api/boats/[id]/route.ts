import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { serializeBoat } from '@/lib/boats';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const boat = await db.boat.findUnique({ where: { id: (await params).id } });
  if (!boat || boat.status !== 'ACTIVE') return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ boat: serializeBoat(boat) });
}
