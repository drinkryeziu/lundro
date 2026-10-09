'use client';
// Generated from source/Dash-Verification.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { done: {}, modal: null, file: false, toast: '' }; }
  renderVals() {
    const s = this.state;
    const K = { ok: ['✓', '#DDF3E4', '#14532D'], warn: ['!', '#FFF1C7', '#5C4300'], bad: ['!', '#FDE2E1', '#B42318'], wait: ['◷', '#E8EFF2', '#3D5160'], missing: ['–', '#E8EFF2', '#3D5160'] };
    const B = [
      ['b1', "24' Bennington Pontoon", 'Live', [['own', 'Boat ownership', 'ok', 'Verified Apr 2027 · registration matches'], ['ins', 'Insurance', 'ok', 'Verified · expires Apr 30, 2028'], ['cap', 'Captain license', 'ok', 'Mike R. · USCG OUPV · expires Feb 14, 2029']]],
      ['b2', "22' MasterCraft XT22", 'Live', [['own', 'Boat ownership', 'ok', 'Verified Mar 2027'], ['ins', 'Insurance', 'warn', 'Expires Jul 1, 2027, in 21 days. Upload the renewal to stay live.'], ['cap', 'Captain license', 'ok', 'Mike R. · expires Feb 14, 2029']]],
      ['b3', "26' Harris Grand Mariner", 'Live', [['own', 'Boat ownership', 'ok', 'Verified Mar 2027'], ['ins', 'Insurance', 'ok', 'Verified · expires Mar 15, 2028'], ['cap', 'Captain license', 'ok', 'Mike R. · expires Feb 14, 2029']]],
      ['b4', "24' Tahoe LTZ Pontoon", 'Pending review', [['own', 'Boat ownership', 'wait', 'In review · submitted Jun 8'], ['ins', 'Insurance', 'wait', 'In review · submitted Jun 8']]],
      ['b5', "21' Bayliner Element", 'Additional info required', [['own', 'Boat ownership', 'bad', 'Registration is in the name "J. Hale-Martin", which doesn’t match your ID or business. Upload a bill of sale or an updated registration.'], ['ins', 'Insurance', 'ok', 'Verified · expires Jan 9, 2028']]],
      ['b6', "20' Sea Ray SPX", 'Paused', [['own', 'Boat ownership', 'ok', 'Verified Jul 2026'], ['ins', 'Insurance', 'bad', 'Expired May 31, 2027. Boat paused automatically.']]]
    ];
    const SB = { 'Live': ['#DDF3E4', '#14532D'], 'Pending review': ['#FFF1C7', '#5C4300'], 'Additional info required': ['#FDE2E1', '#8E1B13'], 'Paused': ['#E9E3F5', '#4C2F87'] };
    const boats = B.map(([bid, name, status, checks]) => {
      const cs = checks.map(([cid, label, st0, note0]) => {
        const key = bid + cid, up = !!s.done[key];
        const st = up ? 'wait' : st0, k = K[st];
        const action = !up && (st0 === 'warn' || st0 === 'bad' || st0 === 'missing');
        return { label, icon: k[0], dotBg: k[1], dotFg: k[2], note: up ? 'New document in review · usually 1 business day' : note0,
          noteFg: st === 'bad' ? '#B42318' : (st === 'warn' ? '#5C4300' : '#4A5F6E'), noteW: st === 'bad' || st === 'warn' ? 600 : 400,
          action, cta: st0 === 'bad' && cid === 'own' ? 'Add document' : 'Upload new', btnCls: st0 === 'bad' ? 'btn-p' : 'btn-g',
          open: () => this.setState({ modal: { key, label: label.toLowerCase(), boat: name, hasExp: cid !== 'own', isIns: cid === 'ins' }, file: false }) };
      });
      const anyUp = checks.some(c => s.done[bid + c[0]]);
      const st = anyUp && status !== 'Live' ? 'Pending review' : status;
      return { name, status: st, sBg: SB[st][0], sFg: SB[st][1], checks: cs };
    });
    const m = s.modal || {};
    return ({
      account: [{ label: 'Identity verified', by: 'Checked by Stripe · Apr 2027' }, { label: 'Business verified', by: 'NC Secretary of State + Lundro · Apr 2027' }, { label: 'Payouts verified', by: 'Stripe · bank ending 6789' }],
      boats, modal: !!s.modal, m: Object.assign({}, m, { file: m.isIns ? 'insurance_certificate_2027.pdf' : 'document.pdf' }),
      noFile: !s.file, hasFile: s.file, pickFile: () => this.setState({ file: true }), close: () => this.setState({ modal: null }),
      submit: () => { this.setState({ done: Object.assign({}, s.done, { [m.key]: true }), modal: null, toast: 'Uploaded. Lundro will review it, usually within 1 business day.' }); clearTimeout(this._t); this._t = setTimeout(() => this.setState({ toast: '' }), 3000); },
      toast: !!s.toast, toastText: s.toast
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner verification · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Verification"}
</h1>
<p className={"muted"} style={{"margin": "2px 0 0", "maxWidth": "680px"}}>
{"A boat goes live only when its checks pass. We email you 30 days before a document expires; when one expires, the boat pauses until a new one is approved."}
</p>
<section className={"card"} aria-labelledby={"acct-h"} style={{"marginTop": "20px"}}>
<h2 id={"acct-h"} style={{"margin": "0", "fontSize": "18px"}}>
{"Your account"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(220px, 1fr))", "gap": "12px", "marginTop": "12px"}}>
{(s0?.account || []).map((__it, __k) => { const s1 = { ...s0, "a": __it }; return (<Fragment key={__k}>
<div style={{"display": "flex", "gap": "12px", "alignItems": "center", "border": "1px solid #DCE5EA", "borderRadius": "14px", "padding": "12px"}}>
<span aria-hidden={"true"} style={{"flex": "none", "width": "36px", "height": "36px", "borderRadius": "50%", "background": "#DDF3E4", "color": "#14532D", "display": "grid", "placeItems": "center", "fontWeight": "700"}}>
{"✓"}
</span>
<span>
<strong style={{"display": "block"}}>
{s1?.a?.label}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.a?.by}
</span>
</span>
</div>
</Fragment>); })}
</div>
<div style={{"marginTop": "14px", "background": "#F1F6F8", "borderRadius": "12px", "padding": "12px 14px", "fontSize": "15px"}}>
<strong>
{"Names match"}
</strong>
{" "}
<span className={"muted"}>
{"· ID: Jordan Hale (LLC member) · Business: Cove and Co Boat Rentals LLC · Payout account: Cove and Co Boat Rentals LLC"}
</span>
</div>
<p style={{"margin": "12px 0 0", "fontSize": "15px"}}>
{"Renters see: "}
<span className={"badge"} style={{"background": "#DDF3E4", "color": "#14532D"}}>
{"✓ Verified owner"}
</span>
{" "}
<span className={"badge"} style={{"background": "#E3F2F4", "color": "#0B4F59"}}>
{"Insured"}
</span>
{" "}
<span className={"muted"} style={{"fontSize": "14px"}}>
{"Your documents are never public."}
</span>
</p>
</section>
{s0?.toast ? (<>
<p role={"status"} style={{"margin": "16px 0 0", "background": "#0F2A3D", "color": "#fff", "borderRadius": "12px", "padding": "10px 14px", "fontWeight": "600"}}>
{s0?.toastText}
</p>
</>) : null}
<h2 style={{"margin": "28px 0 0", "fontSize": "20px"}}>
{"Boat checks"}
</h2>
<div style={{"display": "flex", "flexDirection": "column", "gap": "14px", "marginTop": "12px"}}>
{(s0?.boats || []).map((__it, __k) => { const s1 = { ...s0, "b": __it }; return (<Fragment key={__k}>
<section className={"card"} aria-label={s1?.b?.name}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "10px", "flexWrap": "wrap"}}>
<h3 style={{"margin": "0", "fontSize": "18px"}}>
{s1?.b?.name}
</h3>
<span className={"badge"} style={{"background": s1?.b?.sBg, "color": s1?.b?.sFg}}>
{s1?.b?.status}
</span>
</div>
<ul style={{"listStyle": "none", "margin": "10px 0 0", "padding": "0"}}>
{(s1?.b?.checks || []).map((__it, __k) => { const s2 = { ...s1, "c": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "alignItems": "center", "gap": "12px", "padding": "10px 0", "borderTop": "1px solid #EEF2F4", "flexWrap": "wrap"}}>
<span aria-hidden={"true"} style={{"flex": "none", "width": "30px", "height": "30px", "borderRadius": "50%", "background": s2?.c?.dotBg, "color": s2?.c?.dotFg, "display": "grid", "placeItems": "center", "fontWeight": "700", "fontSize": "14px"}}>
{s2?.c?.icon}
</span>
<span style={{"flex": "1 1 220px"}}>
<strong style={{"display": "block"}}>
{s2?.c?.label}
</strong>
<span style={{"fontSize": "14px", "color": s2?.c?.noteFg, "fontWeight": s2?.c?.noteW}}>
{s2?.c?.note}
</span>
</span>
{s2?.c?.action ? (<>
<button type={"button"} className={`btn ${s2?.c?.btnCls ?? ""}`} onClick={s2?.c?.open}>
{s2?.c?.cta}
</button>
</>) : null}
</li>
</Fragment>); })}
</ul>
</section>
</Fragment>); })}
</div>
{s0?.modal ? (<>
<div style={{"position": "fixed", "inset": "0", "background": "rgba(15,42,61,.55)", "zIndex": "40", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "16px"}}>
<div role={"dialog"} aria-modal={"true"} aria-labelledby={"up-h"} style={{"background": "#fff", "borderRadius": "22px", "padding": "24px", "width": "100%", "maxWidth": "480px"}}>
<h2 id={"up-h"} className={"disp"} style={{"margin": "0", "fontSize": "22px"}}>
{"Upload "}{s0?.m?.label}
</h2>
<p className={"muted"} style={{"margin": "4px 0 16px", "fontSize": "15px"}}>
{s0?.m?.boat}
</p>
<div style={{"border": "2px dashed #7B8F9B", "borderRadius": "14px", "padding": "18px", "textAlign": "center"}}>
{s0?.noFile ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s0?.pickFile}>
{"Choose file (PDF or photo)"}
</button>
</>) : null}
{s0?.hasFile ? (<>
<p style={{"margin": "0", "fontWeight": "700", "color": "#14532D"}}>
{"✓ "}{s0?.m?.file}
</p>
</>) : null}
</div>
{s0?.m?.hasExp ? (<>
<div style={{"marginTop": "14px"}}>
<label htmlFor={"up-exp"} className={"lbl"}>
{"Expiration date"}
</label>
<input id={"up-exp"} type={"date"} className={"inp"} value={"2028-07-01"} />
</div>
</>) : null}
{s0?.m?.isIns ? (<>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "14px"}}>
{"The policy must cover commercial or peer-to-peer rentals and list the boat's HIN."}
</p>
</>) : null}
<div style={{"display": "flex", "justifyContent": "flex-end", "gap": "8px", "marginTop": "18px"}}>
<button type={"button"} className={"btn btn-g"} onClick={s0?.close}>
{"Cancel"}
</button>
<button type={"button"} className={"btn btn-p"} onClick={s0?.submit} disabled={s0?.noFile}>
{"Submit for review"}
</button>
</div>
</div>
</div>
</>) : null}
    </>
  );
}
