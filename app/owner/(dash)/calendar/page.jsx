'use client';
// Generated from source/Dash-Calendar.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { show: { B: true, M: true, H: true }, sel: 'e4', blockOpen: false, bk: { boat: 'B', from: '28', to: '29', why: 'Maintenance' }, blocks: [{ id: 'k1', boat: 'M', from: 15, to: 16, why: 'Maintenance' }], conflict: '' };
  }
  renderVals() {
    const s = this.state;
    const BOAT = { B: { name: "24' Bennington Pontoon", short: 'Bennington', bg: '#0A6C7A', fg: '#FFFFFF' }, M: { name: "22' MasterCraft XT22", short: 'MasterCraft', bg: '#FFD9C2', fg: '#7A2E0B' }, H: { name: "26' Harris Grand Mariner", short: 'Harris', bg: '#0F2A3D', fg: '#FFFFFF' } };
    const EV = [
      ['e1', 5, 'H', 'Full day', 'Derek P.', 'done'], ['e2', 6, 'B', '9 AM', 'Priya S.', 'done'], ['e3', 8, 'B', '9 AM', 'Sam N.', 'cancel'],
      ['e4', 10, 'B', '9 AM', 'Alicia M.', 'ok'], ['e5', 10, 'M', '1:30 PM', 'Ben T.', 'ok'], ['e6', 12, 'B', '9 AM', 'Taylor R.', 'ok'], ['e7', 12, 'H', 'Full day', 'Devon S.', 'ok'],
      ['e8', 13, 'M', '9 AM', 'Chris P.', 'ok'], ['e9', 19, 'H', 'Full day', 'Marcus L.', 'req'], ['e10', 20, 'M', '1:30 PM', 'Hannah K.', 'req'], ['e11', 20, 'B', 'Full day', 'Kim J.', 'ok'],
      ['e12', 25, 'B', '9 AM', 'NC DEQ', 'req'], ['e13', 26, 'B', '9 AM', 'Rosa G.', 'ok'], ['e14', 26, 'B', '1:30 PM', 'Will F.', 'ok'], ['e15', 26, 'H', 'Full day', 'Omar A.', 'ok'], ['e16', 27, 'M', '9 AM', 'Lena V.', 'ok']
    ];
    const ST = { ok: ['Confirmed', '#DDF3E4', '#14532D'], req: ['Request · awaiting you', '#FFF1C7', '#5C4300'], done: ['Completed', '#E8EFF2', '#3D5160'], cancel: ['Cancelled · weather', '#FDE2E1', '#8E1B13'] };
    const items = {};
    EV.forEach(([id, d, b, t, who, st]) => { items[id] = { id, d, b, t, who, st }; });
    s.blocks.forEach(k => { items[k.id] = { id: k.id, block: true, from: k.from, to: k.to, b: k.boat, why: k.why }; });
    const cells = [];
    for (let i = 0; i < 2; i++) cells.push({ num: '', events: [], bg: '#F6F9FA', numFg: '#9FB1BC', today: false });
    for (let d = 1; d <= 30; d++) {
      const evs = EV.filter(e => e[1] === d && s.show[e[2]]).map(([id, , b, t, who, st]) => {
        const bo = BOAT[b];
        return { text: t + ' · ' + who, cls: '', bg: st === 'cancel' ? '#FFFFFF' : bo.bg, fg: st === 'cancel' ? '#8E1B13' : bo.fg, border: st === 'req' ? '2px dashed #5C4300' : (st === 'cancel' ? '1px solid #F4B4AE' : '0'), deco: st === 'cancel' ? 'line-through' : 'none', open: () => this.setState({ sel: id }) };
      });
      s.blocks.filter(k => d >= k.from && d <= k.to && s.show[k.boat]).forEach(k => evs.push({ text: 'Blocked · ' + BOAT[k.boat].short, cls: 'blk', bg: '', fg: '', border: '1px solid #9FB1BC', deco: 'none', open: () => this.setState({ sel: k.id }) }));
      cells.push({ num: d, events: evs, bg: d === 10 ? '#F0FAFB' : '#FFFFFF', numFg: d < 10 ? '#4A5F6E' : '#0F2A3D', today: d === 10 });
    }
    for (let i = 0; i < 3; i++) cells.push({ num: '', events: [], bg: '#F6F9FA', numFg: '#9FB1BC', today: false });
    const it = items[s.sel];
    let sel = {};
    if (it && it.block) sel = { date: 'Jun ' + it.from + (it.to !== it.from ? ' – ' + it.to : ''), boat: BOAT[it.b].name, status: 'Blocked', sBg: '#E8EFF2', sFg: '#3D5160', detail: 'Reason: ' + it.why + '. Renters see this boat as unavailable.', isBlock: true, isBooking: false };
    else if (it) { const st = ST[it.st]; sel = { date: 'June ' + it.d + ', 2027 · ' + it.t, boat: BOAT[it.b].name, status: st[0], sBg: st[1], sFg: st[2], detail: 'Renter: ' + it.who + (it.st === 'req' ? '. Accept or decline from Bookings.' : ''), isBlock: false, isBooking: true }; }
    const bkSet = {};
    ['boat', 'from', 'to', 'why'].forEach(k => { bkSet[k] = e => this.setState({ bk: Object.assign({}, this.state.bk, { [k]: e.target.value }), conflict: '' }); });
    return ({
      dow: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], cells,
      legend: Object.keys(BOAT).map(k => ({ label: BOAT[k].short, bg: BOAT[k].bg, fg: BOAT[k].fg, on: !!s.show[k], toggle: () => this.setState({ show: Object.assign({}, s.show, { [k]: !s.show[k] }) }) })),
      hasSel: !!it, noSel: !it, sel,
      unblock: () => this.setState({ blocks: s.blocks.filter(k => k.id !== s.sel), sel: null }),
      blockOpen: s.blockOpen, openBlock: () => this.setState({ blockOpen: true, conflict: '' }), closeBlock: () => this.setState({ blockOpen: false }),
      bk: s.bk, bkSet, days: Array.from({ length: 30 }, (_, i) => String(i + 1)),
      bkConflict: !!s.conflict, bkConflictText: s.conflict,
      saveBlock: () => {
        const from = Number(s.bk.from), to = Math.max(from, Number(s.bk.to));
        const clash = EV.filter(e => e[2] === s.bk.boat && e[1] >= from && e[1] <= to && e[5] !== 'cancel' && e[5] !== 'done');
        if (clash.length) { this.setState({ conflict: 'This boat has a booking on Jun ' + clash[0][1] + '. Pick other dates, or cancel that booking first from Bookings.' }); return; }
        const id = 'k' + Date.now();
        this.setState({ blocks: s.blocks.concat({ id, boat: s.bk.boat, from, to, why: s.bk.why }), blockOpen: false, sel: id });
      }
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n.cal{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-top:1px solid #DCE5EA;border-left:1px solid #DCE5EA}\n.cell{min-height:118px;border-right:1px solid #DCE5EA;border-bottom:1px solid #DCE5EA;padding:6px;display:flex;flex-direction:column;gap:4px;background:#fff}\n.ev{display:block;width:100%;text-align:left;font-size:12px;font-weight:700;border-radius:6px;padding:3px 6px;cursor:pointer;line-height:1.3;min-height:24px}\n.blk{background:repeating-linear-gradient(45deg,#E8EFF2,#E8EFF2 6px,#F6F9FA 6px,#F6F9FA 12px);color:#3D5160;border:1px solid #9FB1BC}\n@media (max-width:860px){.cell{min-height:80px;padding:3px}.ev{font-size:10px;padding:2px 3px}.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner calendar · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Calendar"}
</h1>
<button type={"button"} className={"btn btn-p"} onClick={s0?.openBlock}>
{"Block dates"}
</button>
</div>
<div style={{"display": "flex", "flexWrap": "wrap", "alignItems": "center", "gap": "12px", "marginTop": "18px"}}>
<div style={{"display": "flex", "alignItems": "center", "gap": "4px"}}>
<button type={"button"} className={"btn btn-g"} aria-label={"Previous month"} style={{"width": "44px", "padding": "0"}}>
{"‹"}
</button>
<h2 className={"disp"} aria-live={"polite"} style={{"margin": "0 8px", "fontSize": "22px", "minWidth": "120px", "textAlign": "center"}}>
{"June 2027"}
</h2>
<button type={"button"} className={"btn btn-g"} aria-label={"Next month"} style={{"width": "44px", "padding": "0"}}>
{"›"}
</button>
</div>
<fieldset style={{"border": "0", "padding": "0", "margin": "0 0 0 auto", "display": "flex", "flexWrap": "wrap", "gap": "6px"}}>
<legend style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Show boats"}
</legend>
{(s0?.legend || []).map((__it, __k) => { const s1 = { ...s0, "l": __it }; return (<Fragment key={__k}>
<label style={{"display": "inline-flex", "alignItems": "center", "gap": "8px", "minHeight": "40px", "padding": "0 12px", "border": "1px solid #C9D6DD", "borderRadius": "999px", "background": "#fff", "fontSize": "14px", "fontWeight": "600", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s1?.l?.on} onChange={s1?.l?.toggle} style={{"width": "18px", "height": "18px", "accentColor": "#0A6C7A", "margin": "0"}} />
<span aria-hidden={"true"} style={{"width": "14px", "height": "14px", "borderRadius": "4px", "background": s1?.l?.bg, "border": `1px solid ${s1?.l?.fg ?? ""}`}} />
{s1?.l?.label}
</label>
</Fragment>); })}
</fieldset>
</div>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "14px"}}>
{"Dashed outline = request awaiting your reply · Striped = blocked · 20' Sea Ray SPX is paused and hidden from renters."}
</p>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "alignItems": "flex-start", "marginTop": "14px"}}>
<div style={{"flex": "999 1 600px", "minWidth": "0", "overflowX": "auto"}}>
<div className={"cal"} role={"grid"} aria-label={"June 2027"} style={{"minWidth": "520px"}}>
{(s0?.dow || []).map((__it, __k) => { const s1 = { ...s0, "d": __it }; return (<Fragment key={__k}>
<div role={"columnheader"} style={{"padding": "8px", "fontSize": "13px", "fontWeight": "700", "color": "#3D5160", "background": "#F1F6F8", "borderRight": "1px solid #DCE5EA", "borderBottom": "1px solid #DCE5EA"}}>
{s1?.d}
</div>
</Fragment>); })}
{(s0?.cells || []).map((__it, __k) => { const s1 = { ...s0, "c": __it }; return (<Fragment key={__k}>
<div className={"cell"} role={"gridcell"} style={{"background": s1?.c?.bg}}>
<span style={{"fontSize": "13px", "fontWeight": "700", "color": s1?.c?.numFg, "display": "flex", "justifyContent": "space-between"}}>
{s1?.c?.num}
{s1?.c?.today ? (<>
<span className={"badge"} style={{"background": "#0A6C7A", "color": "#fff", "padding": "1px 6px", "fontSize": "11px"}}>
{"Today"}
</span>
</>) : null}
</span>
{(s1?.c?.events || []).map((__it, __k) => { const s2 = { ...s1, "e": __it }; return (<Fragment key={__k}>
<button type={"button"} className={`ev ${s2?.e?.cls ?? ""}`} onClick={s2?.e?.open} style={{"background": s2?.e?.bg, "color": s2?.e?.fg, "border": s2?.e?.border, "textDecoration": s2?.e?.deco}}>
{s2?.e?.text}
</button>
</Fragment>); })}
</div>
</Fragment>); })}
</div>
</div>
<aside className={"card"} aria-label={"Details"} style={{"flex": "1 1 280px", "minWidth": "0"}}>
{s0?.hasSel ? (<>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{s0?.sel?.date}
</p>
<h2 style={{"margin": "2px 0 0", "fontSize": "19px"}}>
{s0?.sel?.boat}
</h2>
<p style={{"margin": "8px 0 0"}}>
<span className={"badge"} style={{"background": s0?.sel?.sBg, "color": s0?.sel?.sFg}}>
{s0?.sel?.status}
</span>
</p>
<p style={{"margin": "10px 0 0"}}>
{s0?.sel?.detail}
</p>
{s0?.sel?.isBlock ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.unblock} style={{"marginTop": "14px"}}>
{"Remove block"}
</button>
</>) : null}
{s0?.sel?.isBooking ? (<>
<Link href={"/owner/bookings"} className={"btn btn-g"} style={{"marginTop": "14px"}}>
{"Open booking"}
</Link>
</>) : null}
</>) : null}
{s0?.noSel ? (<>
<p className={"muted"} style={{"margin": "0"}}>
{"Select a booking or block to see details."}
</p>
</>) : null}
</aside>
</div>
{s0?.blockOpen ? (<>
<div style={{"position": "fixed", "inset": "0", "background": "rgba(15,42,61,.55)", "zIndex": "40", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "16px"}}>
<div role={"dialog"} aria-modal={"true"} aria-labelledby={"blk-h"} style={{"background": "#fff", "borderRadius": "22px", "padding": "24px", "width": "100%", "maxWidth": "480px"}}>
<h2 id={"blk-h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Block dates"}
</h2>
<p className={"muted"} style={{"margin": "4px 0 16px", "fontSize": "15px"}}>
{"Renters can't book a blocked boat. Existing bookings aren't affected."}
</p>
<div style={{"display": "flex", "flexDirection": "column", "gap": "14px"}}>
<div>
<label htmlFor={"bk-boat"} className={"lbl"}>
{"Boat"}
</label>
<select id={"bk-boat"} className={"inp"} value={s0?.bk?.boat} onChange={s0?.bkSet?.boat}>
<option value={"B"}>
{"24' Bennington Pontoon"}
</option>
<option value={"M"}>
{"22' MasterCraft XT22"}
</option>
<option value={"H"}>
{"26' Harris Grand Mariner"}
</option>
</select>
</div>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "12px"}}>
<div>
<label htmlFor={"bk-from"} className={"lbl"}>
{"From (June)"}
</label>
<select id={"bk-from"} className={"inp"} value={s0?.bk?.from} onChange={s0?.bkSet?.from}>
{(s0?.days || []).map((__it, __k) => { const s1 = { ...s0, "d": __it }; return (<Fragment key={__k}>
<option value={s1?.d}>
{"Jun "}{s1?.d}
</option>
</Fragment>); })}
</select>
</div>
<div>
<label htmlFor={"bk-to"} className={"lbl"}>
{"To (June)"}
</label>
<select id={"bk-to"} className={"inp"} value={s0?.bk?.to} onChange={s0?.bkSet?.to}>
{(s0?.days || []).map((__it, __k) => { const s1 = { ...s0, "d": __it }; return (<Fragment key={__k}>
<option value={s1?.d}>
{"Jun "}{s1?.d}
</option>
</Fragment>); })}
</select>
</div>
</div>
<div>
<label htmlFor={"bk-why"} className={"lbl"}>
{"Reason (only you see this)"}
</label>
<select id={"bk-why"} className={"inp"} value={s0?.bk?.why} onChange={s0?.bkSet?.why}>
<option>
{"Maintenance"}
</option>
<option>
{"Personal use"}
</option>
<option>
{"Other"}
</option>
</select>
</div>
</div>
{s0?.bkConflict ? (<>
<p role={"alert"} style={{"margin": "12px 0 0", "color": "#B42318", "fontWeight": "600", "fontSize": "14px"}}>
{s0?.bkConflictText}
</p>
</>) : null}
<div style={{"display": "flex", "justifyContent": "flex-end", "gap": "8px", "marginTop": "20px"}}>
<button type={"button"} className={"btn btn-g"} onClick={s0?.closeBlock}>
{"Cancel"}
</button>
<button type={"button"} className={"btn btn-p"} onClick={s0?.saveBlock}>
{"Block dates"}
</button>
</div>
</div>
</div>
</>) : null}
    </>
  );
}
