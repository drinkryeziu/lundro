'use client';
// Generated from source/Checkout.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';
import { computeQuote, formatMoney, CAPTAIN_RATE_PER_HOUR } from '@/lib/pricing';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { step: 1, maxStep: 1, len: 'half', time: '9:00 AM', q: { tube: 1, sup: 0, mat: 0, cooler: 1, speaker: 0, hour: 0 }, captain: true,
      f: { name: '', email: '', phone: '', age: false, card: '', pre88: false, orgName: '', terms: false }, tried4: false, tried6: false,
      org: false, orgType: 'state', cert: 'saved', uploaded: false,
      boatId: 'b1', boatData: null, date: new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10), paying: false, payError: '' };
  }
  renderVals() {
    const s = this.state, f = s.f;
    const fee = (this.props.serviceFeePct ?? 10) / 100;
    const money = formatMoney;
    const X = [
      ['tube', 'Tube with rope', 40, 'per booking', 2, 'gear', '1 to 2 riders'],
      ['sup', 'Paddleboard', 25, 'each', 2, 'gear', 'Inflatable, with paddle'],
      ['mat', 'Floating mat', 35, 'per booking', 1, 'gear', '18 ft lily pad'],
      ['cooler', 'Cooler with ice', 20, 'per booking', 1, 'gear', '70 qt'],
      ['speaker', 'Bluetooth speaker', 15, 'per booking', 1, 'gear', 'Waterproof'],
      ['hour', 'Extra hour', 85, 'per hour', 2, 'boat', 'Adds boat time']
    ];
    const baseHours = s.len === 'half' ? 4 : 8;
    const half = s.boatData?.half ?? 350, full = s.boatData?.full ?? 600;
    const boat = s.len === 'half' ? half : full;
    const lines = [];
    const extras = X.map(([k, name, price, per, max, cat, desc]) => {
      const qty = s.q[k] || 0, line = qty * price;
      if (qty) lines.push({ label: name + (qty > 1 ? ' × ' + qty : ''), amt: money(line) });
      const setQ = v => this.setState({ q: Object.assign({}, s.q, { [k]: v }) });
      return { name, price, per, desc, avail: max + ' available', qty, lineFmt: qty ? money(line) : '—', atMin: qty <= 0, atMax: qty >= max, inc: () => setQ(Math.min(max, qty + 1)), dec: () => setQ(Math.max(0, qty - 1)) };
    });
    const tripHours = baseHours + (s.q.hour || 0);
    const exemptNow = s.org && (s.orgType === 'federal' || s.orgType === 'state');
    const quote = computeQuote({
      boatPrice: boat,
      extras: X.map(([k, , price, , , cat]) => ({ price, qty: s.q[k] || 0, category: cat })),
      captainHours: s.captain ? tripHours : 0,
      serviceFeePct: fee * 100,
      taxExempt: !!exemptNow,
    });
    const { extrasTotal, captain: captainAmt, serviceFee: svc, total } = quote;
    const { state: st, county: co, transit: tr, total: tax } = quote.tax;

    const digits = (f.phone || '').replace(/\D/g, '');
    const err = {
      name: s.tried4 && f.name.trim().length < 2,
      email: s.tried4 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email),
      phone: s.tried4 && digits.length !== 10,
      age: s.tried4 && !s.captain && !f.age,
      card: s.tried4 && !s.captain && !f.pre88 && f.card.trim().length < 4,
      terms: s.tried6 && !f.terms
    };
    const valid4 = !(f.name.trim().length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) || digits.length !== 10 || (!s.captain && (!f.age || (!f.pre88 && f.card.trim().length < 4))));
    const e = {};
    ['name', 'email', 'phone', 'card'].forEach(k => { e[k] = err[k]; e[k + 'Cls'] = err[k] ? 'err' : ''; e[k + 'Inv'] = err[k] ? 'true' : 'false'; });
    e.age = err.age; e.terms = err.terms;
    const set = {};
    ['name', 'email', 'phone', 'card', 'orgName'].forEach(k => { set[k] = ev => this.setState({ f: Object.assign({}, this.state.f, { [k]: ev.target.value }) }); });
    const tog = k => () => this.setState({ f: Object.assign({}, this.state.f, { [k]: !this.state.f[k] }) });

    const labels = ['Trip', 'Extras', 'Captain', 'Details', 'Organization', 'Payment'];
    const steps = labels.map((label, i) => {
      const n = i + 1, cur = n === s.step, done = n < s.step || n <= s.maxStep;
      return { n, label, current: cur ? 'step' : 'false', locked: n > s.maxStep, bar: cur ? '#0A6C7A' : (done ? '#7FB8C1' : '#DCE5EA'), fg: cur ? '#0F2A3D' : (done ? '#3D5160' : '#4A5F6E'), go: () => { if (n <= s.maxStep) this.setState({ step: n }); } };
    });
    const go = n => this.setState({ step: n, maxStep: Math.max(s.maxStep, n) });
    const sel = on => on ? { border: '2px solid #0A6C7A', bg: '#E3F2F4' } : { border: '1px solid #C9D6DD', bg: '#FFFFFF' };
    const times = s.len === 'half' ? ['9:00 AM', '1:30 PM'] : ['9:00 AM'];
    const isState = s.org && s.orgType === 'state', isFederal = s.org && s.orgType === 'federal';
    const certReady = !isState || s.cert === 'saved' || s.uploaded;
    return {
      steps, s1: s.step === 1, s2: s.step === 2, s3: s.step === 3, s4: s.step === 4, s5: s.step === 5, s6: s.step === 6,
      canBack: s.step > 1, notLast: s.step < 6, payReady: s.step === 6 && f.terms, payBlocked: s.step === 6 && !f.terms,
      back: () => this.setState({ step: s.step - 1 }),
      next: () => {
        if (s.step === 4 && !valid4) { this.setState({ tried4: true }); return; }
        if (s.step === 5 && !certReady) return;
        go(s.step + 1);
      },
      tryPay: () => this.setState({ tried6: true }),
      showErrSummary: s.tried4 && !valid4,
      time: times.indexOf(s.time) >= 0 ? s.time : times[0], times,
      date: s.date, setDate: ev => this.setState({ date: ev.target.value }), minDate: new Date().toISOString().slice(0, 10),
      paying: s.paying, payError: s.payError,
      pay: async () => {
        if (s.paying) return;
        this.setState({ paying: true, payError: '' });
        try {
          const r = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
            boatId: s.boatId, length: s.len, date: s.date, startTime: s.time, guests: Math.min(4, s.boatData?.guests ?? 4),
            captain: s.captain, extras: s.q, orgType: s.org ? s.orgType : null,
            contact: { name: f.name, email: f.email, phone: f.phone } }) });
          const j = await r.json();
          if (!r.ok) throw new Error(j.error || 'Booking failed');
          window.location.href = '/confirmation?code=' + j.code;
        } catch (err) { this.setState({ paying: false, payError: err.message }); }
      },
      setTime: ev => this.setState({ time: ev.target.value }),
      lens: [['half', 'Half day', '4 hours · ' + money(half)], ['full', 'Full day', '8 hours · ' + money(full)]].map(([v, l, sub]) => Object.assign({ label: l, sub, checked: s.len === v, pick: () => this.setState({ len: v }) }, sel(s.len === v))),
      lenLabel: s.len === 'half' ? 'Half day' : 'Full day', baseHours, tripHours,
      extras, extrasFmt: money(extrasTotal), lines,
      captain: s.captain, selfDrive: !s.captain, capOn: sel(s.captain), capOff: sel(!s.captain),
      pickCap: () => this.setState({ captain: true }), pickSelf: () => this.setState({ captain: false }),
      captainFmt: money(CAPTAIN_RATE_PER_HOUR * tripHours),
      f, e, set, toggleAge: tog('age'), togglePre88: tog('pre88'), toggleTerms: tog('terms'),
      org: s.org, toggleOrg: () => this.setState({ org: !s.org }),
      orgTypes: [['federal', 'U.S. federal agency', 'No NC sales tax'], ['state', 'NC state agency', 'No NC sales tax with Form E-595E'], ['nonprofit', 'Nonprofit, church or school', 'Tax applies; refund can be claimed later']].map(([v, l, sub]) => Object.assign({ label: l, sub, checked: s.orgType === v, pick: () => this.setState({ orgType: v }) }, sel(s.orgType === v))),
      isFederal, isState, isNonprofit: s.org && s.orgType === 'nonprofit',
      certSaved: s.cert === 'saved', certNew: s.cert === 'new', savedOpt: sel(s.cert === 'saved'), newOpt: sel(s.cert === 'new'),
      useSaved: () => this.setState({ cert: 'saved' }), useNew: () => this.setState({ cert: 'new' }),
      uploaded: s.uploaded, notUploaded: !s.uploaded, upload: () => this.setState({ uploaded: true }),
      exempt: exemptNow, exemptNote: isState ? 'Exempt, pending Lundro tax review of your E-595E' : 'Exempt: U.S. federal agency',
      payNote: isFederal ? 'Pay with a U.S. Government credit card.' : (isState ? 'Pay with a state-issued card. Purchase orders and checks: contact Lundro support.' : 'Visa, Mastercard, Amex and Discover accepted.'),
      cardLabel: isFederal ? 'U.S. Government card number' : (isState ? 'State-issued card number' : 'Card number'),
      payCta: isState ? 'Pay ' + money(total) + ' · tax review' : 'Pay ' + money(total),
      boatFmt: money(boat), feeFmt: money(svc), stateFmt: money(st), countyFmt: money(co), transitFmt: money(tr), taxFmt: money(tax), totalFmt: money(total)
    };
  }
}

const DEFAULT_PROPS = {"serviceFeePct":10};
const CSS = "\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:12px;padding:0 14px;background:#fff;font-size:16px;color:#0F2A3D}\n.inp.err{border:2px solid #B42318}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.errt{display:flex;gap:6px;align-items:center;color:#B42318;font-size:14px;font-weight:600;margin:6px 0 0}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:20px;padding:24px}\n.opt{display:flex;gap:12px;align-items:flex-start;border-radius:14px;padding:14px 16px;cursor:pointer}\n.opt input{width:20px;height:20px;accent-color:#0A6C7A;margin:2px 0 0;flex:none}\n.ln{display:flex;justify-content:space-between;gap:12px;padding:5px 0}\n.qty{width:44px;height:44px;border-radius:50%;border:1px solid #7B8F9B;background:#fff;cursor:pointer;font-size:20px;line-height:1}\n.qty:disabled{opacity:.4;cursor:not-allowed}\nfieldset{border:0;margin:0;padding:0;min-width:0}\n@media (max-width:760px){.card{padding:18px}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const id = q.get('boat') || 'b1';
    ref.current.setState({ boatId: id });
    fetch('/api/boats/' + id).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j) ref.current.setState({ boatData: j.boat }); }).catch(() => {});
  }, []);
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Lundro checkout · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#F6F9FA", "fontFamily": "Arial,Helvetica,sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.5"}}>
<header style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA"}}>
<div style={{"maxWidth": "1200px", "margin": "0 auto", "padding": "0 24px", "display": "flex", "alignItems": "center", "gap": "12px", "minHeight": "72px"}}>
<Link href={"/boat"} aria-label={"Back to boat"} style={{"width": "44px", "height": "44px", "borderRadius": "50%", "display": "grid", "placeItems": "center", "color": "#0F2A3D"}}>
<svg width={"22"} height={"22"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M15 6l-6 6 6 6"} />
</svg>
</Link>
<Link href={"/"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#0F2A3D"}} aria-label={"Lundro home"}>
<img src="/brand/lundro-logo-horizontal.png" alt="Lundro boat rentals" style={{ height: 44, width: "auto", display: "block" }} />
</Link>
<span className={"muted"} style={{"marginLeft": "auto", "fontSize": "14px", "display": "flex", "alignItems": "center", "gap": "6px"}}>
<svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}>
<rect x={"5"} y={"11"} width={"14"} height={"10"} rx={"2"} />
<path d={"M8 11V8a4 4 0 0 1 8 0v3"} />
</svg>
{"Secure checkout"}
</span>
</div>
</header>
<main style={{"maxWidth": "1200px", "margin": "0 auto", "padding": "24px 24px 80px"}}>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Book your trip"}
</h1>
<ol aria-label={"Checkout steps"} style={{"listStyle": "none", "margin": "18px 0 0", "padding": "0", "display": "flex", "gap": "6px", "overflowX": "auto"}}>
{(s0?.steps || []).map((__it, __k) => { const s1 = { ...s0, "st": __it }; return (<Fragment key={__k}>
<li style={{"flex": "1 0 auto"}}>
<button type={"button"} onClick={s1?.st?.go} aria-current={s1?.st?.current} disabled={s1?.st?.locked} style={{"width": "100%", "display": "flex", "flexDirection": "column", "gap": "6px", "alignItems": "flex-start", "border": "0", "background": "transparent", "padding": "0 4px 6px", "cursor": "pointer", "textAlign": "left", "minHeight": "44px"}}>
<span style={{"display": "block", "width": "100%", "height": "6px", "borderRadius": "3px", "background": s1?.st?.bar}} />
<span style={{"fontSize": "13px", "fontWeight": "700", "color": s1?.st?.fg, "whiteSpace": "nowrap"}}>
{s1?.st?.n}{". "}{s1?.st?.label}
</span>
</button>
</li>
</Fragment>); })}
</ol>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "28px", "alignItems": "flex-start", "marginTop": "20px"}}>
<div style={{"flex": "999 1 560px", "minWidth": "0"}}>
{s0?.s1 ? (<>
<section className={"card"} aria-labelledby={"s1h"}>
<h2 id={"s1h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"When are you going?"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(220px, 1fr))", "gap": "16px", "marginTop": "18px"}}>
<div>
<label htmlFor={"c-date"} className={"lbl"}>
{"Date"}
</label>
<input id={"c-date"} type={"date"} className={"inp"} value={"2027-06-12"} />
</div>
<div>
<label htmlFor={"c-date"} className={"lbl"}>
{"Trip date"}
</label>
<input id={"c-date"} type={"date"} className={"inp"} value={s0?.date} min={s0?.minDate} onChange={s0?.setDate} />
</div>
<div>
<label htmlFor={"c-time"} className={"lbl"}>
{"Start time"}
</label>
<select id={"c-time"} className={"inp"} value={s0?.time} onChange={s0?.setTime}>
{(s0?.times || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<option value={s1?.t}>
{s1?.t}
</option>
</Fragment>); })}
</select>
</div>
</div>
<fieldset style={{"marginTop": "18px"}}>
<legend className={"lbl"}>
{"Trip length"}
</legend>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(200px, 1fr))", "gap": "10px"}}>
{(s0?.lens || []).map((__it, __k) => { const s1 = { ...s0, "l": __it }; return (<Fragment key={__k}>
<label className={"opt"} style={{"border": s1?.l?.border, "background": s1?.l?.bg}}>
<input type={"radio"} name={"len"} checked={s1?.l?.checked} onChange={s1?.l?.pick} />
<span>
<strong>
{s1?.l?.label}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.l?.sub}
</span>
</span>
</label>
</Fragment>); })}
</div>
</fieldset>
</section>
</>) : null}
{s0?.s2 ? (<>
<section className={"card"} aria-labelledby={"s2h"}>
<h2 id={"s2h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Enhance your trip"}
</h2>
<p className={"muted"} style={{"margin": "4px 0 0"}}>
{"Optional extras from Cove & Co. Ready at pickup."}
</p>
<ul style={{"listStyle": "none", "margin": "18px 0 0", "padding": "0", "display": "flex", "flexDirection": "column"}}>
{(s0?.extras || []).map((__it, __k) => { const s1 = { ...s0, "x": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "alignItems": "center", "gap": "14px", "padding": "14px 0", "borderBottom": "1px solid #EEF2F4", "flexWrap": "wrap"}}>
<span style={{"flex": "1 1 220px", "minWidth": "0"}}>
<strong>
{s1?.x?.name}
</strong>
{" "}
<span className={"muted"}>
{"· $"}{s1?.x?.price}{" "}{s1?.x?.per}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.x?.desc}{" · "}{s1?.x?.avail}
</span>
</span>
<span style={{"display": "flex", "alignItems": "center", "gap": "10px"}} role={"group"} aria-label={`${s1?.x?.name ?? ""} quantity`}>
<button type={"button"} className={"qty"} aria-label={`Remove one ${s1?.x?.name ?? ""}`} onClick={s1?.x?.dec} disabled={s1?.x?.atMin}>
{"−"}
</button>
<span aria-live={"polite"} style={{"minWidth": "24px", "textAlign": "center", "fontWeight": "700", "fontSize": "18px"}}>
{s1?.x?.qty}
</span>
<button type={"button"} className={"qty"} aria-label={`Add one ${s1?.x?.name ?? ""}`} onClick={s1?.x?.inc} disabled={s1?.x?.atMax}>
{"+"}
</button>
</span>
<span style={{"width": "72px", "textAlign": "right", "fontWeight": "700"}}>
{s1?.x?.lineFmt}
</span>
</li>
</Fragment>); })}
</ul>
<p aria-live={"polite"} style={{"margin": "16px 0 0", "display": "flex", "justifyContent": "space-between", "fontSize": "18px", "background": "#E3F2F4", "borderRadius": "12px", "padding": "12px 16px"}}>
<span style={{"fontWeight": "600"}}>
{"Extras subtotal"}
</span>
<strong>
{s0?.extrasFmt}
</strong>
</p>
</section>
</>) : null}
{s0?.s3 ? (<>
<section className={"card"} aria-labelledby={"s3h"}>
<h2 id={"s3h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Captain or self-drive?"}
</h2>
<p className={"muted"} style={{"margin": "4px 0 0"}}>
{"This boat offers an optional captain at $50 per hour."}
</p>
<fieldset style={{"marginTop": "18px"}}>
<legend style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Choose captain option"}
</legend>
<div style={{"display": "flex", "flexDirection": "column", "gap": "10px"}}>
<label className={"opt"} style={{"border": s0?.capOn?.border, "background": s0?.capOn?.bg}}>
<input type={"radio"} name={"cap"} checked={s0?.captain} onChange={s0?.pickCap} />
<span>
<strong>
{"Add a captain · "}{s0?.captainFmt}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{"USCG-licensed captain for your full trip ("}{s0?.tripHours}{" hrs). No boater education card needed."}
</span>
</span>
</label>
<label className={"opt"} style={{"border": s0?.capOff?.border, "background": s0?.capOff?.bg}}>
<input type={"radio"} name={"cap"} checked={s0?.selfDrive} onChange={s0?.pickSelf} />
<span>
<strong>
{"I'll drive myself"}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{"Driver must be 25+. NC boater education card required if born on or after Jan 1, 1988."}
</span>
</span>
</label>
</div>
</fieldset>
</section>
</>) : null}
{s0?.s4 ? (<>
<section className={"card"} aria-labelledby={"s4h"}>
<h2 id={"s4h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Your details"}
</h2>
{s0?.showErrSummary ? (<>
<div role={"alert"} style={{"marginTop": "14px", "border": "2px solid #B42318", "background": "#FEF3F2", "borderRadius": "12px", "padding": "12px 16px", "color": "#7A1A12", "fontWeight": "600"}}>
{"Please fix the highlighted fields to continue."}
</div>
</>) : null}
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "16px", "marginTop": "18px"}}>
<div>
<label htmlFor={"f-name"} className={"lbl"}>
{"Full name"}
</label>
<input id={"f-name"} className={`inp ${s0?.e?.nameCls ?? ""}`} value={s0?.f?.name} onChange={s0?.set?.name} autoComplete={"name"} aria-invalid={s0?.e?.nameInv} />
{s0?.e?.name ? (<>
<p className={"errt"}>
{"Enter your full name"}
</p>
</>) : null}
</div>
<div>
<label htmlFor={"f-email"} className={"lbl"}>
{"Email"}
</label>
<input id={"f-email"} type={"email"} className={`inp ${s0?.e?.emailCls ?? ""}`} value={s0?.f?.email} onChange={s0?.set?.email} autoComplete={"email"} aria-invalid={s0?.e?.emailInv} />
{s0?.e?.email ? (<>
<p className={"errt"}>
{"Enter an email like name@example.com"}
</p>
</>) : null}
</div>
<div>
<label htmlFor={"f-phone"} className={"lbl"}>
{"Mobile phone"}
</label>
<input id={"f-phone"} type={"tel"} className={`inp ${s0?.e?.phoneCls ?? ""}`} value={s0?.f?.phone} onChange={s0?.set?.phone} autoComplete={"tel"} aria-invalid={s0?.e?.phoneInv} />
{s0?.e?.phone ? (<>
<p className={"errt"}>
{"Enter a 10-digit US phone number"}
</p>
</>) : null}
</div>
</div>
{s0?.selfDrive ? (<>
<div style={{"marginTop": "20px", "padding": "16px", "background": "#F3EEE3", "borderRadius": "14px"}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{"Driver requirements"}
</p>
<label style={{"display": "flex", "gap": "10px", "alignItems": "center", "marginTop": "10px", "minHeight": "44px", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s0?.f?.age} onChange={s0?.toggleAge} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A"}} />
{"The driver is 25 or older"}
</label>
{s0?.e?.age ? (<>
<p className={"errt"} style={{"marginTop": "0"}}>
{"The owner requires a driver aged 25+"}
</p>
</>) : null}
<div style={{"marginTop": "10px"}}>
<label htmlFor={"f-card"} className={"lbl"}>
{"NC boater education card number"}
</label>
<input id={"f-card"} className={`inp ${s0?.e?.cardCls ?? ""}`} value={s0?.f?.card} onChange={s0?.set?.card} placeholder={"e.g. NC-123456"} disabled={s0?.f?.pre88} />
</div>
<label style={{"display": "flex", "gap": "10px", "alignItems": "center", "marginTop": "8px", "minHeight": "44px", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s0?.f?.pre88} onChange={s0?.togglePre88} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A"}} />
{"The driver was born before Jan 1, 1988 (card not required)"}
</label>
{s0?.e?.card ? (<>
<p className={"errt"} style={{"marginTop": "0"}}>
{"Add the driver's card number, or confirm they were born before 1988"}
</p>
</>) : null}
</div>
</>) : null}
</section>
</>) : null}
{s0?.s5 ? (<>
<section className={"card"} aria-labelledby={"s5h"}>
<h2 id={"s5h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Booking for an organization?"}
</h2>
<label style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "marginTop": "16px", "minHeight": "52px", "cursor": "pointer"}}>
<span>
{"This trip is paid for by a government agency, nonprofit, church or school"}
</span>
<input type={"checkbox"} role={"switch"} checked={s0?.org} onChange={s0?.toggleOrg} style={{"width": "52px", "height": "28px", "accentColor": "#0A6C7A", "flex": "none"}} />
</label>
{s0?.org ? (<>
<div style={{"marginTop": "12px"}}>
<label htmlFor={"o-name"} className={"lbl"}>
{"Organization name"}
</label>
<input id={"o-name"} className={"inp"} value={s0?.f?.orgName} onChange={s0?.set?.orgName} />
</div>
<fieldset style={{"marginTop": "16px"}}>
<legend className={"lbl"}>
{"Organization type"}
</legend>
<div style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>
{(s0?.orgTypes || []).map((__it, __k) => { const s1 = { ...s0, "o": __it }; return (<Fragment key={__k}>
<label className={"opt"} style={{"border": s1?.o?.border, "background": s1?.o?.bg}}>
<input type={"radio"} name={"orgt"} checked={s1?.o?.checked} onChange={s1?.o?.pick} />
<span>
<strong>
{s1?.o?.label}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.o?.sub}
</span>
</span>
</label>
</Fragment>); })}
</div>
</fieldset>
{s0?.isFederal ? (<>
<div style={{"marginTop": "16px", "background": "#E3F2F4", "borderRadius": "14px", "padding": "16px", "color": "#0B4F59"}}>
<strong>
{"No sales tax."}
</strong>
{" Payment must come directly from the agency or a U.S. Government credit card. Personal cards aren't accepted for exempt bookings."}
</div>
</>) : null}
{s0?.isState ? (<>
<div style={{"marginTop": "16px", "border": "1px solid #DCE5EA", "borderRadius": "14px", "padding": "16px"}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{"Exemption certificate (Form E-595E)"}
</p>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "14px"}}>
{"Pay with a state-issued card, check, deposit or purchase order, not an employee's own card. Lundro checks your number in the NCDOR registry, usually within 1 business day."}
</p>
<label className={"opt"} style={{"border": s0?.savedOpt?.border, "background": s0?.savedOpt?.bg, "marginTop": "12px"}}>
<input type={"radio"} name={"cert"} checked={s0?.certSaved} onChange={s0?.useSaved} />
<span>
<strong>
{"Use saved certificate"}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{"E-595E · Exemption no. ending 4471 · saved Mar 2027"}
</span>
</span>
</label>
<label className={"opt"} style={{"border": s0?.newOpt?.border, "background": s0?.newOpt?.bg, "marginTop": "8px"}}>
<input type={"radio"} name={"cert"} checked={s0?.certNew} onChange={s0?.useNew} />
<span>
<strong>
{"Upload a new certificate"}
</strong>
</span>
</label>
{s0?.certNew ? (<>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(220px, 1fr))", "gap": "12px", "marginTop": "12px"}}>
<div>
<label htmlFor={"o-ex"} className={"lbl"}>
{"Agency exemption number"}
</label>
<input id={"o-ex"} className={"inp"} placeholder={"e.g. 400012345"} />
</div>
<div>
<span className={"lbl"}>
{"Signed Form E-595E"}
</span>
{s0?.notUploaded ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.upload} style={{"width": "100%"}}>
{"Upload PDF or photo"}
</button>
</>) : null}
{s0?.uploaded ? (<>
<p style={{"margin": "0", "minHeight": "48px", "display": "flex", "alignItems": "center", "gap": "8px", "fontWeight": "600", "color": "#14532D"}}>
{"✓ E-595E_signed.pdf"}
</p>
</>) : null}
</div>
</div>
<label style={{"display": "flex", "gap": "10px", "alignItems": "center", "marginTop": "10px", "minHeight": "44px"}}>
<input type={"checkbox"} checked={true} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A"}} />
{"Save this certificate for future bookings"}
</label>
</>) : null}
</div>
</>) : null}
{s0?.isNonprofit ? (<>
<div style={{"marginTop": "16px", "background": "#FFF1C7", "borderRadius": "14px", "padding": "16px", "color": "#5C4300"}}>
<strong>
{"NC sales tax still applies."}
</strong>
{" Nonprofits, churches and schools aren't exempt at checkout in North Carolina, but may claim a refund from NCDOR later. Your receipt splits state, county and transit tax to make that easy."}
</div>
</>) : null}
</>) : null}
</section>
</>) : null}
{s0?.s6 ? (<>
<section className={"card"} aria-labelledby={"s6h"}>
<h2 id={"s6h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Payment"}
</h2>
<p className={"muted"} style={{"margin": "4px 0 0"}}>
{s0?.payNote}
</p>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(160px, 1fr))", "gap": "14px", "marginTop": "16px"}}>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"p-num"} className={"lbl"}>
{s0?.cardLabel}
</label>
<input id={"p-num"} className={"inp"} inputMode={"numeric"} placeholder={"1234 1234 1234 1234"} autoComplete={"cc-number"} />
</div>
<div>
<label htmlFor={"p-exp"} className={"lbl"}>
{"Expiry"}
</label>
<input id={"p-exp"} className={"inp"} placeholder={"MM / YY"} autoComplete={"cc-exp"} />
</div>
<div>
<label htmlFor={"p-cvc"} className={"lbl"}>
{"CVC"}
</label>
<input id={"p-cvc"} className={"inp"} placeholder={"123"} autoComplete={"cc-csc"} />
</div>
<div>
<label htmlFor={"p-zip"} className={"lbl"}>
{"Billing ZIP"}
</label>
<input id={"p-zip"} className={"inp"} placeholder={"28031"} autoComplete={"postal-code"} />
</div>
</div>
<div style={{"marginTop": "18px", "background": "#F1F6F8", "borderRadius": "14px", "padding": "14px 16px", "fontSize": "15px"}}>
<p style={{"margin": "0"}}>
<strong>
{"Today you pay "}{s0?.totalFmt}{"."}
</strong>
{" We also place a "}
<strong>
{"$500 security deposit hold"}
</strong>
{" on your card. It's released within 3 days after your trip if there's no damage."}
</p>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{"Moderate cancellation: full refund, tax included, up to 5 days before your trip."}
</p>
</div>
<label style={{"display": "flex", "gap": "10px", "alignItems": "flex-start", "marginTop": "14px", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s0?.f?.terms} onChange={s0?.toggleTerms} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A", "marginTop": "2px", "flex": "none"}} />
<span>
{"I agree to the boat's house rules, cancellation policy and Lundro's renter terms."}
</span>
</label>
{s0?.e?.terms ? (<>
<p className={"errt"}>
{"Please accept the terms to book"}
</p>
</>) : null}
</section>
</>) : null}
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "12px", "marginTop": "20px"}}>
{s0?.canBack ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.back}>
{"Back"}
</button>
</>) : null}
<span />
{s0?.notLast ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.next} style={{"minWidth": "180px"}}>
{"Continue"}
</button>
</>) : null}
{s0?.payReady ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.pay} disabled={s0?.paying} style={{"minWidth": "220px"}}>
{s0?.paying ? 'Booking…' : s0?.payCta}
</button>
{s0?.payError ? (<p role={"alert"} style={{"color": "#B42318", "fontWeight": "600", "margin": "8px 0 0"}}>{s0.payError}</p>) : null}
</>) : null}
{s0?.payBlocked ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.tryPay} style={{"minWidth": "220px"}}>
{s0?.payCta}
</button>
</>) : null}
</div>
</div>
<aside aria-label={"Price breakdown"} style={{"flex": "1 1 360px", "minWidth": "0", "position": "sticky", "top": "20px"}}>
<div className={"card"} style={{"padding": "20px"}}>
<div style={{"display": "flex", "gap": "12px", "alignItems": "center", "paddingBottom": "14px", "borderBottom": "1px solid #DCE5EA"}}>
<span style={{"width": "72px", "height": "56px", "borderRadius": "10px", "overflow": "hidden", "flex": "none", "position": "relative"}}>
<svg viewBox={"0 0 120 90"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"120"} height={"90"} fill={"#CFE8F5"} />
<path d={"M0 40 Q30 30 60 38 T120 35 V52 H0 Z"} fill={"#5E9478"} />
<rect y={"50"} width={"120"} height={"40"} fill={"#3E8FB0"} />
<rect x={"24"} y={"62"} width={"72"} height={"9"} rx={"2"} fill={"#fff"} />
<path d={"M34 54 H86 Q84 48 60 48 Q36 48 34 54 Z"} fill={"#0A6C7A"} />
</svg>
</span>
<span>
<strong style={{"display": "block"}}>
{"24' Bennington Pontoon"}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{"Sat, Jun 12 · "}{s0?.time}{" · "}{s0?.lenLabel}
</span>
</span>
</div>
<div style={{"padding": "12px 0", "borderBottom": "1px solid #DCE5EA", "fontSize": "15px"}}>
<div className={"ln"}>
<span>
{"Boat · "}{s0?.lenLabel}{" ("}{s0?.baseHours}{" hrs)"}
</span>
<span>
{s0?.boatFmt}
</span>
</div>
{(s0?.lines || []).map((__it, __k) => { const s1 = { ...s0, "l": __it }; return (<Fragment key={__k}>
<div className={"ln"}>
<span>
{s1?.l?.label}
</span>
<span>
{s1?.l?.amt}
</span>
</div>
</Fragment>); })}
{s0?.captain ? (<>
<div className={"ln"}>
<span>
{"Captain · "}{s0?.tripHours}{" hrs × $50"}
</span>
<span>
{s0?.captainFmt}
</span>
</div>
</>) : null}
<div className={"ln"}>
<span>
{"Lundro service fee"}
</span>
<span>
{s0?.feeFmt}
</span>
</div>
</div>
<div style={{"padding": "12px 0", "borderBottom": "1px solid #DCE5EA", "fontSize": "15px"}}>
<p style={{"margin": "0 0 4px", "fontWeight": "700", "display": "flex", "justifyContent": "space-between"}}>
{"NC sales tax "}
<span>
{s0?.taxFmt}
</span>
</p>
{s0?.exempt ? (<>
<p style={{"margin": "0", "fontSize": "14px", "color": "#0B4F59", "fontWeight": "600"}}>
{s0?.exemptNote}
</p>
</>) : null}
<div className={"ln muted"}>
<span>
{"State"}
</span>
<span>
{s0?.stateFmt}
</span>
</div>
<div className={"ln muted"}>
<span>
{"County (Mecklenburg)"}
</span>
<span>
{s0?.countyFmt}
</span>
</div>
<div className={"ln muted"}>
<span>
{"Transit"}
</span>
<span>
{s0?.transitFmt}
</span>
</div>
<p className={"muted"} style={{"margin": "6px 0 0", "fontSize": "13px"}}>
{"Boat time taxed at 3% state rate. Rented gear like tubes and coolers taxed at 8.25% (Mecklenburg). Tax on captain and service fee pending NCDOR guidance."}
</p>
</div>
<p aria-live={"polite"} style={{"margin": "0", "padding": "14px 0 6px", "display": "flex", "justifyContent": "space-between", "fontSize": "20px", "fontWeight": "700"}}>
<span>
{"Total"}
</span>
<span>
{s0?.totalFmt}
</span>
</p>
<p className={"muted"} style={{"margin": "0", "display": "flex", "justifyContent": "space-between", "fontSize": "15px"}}>
<span>
{"Security deposit (hold, not charged)"}
</span>
<span>
{"$500.00"}
</span>
</p>
</div>
</aside>
</div>
</main>
</div>
    </>
  );
}
