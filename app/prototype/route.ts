import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';

// Serves the clickable prototype at /prototype (source: public/prototype/index.html).
export async function GET() {
  const html = await readFile(path.join(process.cwd(), 'public', 'prototype', 'index.html'), 'utf8');
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
