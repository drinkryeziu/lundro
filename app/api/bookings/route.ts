import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';
import { computeQuote } from '@/lib/pricing';
import { BASE_HOURS, EXTRAS } from '@/lib/catalog';

const toCents = (n: number) => Math.round(n * 100);

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const length = b.length === 'full' ? 'FULL_DAY' : 'HALF_DAY';
  const boat = await db.boat.findUnique({ where: { id: String(b.boatId) }, include: { owner: true } });
  if (!boat || boat.status !== 'ACTIVE') return NextResponse.json({ error: 'Boat not available' }, { status: 404 });

  const date = new Date(`${b.date}T00:00:00Z`);
  if (isNaN(+date) || date.getTime() < Date.now() - 86_400_000)
    return NextResponse.json({ error: 'Choose a valid future date.' }, { status: 400 });
  const guests = Number(b.guests ?? 1);
  if (!(guests >= 1) || guests > boat.capacity)
    return NextResponse.json({ error: `This boat holds up to ${boat.capacity} guests.` }, { status: 400 });

  const captain = !!b.captain;
  if (captain && !boat.captainAvailable) return NextResponse.json({ error: 'Captain not offered on this boat.' }, { status: 400 });
  if (!captain && !boat.selfDrive) return NextResponse.json({ error: 'This boat requires a captain.' }, { status: 400 });

  // Guest checkout: use the signed-in user, otherwise find or create by email.
  let renter = await currentUser();
  if (!renter) {
    const c = b.contact ?? {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.email ?? '') || (c.name ?? '').trim().length < 2)
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    const email = c.email.toLowerCase();
    const found = await db.user.findUnique({ where: { email }, include: { owner: true } });
    renter = found ?? (await db.user.create({ data: { email, name: c.name.trim(), phone: c.phone }, include: { owner: true } }));
  }

  const lines = Object.entries((b.extras ?? {}) as Record<string, number>)
    .map(([k, q]) => ({ k, qty: Math.floor(Number(q)), def: EXTRAS[k] }))
    .filter((l) => l.def && l.qty > 0)
    .map((l) => ({ ...l, qty: Math.min(l.qty, l.def.max) }));

  const extraHours = lines.find((l) => l.k === 'hour')?.qty ?? 0;
  const captainHours = captain ? BASE_HOURS[length] + extraHours : 0;
  const taxExempt = b.orgType === 'federal' || b.orgType === 'state';
  const boatPrice = (length === 'FULL_DAY' ? boat.fullDayCents : boat.halfDayCents) / 100;
  const quote = computeQuote({
    boatPrice, captainHours, serviceFeePct: boat.owner.serviceFeePct, taxExempt,
    extras: lines.map((l) => ({ price: l.def.price, qty: l.qty, category: l.def.category })),
  });

  const code = 'LND-' + randomBytes(3).toString('hex').toUpperCase();
  try {
    const booking = await db.$transaction(async (tx) => {
      const clash = await tx.booking.findFirst({
        where: { boatId: boat.id, date, status: { in: ['PENDING', 'CONFIRMED'] }, startTime: b.startTime },
      });
      const blocked = await tx.calendarBlock.findUnique({ where: { boatId_date: { boatId: boat.id, date } } });
      if (clash || blocked) throw new Error('UNAVAILABLE');
      return tx.booking.create({
        data: {
          code, boatId: boat.id, renterId: renter!.id, date, length, startTime: String(b.startTime ?? ''), guests,
          captainHours, taxExempt, status: boat.instantBook ? 'CONFIRMED' : 'PENDING',
          boatCents: toCents(quote.boat), extrasCents: toCents(quote.extrasTotal), captainCents: toCents(quote.captain),
          serviceFeeCents: toCents(quote.serviceFee), taxStateCents: toCents(quote.tax.state),
          taxCountyCents: toCents(quote.tax.county), taxTransitCents: toCents(quote.tax.transit),
          totalCents: toCents(quote.total), depositCents: boat.depositCents,
          extras: { create: lines.map((l) => ({ name: l.def.name, category: l.def.category === 'gear' ? 'GEAR' : 'BOAT', priceCents: toCents(l.def.price), qty: l.qty })) },
        },
      });
    });
    return NextResponse.json({ code: booking.code, status: booking.status, total: booking.totalCents / 100 }, { status: 201 });
  } catch (e) {
    if ((e as Error).message === 'UNAVAILABLE')
      return NextResponse.json({ error: 'That boat is already booked for that date and time.' }, { status: 409 });
    throw e;
  }
}
