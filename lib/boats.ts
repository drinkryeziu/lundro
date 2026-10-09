import type { Boat } from '@prisma/client';

const TYPE_OUT: Record<string, string> = { PONTOON: 'pontoon', SKI_WAKE: 'ski', CENTER_CONSOLE: 'center', SAILBOAT: 'sail', JET_SKI: 'jet' };
export const TYPE_IN: Record<string, string> = Object.fromEntries(Object.entries(TYPE_OUT).map(([k, v]) => [v, k]));

type Meta = { dist?: number; x?: number; y?: number; palette?: string; accent?: string };

/** Shape consumed by the search and boat pages. */
export function serializeBoat(b: Boat) {
  const m = (b.listingMeta ?? {}) as Meta;
  return {
    id: b.id, title: b.name, area: b.area, guests: b.capacity,
    half: b.halfDayCents / 100, full: b.fullDayCents / 100,
    rating: b.ratingAvg, reviews: b.reviewCount,
    captain: b.captainAvailable, self: b.selfDrive, instant: b.instantBook,
    extras: b.amenities, type: TYPE_OUT[b.type], dist: m.dist ?? 0, x: m.x ?? 50, y: m.y ?? 50,
    palette: m.palette ?? 'midday', accent: m.accent ?? '#0A6C7A',
    startTimes: b.startTimes, deposit: b.depositCents / 100,
  };
}
