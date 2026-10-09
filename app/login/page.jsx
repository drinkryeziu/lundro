'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    const r = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'register'}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f),
    });
    const j = await r.json();
    if (!r.ok) { setErr(j.error || 'Something went wrong'); setBusy(false); return; }
    const role = j.user.role;
    window.location.href = role === 'OWNER' ? '/owner' : role === 'ADMIN' ? '/admin/review' : '/';
  }

  const inp = { width: '100%', minHeight: 48, border: '1px solid #7B8F9B', borderRadius: 12, padding: '0 14px', fontSize: 16, boxSizing: 'border-box' };
  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '48px 16px', fontFamily: "'Fellix','Figtree', system-ui, sans-serif", color: '#0F2A3D' }}>
      <Link href="/" style={{ color: '#0A6C7A', fontWeight: 700 }}>← Lundro</Link>
      <h1 style={{ fontFamily: "'Fellix','Bricolage Grotesque', serif" }}>{mode === 'login' ? 'Log in' : 'Create account'}</h1>
      <form onSubmit={submit} style={{ display: 'grid', gap: 14 }}>
        {mode === 'register' && (<label>Name<input style={inp} value={f.name} onChange={set('name')} autoComplete="name" required /></label>)}
        <label>Email<input style={inp} type="email" value={f.email} onChange={set('email')} autoComplete="email" required /></label>
        <label>Password<input style={inp} type="password" value={f.password} onChange={set('password')} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required /></label>
        {err && <p role="alert" style={{ color: '#B42318', fontWeight: 600, margin: 0 }}>{err}</p>}
        <button className="btn btn-p" disabled={busy} style={{ minHeight: 48 }}>{busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}</button>
      </form>
      <p>
        {mode === 'login' ? 'New to Lundro? ' : 'Already have an account? '}
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ background: 'none', border: 0, color: '#0A6C7A', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
          {mode === 'login' ? 'Create an account' : 'Log in'}
        </button>
      </p>
    </main>
  );
}
