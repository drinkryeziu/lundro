// Lundro pricing and North Carolina sales-tax rules.
// Boat time (rental + extra hours) is taxed at the 3% state rate, capped at $1,500 of tax.
// Rented gear (tubes, paddleboards, coolers...) is taxed at 4.75% state + 2% county + 1.5% transit.
// Captain fees and the service fee are not taxed here (pending NCDOR guidance).

export const TAX_RATES = {
  boatState: 0.03,
  boatStateCap: 1500,
  gearState: 0.0475,
  gearCounty: 0.02,
  gearTransit: 0.015,
} as const;

export const CAPTAIN_RATE_PER_HOUR = 50;
export const SECURITY_DEPOSIT = 500;

export type ExtraCategory = 'gear' | 'boat';

export interface ExtraLine {
  price: number;
  qty: number;
  category: ExtraCategory;
}

export interface QuoteInput {
  /** Base rental price for the chosen length (half or full day). */
  boatPrice: number;
  extras: ExtraLine[];
  /** Hours the captain is booked for, or 0 / undefined for self-drive. */
  captainHours?: number;
  /** Service fee as a percent, for example 10. */
  serviceFeePct: number;
  /** True for federal agencies and (pending review) state agencies. */
  taxExempt?: boolean;
}

export interface Quote {
  boat: number;
  extrasTotal: number;
  gearTotal: number;
  boatTimeTotal: number;
  captain: number;
  serviceFee: number;
  tax: { state: number; county: number; transit: number; total: number };
  total: number;
}

export const roundCents = (n: number): number => Math.round(n * 100) / 100;

export const formatMoney = (n: number): string =>
  '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export function computeQuote(input: QuoteInput): Quote {
  const { boatPrice, extras, captainHours = 0, serviceFeePct, taxExempt = false } = input;

  let gearTotal = 0;
  let boatTimeTotal = boatPrice;
  let extrasTotal = 0;
  for (const e of extras) {
    const line = e.price * e.qty;
    extrasTotal += line;
    if (e.category === 'gear') gearTotal += line;
    else boatTimeTotal += line;
  }

  const captain = captainHours > 0 ? CAPTAIN_RATE_PER_HOUR * captainHours : 0;
  const serviceFee = roundCents((boatPrice + extrasTotal + captain) * (serviceFeePct / 100));

  let state = roundCents(
    Math.min(boatTimeTotal * TAX_RATES.boatState, TAX_RATES.boatStateCap) + gearTotal * TAX_RATES.gearState,
  );
  let county = roundCents(gearTotal * TAX_RATES.gearCounty);
  let transit = roundCents(gearTotal * TAX_RATES.gearTransit);
  if (taxExempt) state = county = transit = 0;

  const taxTotal = state + county + transit;
  return {
    boat: boatPrice,
    extrasTotal,
    gearTotal,
    boatTimeTotal,
    captain,
    serviceFee,
    tax: { state, county, transit, total: taxTotal },
    total: boatPrice + extrasTotal + captain + serviceFee + taxTotal,
  };
}
