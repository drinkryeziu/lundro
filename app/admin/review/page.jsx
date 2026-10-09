'use client';
// Generated from source/Admin-Review.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { q: 'listings', sel: 'L1', checks: {}, dec: {}, note: '', noteErr: false, reg: {}, toast: '' }; }
  renderVals() {
    const s = this.state;
    const I = {
      L1: { q: 'listings', kind: 'New listing', title: "24' Tahoe LTZ Pontoon", who: 'Cove & Co.', sub: 'Cove & Co. Boat Rentals · Cornelius', age: 'Submitted Jun 8 · 2 days', facts: [['Owner', 'Cove and Co Boat Rentals LLC (business verified)'], ['ID name', 'Jordan Hale'], ['HIN', 'TAH41022C727'], ['Registration name', 'Cove and Co Boat Rentals LLC'], ['Insurance', 'Policy active to May 2028 · covers rentals'], ['Photos', '8']], docs: ['Registration.pdf', 'Insurance certificate.pdf'],
        checks: [['Registration name matches the owner or business', ''], ['HIN on registration matches the listing', ''], ['Insurance is active and covers rentals', ''], ['Photos meet guidelines (5+ and show the actual boat)', '']], approve: 'Approve · go live', reject: 'Reject listing', ph: 'e.g. Please upload a registration showing the LLC as owner.', hint: 'Approving makes the boat Live because the owner’s payouts are verified.' },
      L2: { q: 'listings', kind: 'Resubmitted listing', title: "21' Bayliner Element", who: 'Cove & Co.', sub: 'Cove & Co. Boat Rentals · Davidson', age: 'Flagged Jun 2 · 8 days', facts: [['Owner', 'Cove and Co Boat Rentals LLC'], ['ID name', 'Jordan Hale'], ['Registration name', 'J. Hale-Martin'], ['Insurance', 'Active to Jan 2028']], docs: ['Registration.pdf', 'Insurance certificate.pdf'],
        checks: [['Registration name matches the owner or business', 'Mismatch: “J. Hale-Martin” vs “Jordan Hale” / LLC'], ['Insurance is active and covers rentals', ''], ['Photos meet guidelines', '']], approve: 'Approve · go live', reject: 'Reject listing', ph: 'e.g. Upload a bill of sale or updated registration.', hint: 'Name mismatches between ID, registration and payout account set “Additional info required”.' },
      L3: { q: 'listings', kind: 'Business verification', title: 'Bluewater Lake Rentals LLC', who: 'Bluewater', sub: 'New company account · Mooresville', age: 'Submitted Jun 9 · 1 day', facts: [['Legal name', 'Bluewater Lake Rentals LLC'], ['Entity', 'LLC · North Carolina'], ['SOS number', '2290415'], ['NC SOS registry', 'Current-Active · name matches'], ['Stripe identity', 'Verified']], docs: ['Articles of organization.pdf'],
        checks: [['Registry status is active', ''], ['Legal name matches Stripe and payout account', '']], approve: 'Verify business', reject: 'Reject', ph: 'e.g. Registry shows a different legal name.', hint: 'Adds the “Business verified” badge.' },
      T1: { q: 'tax', kind: 'Tax-exempt booking · NC state agency', title: 'NC Dept. of Environmental Quality', who: 'Dana W.', sub: "Booking LND-0625 · 24' Bennington · Jun 25", age: 'Submitted Jun 9 · 1 day', exNo: '400012345', regOk: true, facts: [['Form', 'E-595E, signed'], ['Exemption number', '400012345'], ['Payment method', 'State-issued purchase card'], ['Tax at stake', '$12.15 (State $11.45 · County $0.40 · Transit $0.30)'], ['Saved for reuse', 'Yes']], docs: ['E-595E_signed.pdf'],
        checks: [['Number found in NCDOR registry', ''], ['Agency name on E-595E matches the booking', ''], ['Paid with state card, check, deposit or PO (not personal card)', '']], approve: 'Approve exemption', reject: 'Deny · charge tax', ph: 'e.g. The card used appears to be a personal card.', hint: 'Approving keeps tax at $0. Denying charges the tax before the trip and emails the renter.' },
      T2: { q: 'tax', kind: 'Tax-exempt request', title: 'Lake Norman Youth Sailing (nonprofit)', who: 'Coach Pat O.', sub: 'Booking LND-0703 · Catalina 25 · Jul 3', age: 'Submitted Jun 10 · today', exNo: '56-2048817', regOk: false, facts: [['Organization type selected', 'Nonprofit · uploaded IRS 501(c)(3) letter'], ['Number given', '56-2048817 (federal EIN)'], ['Tax at stake', '$9.00 (State, 3% boat rental)']], docs: ['IRS_determination_letter.pdf'],
        checks: [['Organization is a U.S. federal or NC state agency', 'Nonprofits are not exempt from NC sales tax at checkout'], ['Number found in NCDOR registry', '']], approve: 'Approve exemption', reject: 'Deny · charge tax', ph: 'Nonprofits pay NC sales tax at checkout and can request a refund from NCDOR. Your receipt shows state, county and transit tax.', hint: 'Denying charges tax and sends the renter the refund-claim note.' },
      D1: { q: 'docs', kind: 'Expiring document', title: "22' MasterCraft XT22 · Insurance", who: 'Cove & Co.', sub: 'Cove & Co. · expires Jul 1', age: '21 days left · 30-day email sent Jun 1', facts: [['Expires', 'Jul 1, 2027'], ['Upcoming bookings after expiry', '3'], ['Reminder', 'Email sent Jun 1']], docs: [], checks: [['Owner notified', '']], approve: 'Send another reminder', reject: 'Pause now', ph: '', hint: 'If not renewed, the boat pauses automatically on Jul 1.' },
      D2: { q: 'docs', kind: 'Expired document', title: "20' Sea Ray SPX · Insurance", who: 'Cove & Co.', sub: 'Cove & Co. · expired May 31', age: 'Boat auto-paused', facts: [['Expired', 'May 31, 2027'], ['Status', 'Paused automatically']], docs: [], checks: [['Boat paused', '']], approve: 'Send reminder', reject: 'Unlist boat', ph: '', hint: 'Boat resumes when a new certificate is approved.' }
    };
    const Q = [['listings', 'Listings and businesses'], ['tax', 'Tax exemptions'], ['docs', 'Expiring documents']];
    const open = id => !s.dec[id];
    const items = Object.keys(I).filter(id => I[id].q === s.q).map(id => {
      const it = I[id], dec = s.dec[id];
      const st = dec ? { approve: ['Approved', '#DDF3E4', '#14532D'], info: ['Info requested', '#FFF1C7', '#5C4300'], reject: ['Rejected', '#FDE2E1', '#8E1B13'] }[dec] : (it.q === 'docs' ? ['Watch', '#FFF1C7', '#5C4300'] : ['To review', '#E3F2F4', '#0B4F59']);
      return { title: it.title, sub: it.sub, age: it.age, status: st[0], sBg: st[1], sFg: st[2], cur: s.sel === id ? 'true' : 'false', border: s.sel === id ? '2px solid #0A6C7A' : '1px solid #DCE5EA', pick: () => this.setState({ sel: id, note: '', noteErr: false }) };
    });
    const id = I[s.sel] && I[s.sel].q === s.q ? s.sel : Object.keys(I).find(k => I[k].q === s.q);
    const it = I[id], dec = s.dec[id];
    const ck = s.checks[id] || {};
    const checks = it.checks.map(([label, flag], i) => ({ label, flag, hasFlag: !!flag, on: !!ck[i], toggle: () => this.setState({ checks: Object.assign({}, s.checks, { [id]: Object.assign({}, ck, { [i]: !ck[i] }) }) }) }));
    const allOk = checks.every(c => c.on);
    const st = dec ? { approve: ['Approved', '#DDF3E4', '#14532D'], info: ['Info requested', '#FFF1C7', '#5C4300'], reject: ['Rejected', '#FDE2E1', '#8E1B13'] }[dec] : ['To review', '#E3F2F4', '#0B4F59'];
    const decide = (kind, needNote) => {
      if (needNote && !s.note.trim() && it.q !== 'docs') { this.setState({ noteErr: true }); return; }
      const msg = { approve: it.title + ': ' + it.approve.toLowerCase() + ' done. ' + it.who + ' has been emailed.', info: 'Info requested from ' + it.who + '. Status set to Additional info required.', reject: it.title + ': ' + it.reject.toLowerCase() + '. ' + it.who + ' has been emailed.' }[kind];
      this.setState({ dec: Object.assign({}, s.dec, { [id]: kind }), noteErr: false, toast: msg });
      clearTimeout(this._t); this._t = setTimeout(() => this.setState({ toast: '' }), 3200);
    };
    const reg = s.reg[id] || 'idle';
    const outcome = dec ? { approve: 'Decision: approved by Riley on Jun 10, 2027.', info: 'Decision: more info requested on Jun 10, 2027. Item returns to the queue when the owner responds.', reject: 'Decision: ' + it.reject.toLowerCase() + ' on Jun 10, 2027.' }[dec] : '';
    return {
      queues: Q.map(([k, label]) => ({ label, count: Object.keys(I).filter(x => I[x].q === k && open(x)).length, sel: s.q === k ? 'true' : 'false', fg: s.q === k ? '#0F2A3D' : '#4A5F6E', line: s.q === k ? '#0A6C7A' : 'transparent', cBg: s.q === k ? '#0F2A3D' : '#DCE5EA', cFg: s.q === k ? '#fff' : '#3D5160', pick: () => this.setState({ q: k, note: '', noteErr: false }) })),
      items, toast: !!s.toast, toastText: s.toast,
      d: { kind: it.kind, title: it.title, who: it.who, status: st[0], sBg: st[1], sFg: st[2], facts: it.facts.map(([k, v]) => ({ k, v })), docs: it.docs, hasDocs: it.docs.length > 0,
        isTax: it.q === 'tax', exNo: it.exNo || '', regResult: it.regOk ? '✓ Valid · NC Dept. of Environmental Quality · active' : '✗ Not found. This looks like a federal EIN, not an NC exemption number.', regFg: it.regOk ? '#14532D' : '#B42318',
        checks, open: !dec, closed: !!dec, outcome, approveLabel: it.approve, rejectLabel: it.reject, canInfo: it.q === 'listings', notePh: it.ph, hint: it.hint },
      regIdle: reg === 'idle', regChecking: reg === 'checking', regDone: reg === 'done',
      checkReg: () => { this.setState({ reg: Object.assign({}, s.reg, { [id]: 'checking' }) }); setTimeout(() => this.setState({ reg: Object.assign({}, this.state.reg, { [id]: 'done' }) }), 900); },
      note: s.note, setNote: e => this.setState({ note: e.target.value, noteErr: false }), noteErr: s.noteErr,
      cantApprove: it.q !== 'docs' && !allOk,
      approve: () => decide('approve', false), reqInfo: () => decide('info', true), reject: () => decide('reject', true)
    };
  }
}

const DEFAULT_PROPS = {};
const CSS = "\nbody{margin:0;background:#EEF2F4}\n.btn{padding:0 16px}\n.btn-p:disabled{background:#9FB1BC;cursor:not-allowed}\n.btn-d{background:#fff;color:#B42318;border:1px solid #B42318}\n.btn-d:hover{background:#FEF3F2}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\ntextarea.inp{padding:10px 12px;min-height:80px}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n.kv{display:grid;grid-template-columns:170px 1fr;gap:6px 14px;font-size:15px}\n@media (max-width:700px){.kv{grid-template-columns:1fr}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Lundro admin review · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#EEF2F4", "fontFamily": "'Figtree', system-ui, sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.5"}}>
<header style={{"background": "#0F2A3D", "color": "#fff"}}>
<div style={{"maxWidth": "1360px", "margin": "0 auto", "padding": "0 24px", "display": "flex", "alignItems": "center", "gap": "14px", "minHeight": "64px", "flexWrap": "wrap"}}>
<Link href={"/"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#fff"}} aria-label={"Lundro home"}>
<svg width={"30"} height={"30"} viewBox={"0 0 36 36"} aria-hidden={"true"}>
<circle cx={"18"} cy={"18"} r={"18"} fill={"#0A6C7A"} />
<circle cx={"24"} cy={"12"} r={"4"} fill={"#FFC94A"} />
<path d={"M7 21c3-3 5-3 8 0s5 3 8 0 5-3 6-1"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"2.4"} strokeLinecap={"round"} />
</svg>
<span className={"disp"} style={{"fontWeight": "700", "fontSize": "22px"}}>
{"Lundro"}
</span>
</Link>
<span className={"badge"} style={{"background": "#FFC94A", "color": "#0F2A3D"}}>
{"Admin"}
</span>
<span style={{"marginLeft": "auto", "color": "#CDE7EC", "fontSize": "14px"}}>
{"Signed in as Riley (Trust & Safety)"}
</span>
</div>
</header>
<main style={{"maxWidth": "1360px", "margin": "0 auto", "padding": "24px 24px 48px"}}>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "30px"}}>
{"Review queue"}
</h1>
<div role={"tablist"} aria-label={"Queues"} style={{"display": "flex", "gap": "6px", "marginTop": "14px", "borderBottom": "1px solid #C9D6DD", "overflowX": "auto"}}>
{(s0?.queues || []).map((__it, __k) => { const s1 = { ...s0, "q": __it }; return (<Fragment key={__k}>
<button type={"button"} role={"tab"} aria-selected={s1?.q?.sel} onClick={s1?.q?.pick} style={{"border": "0", "background": "transparent", "minHeight": "48px", "padding": "0 14px", "fontWeight": "700", "color": s1?.q?.fg, "borderBottom": `3px solid ${s1?.q?.line ?? ""}`, "cursor": "pointer", "whiteSpace": "nowrap"}}>
{s1?.q?.label}{" "}
<span className={"badge"} style={{"background": s1?.q?.cBg, "color": s1?.q?.cFg}}>
{s1?.q?.count}
</span>
</button>
</Fragment>); })}
</div>
{s0?.toast ? (<>
<p role={"status"} style={{"margin": "14px 0 0", "background": "#0F2A3D", "color": "#fff", "borderRadius": "12px", "padding": "10px 14px", "fontWeight": "600"}}>
{s0?.toastText}
</p>
</>) : null}
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "18px", "alignItems": "flex-start"}}>
<section aria-label={"Items"} style={{"flex": "1 1 320px", "minWidth": "0", "display": "flex", "flexDirection": "column", "gap": "8px"}}>
{(s0?.items || []).map((__it, __k) => { const s1 = { ...s0, "i": __it }; return (<Fragment key={__k}>
<button type={"button"} onClick={s1?.i?.pick} aria-current={s1?.i?.cur} style={{"textAlign": "left", "background": "#fff", "border": s1?.i?.border, "borderRadius": "14px", "padding": "12px 14px", "cursor": "pointer", "display": "flex", "flexDirection": "column", "gap": "2px"}}>
<span style={{"display": "flex", "justifyContent": "space-between", "gap": "8px"}}>
<strong>
{s1?.i?.title}
</strong>
<span className={"badge"} style={{"background": s1?.i?.sBg, "color": s1?.i?.sFg}}>
{s1?.i?.status}
</span>
</span>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.i?.sub}
</span>
<span className={"muted"} style={{"fontSize": "13px"}}>
{s1?.i?.age}
</span>
</button>
</Fragment>); })}
</section>
<section className={"card"} aria-labelledby={"det-h"} style={{"flex": "999 1 560px", "minWidth": "0"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "10px", "flexWrap": "wrap"}}>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{s0?.d?.kind}
</p>
<h2 id={"det-h"} className={"disp"} style={{"margin": "2px 0 0", "fontSize": "26px"}}>
{s0?.d?.title}
</h2>
</div>
<span className={"badge"} style={{"background": s0?.d?.sBg, "color": s0?.d?.sFg, "alignSelf": "flex-start"}}>
{s0?.d?.status}
</span>
</div>
<div className={"kv"} style={{"marginTop": "16px"}}>
{(s0?.d?.facts || []).map((__it, __k) => { const s1 = { ...s0, "f": __it }; return (<Fragment key={__k}>
<span className={"muted"}>
{s1?.f?.k}
</span>
<span style={{"fontWeight": "600"}}>
{s1?.f?.v}
</span>
</Fragment>); })}
</div>
{s0?.d?.hasDocs ? (<>
<h3 style={{"margin": "20px 0 8px", "fontSize": "16px"}}>
{"Documents"}
</h3>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(180px, 1fr))", "gap": "10px"}}>
{(s0?.d?.docs || []).map((__it, __k) => { const s1 = { ...s0, "doc": __it }; return (<Fragment key={__k}>
<button type={"button"} style={{"border": "1px solid #DCE5EA", "borderRadius": "12px", "background": "#F6F9FA", "padding": "0", "cursor": "pointer", "textAlign": "left", "overflow": "hidden"}}>
<span aria-hidden={"true"} style={{"display": "block", "height": "96px", "background": "repeating-linear-gradient(#fff 0 10px, #E8EFF2 10px 12px)", "borderBottom": "1px solid #DCE5EA"}} />
<span style={{"display": "block", "padding": "8px 10px", "fontSize": "14px", "fontWeight": "600"}}>
{s1?.doc}
</span>
</button>
</Fragment>); })}
</div>
</>) : null}
{s0?.d?.isTax ? (<>
<div style={{"marginTop": "18px", "border": "1px solid #DCE5EA", "borderRadius": "14px", "padding": "14px"}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{"NCDOR exemption registry"}
</p>
{s0?.regIdle ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.checkReg} style={{"marginTop": "8px"}}>
{"Check number "}{s0?.d?.exNo}
</button>
</>) : null}
{s0?.regChecking ? (<>
<p role={"status"} className={"muted"} style={{"margin": "8px 0 0"}}>
{"Checking…"}
</p>
</>) : null}
{s0?.regDone ? (<>
<p role={"status"} style={{"margin": "8px 0 0", "fontWeight": "600", "color": s0?.d?.regFg}}>
{s0?.d?.regResult}
</p>
</>) : null}
</div>
</>) : null}
<h3 style={{"margin": "20px 0 6px", "fontSize": "16px"}}>
{"Checklist"}
</h3>
{(s0?.d?.checks || []).map((__it, __k) => { const s1 = { ...s0, "c": __it }; return (<Fragment key={__k}>
<label style={{"display": "flex", "gap": "12px", "alignItems": "flex-start", "padding": "8px 0", "borderTop": "1px solid #EEF2F4", "cursor": "pointer", "minHeight": "44px"}}>
<input type={"checkbox"} checked={s1?.c?.on} onChange={s1?.c?.toggle} disabled={s1?.d?.closed} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A", "marginTop": "2px", "flex": "none"}} />
<span>
<strong style={{"display": "block", "fontSize": "15px"}}>
{s1?.c?.label}
</strong>
{s1?.c?.hasFlag ? (<>
<span style={{"fontSize": "14px", "color": "#B42318", "fontWeight": "600"}}>
{s1?.c?.flag}
</span>
</>) : null}
</span>
</label>
</Fragment>); })}
{s0?.d?.open ? (<>
<div style={{"marginTop": "16px"}}>
<label htmlFor={"adm-note"} className={"lbl"}>
{"Message to "}{s0?.d?.who}{" (needed for Request info or Reject)"}
</label>
<textarea id={"adm-note"} className={"inp"} value={s0?.note} onChange={s0?.setNote} placeholder={s0?.d?.notePh} />
{s0?.noteErr ? (<>
<p role={"alert"} style={{"margin": "6px 0 0", "color": "#B42318", "fontWeight": "600", "fontSize": "14px"}}>
{"Add a short message so they know what to fix."}
</p>
</>) : null}
</div>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap", "marginTop": "14px"}}>
<button type={"button"} className={"btn btn-p"} onClick={s0?.approve} disabled={s0?.cantApprove}>
{s0?.d?.approveLabel}
</button>
{s0?.d?.canInfo ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.reqInfo}>
{"Request info"}
</button>
</>) : null}
<button type={"button"} className={"btn btn-d"} onClick={s0?.reject}>
{s0?.d?.rejectLabel}
</button>
</div>
<p className={"muted"} style={{"margin": "8px 0 0", "fontSize": "13px"}}>
{s0?.d?.hint}
</p>
</>) : null}
{s0?.d?.closed ? (<>
<p role={"status"} style={{"margin": "16px 0 0", "background": "#F1F6F8", "borderRadius": "12px", "padding": "12px 14px", "fontWeight": "600"}}>
{s0?.d?.outcome}
</p>
</>) : null}
</section>
</div>
</main>
</div>
    </>
  );
}
