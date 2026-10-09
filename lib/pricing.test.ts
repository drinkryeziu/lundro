import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeQuote, formatMoney } from './pricing.ts';

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} != ${b}`);

// The booking shown on the confirmation page: half day, captain 4h, tube + cooler, 10% fee.
const trip = {
  boatPrice: 350,
  extras: [
    { price: 40, qty: 1, category: 'gear' as const },
    { price: 20, qty: 1, category: 'gear' as const },
  ],
  captainHours: 4,
  serviceFeePct: 10,
};

test('splits tax into state, county and transit', () => {
  const q = computeQuote(trip);
  near(q.tax.state, 13.35); // 3% of $350 boat time + 4.75% of $60 gear
  near(q.tax.county, 1.2);
  near(q.tax.transit, 0.9);
  near(q.total, 686.45);
});

test('exempt bookings pay no tax', () => {
  const q = computeQuote({ ...trip, taxExempt: true });
  assert.equal(q.tax.total, 0);
  near(q.total, 671);
});

test('extra hours are boat time, not gear', () => {
  const q = computeQuote({ ...trip, extras: [{ price: 85, qty: 2, category: 'boat' }] });
  near(q.tax.state, (350 + 170) * 0.03);
  assert.equal(q.tax.county, 0);
});

test('state boat tax is capped at $1,500', () => {
  const q = computeQuote({ boatPrice: 100000, extras: [], serviceFeePct: 0 });
  assert.equal(q.tax.state, 1500);
});

test('self-drive has no captain charge', () => {
  assert.equal(computeQuote({ ...trip, captainHours: 0 }).captain, 0);
});

test('formats money with thousands separators', () => {
  assert.equal(formatMoney(1296.25), '$1,296.25');
});
