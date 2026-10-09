import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser, hashPassword, publicUser, setSession } from '@/lib/auth';

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const type = b.type === 'company' ? 'COMPANY' : 'INDIVIDUAL';
  let user = await currentUser();
  if (!user) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email ?? '') || (b.password ?? '').length < 8 || (b.name ?? '').trim().length < 2)
      return NextResponse.json({ error: 'Name, email and a password of 8+ characters are required.' }, { status: 400 });
    if (await db.user.findUnique({ where: { email: b.email.toLowerCase() } }))
      return NextResponse.json({ error: 'An account with this email already exists. Log in first.' }, { status: 409 });
    user = await db.user.create({
      data: { email: b.email.toLowerCase(), name: b.name.trim(), phone: b.phone, passwordHash: hashPassword(b.password) },
      include: { owner: true },
    });
    await setSession(user.id);
  }
  if (user.owner) return NextResponse.json({ error: 'Already an owner.' }, { status: 409 });

  const lake = await db.lake.findUnique({ where: { slug: 'lake-norman' } });
  const price = (v: unknown) => Math.round(Number(v) * 100);
  await db.$transaction(async (tx) => {
    await tx.user.update({ where: { id: user!.id }, data: { role: 'OWNER' } });
    const owner = await tx.owner.create({ data: { userId: user!.id, type, companyName: b.companyName, address: b.address } });
    if (b.boat?.name && lake) {
      await tx.boat.create({
        data: {
          ownerId: owner.id, lakeId: lake.id, name: String(b.boat.name), type: 'PONTOON', capacity: Number(b.boat.capacity) || 6,
          halfDayCents: price(b.boat.halfPrice) || 0, fullDayCents: price(b.boat.fullPrice) || 0,
          startTimes: b.boat.startTimes ?? [], safetyGear: b.boat.safetyGear ?? [], status: 'PENDING_REVIEW',
        },
      });
    }
  });
  return NextResponse.json({ user: publicUser({ ...user, role: 'OWNER' }), verification: 'PENDING' }, { status: 201 });
}
