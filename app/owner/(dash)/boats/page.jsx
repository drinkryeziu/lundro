'use client';
// Generated from source/Dash-Boats.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { filter: 'all', toast: '', boats: [
      { id: 1, name: "24' Bennington Pontoon", st: 'live', meta: 'Cornelius · $350 half / $600 full · ★ 4.9 (38) · Next trip today', note: '' },
      { id: 2, name: "22' MasterCraft XT22", st: 'live', meta: 'Mooresville · $525 half / $950 full · ★ 4.8 (21) · Next trip today', note: 'Insurance expires Jul 1 (in 21 days)', warn: true },
      { id: 3, name: "26' Harris Grand Mariner", st: 'live', meta: 'Cornelius · $575 half / $1,050 full · ★ 4.9 (63) · Next trip Sat', note: '' },
      { id: 4, name: "24' Tahoe LTZ Pontoon", st: 'pending', meta: 'Cornelius · Submitted Jun 8', note: 'Lundro is checking ownership and insurance. Usually 1 to 2 business days.' },
      { id: 5, name: "21' Bayliner Element", st: 'info', meta: 'Davidson · Submitted Jun 2', note: "Name on the registration doesn't match your ID. Upload a bill of sale or updated registration.", fix: 'Add info' },
      { id: 6, name: "20' Sea Ray SPX", st: 'paused', auto: true, meta: 'Cornelius · Paused May 31', note: 'Paused automatically: insurance expired May 31. Upload a new certificate to resume.', fix: 'Upload insurance' },
      { id: 7, name: 'Sea-Doo Wake Pro 230', st: 'draft', meta: 'Mooresville · Last edited Jun 9', note: 'Draft: add 3 more photos and a registration to submit.' }
    ] };
  }
  flash(t) { this.setState({ toast: t }); clearTimeout(this._t); this._t = setTimeout(() => this.setState({ toast: '' }), 2600); }
  renderVals() {
    const s = this.state;
    const ST = { live: ['Live', '#DDF3E4', '#14532D'], pending: ['Pending review', '#FFF1C7', '#5C4300'], info: ['Additional info required', '#FDE2E1', '#8E1B13'], paused: ['Paused', '#E9E3F5', '#4C2F87'], draft: ['Draft', '#E8EFF2', '#3D5160'] };
    const PAL = [['#CFE8F5', '#5E9478', '#3E8FB0'], ['#BFE3F4', '#4F8A6C', '#2F7FA3'], ['#FCE3C2', '#6F8065', '#4C8DA8'], ['#E4F1F7', '#6E9D84', '#5BA3C0']];
    const upd = (id, patch) => this.setState({ boats: this.state.boats.map(b => b.id === id ? Object.assign({}, b, patch) : b) });
    const list = s.boats.filter(b => s.filter === 'all' || b.st === s.filter);
    const boats = list.map((b, i) => {
      const st = ST[b.st], p = PAL[b.id % 4];
      const manualPaused = b.st === 'paused' && !b.auto;
      return { name: b.name, meta: b.meta, status: st[0], sBg: st[1], sFg: st[2], sky: p[0], hill: p[1], water: p[2],
        filter: b.st === 'paused' || b.st === 'draft' ? 'grayscale(0.6)' : 'none',
        hasNote: !!(b.note || manualPaused), note: manualPaused ? 'Paused by you. Renters can’t book it until you resume.' : b.note,
        noteBg: b.warn || b.st === 'pending' ? '#FFF8E1' : (b.st === 'info' || b.auto ? '#FEF3F2' : '#F1F6F8'),
        noteFg: b.warn || b.st === 'pending' ? '#5C4300' : (b.st === 'info' || b.auto ? '#8E1B13' : '#3D5160'),
        isLive: b.st === 'live', canPause: b.st === 'live', canResume: manualPaused, needsFix: !!b.fix && !manualPaused, fixLabel: b.fix || '',
        pause: () => { upd(b.id, { st: 'paused', auto: false }); this.flash(b.name + ' is paused. Existing bookings still go ahead.'); },
        resume: () => { upd(b.id, { st: 'live' }); this.flash(b.name + ' is live again.'); },
        dup: () => { this.setState({ boats: this.state.boats.concat({ id: Date.now(), name: b.name + ' (copy)', st: 'draft', meta: 'Draft copy · photos and documents not copied', note: 'Add photos, registration and insurance for this boat.' }) }); this.flash('Duplicated as a draft. Pricing, extras and policies were copied.'); } };
    });
    const count = k => s.boats.filter(b => k === 'all' || b.st === k).length;
    const F = [['all', 'All'], ['live', 'Live'], ['pending', 'Pending review'], ['info', 'Needs info'], ['paused', 'Paused'], ['draft', 'Draft']];
    const filters = F.map(([k, label]) => { const on = s.filter === k; return { label, count: count(k), pressed: on ? 'true' : 'false', border: on ? '2px solid #0F2A3D' : '1px solid #7B8F9B', bg: on ? '#0F2A3D' : '#fff', fg: on ? '#fff' : '#0F2A3D', pick: () => this.setState({ filter: k }) }; });
    const empty = !!this.props.noBoats;
    return ({
      empty, full: !empty, boats, filters, toast: !!s.toast, toastText: s.toast,
      summary: count('live') + ' live · ' + (s.boats.length - count('live')) + ' not bookable yet'
    });
  }
}

const DEFAULT_PROPS = {"noBoats":false};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.badge{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner boats · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Boats"}
</h1>
<p className={"muted"} style={{"margin": "2px 0 0"}}>
{s0?.summary}
</p>
</div>
<Link href={"/owner/signup"} className={"btn btn-p"}>
{"+ Add a boat"}
</Link>
</div>
{s0?.empty ? (<>
<section className={"card"} style={{"marginTop": "24px", "textAlign": "center", "padding": "48px 24px"}}>
<h2 className={"disp"} style={{"margin": "0", "fontSize": "26px"}}>
{"No boats yet"}
</h2>
<p className={"muted"} style={{"margin": "8px auto 0", "maxWidth": "440px"}}>
{"Add your first boat. You can save it as a draft and publish once it's verified."}
</p>
<Link href={"/owner/signup"} className={"btn btn-p"} style={{"marginTop": "18px", "minHeight": "48px"}}>
{"Add your first boat"}
</Link>
</section>
</>) : null}
{s0?.full ? (<>
<div role={"group"} aria-label={"Filter by status"} style={{"display": "flex", "gap": "8px", "flexWrap": "wrap", "marginTop": "18px"}}>
{(s0?.filters || []).map((__it, __k) => { const s1 = { ...s0, "f": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.f?.pressed} onClick={s1?.f?.pick} style={{"minHeight": "40px", "padding": "0 14px", "borderRadius": "999px", "border": s1?.f?.border, "background": s1?.f?.bg, "color": s1?.f?.fg, "fontWeight": "700", "fontSize": "14px", "cursor": "pointer"}}>
{s1?.f?.label}{" · "}{s1?.f?.count}
</button>
</Fragment>); })}
</div>
{s0?.toast ? (<>
<p role={"status"} style={{"margin": "14px 0 0", "background": "#0F2A3D", "color": "#fff", "borderRadius": "12px", "padding": "10px 14px", "fontWeight": "600"}}>
{s0?.toastText}
</p>
</>) : null}
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(300px, 1fr))", "gap": "18px", "marginTop": "18px"}}>
{(s0?.boats || []).map((__it, __k) => { const s1 = { ...s0, "b": __it }; return (<Fragment key={__k}>
<article style={{"background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "18px", "overflow": "hidden", "display": "flex", "flexDirection": "column"}}>
<div style={{"position": "relative", "aspectRatio": "16 / 9", "background": s1?.b?.water}}>
<svg viewBox={"0 0 400 225"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "filter": s1?.b?.filter}}>
<rect width={"400"} height={"225"} fill={s1?.b?.sky} />
<path d={"M0 110 Q60 90 140 104 T400 98 V140 H0 Z"} fill={s1?.b?.hill} />
<rect y={"136"} width={"400"} height={"89"} fill={s1?.b?.water} />
<rect x={"120"} y={"170"} width={"160"} height={"18"} rx={"4"} fill={"#fff"} />
<rect x={"116"} y={"188"} width={"168"} height={"7"} rx={"3.5"} fill={"#B8C4CC"} />
<path d={"M150 168 H250 Q244 156 200 156 Q156 156 150 168 Z"} fill={"#0A6C7A"} />
</svg>
<span className={"badge"} style={{"position": "absolute", "top": "12px", "left": "12px", "background": s1?.b?.sBg, "color": s1?.b?.sFg, "boxShadow": "0 1px 4px rgba(15,42,61,.15)"}}>
<span aria-hidden={"true"} style={{"width": "8px", "height": "8px", "borderRadius": "50%", "background": s1?.b?.sFg}} />
{s1?.b?.status}
</span>
</div>
<div style={{"padding": "16px", "display": "flex", "flexDirection": "column", "gap": "6px", "flex": "1"}}>
<h2 className={"disp"} style={{"margin": "0", "fontSize": "19px"}}>
{s1?.b?.name}
</h2>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{s1?.b?.meta}
</p>
{s1?.b?.hasNote ? (<>
<p style={{"margin": "4px 0 0", "fontSize": "14px", "fontWeight": "600", "color": s1?.b?.noteFg, "background": s1?.b?.noteBg, "borderRadius": "10px", "padding": "8px 10px"}}>
{s1?.b?.note}
</p>
</>) : null}
<div style={{"display": "flex", "gap": "6px", "flexWrap": "wrap", "marginTop": "auto", "paddingTop": "10px"}}>
<Link href={"/owner/signup"} className={"btn btn-g"}>
{"Edit"}
</Link>
{s1?.b?.canPause ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s1?.b?.pause}>
{"Pause"}
</button>
</>) : null}
{s1?.b?.canResume ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s1?.b?.resume}>
{"Resume"}
</button>
</>) : null}
{s1?.b?.needsFix ? (<>
<Link href={"/owner/verification"} className={"btn btn-p"}>
{s1?.b?.fixLabel}
</Link>
</>) : null}
<button type={"button"} className={"btn btn-g"} onClick={s1?.b?.dup}>
{"Duplicate"}
</button>
{s1?.b?.isLive ? (<>
<Link href={"/boat"} className={"btn btn-g"} aria-label={`View public page for ${s1?.b?.name ?? ""}`}>
{"View"}
</Link>
</>) : null}
</div>
</div>
</article>
</Fragment>); })}
</div>
</>) : null}
    </>
  );
}
