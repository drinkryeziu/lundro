'use client';
// Generated from source/Dash-Bookings.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { tab: 'req', q: '', sel: 'q1', dec: {} }; }
  renderVals() {
    const s = this.state;
    const comm = (this.props.commissionPct ?? 15) / 100;
    const money = n => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const BN = { B: "24' Bennington Pontoon", M: "22' MasterCraft XT22", H: "26' Harris Grand Mariner" };
    const D = [
      ['q1', 'req', 'Sat', '19', 'Jun', 'Marcus L.', 12, 'H', 'Full day · 9:00 AM', 1050, [['Tube with rope', 40], ['Floating mat', 35]], 400, false],
      ['q2', 'req', 'Sun', '20', 'Jun', 'Hannah K.', 8, 'M', 'Half day · 1:30 PM', 525, [['Tube with rope', 40]], 0, false],
      ['q3', 'req', 'Fri', '25', 'Jun', 'Dana W. · NC Dept. of Environmental Quality', 10, 'B', 'Half day · 9:00 AM', 350, [['Cooler with ice', 20]], 200, true],
      ['u1', 'up', 'Thu', '10', 'Jun', 'Alicia M.', 9, 'B', 'Half day · 9:00 AM', 350, [['Tube with rope', 40], ['Floating mat', 35]], 200, false],
      ['u2', 'up', 'Thu', '10', 'Jun', 'Ben T.', 6, 'M', 'Half day · 1:30 PM', 525, [['Cooler with ice', 20]], 0, false],
      ['u3', 'up', 'Sat', '12', 'Jun', 'Taylor R.', 8, 'B', 'Half day · 9:00 AM', 350, [['Tube with rope', 40], ['Cooler with ice', 20]], 200, false],
      ['u4', 'up', 'Sat', '12', 'Jun', 'Devon S.', 14, 'H', 'Full day · 9:00 AM', 1050, [], 400, false],
      ['u5', 'up', 'Sun', '13', 'Jun', 'Chris P.', 10, 'M', 'Half day · 9:00 AM', 525, [['Tube with rope', 40], ['Bluetooth speaker', 15]], 0, false],
      ['u6', 'up', 'Sun', '20', 'Jun', 'Kim J.', 12, 'B', 'Full day · 9:00 AM', 600, [], 400, false],
      ['c1', 'done', 'Sun', '6', 'Jun', 'Priya S.', 7, 'B', 'Half day · 9:00 AM', 350, [['Tube with rope', 40]], 0, false],
      ['c2', 'done', 'Sat', '5', 'Jun', 'Derek P.', 12, 'H', 'Full day · 9:00 AM', 1050, [], 400, false],
      ['c3', 'done', 'Sun', '30', 'May', 'Alicia M.', 6, 'M', 'Half day · 1:30 PM', 525, [], 0, false],
      ['x1', 'cancel', 'Tue', '8', 'Jun', 'Sam N.', 6, 'B', 'Half day · 9:00 AM', 350, [], 200, false]
    ];
    const all = D.map(([id, st0, dow, day, mon, who, guests, b, trip, boat, ex, cap, exempt]) => {
      const dec = s.dec[id];
      const st = dec === 'a' ? 'up' : dec === 'd' ? 'cancel' : st0;
      const gear = ex.reduce((a, x) => a + x[1], 0);
      const price = boat + gear + cap;
      const payout = st === 'cancel' ? 0 : price * (1 - comm);
      const tax = exempt ? 0 : boat * 0.03 + gear * 0.0825;
      const S = { req: ['Request', '#FFF1C7', '#5C4300'], up: ['Confirmed', '#DDF3E4', '#14532D'], done: ['Completed', '#E8EFF2', '#3D5160'], cancel: [dec === 'd' ? 'Declined' : 'Cancelled · weather', '#FDE2E1', '#8E1B13'] }[st];
      const setD = v => this.setState({ dec: Object.assign({}, s.dec, { [id]: v }) });
      return { id, st, dow, day, mon, who, first: who.split(' ')[0], guests, boatName: BN[b], trip, mode: cap ? 'Captain' : 'Self-drive', status: S[0], sBg: S[1], sFg: S[2],
        payoutFmt: st === 'cancel' ? '$0 · refunded' : money(payout), isReq: st === 'req', exempt,
        border: s.sel === id ? '2px solid #0A6C7A' : '1px solid #DCE5EA',
        ref: 'LND-' + (mon === 'May' ? '05' : '06') + day.padStart(2, '0') + '-' + (4800 + D.findIndex(x => x[0] === id) * 7),
        date: dow + ', ' + mon + ' ' + day, boatFmt: money(boat), extras: ex.map(x => ({ label: x[0], amt: money(x[1]) })), hasCaptain: cap > 0, captainFmt: money(cap),
        priceFmt: money(price), commFmt: money(price * comm), taxFmt: money(tax),
        contact: st === 'up' || st === 'done' ? 'Phone (704) 555-01' + (20 + guests) + ' · shared because the booking is confirmed' : 'Contact details are shared once the booking is confirmed.',
        accept: () => setD('a'), decline: () => setD('d'), view: () => this.setState({ sel: id }) };
    });
    const q = s.q.trim().toLowerCase();
    const inTab = all.filter(r => r.st === s.tab);
    const rows = inTab.filter(r => !q || (r.who + ' ' + r.boatName).toLowerCase().indexOf(q) >= 0);
    const TL = [['req', 'Requests'], ['up', 'Upcoming'], ['done', 'Completed'], ['cancel', 'Cancelled']];
    const tabsList = TL.map(([k, label]) => { const on = s.tab === k; return { label, count: all.filter(r => r.st === k).length, selected: on ? 'true' : 'false', fg: on ? '#0F2A3D' : '#4A5F6E', line: on ? '#0A6C7A' : 'transparent', cBg: on ? '#0F2A3D' : '#E8EFF2', cFg: on ? '#fff' : '#3D5160', pick: () => this.setState({ tab: k }) }; });
    const d = all.find(r => r.id === s.sel);
    return ({
      q: s.q, setQ: e => this.setState({ q: e.target.value }), tabsList, tabName: TL.find(t => t[0] === s.tab)[1], rows,
      none: rows.length === 0, emptyTitle: q ? 'No bookings match “' + s.q + '”' : 'Nothing here yet',
      emptyBody: q ? 'Try a renter’s first name or a boat name.' : (s.tab === 'req' ? 'New booking requests will show up here. You have 24 hours to reply.' : 'Bookings will appear here.'),
      hasSel: !!d, d: d || {}, commPct: Math.round(comm * 100)
    });
  }
}

const DEFAULT_PROPS = {"commissionPct":15};
const CSS = "\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n.ln{display:flex;justify-content:space-between;gap:12px;padding:4px 0;font-size:15px}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner bookings · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Bookings"}
</h1>
<label style={{"flex": "0 1 320px"}}>
<span style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Search bookings"}
</span>
<input type={"search"} className={"inp"} placeholder={"Search renter or boat"} value={s0?.q} onChange={s0?.setQ} />
</label>
</div>
<div role={"tablist"} aria-label={"Booking status"} style={{"display": "flex", "gap": "6px", "marginTop": "18px", "borderBottom": "1px solid #DCE5EA", "overflowX": "auto"}}>
{(s0?.tabsList || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<button type={"button"} role={"tab"} aria-selected={s1?.t?.selected} onClick={s1?.t?.pick} style={{"border": "0", "background": "transparent", "minHeight": "48px", "padding": "0 14px", "fontWeight": "700", "color": s1?.t?.fg, "borderBottom": `3px solid ${s1?.t?.line ?? ""}`, "cursor": "pointer", "whiteSpace": "nowrap"}}>
{s1?.t?.label}{" "}
<span className={"badge"} style={{"background": s1?.t?.cBg, "color": s1?.t?.cFg}}>
{s1?.t?.count}
</span>
</button>
</Fragment>); })}
</div>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "18px", "alignItems": "flex-start"}}>
<section role={"tabpanel"} aria-label={`${s0?.tabName ?? ""} bookings`} style={{"flex": "999 1 520px", "minWidth": "0", "display": "flex", "flexDirection": "column", "gap": "10px"}}>
{s0?.none ? (<>
<div className={"card"} style={{"textAlign": "center", "padding": "40px 20px"}}>
<h2 style={{"margin": "0", "fontSize": "20px"}}>
{s0?.emptyTitle}
</h2>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{s0?.emptyBody}
</p>
</div>
</>) : null}
{(s0?.rows || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<article style={{"background": "#fff", "border": s1?.r?.border, "borderRadius": "16px", "padding": "14px 16px", "display": "flex", "flexWrap": "wrap", "gap": "14px", "alignItems": "center"}}>
<span style={{"flex": "none", "width": "64px", "textAlign": "center", "background": "#F1F6F8", "borderRadius": "12px", "padding": "6px 0", "lineHeight": "1.15"}}>
<span className={"muted"} style={{"display": "block", "fontSize": "12px", "fontWeight": "700"}}>
{s1?.r?.dow}
</span>
<span className={"disp"} style={{"display": "block", "fontSize": "22px", "fontWeight": "700"}}>
{s1?.r?.day}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "12px"}}>
{s1?.r?.mon}
</span>
</span>
<span style={{"flex": "1 1 220px", "minWidth": "0"}}>
<strong style={{"display": "block"}}>
{s1?.r?.who}{" "}
<span className={"muted"} style={{"fontWeight": "500"}}>
{"· "}{s1?.r?.guests}{" guests"}
</span>
</strong>
<span style={{"display": "block", "fontSize": "15px"}}>
{s1?.r?.boatName}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.r?.trip}{" · "}{s1?.r?.mode}
</span>
</span>
<span style={{"display": "flex", "flexDirection": "column", "alignItems": "flex-end", "gap": "4px"}}>
<span className={"badge"} style={{"background": s1?.r?.sBg, "color": s1?.r?.sFg}}>
{s1?.r?.status}
</span>
<strong>
{s1?.r?.payoutFmt}
</strong>
</span>
<span style={{"display": "flex", "gap": "6px", "flexWrap": "wrap", "width": "100%", "justifyContent": "flex-end"}}>
{s1?.r?.isReq ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s1?.r?.accept}>
{"Accept"}
</button>
<button type={"button"} className={"btn btn-g"} onClick={s1?.r?.decline}>
{"Decline"}
</button>
</>) : null}
<button type={"button"} className={"btn btn-g"} onClick={s1?.r?.view} aria-label={`View booking for ${s1?.r?.who ?? ""}`}>
{"View"}
</button>
</span>
</article>
</Fragment>); })}
</section>
<aside className={"card"} aria-label={"Booking details"} style={{"flex": "1 1 320px", "minWidth": "0"}}>
{s0?.hasSel ? (<>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Booking "}{s0?.d?.ref}
</p>
<h2 className={"disp"} style={{"margin": "2px 0 0", "fontSize": "22px"}}>
{s0?.d?.who}
</h2>
<p style={{"margin": "6px 0 0"}}>
<span className={"badge"} style={{"background": s0?.d?.sBg, "color": s0?.d?.sFg}}>
{s0?.d?.status}
</span>
</p>
<div style={{"marginTop": "14px", "fontSize": "15px"}}>
<p style={{"margin": "0"}}>
<strong>
{s0?.d?.boatName}
</strong>
</p>
<p className={"muted"} style={{"margin": "2px 0 0"}}>
{s0?.d?.date}{" · "}{s0?.d?.trip}{" · "}{s0?.d?.guests}{" guests · "}{s0?.d?.mode}
</p>
<p style={{"margin": "10px 0 0"}}>
{s0?.d?.contact}
</p>
{s0?.d?.exempt ? (<>
<p style={{"margin": "10px 0 0", "background": "#FFF1C7", "color": "#5C4300", "borderRadius": "10px", "padding": "8px 12px", "fontSize": "14px", "fontWeight": "600"}}>
{"Tax-exempt (NC state agency). Lundro is reviewing the E-595E. Your payout isn't affected."}
</p>
</>) : null}
</div>
<div style={{"marginTop": "14px", "paddingTop": "12px", "borderTop": "1px solid #DCE5EA"}}>
<div className={"ln"}>
<span>
{"Boat · "}{s0?.d?.trip}
</span>
<span>
{s0?.d?.boatFmt}
</span>
</div>
{(s0?.d?.extras || []).map((__it, __k) => { const s1 = { ...s0, "x": __it }; return (<Fragment key={__k}>
<div className={"ln"}>
<span>
{s1?.x?.label}
</span>
<span>
{s1?.x?.amt}
</span>
</div>
</Fragment>); })}
{s0?.d?.hasCaptain ? (<>
<div className={"ln"}>
<span>
{"Captain"}
</span>
<span>
{s0?.d?.captainFmt}
</span>
</div>
</>) : null}
<div className={"ln"} style={{"borderTop": "1px solid #EEF2F4", "marginTop": "4px", "paddingTop": "8px"}}>
<span>
{"Your price"}
</span>
<span>
{s0?.d?.priceFmt}
</span>
</div>
<div className={"ln muted"}>
<span>
{"Lundro commission ("}{s0?.commPct}{"%)"}
</span>
<span>
{"−"}{s0?.d?.commFmt}
</span>
</div>
<div className={"ln"} style={{"fontSize": "18px", "fontWeight": "700"}}>
<span>
{"Your payout"}
</span>
<span>
{s0?.d?.payoutFmt}
</span>
</div>
<p className={"muted"} style={{"margin": "8px 0 0", "fontSize": "13px"}}>
{"Renter also paid "}{s0?.d?.taxFmt}{" NC sales tax and a service fee. Lundro collects and remits the tax; it isn't part of your payout."}
</p>
</div>
{s0?.d?.isReq ? (<>
<div style={{"display": "flex", "gap": "8px", "marginTop": "14px"}}>
<button type={"button"} className={"btn btn-p"} onClick={s0?.d?.accept} style={{"flex": "1"}}>
{"Accept"}
</button>
<button type={"button"} className={"btn btn-g"} onClick={s0?.d?.decline} style={{"flex": "1"}}>
{"Decline"}
</button>
</div>
</>) : null}
<Link href={"/owner/messages"} className={"btn btn-g"} style={{"width": "100%", "marginTop": "10px"}}>
{"Message "}{s0?.d?.first}
</Link>
</>) : null}
</aside>
</div>
    </>
  );
}
