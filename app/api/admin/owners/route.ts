import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function admin() {
  const u = await currentUser();
  return u?.role === 'ADMIN' ? u : null;
}

export async function GET() {
  if (!(await admin())) return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  const owners = await db.owner.findMany({
    where: { verification: 'PENDING' }, include: { user: { select: { name: true, email: true } }, documents: true, boats: { select: { id: true, name: true, status: true } } },
  });
  return NextResponse.json({ owners });
}

/** Approve or reject an owner; approving also publishes their pending boats. */
export async function POST(req: Request) {
  if (!(await admin())) return NextResponse.json({ error: 'Admins only' }, { status: 403 });
  const { ownerId, decision } = await req.json().catch(() => ({}));
  if (!ownerId || !['APPROVED', 'REJECTED'].includes(decision)) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  await db.$transaction([
    db.owner.update({ where: { id: ownerId }, data: { verification: decision } }),
    ...(decision === 'APPROVED' ? [db.boat.updateMany({ where: { ownerId, status: 'PENDING_REVIEW' }, data: { status: 'ACTIVE' } })] : []),
  ]);
  return NextResponse.json({ ok: true });
}
