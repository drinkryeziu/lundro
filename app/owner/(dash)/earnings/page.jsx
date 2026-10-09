'use client';
// Generated from source/Dash-Earnings.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { hover: -1, filter: 'all' }; }
  renderVals() {
    const s = this.state;
    const c = (this.props.commissionPct ?? 15) / 100;
    const money = n => '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const T = [
      ['Jun 10', 'Alicia M.', 'Bennington', 625, 16.69, 'Scheduled'], ['Jun 10', 'Ben T.', 'MasterCraft', 545, 17.40, 'Scheduled'],
      ['Jun 8', 'Sam N.', 'Bennington', 550, 0, 'Refunded'], ['Jun 6', 'Priya S.', 'Bennington', 390, 13.80, 'In transit'],
      ['Jun 5', 'Derek P.', 'Harris', 1450, 31.50, 'In transit'], ['Jun 3', 'Rosa G.', 'Harris', 1450, 31.50, 'Paid'],
      ['Jun 2', 'Will F.', 'Bennington', 1000, 18.00, 'Paid'], ['Jun 1', 'Kayla B.', 'MasterCraft', 950, 28.50, 'Paid'],
      ['May 30', 'Alicia M.', 'MasterCraft', 525, 15.75, 'Paid']
    ];
    const SC = { Scheduled: ['#E8EFF2', '#3D5160'], 'In transit': ['#FFF1C7', '#5C4300'], Paid: ['#DDF3E4', '#14532D'], Refunded: ['#FDE2E1', '#8E1B13'] };
    const june = T.filter(t => t[0].indexOf('Jun') === 0 && t[5] !== 'Refunded');
    const gross = june.reduce((a, t) => a + t[3], 0);
    const next = T.filter(t => t[5] === 'In transit').reduce((a, t) => a + t[3] * (1 - c), 0);
    const tx = T.filter(t => s.filter === 'all' || t[5] === s.filter).map(([date, who, boat, price, tax, status]) => {
      const ref = status === 'Refunded';
      return { date, who, boat, price: money(price), comm: money(ref ? 0 : price * c), pay: ref ? '$0.00' : money(price * (1 - c)), status: ref ? 'Refunded · weather' : status, sBg: SC[status][0], sFg: SC[status][1] };
    });
    const M = [['Jul', 11240], ['Aug', 9870], ['Sep', 5120], ['Oct', 2310], ['Nov', 0], ['Dec', 0], ['Jan', 0], ['Feb', 0], ['Mar', 860], ['Apr', 3450], ['May', 8920], ['Jun', Math.round(gross * (1 - c))]];
    const bars = M.map(([m, v], i) => ({ m, h: v / 12000 * 100, minH: v ? 2 : 0, fill: s.hover === i ? '#08525D' : (i === 11 ? '#5FA8B3' : '#0A6C7A'),
      hoverBg: s.hover === i ? 'rgba(10,108,122,0.06)' : 'transparent',
      label: m + (i < 6 ? ' 2026' : ' 2027') + ': $' + v.toLocaleString('en-US') + (i === 11 ? ' so far' : ''), hover: () => this.setState({ hover: i }) }));
    const hv = M[s.hover];
    return ({
      commPct: Math.round(c * 100), gross: money(gross), comm: money(gross * c), net: money(gross * (1 - c)), next: money(next),
      tax: money(june.reduce((a, t) => a + t[4], 0)),
      bars, unhover: () => this.setState({ hover: -1 }),
      hoverText: hv ? hv[0] + (s.hover < 6 ? ' 2026' : ' 2027') + ': $' + hv[1].toLocaleString('en-US') + (s.hover === 11 ? ' so far' : '') : 'Hover or tab to a bar for its value',
      tx, filter: s.filter, setFilter: e => this.setState({ filter: e.target.value })
    });
  }
}

const DEFAULT_PROPS = {"commissionPct":15};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\ntable{width:100%;border-collapse:collapse;font-size:15px}\nth{text-align:left;font-size:13px;color:#3D5160;font-weight:700;padding:10px 12px;border-bottom:1px solid #DCE5EA;white-space:nowrap}\ntd{padding:10px 12px;border-bottom:1px solid #EEF2F4;white-space:nowrap}\n.num{text-align:right;font-variant-numeric:tabular-nums}\n.bar{position:relative;flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;border:0;background:transparent;padding:0 1px;cursor:default}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner earnings · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Earnings"}
</h1>
<div style={{"display": "flex", "gap": "8px"}}>
<Link href={"/owner/settings"} className={"btn btn-g"}>
{"Payout settings"}
</Link>
<button type={"button"} className={"btn btn-g"}>
{"Export CSV"}
</button>
</div>
</div>
<section aria-label={"June so far"} style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(190px, 1fr))", "gap": "14px", "marginTop": "20px"}}>
<div className={"card"}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Your price, June so far"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "28px", "fontWeight": "700"}}>
{s0?.gross}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Boat, extras and captain"}
</p>
</div>
<div className={"card"}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Lundro commission ("}{s0?.commPct}{"%)"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "28px", "fontWeight": "700"}}>
{"−"}{s0?.comm}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Taken from each booking"}
</p>
</div>
<div className={"card"} style={{"border": "2px solid #0A6C7A"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Your payouts"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "28px", "fontWeight": "700"}}>
{s0?.net}
</p>
<p style={{"margin": "0", "fontSize": "13px", "color": "#0B4F59", "fontWeight": "600"}}>
{"Next: Mon, Jun 14 · "}{s0?.next}
</p>
</div>
<div className={"card"} style={{"background": "#F1F6F8"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"NC sales tax collected"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "28px", "fontWeight": "700"}}>
{s0?.tax}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Held and remitted by Lundro. Not paid out."}
</p>
</div>
</section>
<section className={"card"} aria-labelledby={"ch-h"} style={{"marginTop": "20px"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "baseline", "flexWrap": "wrap", "gap": "8px"}}>
<h2 id={"ch-h"} style={{"margin": "0", "fontSize": "18px"}}>
{"Payouts by month"}
</h2>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}} aria-live={"polite"}>
{s0?.hoverText}
</p>
</div>
<div style={{"display": "flex", "gap": "8px", "marginTop": "16px"}}>
<div aria-hidden={"true"} style={{"display": "flex", "flexDirection": "column", "justifyContent": "space-between", "height": "220px", "fontSize": "12px", "color": "#4A5F6E", "textAlign": "right", "paddingBottom": "0", "width": "44px", "flex": "none"}}>
<span>
{"$12k"}
</span>
<span>
{"$8k"}
</span>
<span>
{"$4k"}
</span>
<span>
{"$0"}
</span>
</div>
<div style={{"flex": "1", "minWidth": "0"}}>
<div style={{"position": "relative", "height": "220px", "display": "flex", "alignItems": "flex-end", "gap": "2px", "borderBottom": "1px solid #9FB1BC", "background": "linear-gradient(#EEF2F4 1px, transparent 1px) 0 0 / 100% 73.33px"}}>
{(s0?.bars || []).map((__it, __k) => { const s1 = { ...s0, "b": __it }; return (<Fragment key={__k}>
<button type={"button"} className={"bar"} aria-label={s1?.b?.label} onMouseEnter={s1?.b?.hover} onFocus={s1?.b?.hover} onMouseLeave={s1?.unhover} onBlur={s1?.unhover} style={{"background": s1?.b?.hoverBg}}>
<span style={{"display": "block", "width": "70%", "maxWidth": "36px", "height": `${s1?.b?.h ?? ""}%`, "minHeight": `${s1?.b?.minH ?? ""}px`, "background": s1?.b?.fill, "borderRadius": "4px 4px 0 0"}} />
</button>
</Fragment>); })}
</div>
<div aria-hidden={"true"} style={{"display": "flex", "gap": "2px", "marginTop": "6px"}}>
{(s0?.bars || []).map((__it, __k) => { const s1 = { ...s0, "b": __it }; return (<Fragment key={__k}>
<span style={{"flex": "1", "textAlign": "center", "fontSize": "12px", "color": "#4A5F6E"}}>
{s1?.b?.m}
</span>
</Fragment>); })}
</div>
</div>
</div>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "13px"}}>
{"Jul 2026 – Jun 2027 · June is month to date · no trips Nov–Feb"}
</p>
</section>
<section className={"card"} aria-labelledby={"tx-h"} style={{"marginTop": "20px", "padding": "16px 8px 8px"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "10px", "flexWrap": "wrap", "padding": "0 12px 10px"}}>
<h2 id={"tx-h"} style={{"margin": "0", "fontSize": "18px"}}>
{"Transactions"}
</h2>
<label style={{"display": "flex", "alignItems": "center", "gap": "6px", "fontWeight": "600", "color": "#3D5160"}}>
{"Status"}
<select className={"inp"} value={s0?.filter} onChange={s0?.setFilter}>
<option value={"all"}>
{"All"}
</option>
<option value={"Scheduled"}>
{"Scheduled"}
</option>
<option value={"In transit"}>
{"In transit"}
</option>
<option value={"Paid"}>
{"Paid"}
</option>
<option value={"Refunded"}>
{"Refunded"}
</option>
</select>
</label>
</div>
<div style={{"overflowX": "auto"}}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Trip date"}
</th>
<th scope={"col"}>
{"Renter · boat"}
</th>
<th scope={"col"} className={"num"}>
{"Your price"}
</th>
<th scope={"col"} className={"num"}>
{"Commission"}
</th>
<th scope={"col"} className={"num"}>
{"Payout"}
</th>
<th scope={"col"}>
{"Status"}
</th>
</tr>
</thead>
<tbody>
{(s0?.tx || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<tr>
<td>
{s1?.t?.date}
</td>
<td>
<strong>
{s1?.t?.who}
</strong>
{" "}
<span className={"muted"}>
{"· "}{s1?.t?.boat}
</span>
</td>
<td className={"num"}>
{s1?.t?.price}
</td>
<td className={"num muted"}>
{"−"}{s1?.t?.comm}
</td>
<td className={"num"}>
<strong>
{s1?.t?.pay}
</strong>
</td>
<td>
<span className={"badge"} style={{"background": s1?.t?.sBg, "color": s1?.t?.sFg}}>
{s1?.t?.status}
</span>
</td>
</tr>
</Fragment>); })}
</tbody>
</table>
</div>
<p className={"muted"} style={{"margin": "10px 12px 4px", "fontSize": "13px"}}>
{"Payouts are sent through Stripe 2 business days after each trip ends. Refunds include the tax the renter paid."}
</p>
</section>
    </>
  );
}
