'use client';
// Generated from source/Confirmation.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';
import { computeQuote, formatMoney } from '@/lib/pricing';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { cal: false, done: {} }; }
  renderVals() {
    const bk = this.bk;
    const v = bk ? (bk.status === 'PENDING' ? 'request' : 'confirmed') : (this.props.variant ?? 'confirmed');
    const s = this.state;
    const V = {
      confirmed: { title: "You're booked!", sub: 'Get ready for Lake Norman. Everything you need for pickup is below.', heroBg: '#DDF3E4', iconBg: '#14532D', iconPath: 'M5 12l5 5 9-10' },
      taxReview: { title: 'Booked · tax exemption in review', sub: 'Your trip is reserved. We are checking your E-595E with NCDOR, usually within 1 business day. If it can’t be verified, we’ll charge the tax shown before your trip and email you first.', heroBg: '#FFF1C7', iconBg: '#7A5A00', iconPath: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z' },
      request: { title: 'Request sent to Cove & Co.', sub: 'The owner has 24 hours to accept. You won’t be charged unless they do.', heroBg: '#E3F2F4', iconBg: '#0A6C7A', iconPath: 'M4 6h16v12H4zM4 7l8 6 8-6' }
    }[v];
    const exempt = !bk && v === 'taxReview';
    // Half day, captain for 4 hrs, tube + cooler, 10% service fee.
    const q = computeQuote({
      boatPrice: 350, captainHours: 4, serviceFeePct: 10, taxExempt: exempt,
      extras: [{ price: 40, qty: 1, category: 'gear' }, { price: 20, qty: 1, category: 'gear' }]
    });
    if (bk) {
      q.tax = { state: bk.price.taxState, county: bk.price.taxCounty, transit: bk.price.taxTransit, total: bk.price.taxState + bk.price.taxCounty + bk.price.taxTransit };
      q.total = bk.price.total;
    }
    const items = ['Driver license or ID for check-in', 'Sunscreen, hats and water', 'Life jacket for any child under 13 (owner has 4)', 'Cash or card for fuel used, billed at the marina'];
    return Object.assign({}, V, {
      boatName: bk?.boat, bookingCode: bk?.code,
      showAddress: v !== 'request', hideAddress: v === 'request',
      calLabel: s.cal ? '✓ Added to calendar' : 'Add to calendar', addCal: () => this.setState({ cal: true }),
      checklist: items.map((label, i) => ({ label, done: !!s.done[i], deco: s.done[i] ? 'line-through' : 'none', toggle: () => this.setState({ done: Object.assign({}, s.done, { [i]: !s.done[i] }) }) })),
      taxState: formatMoney(q.tax.state), taxCounty: formatMoney(q.tax.county), taxTransit: formatMoney(q.tax.transit), taxTotal: exempt ? 'Exempt (in review)' : formatMoney(q.tax.total),
      total: formatMoney(q.total), paidLabel: v === 'request' ? 'Total if accepted' : 'Total paid'
    });
  }
}

const DEFAULT_PROPS = {"variant":"confirmed"};
const CSS = "\nbutton,input{font-family:inherit;font-size:inherit;color:inherit}\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:20px;padding:24px}\n.card h2{margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:22px;letter-spacing:-0.02em}\n.ln{display:flex;justify-content:space-between;gap:12px;padding:5px 0}\n.kv{display:grid;grid-template-columns:140px 1fr;gap:6px 16px}\n@media (max-width:600px){.kv{grid-template-columns:1fr}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    fetch('/api/bookings/' + encodeURIComponent(code)).then((r) => (r.ok ? r.json() : null)).then((j) => {
      if (j) { ref.current.bk = j; ref.current.setState({}); }
    }).catch(() => {});
  }, []);
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Booking confirmed · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#F6F9FA", "fontFamily": "Arial,Helvetica,sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.5"}}>
<header style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA"}}>
<div style={{"maxWidth": "1100px", "margin": "0 auto", "padding": "0 24px", "display": "flex", "alignItems": "center", "minHeight": "72px"}}>
<Link href={"/"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#0F2A3D"}} aria-label={"Lundro home"}>
<img src="/brand/lundro-logo-horizontal.png" alt="Lundro boat rentals" style={{ height: 44, width: "auto", display: "block" }} />
</Link>
<Link href={"/"} style={{"marginLeft": "auto", "fontWeight": "600", "padding": "12px"}}>
{"My trips"}
</Link>
</div>
</header>
<main style={{"maxWidth": "1100px", "margin": "0 auto", "padding": "32px 24px 80px"}}>
<section style={{"background": s0?.heroBg, "borderRadius": "24px", "padding": "28px", "display": "flex", "flexWrap": "wrap", "gap": "20px", "alignItems": "center"}}>
<span aria-hidden={"true"} style={{"flex": "none", "width": "64px", "height": "64px", "borderRadius": "50%", "background": s0?.iconBg, "color": "#fff", "display": "grid", "placeItems": "center"}}>
<svg width={"32"} height={"32"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.6"} strokeLinecap={"round"} strokeLinejoin={"round"}>
<path d={s0?.iconPath} />
</svg>
</span>
<div style={{"flex": "1 1 300px"}}>
<h1 className={"disp"} role={"status"} style={{"margin": "0", "fontSize": "34px"}}>
{s0?.title}
</h1>
<p style={{"margin": "6px 0 0", "fontSize": "17px"}}>
{s0?.sub}
</p>
<p className={"muted"} style={{"margin": "6px 0 0", "fontSize": "14px"}}>
{"Booking LND-2706-4821 · Confirmation sent to taylor.r@example.com"}
</p>
</div>
</section>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "24px", "marginTop": "24px", "alignItems": "flex-start"}}>
<div style={{"flex": "999 1 520px", "minWidth": "0", "display": "flex", "flexDirection": "column", "gap": "20px"}}>
<section className={"card"} aria-labelledby={"trip-h"}>
<h2 id={"trip-h"}>
{"Your trip"}
</h2>
<div className={"kv"}>
<span className={"muted"}>
{"Boat"}
</span>
<strong>
{s0?.boatName ?? "24' Bennington Pontoon"}
</strong>
<span className={"muted"}>
{"When"}
</span>
<strong>
{"Sat, Jun 12, 2027 · 9:00 AM – 1:00 PM"}
</strong>
<span className={"muted"}>
{"Guests"}
</span>
<strong>
{"8"}
</strong>
<span className={"muted"}>
{"Captain"}
</span>
<strong>
{"Mike R. (USCG licensed)"}
</strong>
<span className={"muted"}>
{"Extras"}
</span>
<strong>
{"Tube with rope, Cooler with ice"}
</strong>
</div>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap", "marginTop": "18px"}}>
<button type={"button"} className={"btn btn-g"} onClick={s0?.addCal}>
{s0?.calLabel}
</button>
<button type={"button"} className={"btn btn-g"}>
{"Get directions"}
</button>
</div>
</section>
<section className={"card"} aria-labelledby={"pick-h"}>
<h2 id={"pick-h"}>
{"Pickup details"}
</h2>
{s0?.showAddress ? (<>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"Harbor Point Marina, Slip B14"}
</p>
<p style={{"margin": "2px 0 0"}}>
{"20210 Harbor Point Ln, Cornelius, NC 28031"}
</p>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "15px"}}>
{"Park in the gravel lot by the bait shop; spaces marked \"Rental guests\". Walk down dock B. Arrive 15 minutes early for the safety briefing."}
</p>
</>) : null}
{s0?.hideAddress ? (<>
<p className={"muted"} style={{"margin": "0"}}>
{"The exact address and owner contact appear here once the booking is confirmed."}
</p>
</>) : null}
</section>
<section className={"card"} aria-labelledby={"host-h"}>
<h2 id={"host-h"}>
{"Your host"}
</h2>
<div style={{"display": "flex", "gap": "14px", "alignItems": "center", "flexWrap": "wrap"}}>
<span aria-hidden={"true"} className={"disp"} style={{"width": "52px", "height": "52px", "borderRadius": "14px", "background": "#0F2A3D", "color": "#FFC94A", "display": "grid", "placeItems": "center", "fontWeight": "700"}}>
{"C&C"}
</span>
<div style={{"flex": "1 1 220px"}}>
<strong style={{"display": "block"}}>
{"Cove & Co. Boat Rentals"}
</strong>
{s0?.showAddress ? (<>
<span className={"muted"} style={{"fontSize": "15px"}}>
{"(704) 555-0142 · bookings@coveandco.example"}
</span>
</>) : null}
{s0?.hideAddress ? (<>
<span className={"muted"} style={{"fontSize": "15px"}}>
{"Contact details shared after confirmation"}
</span>
</>) : null}
</div>
<button type={"button"} className={"btn btn-g"}>
{"Message host"}
</button>
</div>
</section>
<section className={"card"} aria-labelledby={"bring-h"}>
<h2 id={"bring-h"}>
{"Before you go"}
</h2>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.checklist || []).map((__it, __k) => { const s1 = { ...s0, "c": __it }; return (<Fragment key={__k}>
<li>
<label style={{"display": "flex", "gap": "12px", "alignItems": "center", "minHeight": "48px", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s1?.c?.done} onChange={s1?.c?.toggle} style={{"width": "22px", "height": "22px", "accentColor": "#0A6C7A"}} />
<span style={{"textDecoration": s1?.c?.deco}}>
{s1?.c?.label}
</span>
</label>
</li>
</Fragment>); })}
</ul>
</section>
</div>
<aside style={{"flex": "1 1 340px", "minWidth": "0"}}>
<section className={"card"} aria-labelledby={"rcpt-h"}>
<h2 id={"rcpt-h"}>
{"Receipt"}
</h2>
<div style={{"fontSize": "15px"}}>
<div className={"ln"}>
<span>
{"Boat · Half day (4 hrs)"}
</span>
<span>
{"$350.00"}
</span>
</div>
<div className={"ln"}>
<span>
{"Tube with rope"}
</span>
<span>
{"$40.00"}
</span>
</div>
<div className={"ln"}>
<span>
{"Cooler with ice"}
</span>
<span>
{"$20.00"}
</span>
</div>
<div className={"ln"}>
<span>
{"Captain · 4 hrs × $50"}
</span>
<span>
{"$200.00"}
</span>
</div>
<div className={"ln"}>
<span>
{"Lundro service fee"}
</span>
<span>
{"$61.00"}
</span>
</div>
<div style={{"borderTop": "1px solid #DCE5EA", "marginTop": "8px", "paddingTop": "8px"}}>
<div className={"ln"}>
<strong>
{"NC sales tax"}
</strong>
<strong>
{s0?.taxTotal}
</strong>
</div>
<div className={"ln muted"}>
<span>
{"State (3% boat · 4.75% gear)"}
</span>
<span>
{s0?.taxState}
</span>
</div>
<div className={"ln muted"}>
<span>
{"County (Mecklenburg 2%)"}
</span>
<span>
{s0?.taxCounty}
</span>
</div>
<div className={"ln muted"}>
<span>
{"Transit (1.5%)"}
</span>
<span>
{s0?.taxTransit}
</span>
</div>
</div>
<div className={"ln"} style={{"borderTop": "1px solid #DCE5EA", "marginTop": "8px", "paddingTop": "12px", "fontSize": "19px"}}>
<strong>
{s0?.paidLabel}
</strong>
<strong>
{s0?.total}
</strong>
</div>
<div className={"ln muted"}>
<span>
{"Security deposit hold"}
</span>
<span>
{"$500.00"}
</span>
</div>
</div>
<p className={"muted"} style={{"margin": "12px 0 0", "fontSize": "13px"}}>
{"Tax rates saved at time of booking (Jun 2027). Lundro collects and remits NC sales tax as a marketplace facilitator."}
</p>
<button type={"button"} className={"btn btn-g"} style={{"width": "100%", "marginTop": "14px"}}>
{"Download receipt (PDF)"}
</button>
</section>
<section className={"card"} style={{"marginTop": "20px"}}>
<h2 style={{"fontSize": "18px"}}>
{"Need to cancel?"}
</h2>
<p className={"muted"} style={{"margin": "0", "fontSize": "15px"}}>
{"Moderate policy: full refund, tax included, until Mon, Jun 7. 50% after that."}
</p>
<a href={"#"} style={{"display": "inline-block", "marginTop": "10px", "fontWeight": "700", "padding": "8px 0"}}>
{"Cancel booking"}
</a>
</section>
</aside>
</div>
<p style={{"margin": "32px 0 0", "textAlign": "center"}}>
<Link href={"/"} className={"btn btn-p"}>
{"Back to Lundro home"}
</Link>
</p>
</main>
</div>
    </>
  );
}
