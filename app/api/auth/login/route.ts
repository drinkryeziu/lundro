import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { publicUser, setSession, verifyPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  const user = await db.user.findUnique({ where: { email: String(email ?? '').toLowerCase() } });
  if (!user || !verifyPassword(String(password ?? ''), user.passwordHash))
    return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 });
  await setSession(user.id);
  return NextResponse.json({ user: publicUser(user) });
}
