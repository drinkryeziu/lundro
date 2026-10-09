import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const u = await currentUser();
  if (!u?.owner) return NextResponse.json({ error: 'Owners only' }, { status: 403 });
  const rows = await db.booking.findMany({
    where: { boat: { ownerId: u.owner.id } }, orderBy: { date: 'desc' },
    include: { boat: { select: { name: true } }, renter: { select: { name: true, email: true } } },
  });
  return NextResponse.json({
    bookings: rows.map((r) => ({ code: r.code, boat: r.boat.name, renter: r.renter.name, email: r.renter.email,
      date: r.date.toISOString().slice(0, 10), status: r.status, total: r.totalCents / 100 })),
  });
}
