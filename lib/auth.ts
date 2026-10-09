import { createHmac, timingSafeEqual } from 'node:crypto';
import { hashPassword, verifyPassword } from './auth-hash';

export { hashPassword, verifyPassword };
import { cookies } from 'next/headers';
import { db } from './db';

const COOKIE = 'lundro_session';
const MAX_AGE = 60 * 60 * 24 * 14;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === 'production') throw new Error('AUTH_SECRET is required in production');
  return 'dev-only-secret';
}


const sign = (v: string) => createHmac('sha256', secret()).update(v).digest('hex');

export function makeToken(userId: string): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const body = `${userId}.${exp}`;
  return `${body}.${sign(body)}`;
}

export function readToken(token: string | undefined): string | null {
  if (!token) return null;
  const i = token.lastIndexOf('.');
  const body = token.slice(0, i), sig = token.slice(i + 1);
  const expected = sign(body);
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  const [userId, exp] = body.split('.');
  return Number(exp) > Date.now() ? userId : null;
}

export async function setSession(userId: string) {
  (await cookies()).set(COOKIE, makeToken(userId), {
    httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}

export async function currentUser() {
  const id = readToken((await cookies()).get(COOKIE)?.value);
  if (!id) return null;
  return db.user.findUnique({ where: { id }, include: { owner: true } });
}

export function publicUser(u: { id: string; email: string; name: string; role: string }) {
  return { id: u.id, email: u.email, name: u.name, role: u.role };
}
