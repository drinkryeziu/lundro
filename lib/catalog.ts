import type { ExtraCategory } from './pricing';

/** Default add-ons offered at checkout. Prices in dollars, validated server-side. */
export const EXTRAS: Record<string, { name: string; price: number; max: number; category: ExtraCategory }> = {
  tube: { name: 'Tube with rope', price: 40, max: 2, category: 'gear' },
  sup: { name: 'Paddleboard', price: 25, max: 2, category: 'gear' },
  mat: { name: 'Floating mat', price: 35, max: 1, category: 'gear' },
  cooler: { name: 'Cooler with ice', price: 20, max: 1, category: 'gear' },
  speaker: { name: 'Bluetooth speaker', price: 15, max: 1, category: 'gear' },
  hour: { name: 'Extra hour', price: 85, max: 2, category: 'boat' },
};
export const BASE_HOURS = { HALF_DAY: 4, FULL_DAY: 8 } as const;
