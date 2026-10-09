import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Confirmation codes are unguessable (24 bits + guest checkout), so lookup by code is the access check.
export async function GET(_: Request, { params }: { params: Promise<{ code: string }> }) {
  const bk = await db.booking.findUnique({
    where: { code: (await params).code.toUpperCase() },
    include: { extras: true, boat: { select: { name: true, area: true } } },
  });
  if (!bk) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const c = (n: number) => n / 100;
  return NextResponse.json({
    code: bk.code, status: bk.status, boat: bk.boat.name, area: bk.boat.area,
    date: bk.date.toISOString().slice(0, 10), length: bk.length, startTime: bk.startTime, guests: bk.guests,
    captainHours: bk.captainHours, taxExempt: bk.taxExempt,
    extras: bk.extras.map((e) => ({ name: e.name, qty: e.qty, price: c(e.priceCents) })),
    price: { boat: c(bk.boatCents), extras: c(bk.extrasCents), captain: c(bk.captainCents), serviceFee: c(bk.serviceFeeCents),
      taxState: c(bk.taxStateCents), taxCounty: c(bk.taxCountyCents), taxTransit: c(bk.taxTransitCents), total: c(bk.totalCents) },
  });
}
