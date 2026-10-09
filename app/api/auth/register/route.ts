import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, publicUser, setSession } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password, name, phone } = await req.json().catch(() => ({}));
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email ?? '') || (password ?? '').length < 8 || (name ?? '').trim().length < 2)
    return NextResponse.json({ error: 'Valid name, email and a password of 8+ characters are required.' }, { status: 400 });
  const lower = email.toLowerCase();
  if (await db.user.findUnique({ where: { email: lower } }))
    return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
  const user = await db.user.create({ data: { email: lower, name: name.trim(), phone, passwordHash: hashPassword(password) } });
  await setSession(user.id);
  return NextResponse.json({ user: publicUser(user) }, { status: 201 });
}
