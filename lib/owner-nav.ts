export interface OwnerNavItem {
  label: string;
  href: string;
  /** SVG path data for a 24x24 stroke icon. */
  icon: string;
  badge?: { count: string; tone: 'info' | 'warn' };
}

export const OWNER_NAV: OwnerNavItem[] = [
  { label: 'Overview', href: '/owner', icon: 'M3 12l9-8 9 8M5 10v10h14V10' },
  { label: 'Calendar', href: '/owner/calendar', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
  { label: 'Bookings', href: '/owner/bookings', icon: 'M5 4h14v16H5zM9 8h6M9 12h6M9 16h4', badge: { count: '3', tone: 'info' } },
  { label: 'Boats', href: '/owner/boats', icon: 'M3 15h18l-2 4H5zM6 15V9h9l3 6M10 9V5' },
  { label: 'Extras', href: '/owner/extras', icon: 'M12 3v18M3 12h18M7 7h10v10H7z' },
  { label: 'Customers', href: '/owner/customers', icon: 'M9 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4M16 5a3 3 0 0 1 0 6M18 15c1.7.7 2.7 2.4 3 5' },
  { label: 'Messages', href: '/owner/messages', icon: 'M4 5h16v11H8l-4 4z', badge: { count: '2', tone: 'info' } },
  { label: 'Earnings', href: '/owner/earnings', icon: 'M12 3v18M16 7H10a2.5 2.5 0 0 0 0 5h4a2.5 2.5 0 0 1 0 5H8' },
  { label: 'Reviews', href: '/owner/reviews', icon: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6l-5.4 2.9 1.2-6L3.3 9.3l6.1-.7z' },
  { label: 'Verification', href: '/owner/verification', icon: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4', badge: { count: '3', tone: 'warn' } },
  { label: 'Settings', href: '/owner/settings', icon: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2' },
];

/** Shown in the mobile tab bar; everything else goes under "More". */
export const MOBILE_TABS = ['Overview', 'Calendar', 'Bookings', 'Messages'];
