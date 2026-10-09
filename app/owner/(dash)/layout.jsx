'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { OWNER_NAV, MOBILE_TABS } from '@/lib/owner-nav';

const BADGE_TONE = {
  info: 'bg-navy text-white',
  warn: 'bg-danger-bg text-danger-ink',
};

function Icon({ d, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function OwnerDashboardLayout({ children }) {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const isCurrent = (item) => item.href === pathname;
  const tabs = OWNER_NAV.filter((n) => MOBILE_TABS.includes(n.label));
  const moreItems = OWNER_NAV.filter((n) => !MOBILE_TABS.includes(n.label));

  return (
    <div className="flex min-h-screen flex-wrap bg-canvas font-sans text-base leading-normal text-navy">
      <style>{`.hide-sm{}@media (max-width:860px){.hide-sm{display:none!important}}`}</style>

      {/* Desktop sidebar */}
      <nav aria-label="Dashboard" className="flex flex-[0_0_248px] flex-col gap-1 border-r border-line bg-white px-3 py-4 max-[860px]:hidden">
        <Link href="/" aria-label="Lundro home" className="flex items-center gap-2.5 px-2 pb-3 pt-1 text-navy no-underline">
          <Logo />
          <span className="disp text-[22px] font-bold">Lundro</span>
        </Link>
        <div className="mb-2 flex items-center gap-2.5 rounded-[14px] border border-line p-2.5">
          <span aria-hidden="true" className="disp grid size-9 place-items-center rounded-[10px] bg-navy text-sm font-bold text-sun">C&amp;C</span>
          <span className="leading-tight">
            <strong className="block text-sm">Cove &amp; Co.</strong>
            <span className="text-[13px] text-muted">Jordan Hale · Owner</span>
          </span>
        </div>
        {OWNER_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item) ? 'page' : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold no-underline hover:bg-hover ${
              isCurrent(item) ? 'bg-teal-light font-bold text-teal-ink' : 'text-navy'
            }`}
          >
            <Icon d={item.icon} size={20} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className={`inline-flex items-center whitespace-nowrap rounded-full px-[9px] py-[3px] text-xs font-bold ${BADGE_TONE[item.badge.tone]}`}>
                {item.badge.count}
              </span>
            )}
          </Link>
        ))}
        <Link href="/" className="mt-3 flex min-h-11 items-center rounded-xl px-3 font-semibold no-underline hover:bg-hover">
          View public site ↗
        </Link>
      </nav>

      <div className="min-w-0 flex-[999_1_560px] px-8 pb-12 pt-7 max-[860px]:px-4 max-[860px]:pb-24">{children}</div>

      {/* Mobile tab bar */}
      <nav aria-label="Dashboard" className="fixed inset-x-0 bottom-0 z-20 hidden border-t border-line bg-white max-[860px]:flex">
        {tabs.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(item) ? 'page' : undefined}
            className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-bold no-underline ${
              isCurrent(item) ? 'text-teal' : 'text-muted'
            }`}
          >
            <Icon d={item.icon} size={22} />
            {item.label}
          </Link>
        ))}
        <button
          type="button"
          aria-expanded={more}
          onClick={() => setMore(!more)}
          className="flex min-h-16 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 border-0 bg-transparent text-xs font-bold text-muted"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
          </svg>
          More
        </button>
      </nav>
      {more && (
        <div className="fixed inset-x-0 bottom-16 z-[21] rounded-t-[20px] border-t border-line bg-white p-3 shadow-[0_-8px_24px_rgba(15,42,61,.15)]">
          {moreItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMore(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold text-navy no-underline hover:bg-hover">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
