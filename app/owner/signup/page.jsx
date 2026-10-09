'use client';
// Generated from source/OwnerSignup.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { step: 1, max: 1, acct: 'company', f: { name: 'Jordan Hale', email: 'jordan@coveandco.example', phone: '(704) 555-0142', addr: '412 Catawba Ave, Cornelius, NC 28031', hin: 'ETWC1124L122', halfPrice: '350', fullPrice: '600' },
      saving: false, reg: 'idle', sub: 0, subMax: 0, photos: 3, photoTried: false, op: 'optional', times: { '9:00 AM': true, '1:30 PM': true }, extrasOn: { tube: true, sup: true, mat: true, cooler: true, speaker: true, hour: true, fishing: false },
      docs: { reg: true, ins: false, cap: false }, safe: { ext: true, throw: false, sound: true, aid: true }, safeTried: false, tier: 'moderate', pay: 'pending', submitted: false };
  }
  touch() { this.setState({ saving: true }); clearTimeout(this._t); this._t = setTimeout(() => this.setState({ saving: false }), 800); }
  renderVals() {
    const s = this.state, f = s.f;
    const comp = s.acct === 'company';
    const flow = comp ? [1, 2, 3, 4, 5] : [1, 3, 4, 5];
    const labels = { 1: 'Account', 2: 'Company', 3: 'Add boat', 4: 'Payouts', 5: 'Review' };
    const idx = flow.indexOf(s.step);
    const sel = on => on ? { border: '2px solid #0A6C7A', bg: '#E3F2F4' } : { border: '1px solid #C9D6DD', bg: '#FFFFFF' };
    const go = n => { this.setState({ step: n, max: Math.max(s.max, n) }); this.touch(); };
    const stepper = flow.map((n, i) => {
      const cur = n === s.step, done = n < s.step || (n <= s.max && !cur);
      return { label: labels[n], mark: done ? '✓' : String(i + 1), cur: cur ? 'step' : 'false', locked: n > s.max,
        border: cur ? '2px solid #0A6C7A' : '1px solid #DCE5EA', bg: cur ? '#E3F2F4' : '#fff', fg: '#0F2A3D',
        dotBg: cur ? '#0A6C7A' : (done ? '#14532D' : '#E8EFF2'), dotFg: cur || done ? '#fff' : '#3D5160', go: () => { if (n <= s.max) go(n); } };
    });
    const subLabels = ['Details', 'Photos', 'Location', 'Operation', 'Pricing', 'Extras', 'Documents', 'Safety', 'Policies'];
    const subTitles = ['Boat details', 'Photos and description', 'Where renters pick up', 'Captain and self-drive', 'Pricing and start times', 'Extras for this boat', 'Documents', 'Safety checklist', 'Policies and house rules'];
    const subnav = subLabels.map((label, i) => ({ label, cur: i === s.sub ? 'step' : 'false', bg: i === s.sub ? '#E3F2F4' : 'transparent', weight: i === s.sub ? 700 : 500,
      dot: i < s.subMax || (i <= s.subMax && i !== s.sub) ? '#14532D' : (i === s.sub ? '#0A6C7A' : '#9FB1BC'), mark: i < s.subMax ? '✓' : String(i + 1), go: () => this.setState({ sub: i, subMax: Math.max(s.subMax, i) }) }));
    const hinErr = f.hin.length > 0 && f.hin.replace(/[^A-Za-z0-9]/g, '').length !== 12;
    const set = {};
    ['name', 'email', 'phone', 'addr', 'hin', 'halfPrice', 'fullPrice'].forEach(k => { set[k] = e => { this.setState({ f: Object.assign({}, this.state.f, { [k]: e.target.value }) }); this.touch(); }; });
    const comm = (this.props.commissionPct ?? 15) / 100;
    const earn = v => { const n = Number(String(v).replace(/[^0-9.]/g, '')); return n ? 'You earn about $' + Math.round(n * (1 - comm)) + ' after Lundro’s ' + Math.round(comm * 100) + '% commission.' : 'Enter a price'; };
    const subNext = () => {
      if (s.sub === 0 && hinErr) return;
      if (s.sub === 1 && s.photos < 5) { this.setState({ photoTried: true }); return; }
      if (s.sub === 7 && (!s.safe.throw || !s.safe.sound)) { this.setState({ safeTried: true }); return; }
      const n = s.sub + 1; this.setState({ sub: n, subMax: Math.max(s.subMax, n) }); this.touch();
    };
    const photoTiles = Array.from({ length: s.photos }, (_, i) => {
      const P = [['#CFE8F5', '#5E9478', '#3E8FB0'], ['#FCE3C2', '#6F8065', '#4C8DA8'], ['#E4F1F7', '#6E9D84', '#5BA3C0'], ['#BFE3F4', '#4F8A6C', '#2F7FA3']][i % 4];
      return { n: i + 1, cover: i === 0, sky: P[0], hill: P[1], water: P[2] };
    });
    const opModes = [['required', 'Captain required', 'You always provide a captain'], ['optional', 'Captain optional', 'Renters choose a captain or drive themselves'], ['self', 'Self-drive only', 'No captain offered']]
      .map(([v, l, sub]) => Object.assign({ label: l, sub, checked: s.op === v, pick: () => { this.setState({ op: v }); this.touch(); } }, sel(s.op === v)));
    const startTimes = ['8:00 AM', '9:00 AM', '10:00 AM', '1:30 PM', '4:00 PM'].map(t => { const on = !!s.times[t]; return { label: t, pressed: on ? 'true' : 'false', border: on ? '2px solid #0F2A3D' : '1px solid #7B8F9B', bg: on ? '#0F2A3D' : '#fff', fg: on ? '#fff' : '#0F2A3D', toggle: () => { this.setState({ times: Object.assign({}, s.times, { [t]: !on }) }); this.touch(); } }; });
    const LIB = [['tube', 'Tube with rope', 'Catalog · Water activities', 40, 'per booking'], ['sup', 'Paddleboard', 'Catalog · Water activities', 25, 'each'], ['mat', 'Floating mat', 'Catalog · Water activities', 35, 'per booking'], ['cooler', 'Cooler with ice', 'Catalog · Comfort', 20, 'per booking'], ['speaker', 'Bluetooth speaker', 'Catalog · Comfort', 15, 'per booking'], ['hour', 'Extra hour', 'Catalog · Time', 85, 'per hour'], ['fishing', 'Rods and reels', 'Catalog · Fishing', 30, 'per booking']];
    const libExtras = LIB.map(([k, name, kind, price, per]) => { const on = !!s.extrasOn[k]; return { name, kind, price, per, on, off: !on, toggle: () => { this.setState({ extrasOn: Object.assign({}, s.extrasOn, { [k]: !on }) }); this.touch(); } }; });
    const docDef = [['reg', 'Registration or title', false, ''], ['ins', 'Insurance certificate', true, '2028-04-30']].concat(s.op !== 'self' ? [['cap', 'Captain USCG license', true, '2029-02-14']] : []);
    const docs = docDef.map(([k, label, hasExp, exp]) => { const up = !!s.docs[k]; return { label, hasExp, exp, status: up ? 'Uploaded · ' + label.toLowerCase().replace(/ /g, '_') + '.pdf' : 'Required', cta: up ? 'Replace' : 'Upload', upload: () => { this.setState({ docs: Object.assign({}, s.docs, { [k]: true }) }); this.touch(); } }; });
    const safety = [['ext', 'Fire extinguisher'], ['throw', 'Throwable flotation device'], ['sound', 'Sound device (horn or whistle)'], ['aid', 'First aid kit']].map(([k, label]) => ({ label, on: !!s.safe[k], toggle: () => { this.setState({ safe: Object.assign({}, s.safe, { [k]: !s.safe[k] }) }); this.touch(); } }));
    const tiers = [['flexible', 'Flexible', 'Full refund up to 24 hours before'], ['moderate', 'Moderate', 'Full refund up to 5 days before'], ['strict', 'Strict', 'Full refund up to 14 days before']].map(([v, l, sub]) => Object.assign({ label: l, sub, checked: s.tier === v, pick: () => { this.setState({ tier: v }); this.touch(); } }, sel(s.tier === v)));
    const payDoneish = s.pay === 'done';
    const badge = (t) => ({ ok: ['Complete', '#DDF3E4', '#14532D'], warn: ['Needs attention', '#FFF1C7', '#5C4300'], skip: ['Skipped', '#FDE2E1', '#8E1B13'] })[t];
    const rv = (title, body, t, n) => { const b = badge(t); return { title, body, badge: b[0], badgeBg: b[1], badgeFg: b[2], edit: () => go(n) }; };
    const docsMissing = docs.filter(d => d.cta === 'Upload').length;
    const review = [rv('Account', f.name + ' · ' + (comp ? 'Company' : 'Individual owner') + ' · ' + f.email, 'ok', 1)]
      .concat(comp ? [rv('Company profile', 'Cove & Co. Boat Rentals · NC registry match found', s.reg === 'found' ? 'ok' : 'warn', 2)] : [])
      .concat([rv("24' Bennington Pontoon", s.photos + ' photos · $' + f.halfPrice + ' half day / $' + f.fullPrice + ' full day · ' + (docsMissing ? docsMissing + ' document(s) missing' : 'all documents uploaded'), docsMissing || s.photos < 5 ? 'warn' : 'ok', 3),
        rv('Payouts', payDoneish ? 'Stripe · bank ending 6789' : 'Not set up. Boats stay in Draft until done.', payDoneish ? 'ok' : 'skip', 4)]);
    return {
      saveLabel: s.saving ? 'Saving…' : 'All changes saved', saveColor: s.saving ? '#4A5F6E' : '#14532D', saveIcon: s.saving ? 'M12 4a8 8 0 1 0 8 8' : 'M5 12l5 5 9-10',
      pct: s.submitted ? 100 : Math.round(((idx < 0 ? 0 : idx) + (s.step === 3 ? s.sub / 9 : 0)) / flow.length * 100),
      notSubmitted: !s.submitted, submitted: s.submitted, stepper,
      s1: s.step === 1, s2: s.step === 2, s3: s.step === 3, s4: s.step === 4, s5: s.step === 5,
      isIndiv: !comp, isComp: comp, indivOpt: sel(!comp), compOpt: sel(comp),
      pickIndiv: () => { this.setState({ acct: 'individual' }); this.touch(); }, pickComp: () => { this.setState({ acct: 'company' }); this.touch(); },
      publicName: comp ? 'Renters see your company name, not your own.' : 'Renters will see you as “' + (f.name.split(' ')[0] || '') + ' ' + ((f.name.split(' ')[1] || '')[0] || '') + '.”',
      f, set, touch: () => this.touch(),
      checkReg: () => { this.setState({ reg: 'checking' }); setTimeout(() => this.setState({ reg: 'found' }), 1100); },
      regChecking: s.reg === 'checking', regFound: s.reg === 'found',
      boatName: "24' Bennington Pontoon", subnav, subPos: 'Section ' + (s.sub + 1) + ' of 9', subTitle: subTitles[s.sub],
      b0: s.sub === 0, b1: s.sub === 1, b2: s.sub === 2, b3: s.sub === 3, b4: s.sub === 4, b5: s.sub === 5, b6: s.sub === 6, b7: s.sub === 7, b8: s.sub === 8,
      hinErr, hinCls: hinErr ? 'err' : '', hinInv: hinErr ? 'true' : 'false', hinLen: f.hin.replace(/[^A-Za-z0-9]/g, '').length,
      photos: s.photos, photoTiles, photoErr: s.photoTried && s.photos < 5, addPhoto: () => { this.setState({ photos: s.photos + 1 }); this.touch(); },
      opModes, offersCaptain: s.op !== 'self', allowsSelf: s.op !== 'required',
      earnHalf: earn(f.halfPrice), earnFull: earn(f.fullPrice), startTimes, libExtras, docs, safety,
      safetyMissing: s.safeTried && (!s.safe.throw || !s.safe.sound), tiers,
      subFirst: s.sub === 0, subNotLast: s.sub < 8, subLast: s.sub === 8,
      subBack: () => this.setState({ sub: Math.max(0, s.sub - 1) }), subNext,
      finishBoat: () => go(4),
      payPending: s.pay === 'pending', payConnecting: s.pay === 'connecting', payDone: payDoneish, paySkipped: s.pay === 'skipped',
      connect: () => { this.setState({ pay: 'connecting' }); setTimeout(() => this.setState({ pay: 'done' }), 1200); this.touch(); },
      skipPay: () => { this.setState({ pay: 'skipped' }); this.touch(); },
      review, payClause: payDoneish ? '' : ' and your payouts are set up',
      canBack: idx > 0, showNext: s.step !== 3 && s.step !== 5,
      back: () => go(flow[idx - 1]), next: () => go(flow[idx + 1]),
      submit: () => this.setState({ submitted: true }),
      payLine: payDoneish ? '◷ Identity check by Stripe' : '! Set up payouts so your boat can go live',
      addAnother: () => this.setState({ submitted: false, step: 3, sub: 0, subMax: 0, photos: 0, photoTried: false })
    };
  }
}

const DEFAULT_PROPS = {"commissionPct":15};
const CSS = "\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.btn-sm{min-height:44px;padding:0 16px;font-size:15px}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:12px;padding:0 14px;background:#fff;font-size:16px;color:#0F2A3D}\ntextarea.inp{padding:12px 14px;min-height:100px}\n.inp.err{border:2px solid #B42318}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.hint{font-size:13px;color:#4A5F6E;margin:6px 0 0}\n.errt{color:#B42318;font-size:14px;font-weight:600;margin:6px 0 0}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:20px;padding:28px}\n.g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}\n.opt{display:flex;gap:12px;align-items:flex-start;border-radius:14px;padding:14px 16px;cursor:pointer}\n.opt input{width:20px;height:20px;accent-color:#0A6C7A;margin:2px 0 0;flex:none}\n.chk{display:flex;gap:10px;align-items:center;min-height:44px;cursor:pointer}\n.chk input{width:20px;height:20px;accent-color:#0A6C7A;flex:none;margin:0}\n.sub{font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#3D5160;margin:24px 0 10px}\nfieldset{border:0;margin:0;padding:0;min-width:0}\n.upl{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px dashed #7B8F9B;border-radius:14px;padding:12px 14px;flex-wrap:wrap}\n@media (max-width:760px){.card{padding:18px}.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>List your boat on Lundro · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#F6F9FA", "fontFamily": "'Figtree', system-ui, sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.5"}}>
<header style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA"}}>
<div style={{"maxWidth": "1100px", "margin": "0 auto", "padding": "0 24px", "display": "flex", "alignItems": "center", "gap": "12px", "minHeight": "72px", "flexWrap": "wrap"}}>
<Link href={"/"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#0F2A3D"}} aria-label={"Lundro home"}>
<svg width={"34"} height={"34"} viewBox={"0 0 36 36"} aria-hidden={"true"}>
<circle cx={"18"} cy={"18"} r={"18"} fill={"#0A6C7A"} />
<circle cx={"24"} cy={"12"} r={"4"} fill={"#FFC94A"} />
<path d={"M7 21c3-3 5-3 8 0s5 3 8 0 5-3 6-1"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"2.4"} strokeLinecap={"round"} />
</svg>
<span className={"disp"} style={{"fontWeight": "700", "fontSize": "24px"}}>
{"Lundro"}
</span>
<span className={"muted hide-sm"} style={{"fontSize": "15px", "fontWeight": "600", "marginLeft": "4px"}}>
{"for owners"}
</span>
</Link>
<p role={"status"} aria-live={"polite"} style={{"margin": "0 0 0 auto", "display": "flex", "alignItems": "center", "gap": "6px", "fontSize": "14px", "fontWeight": "600", "color": s0?.saveColor}}>
<svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={s0?.saveIcon} />
</svg>
{s0?.saveLabel}
</p>
<Link href={"/owner"} className={"btn btn-g btn-sm"}>
{"Save and exit"}
</Link>
</div>
<div role={"progressbar"} aria-label={"Signup progress"} aria-valuemin={"0"} aria-valuemax={"100"} aria-valuenow={s0?.pct} style={{"height": "6px", "background": "#E8EFF2"}}>
<div style={{"height": "6px", "width": `${s0?.pct ?? ""}%`, "background": "#0A6C7A", "transition": "width .3s"}} />
</div>
</header>
<main style={{"maxWidth": "1100px", "margin": "0 auto", "padding": "24px 24px 80px"}}>
{s0?.notSubmitted ? (<>
<ol aria-label={"Signup steps"} style={{"listStyle": "none", "margin": "0 0 20px", "padding": "0", "display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
{(s0?.stepper || []).map((__it, __k) => { const s1 = { ...s0, "st": __it }; return (<Fragment key={__k}>
<li>
<button type={"button"} onClick={s1?.st?.go} disabled={s1?.st?.locked} aria-current={s1?.st?.cur} style={{"display": "flex", "alignItems": "center", "gap": "8px", "minHeight": "44px", "padding": "0 14px 0 6px", "borderRadius": "999px", "border": s1?.st?.border, "background": s1?.st?.bg, "color": s1?.st?.fg, "fontWeight": "700", "fontSize": "14px", "cursor": "pointer"}}>
<span style={{"width": "30px", "height": "30px", "borderRadius": "50%", "display": "grid", "placeItems": "center", "background": s1?.st?.dotBg, "color": s1?.st?.dotFg}}>
{s1?.st?.mark}
</span>
{s1?.st?.label}
</button>
</li>
</Fragment>); })}
</ol>
{s0?.s1 ? (<>
<section className={"card"} aria-labelledby={"h1x"}>
<p className={"muted"} style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Step 1 of 5"}
</p>
<h1 id={"h1x"} className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px"}}>
{"Let's set up your account"}
</h1>
<fieldset style={{"marginTop": "20px"}}>
<legend className={"lbl"}>
{"I'm listing as"}
</legend>
<div className={"g2"}>
<label className={"opt"} style={{"border": s0?.indivOpt?.border, "background": s0?.indivOpt?.bg}}>
<input type={"radio"} name={"acct"} checked={s0?.isIndiv} onChange={s0?.pickIndiv} />
<span>
<strong>
{"An individual owner"}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{"Renters see your first name and last initial."}
</span>
</span>
</label>
<label className={"opt"} style={{"border": s0?.compOpt?.border, "background": s0?.compOpt?.bg}}>
<input type={"radio"} name={"acct"} checked={s0?.isComp} onChange={s0?.pickComp} />
<span>
<strong>
{"A company"}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{"Renters see your company name and logo."}
</span>
</span>
</label>
</div>
</fieldset>
<div className={"g2"} style={{"marginTop": "20px"}}>
<div>
<label htmlFor={"o-name"} className={"lbl"}>
{"Full name"}
</label>
<input id={"o-name"} className={"inp"} value={s0?.f?.name} onChange={s0?.set?.name} autoComplete={"name"} />
<p className={"hint"}>
{s0?.publicName}
</p>
</div>
<div>
<label htmlFor={"o-email"} className={"lbl"}>
{"Email"}
</label>
<input id={"o-email"} type={"email"} className={"inp"} value={s0?.f?.email} onChange={s0?.set?.email} />
</div>
<div>
<label htmlFor={"o-phone"} className={"lbl"}>
{"Phone"}
</label>
<input id={"o-phone"} type={"tel"} className={"inp"} value={s0?.f?.phone} onChange={s0?.set?.phone} />
</div>
<div>
<label htmlFor={"o-addr"} className={"lbl"}>
{"Mailing address"}
</label>
<input id={"o-addr"} className={"inp"} value={s0?.f?.addr} onChange={s0?.set?.addr} />
</div>
</div>
<p className={"muted"} style={{"margin": "14px 0 0", "fontSize": "14px", "display": "flex", "gap": "6px", "alignItems": "center"}}>
<svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}>
<rect x={"5"} y={"11"} width={"14"} height={"10"} rx={"2"} />
<path d={"M8 11V8a4 4 0 0 1 8 0v3"} />
</svg>
{"Your phone, email and address are never shown publicly."}
</p>
</section>
</>) : null}
{s0?.s2 ? (<>
<section className={"card"} aria-labelledby={"h2x"}>
<p className={"muted"} style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Step 2 of 5"}
</p>
<h1 id={"h2x"} className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px"}}>
{"Company profile"}
</h1>
<p className={"sub"}>
{"Public · shown on your boat pages"}
</p>
<div className={"g2"}>
<div>
<span className={"lbl"}>
{"Logo"}
</span>
<div className={"upl"}>
<span style={{"display": "flex", "gap": "12px", "alignItems": "center"}}>
<span className={"disp"} aria-hidden={"true"} style={{"width": "48px", "height": "48px", "borderRadius": "12px", "background": "#0F2A3D", "color": "#FFC94A", "display": "grid", "placeItems": "center", "fontWeight": "700"}}>
{"C&C"}
</span>
<span className={"muted"} style={{"fontSize": "14px"}}>
{"cove-logo.png"}
</span>
</span>
<button type={"button"} className={"btn btn-g btn-sm"}>
{"Replace"}
</button>
</div>
</div>
<div>
<label htmlFor={"c-web"} className={"lbl"}>
{"Website"}
</label>
<input id={"c-web"} className={"inp"} value={"coveandco.example"} onChange={s0?.touch} />
</div>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"c-desc"} className={"lbl"}>
{"Business description"}
</label>
<textarea id={"c-desc"} className={"inp"} onChange={s0?.touch} defaultValue={"Family-run rental fleet on Lake Norman since 2023. Clean boats, friendly captains, easy pickup in Cornelius."} />
</div>
<div>
<label htmlFor={"c-hours"} className={"lbl"}>
{"Business hours"}
</label>
<input id={"c-hours"} className={"inp"} value={"Daily 8 AM – 7 PM (Apr–Oct)"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"c-sup"} className={"lbl"}>
{"Customer support contact"}
</label>
<input id={"c-sup"} className={"inp"} value={"help@coveandco.example"} onChange={s0?.touch} />
<p className={"hint"}>
{"Shown to renters after they book."}
</p>
</div>
<div>
<label htmlFor={"c-soc"} className={"lbl"}>
{"Social links (optional)"}
</label>
<input id={"c-soc"} className={"inp"} placeholder={"instagram.com/yourcompany"} />
</div>
</div>
<p className={"sub"}>
{"Private · for verification only"}
</p>
<div className={"g2"}>
<div>
<label htmlFor={"c-legal"} className={"lbl"}>
{"Legal business name"}
</label>
<input id={"c-legal"} className={"inp"} value={"Cove and Co Boat Rentals LLC"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"c-dba"} className={"lbl"}>
{"DBA (optional)"}
</label>
<input id={"c-dba"} className={"inp"} value={"Cove & Co. Boat Rentals"} />
</div>
<div>
<label htmlFor={"c-ent"} className={"lbl"}>
{"Entity type"}
</label>
<select id={"c-ent"} className={"inp"}>
<option selected={true}>
{"LLC"}
</option>
<option>
{"Corporation"}
</option>
<option>
{"Partnership"}
</option>
<option>
{"Sole proprietor"}
</option>
</select>
</div>
<div>
<label htmlFor={"c-st"} className={"lbl"}>
{"State of registration"}
</label>
<select id={"c-st"} className={"inp"}>
<option>
{"North Carolina"}
</option>
<option>
{"South Carolina"}
</option>
<option>
{"Other"}
</option>
</select>
</div>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"c-reg"} className={"lbl"}>
{"NC Secretary of State registration number"}
</label>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
<input id={"c-reg"} className={"inp"} value={"2318804"} style={{"flex": "1 1 200px", "width": "auto"}} />
<button type={"button"} className={"btn btn-g"} onClick={s0?.checkReg}>
{"Check registry"}
</button>
</div>
{s0?.regChecking ? (<>
<p className={"hint"} role={"status"}>
{"Checking the NC Secretary of State registry…"}
</p>
</>) : null}
{s0?.regFound ? (<>
<p role={"status"} style={{"margin": "10px 0 0", "background": "#DDF3E4", "color": "#14532D", "borderRadius": "12px", "padding": "10px 14px", "fontWeight": "600"}}>
{"✓ Found: COVE AND CO BOAT RENTALS LLC · Status: Current-Active · Name matches. A Lundro admin will confirm."}
</p>
</>) : null}
</div>
</div>
</section>
</>) : null}
{s0?.s3 ? (<>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "alignItems": "flex-start"}}>
<nav aria-label={"Boat setup sections"} style={{"flex": "1 1 220px", "background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "20px", "padding": "10px"}}>
<p style={{"margin": "6px 10px 8px", "fontWeight": "700"}}>
{"Add boat "}
<span className={"muted"} style={{"fontWeight": "500"}}>
{"· "}{s0?.boatName}
</span>
</p>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.subnav || []).map((__it, __k) => { const s1 = { ...s0, "sn": __it }; return (<Fragment key={__k}>
<li>
<button type={"button"} onClick={s1?.sn?.go} aria-current={s1?.sn?.cur} style={{"width": "100%", "display": "flex", "alignItems": "center", "gap": "10px", "minHeight": "44px", "border": "0", "borderRadius": "10px", "padding": "0 10px", "background": s1?.sn?.bg, "color": "#0F2A3D", "fontWeight": s1?.sn?.weight, "cursor": "pointer", "textAlign": "left"}}>
<span aria-hidden={"true"} style={{"width": "22px", "height": "22px", "borderRadius": "50%", "display": "grid", "placeItems": "center", "fontSize": "12px", "background": s1?.sn?.dot, "color": "#fff"}}>
{s1?.sn?.mark}
</span>
{s1?.sn?.label}
</button>
</li>
</Fragment>); })}
</ul>
</nav>
<section className={"card"} style={{"flex": "999 1 520px", "minWidth": "0"}} aria-labelledby={"h3x"}>
<p className={"muted"} style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Step 3 of 5 · "}{s0?.subPos}
</p>
<h1 id={"h3x"} className={"disp"} style={{"margin": "4px 0 18px", "fontSize": "28px"}}>
{s0?.subTitle}
</h1>
{s0?.b0 ? (<>
<div className={"g2"}>
<div>
<label htmlFor={"b-type"} className={"lbl"}>
{"Boat type"}
</label>
<select id={"b-type"} className={"inp"} onChange={s0?.touch}>
<option>
{"Pontoon"}
</option>
<option>
{"Ski / wake boat"}
</option>
<option>
{"Center console"}
</option>
<option>
{"Sailboat"}
</option>
<option>
{"Jet ski"}
</option>
</select>
</div>
<div>
<label htmlFor={"b-make"} className={"lbl"}>
{"Make"}
</label>
<input id={"b-make"} className={"inp"} value={"Bennington"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"b-model"} className={"lbl"}>
{"Model"}
</label>
<input id={"b-model"} className={"inp"} value={"24 LSR"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"b-year"} className={"lbl"}>
{"Year"}
</label>
<input id={"b-year"} className={"inp"} inputMode={"numeric"} value={"2022"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"b-len"} className={"lbl"}>
{"Length (ft)"}
</label>
<input id={"b-len"} className={"inp"} inputMode={"numeric"} value={"24"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"b-max"} className={"lbl"}>
{"Max passengers"}
</label>
<input id={"b-max"} className={"inp"} inputMode={"numeric"} value={"12"} onChange={s0?.touch} />
<p className={"hint"}>
{"Use the number on the boat's capacity plate."}
</p>
</div>
<div>
<label htmlFor={"b-eng"} className={"lbl"}>
{"Engine"}
</label>
<input id={"b-eng"} className={"inp"} value={"Yamaha 150 hp outboard"} onChange={s0?.touch} />
</div>
<div>
<label htmlFor={"b-hin"} className={"lbl"}>
{"Hull ID number (HIN)"}
</label>
<input id={"b-hin"} className={`inp ${s0?.hinCls ?? ""}`} value={s0?.f?.hin} onChange={s0?.set?.hin} aria-invalid={s0?.hinInv} aria-describedby={"hin-h"} />
{s0?.hinErr ? (<>
<p className={"errt"}>
{"A HIN has 12 letters and numbers. You've entered "}{s0?.hinLen}{"."}
</p>
</>) : null}
<p id={"hin-h"} className={"hint"}>
{"Found on the right side of the transom. Never shown publicly."}
</p>
</div>
</div>
</>) : null}
{s0?.b1 ? (<>
{s0?.photoErr ? (<>
<div role={"alert"} style={{"border": "2px solid #B42318", "background": "#FEF3F2", "color": "#7A1A12", "borderRadius": "12px", "padding": "12px 16px", "fontWeight": "600", "marginBottom": "14px"}}>
{"Add at least 5 photos. You have "}{s0?.photos}{"."}
</div>
</>) : null}
<p className={"muted"} style={{"margin": "0 0 12px"}}>
{"At least 5 photos. Drag to reorder; the first photo is your cover."}
</p>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0", "display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(140px, 1fr))", "gap": "10px"}}>
{(s0?.photoTiles || []).map((__it, __k) => { const s1 = { ...s0, "p": __it }; return (<Fragment key={__k}>
<li style={{"position": "relative", "aspectRatio": "4 / 3", "borderRadius": "12px", "overflow": "hidden", "background": s1?.p?.water}}>
<svg viewBox={"0 0 160 120"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"160"} height={"120"} fill={s1?.p?.sky} />
<path d={"M0 60 Q40 48 80 56 T160 52 V74 H0 Z"} fill={s1?.p?.hill} />
<rect y={"72"} width={"160"} height={"48"} fill={s1?.p?.water} />
<rect x={"40"} y={"86"} width={"80"} height={"12"} rx={"3"} fill={"#fff"} />
<path d={"M50 78 H110 Q106 70 80 70 Q54 70 50 78 Z"} fill={"#0A6C7A"} />
</svg>
{s1?.p?.cover ? (<>
<span style={{"position": "absolute", "top": "8px", "left": "8px", "background": "#0F2A3D", "color": "#fff", "fontSize": "12px", "fontWeight": "700", "borderRadius": "999px", "padding": "2px 8px"}}>
{"Cover"}
</span>
</>) : null}
<button type={"button"} aria-label={`Move photo ${s1?.p?.n ?? ""}`} style={{"position": "absolute", "bottom": "6px", "right": "6px", "width": "36px", "height": "36px", "borderRadius": "8px", "border": "0", "background": "rgba(255,255,255,.92)", "cursor": "grab"}}>
{"⋮⋮"}
</button>
</li>
</Fragment>); })}
<li>
<button type={"button"} onClick={s0?.addPhoto} style={{"width": "100%", "aspectRatio": "4 / 3", "border": "2px dashed #7B8F9B", "borderRadius": "12px", "background": "#fff", "cursor": "pointer", "fontWeight": "700", "color": "#0A6C7A"}}>
{"+ Add photos"}
</button>
</li>
</ul>
<div style={{"marginTop": "18px"}}>
<label htmlFor={"b-desc"} className={"lbl"}>
{"Description"}
</label>
<textarea id={"b-desc"} className={"inp"} onChange={s0?.touch} defaultValue={"A roomy tritoon with plush lounge seating, a Bimini top for shade and a swim ladder."} />
</div>
</>) : null}
{s0?.b2 ? (<>
<div className={"g2"}>
<div>
<label htmlFor={"l-lake"} className={"lbl"}>
{"Lake"}
</label>
<select id={"l-lake"} className={"inp"}>
<option>
{"Lake Norman"}
</option>
</select>
</div>
<div>
<label htmlFor={"l-marina"} className={"lbl"}>
{"Marina"}
</label>
<input id={"l-marina"} className={"inp"} value={"Harbor Point Marina"} onChange={s0?.touch} />
</div>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"l-addr"} className={"lbl"}>
{"Pickup address"}
</label>
<input id={"l-addr"} className={"inp"} value={"20210 Harbor Point Ln, Cornelius, NC 28031"} onChange={s0?.touch} />
<p className={"hint"}>
{"Renters only see the exact address after they book. We also use it to apply the right county tax (Mecklenburg)."}
</p>
</div>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"l-park"} className={"lbl"}>
{"Parking and access notes"}
</label>
<textarea id={"l-park"} className={"inp"} onChange={s0?.touch} defaultValue={"Gravel lot by the bait shop, spaces marked \"Rental guests\". Dock B, slip 14."} />
</div>
</div>
</>) : null}
{s0?.b3 ? (<>
<fieldset>
<legend className={"lbl"}>
{"Who drives?"}
</legend>
<div style={{"display": "flex", "flexDirection": "column", "gap": "8px"}}>
{(s0?.opModes || []).map((__it, __k) => { const s1 = { ...s0, "o": __it }; return (<Fragment key={__k}>
<label className={"opt"} style={{"border": s1?.o?.border, "background": s1?.o?.bg}}>
<input type={"radio"} name={"op"} checked={s1?.o?.checked} onChange={s1?.o?.pick} />
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
{s0?.offersCaptain ? (<>
<div className={"g2"} style={{"marginTop": "16px"}}>
<div>
<label htmlFor={"cap-p"} className={"lbl"}>
{"Captain price"}
</label>
<input id={"cap-p"} className={"inp"} value={"$50 per hour"} />
</div>
<div>
<label htmlFor={"cap-l"} className={"lbl"}>
{"Captain's USCG license number"}
</label>
<input id={"cap-l"} className={"inp"} value={"USCG-OUPV 7781203"} />
<p className={"hint"}>
{"Upload the license in Documents."}
</p>
</div>
</div>
</>) : null}
{s0?.allowsSelf ? (<>
<div className={"g2"} style={{"marginTop": "16px"}}>
<div>
<label htmlFor={"min-age"} className={"lbl"}>
{"Minimum driver age"}
</label>
<select id={"min-age"} className={"inp"}>
<option>
{"18"}
</option>
<option>
{"21"}
</option>
<option selected={true}>
{"25"}
</option>
</select>
</div>
<div style={{"display": "flex", "alignItems": "flex-end"}}>
<label className={"chk"}>
<input type={"checkbox"} checked={true} onChange={s0?.touch} />
{"Require NC boater education card (born on or after Jan 1, 1988)"}
</label>
</div>
</div>
</>) : null}
</>) : null}
{s0?.b4 ? (<>
<div className={"g2"}>
<div>
<label htmlFor={"p-hh"} className={"lbl"}>
{"Half-day length"}
</label>
<select id={"p-hh"} className={"inp"}>
<option>
{"3 hours"}
</option>
<option selected={true}>
{"4 hours"}
</option>
<option>
{"5 hours"}
</option>
</select>
</div>
<div>
<label htmlFor={"p-hp"} className={"lbl"}>
{"Half-day price"}
</label>
<input id={"p-hp"} className={"inp"} inputMode={"numeric"} value={s0?.f?.halfPrice} onChange={s0?.set?.halfPrice} />
<p className={"hint"}>
{s0?.earnHalf}
</p>
</div>
<div>
<label htmlFor={"p-fh"} className={"lbl"}>
{"Full-day length"}
</label>
<select id={"p-fh"} className={"inp"}>
<option selected={true}>
{"8 hours"}
</option>
<option>
{"10 hours"}
</option>
</select>
</div>
<div>
<label htmlFor={"p-fp"} className={"lbl"}>
{"Full-day price"}
</label>
<input id={"p-fp"} className={"inp"} inputMode={"numeric"} value={s0?.f?.fullPrice} onChange={s0?.set?.fullPrice} />
<p className={"hint"}>
{s0?.earnFull}
</p>
</div>
</div>
<fieldset style={{"marginTop": "18px"}}>
<legend className={"lbl"}>
{"Available start times"}
</legend>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "8px"}}>
{(s0?.startTimes || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.t?.pressed} onClick={s1?.t?.toggle} style={{"minHeight": "44px", "padding": "0 16px", "borderRadius": "999px", "border": s1?.t?.border, "background": s1?.t?.bg, "color": s1?.t?.fg, "fontWeight": "700", "cursor": "pointer"}}>
{s1?.t?.label}
</button>
</Fragment>); })}
</div>
</fieldset>
<div className={"g2"} style={{"marginTop": "18px"}}>
<div>
<label htmlFor={"p-dep"} className={"lbl"}>
{"Security deposit"}
</label>
<input id={"p-dep"} className={"inp"} value={"$500"} />
<p className={"hint"}>
{"Held on the renter's card, not charged."}
</p>
</div>
<div>
<label htmlFor={"p-fuel"} className={"lbl"}>
{"Fuel policy"}
</label>
<select id={"p-fuel"} className={"inp"}>
<option>
{"Renter pays for fuel used"}
</option>
<option>
{"Fuel included"}
</option>
<option>
{"Flat fuel fee"}
</option>
</select>
</div>
</div>
<p className={"muted"} style={{"margin": "16px 0 0", "fontSize": "14px"}}>
{"Don't add sales tax to your prices. Lundro collects and pays NC sales tax for you."}
</p>
</>) : null}
{s0?.b5 ? (<>
<p className={"muted"} style={{"margin": "0 0 12px"}}>
{"Switch on extras from your library for this boat. Change the price here to override it for this boat only."}
</p>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.libExtras || []).map((__it, __k) => { const s1 = { ...s0, "x": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "alignItems": "center", "gap": "12px", "padding": "10px 0", "borderBottom": "1px solid #EEF2F4", "flexWrap": "wrap"}}>
<label className={"chk"} style={{"flex": "1 1 220px"}}>
<input type={"checkbox"} checked={s1?.x?.on} onChange={s1?.x?.toggle} />
<span>
<strong>
{s1?.x?.name}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{s1?.x?.kind}{" · default $"}{s1?.x?.price}{" "}{s1?.x?.per}
</span>
</span>
</label>
<label style={{"display": "flex", "alignItems": "center", "gap": "6px", "fontSize": "14px", "color": "#3D5160"}}>
{"Price for this boat"}
<input className={"inp"} value={`\$${s1?.x?.price ?? ""}`} disabled={s1?.x?.off} style={{"width": "96px", "minHeight": "44px"}} />
</label>
</li>
</Fragment>); })}
</ul>
<Link href={"/owner/extras"} style={{"display": "inline-block", "marginTop": "12px", "fontWeight": "700", "padding": "8px 0"}}>
{"Manage extras library"}
</Link>
</>) : null}
{s0?.b6 ? (<>
<div style={{"display": "flex", "flexDirection": "column", "gap": "12px"}}>
{(s0?.docs || []).map((__it, __k) => { const s1 = { ...s0, "d": __it }; return (<Fragment key={__k}>
<div className={"upl"}>
<span style={{"flex": "1 1 220px"}}>
<strong>
{s1?.d?.label}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.d?.status}
</span>
</span>
{s1?.d?.hasExp ? (<>
<label style={{"fontSize": "14px", "fontWeight": "600", "color": "#3D5160"}}>
{"Expires"}
<input type={"date"} className={"inp"} value={s1?.d?.exp} style={{"minHeight": "44px", "marginTop": "4px"}} />
</label>
</>) : null}
<button type={"button"} className={"btn btn-g btn-sm"} onClick={s1?.d?.upload}>
{s1?.d?.cta}
</button>
</div>
</Fragment>); })}
</div>
<p className={"muted"} style={{"margin": "14px 0 0", "fontSize": "14px"}}>
{"Documents are only seen by Lundro's review team. The name on the registration should match your ID and payout account. We'll email you 30 days before anything expires."}
</p>
</>) : null}
{s0?.b7 ? (<>
<div className={"g2"}>
<div>
<label htmlFor={"s-ad"} className={"lbl"}>
{"Adult life jackets"}
</label>
<input id={"s-ad"} type={"number"} min={"0"} className={"inp"} value={"12"} />
</div>
<div>
<label htmlFor={"s-ch"} className={"lbl"}>
{"Child life jackets"}
</label>
<input id={"s-ch"} type={"number"} min={"0"} className={"inp"} value={"4"} />
</div>
</div>
<fieldset style={{"marginTop": "16px"}}>
<legend className={"lbl"}>
{"On board"}
</legend>
{(s0?.safety || []).map((__it, __k) => { const s1 = { ...s0, "s": __it }; return (<Fragment key={__k}>
<label className={"chk"}>
<input type={"checkbox"} checked={s1?.s?.on} onChange={s1?.s?.toggle} />
{s1?.s?.label}
</label>
</Fragment>); })}
</fieldset>
{s0?.safetyMissing ? (<>
<p className={"errt"} role={"alert"}>
{"NC requires a throwable device and sound device on this boat. Check them off to continue."}
</p>
</>) : null}
</>) : null}
{s0?.b8 ? (<>
<fieldset>
<legend className={"lbl"}>
{"Cancellation policy"}
</legend>
<div className={"g2"}>
{(s0?.tiers || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<label className={"opt"} style={{"border": s1?.t?.border, "background": s1?.t?.bg}}>
<input type={"radio"} name={"tier"} checked={s1?.t?.checked} onChange={s1?.t?.pick} />
<span>
<strong>
{s1?.t?.label}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.t?.sub}
</span>
</span>
</label>
</Fragment>); })}
</div>
</fieldset>
<div style={{"marginTop": "16px"}}>
<label htmlFor={"w-pol"} className={"lbl"}>
{"Weather policy"}
</label>
<select id={"w-pol"} className={"inp"}>
<option>
{"Full refund or reschedule if I cancel for weather"}
</option>
<option>
{"Reschedule only"}
</option>
</select>
</div>
<fieldset style={{"marginTop": "16px"}}>
<legend className={"lbl"}>
{"House rules"}
</legend>
<label className={"chk"}>
<input type={"checkbox"} checked={true} />
{"Pets allowed"}
</label>
<label className={"chk"}>
<input type={"checkbox"} />
{"Smoking allowed"}
</label>
<label className={"chk"}>
<input type={"checkbox"} checked={true} />
{"BYOB allowed (no glass)"}
</label>
</fieldset>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "14px"}}>
{"Lundro can't sell alcohol as an extra. You can allow guests to bring their own."}
</p>
</>) : null}
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "10px", "marginTop": "24px", "flexWrap": "wrap"}}>
<button type={"button"} className={"btn btn-g"} onClick={s0?.subBack} disabled={s0?.subFirst}>
{"Previous section"}
</button>
{s0?.subNotLast ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.subNext}>
{"Save and continue"}
</button>
</>) : null}
{s0?.subLast ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.finishBoat}>
{"Save boat"}
</button>
</>) : null}
</div>
</section>
</div>
</>) : null}
{s0?.s4 ? (<>
<section className={"card"} aria-labelledby={"h4x"}>
<p className={"muted"} style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Step 4 of 5"}
</p>
<h1 id={"h4x"} className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px"}}>
{"Get paid"}
</h1>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{"Lundro pays out through Stripe. You'll add a bank account, tax ID and verify your identity. Takes about 5 minutes."}
</p>
<div style={{"marginTop": "20px", "border": "1px solid #DCE5EA", "borderRadius": "18px", "padding": "22px", "background": "#FAFCFD"}}>
{s0?.payPending ? (<>
<p style={{"margin": "0", "fontWeight": "700"}}>
{"Stripe Connect"}
</p>
<p className={"muted"} style={{"margin": "4px 0 14px", "fontSize": "15px"}}>
{"Secure onboarding opens here. Lundro never sees your full bank details."}
</p>
<button type={"button"} className={"btn btn-p"} onClick={s0?.connect}>
{"Set up payouts with Stripe"}
</button>
</>) : null}
{s0?.payConnecting ? (<>
<p role={"status"} style={{"margin": "0", "fontWeight": "600"}}>
{"Connecting to Stripe…"}
</p>
</>) : null}
{s0?.payDone ? (<>
<p role={"status"} style={{"margin": "0", "fontWeight": "700", "color": "#14532D"}}>
{"✓ Payouts set up"}
</p>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Bank account ending 6789 · Identity check in progress (usually a few minutes)"}
</p>
</>) : null}
{s0?.paySkipped ? (<>
<p role={"status"} style={{"margin": "0", "fontWeight": "700", "color": "#7A5A00"}}>
{"Payouts skipped for now"}
</p>
<p className={"muted"} style={{"margin": "4px 0 12px", "fontSize": "15px"}}>
{"Your boats stay in Draft until payouts are set up. You can finish this from the dashboard any time."}
</p>
<button type={"button"} className={"btn btn-g btn-sm"} onClick={s0?.connect}>
{"Set up now instead"}
</button>
</>) : null}
</div>
{s0?.payPending ? (<>
<button type={"button"} onClick={s0?.skipPay} style={{"marginTop": "12px", "border": "0", "background": "transparent", "fontWeight": "700", "textDecoration": "underline", "minHeight": "44px", "cursor": "pointer"}}>
{"Skip for now"}
</button>
</>) : null}
</section>
</>) : null}
{s0?.s5 ? (<>
<section className={"card"} aria-labelledby={"h5x"}>
<p className={"muted"} style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Step 5 of 5"}
</p>
<h1 id={"h5x"} className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px"}}>
{"Review and submit"}
</h1>
<div style={{"marginTop": "16px"}}>
{(s0?.review || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<div style={{"display": "flex", "gap": "16px", "justifyContent": "space-between", "alignItems": "flex-start", "padding": "16px 0", "borderBottom": "1px solid #EEF2F4", "flexWrap": "wrap"}}>
<div style={{"flex": "1 1 300px"}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{s1?.r?.title}
</p>
<p className={"muted"} style={{"margin": "2px 0 0", "fontSize": "15px"}}>
{s1?.r?.body}
</p>
</div>
<span style={{"display": "flex", "gap": "12px", "alignItems": "center"}}>
<span style={{"fontSize": "13px", "fontWeight": "700", "borderRadius": "999px", "padding": "4px 10px", "background": s1?.r?.badgeBg, "color": s1?.r?.badgeFg}}>
{s1?.r?.badge}
</span>
<button type={"button"} onClick={s1?.r?.edit} style={{"border": "0", "background": "transparent", "color": "#0A6C7A", "fontWeight": "700", "textDecoration": "underline", "minHeight": "44px", "cursor": "pointer"}}>
{"Edit"}
</button>
</span>
</div>
</Fragment>); })}
</div>
<p className={"muted"} style={{"margin": "16px 0 0", "fontSize": "15px"}}>
{"Submitting sends your boat to Lundro's review team. It goes live once your documents are verified"}{s0?.payClause}{"."}
</p>
</section>
</>) : null}
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "12px", "marginTop": "20px"}}>
{s0?.canBack ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.back}>
{"Back"}
</button>
</>) : null}
<span />
{s0?.showNext ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.next} style={{"minWidth": "180px"}}>
{"Continue"}
</button>
</>) : null}
{s0?.s5 ? (<>
<button type={"button"} className={"btn btn-p"} onClick={s0?.submit} style={{"minWidth": "200px"}}>
{"Submit for review"}
</button>
</>) : null}
</div>
</>) : null}
{s0?.submitted ? (<>
<section className={"card"} style={{"maxWidth": "720px", "margin": "24px auto 0", "textAlign": "center"}} aria-labelledby={"done-h"}>
<span aria-hidden={"true"} style={{"display": "inline-grid", "placeItems": "center", "width": "72px", "height": "72px", "borderRadius": "50%", "background": "#DDF3E4", "color": "#14532D"}}>
<svg width={"36"} height={"36"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.6"} strokeLinecap={"round"}>
<path d={"M5 12l5 5 9-10"} />
</svg>
</span>
<h1 id={"done-h"} className={"disp"} role={"status"} style={{"margin": "14px 0 0", "fontSize": "32px"}}>
{"Submitted for review"}
</h1>
<p className={"muted"} style={{"margin": "8px auto 0", "maxWidth": "520px"}}>
{"Your 24' Bennington Pontoon is now "}
<strong style={{"color": "#5C4300"}}>
{"Pending review"}
</strong>
{". We usually review documents within 1 to 2 business days and email you either way."}
</p>
<ul style={{"listStyle": "none", "padding": "0", "margin": "20px auto 0", "maxWidth": "420px", "textAlign": "left"}}>
<li style={{"padding": "8px 0"}}>
{"✓ Account created"}
</li>
<li style={{"padding": "8px 0"}}>
{"✓ Boat details, photos and pricing saved"}
</li>
<li style={{"padding": "8px 0"}}>
{"◷ Ownership and insurance check by Lundro"}
</li>
<li style={{"padding": "8px 0"}}>
{s0?.payLine}
</li>
</ul>
<div style={{"display": "flex", "gap": "10px", "justifyContent": "center", "marginTop": "20px", "flexWrap": "wrap"}}>
<Link href={"/owner"} className={"btn btn-p"}>
{"Go to your dashboard"}
</Link>
<button type={"button"} className={"btn btn-g"} onClick={s0?.addAnother}>
{"Add another boat"}
</button>
</div>
</section>
</>) : null}
</main>
</div>
    </>
  );
}
