'use client';
// Generated from source/Dash-Customers.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { q: '', sort: 'recent', sel: 'alicia' }; }
  renderVals() {
    const s = this.state;
    const money = n => '$' + n.toLocaleString('en-US');
    const C = [
      { id: 'alicia', name: 'Alicia M.', city: 'Charlotte, NC', since: '2026', reviews: '2 five-star reviews', key: 20270610, last: 'Jun 10, 2027', h: [['Jun 10, 2027', "24' Bennington Pontoon", 'Half day · captain', 625], ['May 30, 2027', "22' MasterCraft XT22", 'Half day · self-drive', 525], ['Aug 14, 2026', "24' Bennington Pontoon", 'Full day · captain', 1000]] },
      { id: 'priya', name: 'Priya S.', city: 'Huntersville, NC', since: '2027', reviews: '1 four-star review', key: 20270606, last: 'Jun 6, 2027', h: [['Jun 6, 2027', "24' Bennington Pontoon", 'Half day · self-drive', 390]] },
      { id: 'derek', name: 'Derek P.', city: 'Mooresville, NC', since: '2026', reviews: '1 five-star review', key: 20270605, last: 'Jun 5, 2027', h: [['Jun 5, 2027', "26' Harris Grand Mariner", 'Full day · captain', 1450], ['Sep 2, 2026', "26' Harris Grand Mariner", 'Full day · captain', 1450]] },
      { id: 'tom', name: 'Tom W.', city: 'Davidson, NC', since: '2026', reviews: '1 five-star review', key: 20260912, last: 'Sep 12, 2026', h: [['Sep 12, 2026', "24' Bennington Pontoon", 'Full day · captain', 1000]] },
      { id: 'maya', name: 'Maya C.', city: 'Raleigh, NC', since: '2026', reviews: 'no reviews yet', key: 20260829, last: 'Aug 29, 2026', h: [['Aug 29, 2026', "22' MasterCraft XT22", 'Full day · self-drive', 950], ['Jul 4, 2026', "22' MasterCraft XT22", 'Half day · self-drive', 525], ['Jun 20, 2026', "26' Harris Grand Mariner", 'Half day · captain', 775]] },
      { id: 'luis', name: 'Luis R.', city: 'Cornelius, NC', since: '2026', reviews: '1 five-star review', key: 20260801, last: 'Aug 1, 2026', h: [['Aug 1, 2026', "26' Harris Grand Mariner", 'Full day · captain', 1450]] },
      { id: 'grace', name: 'Grace O.', city: 'Greensboro, NC', since: '2026', reviews: 'no reviews yet', key: 20260718, last: 'Jul 18, 2026', h: [['Jul 18, 2026', "24' Bennington Pontoon", 'Half day · captain', 550]] }
    ];
    const AV = ['#CDE7EC', '#FFE3B3', '#E3D7F5', '#D7EDD9', '#FFD9C2'];
    const enrich = (c, i) => { const spent = c.h.reduce((a, x) => a + x[3], 0); return Object.assign({}, c, { first: c.name.split(' ')[0], init: c.name[0] + c.name.split(' ')[1][0], trips: c.h.length, spent, spentFmt: money(spent), repeat: c.h.length > 1, avBg: AV[i % 5],
      history: c.h.map(x => ({ date: x[0], boat: x[1], trip: x[2], amt: money(x[3]) })), bg: s.sel === c.id ? '#F0FAFB' : 'transparent', pick: () => this.setState({ sel: c.id }) }); };
    let list = C.map(enrich);
    const q = s.q.trim().toLowerCase();
    if (q) list = list.filter(c => c.name.toLowerCase().indexOf(q) >= 0);
    if (s.sort === 'trips') list.sort((a, b) => b.trips - a.trips);
    else if (s.sort === 'spent') list.sort((a, b) => b.spent - a.spent);
    else list.sort((a, b) => b.key - a.key);
    const d = C.map(enrich).find(c => c.id === s.sel);
    return ({
      rows: list, none: list.length === 0, q: s.q, setQ: e => this.setState({ q: e.target.value }),
      sort: s.sort, setSort: e => this.setState({ sort: e.target.value }), d
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\ntable{width:100%;border-collapse:collapse;font-size:15px}\nth{text-align:left;font-size:13px;color:#3D5160;font-weight:700;padding:10px 12px;border-bottom:1px solid #DCE5EA;white-space:nowrap}\ntd{padding:8px 12px;border-bottom:1px solid #EEF2F4}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner customers · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Customers"}
</h1>
<p className={"muted"} style={{"margin": "2px 0 0"}}>
{"Renters who've completed a trip with you."}
</p>
</div>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
<label>
<span style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Search customers"}
</span>
<input type={"search"} className={"inp"} placeholder={"Search by name"} value={s0?.q} onChange={s0?.setQ} style={{"width": "220px"}} />
</label>
<label style={{"display": "flex", "alignItems": "center", "gap": "6px", "fontWeight": "600", "color": "#3D5160"}}>
{"Sort"}
<select className={"inp"} value={s0?.sort} onChange={s0?.setSort} style={{"width": "auto"}}>
<option value={"recent"}>
{"Most recent"}
</option>
<option value={"trips"}>
{"Most trips"}
</option>
<option value={"spent"}>
{"Most booked"}
</option>
</select>
</label>
</div>
</div>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "20px", "alignItems": "flex-start"}}>
<section className={"card"} style={{"flex": "999 1 520px", "minWidth": "0", "padding": "8px"}} aria-label={"Customer list"}>
<div style={{"overflowX": "auto"}}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Renter"}
</th>
<th scope={"col"}>
{"Trips"}
</th>
<th scope={"col"}>
{"Last trip"}
</th>
<th scope={"col"} className={"hide-sm"}>
{"Booked with you"}
</th>
</tr>
</thead>
<tbody>
{(s0?.rows || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<tr style={{"background": s1?.r?.bg}}>
<td>
<button type={"button"} onClick={s1?.r?.pick} style={{"display": "flex", "alignItems": "center", "gap": "10px", "border": "0", "background": "transparent", "padding": "4px 0", "cursor": "pointer", "minHeight": "44px", "textAlign": "left"}}>
<span aria-hidden={"true"} style={{"width": "36px", "height": "36px", "borderRadius": "50%", "background": s1?.r?.avBg, "color": "#0F2A3D", "display": "grid", "placeItems": "center", "fontWeight": "700", "fontSize": "14px"}}>
{s1?.r?.init}
</span>
<span>
<strong style={{"display": "block", "color": "#0A6C7A", "textDecoration": "underline"}}>
{s1?.r?.name}
</strong>
{s1?.r?.repeat ? (<>
<span className={"badge"} style={{"background": "#FFF1C7", "color": "#5C4300"}}>
{"Repeat guest"}
</span>
</>) : null}
</span>
</button>
</td>
<td>
{s1?.r?.trips}
</td>
<td>
{s1?.r?.last}
</td>
<td className={"hide-sm"}>
{s1?.r?.spentFmt}
</td>
</tr>
</Fragment>); })}
</tbody>
</table>
{s0?.none ? (<>
<p className={"muted"} style={{"padding": "24px", "textAlign": "center", "margin": "0"}}>
{"No customers match “"}{s0?.q}{"”."}
</p>
</>) : null}
</div>
</section>
<aside className={"card"} style={{"flex": "1 1 320px", "minWidth": "0"}} aria-labelledby={"cu-h"}>
<div style={{"display": "flex", "gap": "12px", "alignItems": "center"}}>
<span aria-hidden={"true"} style={{"width": "52px", "height": "52px", "borderRadius": "50%", "background": s0?.d?.avBg, "display": "grid", "placeItems": "center", "fontWeight": "700", "fontSize": "18px"}}>
{s0?.d?.init}
</span>
<div>
<h2 id={"cu-h"} className={"disp"} style={{"margin": "0", "fontSize": "22px"}}>
{s0?.d?.name}
</h2>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{s0?.d?.city}{" · Lundro member since "}{s0?.d?.since}
</p>
</div>
</div>
<p style={{"margin": "12px 0 0", "fontSize": "15px"}}>
{s0?.d?.trips}{" trips · "}{s0?.d?.spentFmt}{" booked · Left you "}{s0?.d?.reviews}
</p>
<h3 style={{"margin": "16px 0 6px", "fontSize": "16px"}}>
{"Trip history"}
</h3>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.d?.history || []).map((__it, __k) => { const s1 = { ...s0, "h": __it }; return (<Fragment key={__k}>
<li style={{"padding": "10px 0", "borderTop": "1px solid #EEF2F4", "fontSize": "15px"}}>
<strong style={{"display": "block"}}>
{s1?.h?.date}
</strong>
<span className={"muted"}>
{s1?.h?.boat}{" · "}{s1?.h?.trip}{" · "}{s1?.h?.amt}
</span>
</li>
</Fragment>); })}
</ul>
<Link href={"/owner/messages"} className={"btn btn-g"} style={{"width": "100%", "marginTop": "12px"}}>
{"Message "}{s0?.d?.first}
</Link>
</aside>
</div>
    </>
  );
}
