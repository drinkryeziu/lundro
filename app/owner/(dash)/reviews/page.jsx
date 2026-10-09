'use client';
// Generated from source/Dash-Reviews.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { boat: 'all', view: 'all', editing: null, drafts: {}, replies: {
      r1: 'Thanks Alicia, come back soon!', r2: 'Thanks Derek! Captain Mike says happy birthday again.', r3: 'Thanks Priya, we have since added a second fuel attendant on weekends.' } };
  }
  renderVals() {
    const s = this.state;
    const BN = { B: "24' Bennington Pontoon", M: "22' MasterCraft XT22", H: "26' Harris Grand Mariner" };
    const R = [
      ['r1', 'B', 'Alicia M.', 5, 'May 2027', 'Spotless boat and a super easy pickup. The floating mat was a hit with the kids.'],
      ['r2', 'H', 'Derek P.', 5, 'Jun 2027', 'Captain Mike knew all the quiet coves. Worth every penny for a birthday trip.'],
      ['r3', 'B', 'Priya S.', 4, 'Jun 2027', 'Great boat. Fuel top-off at the end took a while, but the owner was quick to help.'],
      ['r4', 'M', 'Kayla B.', 3, 'Jun 2027', 'Boat was great but the tube rope was frayed. Ended up not using it. Would book again if that’s fixed.'],
      ['r5', 'H', 'Rosa G.', 5, 'Jun 2027', 'Huge, comfy and clean. Booking was clear with no surprise fees.']
    ];
    const SUMS = { B: ['4.9', 38], M: ['4.8', 21], H: ['4.9', 63] };
    const reviews = R.filter(r => s.boat === 'all' || r[1] === s.boat).filter(r => s.view === 'all' || !s.replies[r[0]]).map(([id, b, name, stars, date, text]) => {
      const reply = s.replies[id], editing = s.editing === id;
      return { name, first: name.split(' ')[0], boatName: BN[b], stars, starText: '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars), date, text,
        hasReply: !!reply, reply: reply || '', needs: !reply, editing, canReply: !reply && !editing, draft: s.drafts[id] || '',
        start: () => this.setState({ editing: id }), cancel: () => this.setState({ editing: null }),
        setDraft: e => this.setState({ drafts: Object.assign({}, this.state.drafts, { [id]: e.target.value }) }),
        post: () => { const t = (this.state.drafts[id] || '').trim(); if (!t) return; this.setState({ replies: Object.assign({}, this.state.replies, { [id]: t }), editing: null }); } };
    });
    const needCount = R.filter(r => !s.replies[r[0]]).length;
    const sel = on => on ? { border: '2px solid #0F2A3D', bg: '#0F2A3D', fg: '#fff', pressed: 'true' } : { border: '1px solid #7B8F9B', bg: '#fff', fg: '#0F2A3D', pressed: 'false' };
    return ({
      boat: s.boat, setBoat: e => this.setState({ boat: e.target.value }),
      summary: Object.keys(BN).map(k => ({ name: BN[k], avg: SUMS[k][0], count: SUMS[k][1], border: s.boat === k ? '2px solid #0A6C7A' : '1px solid #DCE5EA' })),
      views: [['all', 'All reviews'], ['need', 'Needs reply · ' + needCount]].map(([k, label]) => Object.assign({ label, pick: () => this.setState({ view: k }) }, sel(s.view === k))),
      reviews, none: reviews.length === 0 && s.view === 'need'
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:10px 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner reviews · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Reviews"}
</h1>
<p className={"muted"} style={{"margin": "2px 0 0"}}>
{"Replies are public and appear under the review on your boat page."}
</p>
</div>
<label style={{"display": "flex", "alignItems": "center", "gap": "8px", "fontWeight": "600", "color": "#3D5160"}}>
{"Boat"}
<select className={"inp"} value={s0?.boat} onChange={s0?.setBoat} style={{"width": "auto"}}>
<option value={"all"}>
{"All boats"}
</option>
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
</label>
</div>
<section aria-label={"Ratings summary"} style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(200px, 1fr))", "gap": "14px", "marginTop": "20px"}}>
{(s0?.summary || []).map((__it, __k) => { const s1 = { ...s0, "m": __it }; return (<Fragment key={__k}>
<div className={"card"} style={{"border": s1?.m?.border}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{s1?.m?.name}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "28px", "fontWeight": "700"}}>
{s1?.m?.avg}{" "}
<span style={{"color": "#B26B00", "fontSize": "22px"}} aria-hidden={"true"}>
{"★"}
</span>
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{s1?.m?.count}{" reviews"}
</p>
</div>
</Fragment>); })}
</section>
<div role={"group"} aria-label={"Show"} style={{"display": "flex", "gap": "8px", "marginTop": "20px"}}>
{(s0?.views || []).map((__it, __k) => { const s1 = { ...s0, "v": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.v?.pressed} onClick={s1?.v?.pick} style={{"minHeight": "40px", "padding": "0 14px", "borderRadius": "999px", "border": s1?.v?.border, "background": s1?.v?.bg, "color": s1?.v?.fg, "fontWeight": "700", "fontSize": "14px", "cursor": "pointer"}}>
{s1?.v?.label}
</button>
</Fragment>); })}
</div>
<div style={{"display": "flex", "flexDirection": "column", "gap": "12px", "marginTop": "14px"}}>
{s0?.none ? (<>
<div className={"card"} style={{"textAlign": "center"}}>
<p style={{"margin": "0", "fontWeight": "700"}}>
{"You've replied to every review."}
</p>
<p className={"muted"} style={{"margin": "4px 0 0"}}>
{"Nice work. New reviews will appear here."}
</p>
</div>
</>) : null}
{(s0?.reviews || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<article className={"card"}>
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "10px", "flexWrap": "wrap"}}>
<div>
<strong>
{s1?.r?.name}
</strong>
{" "}
<span className={"muted"}>
{"· "}{s1?.r?.boatName}
</span>
<p style={{"margin": "2px 0 0", "color": "#B26B00"}} aria-label={`${s1?.r?.stars ?? ""} out of 5 stars`}>
{s1?.r?.starText}{" "}
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.r?.date}
</span>
</p>
</div>
{s1?.r?.needs ? (<>
<span className={"badge"} style={{"background": "#FFF1C7", "color": "#5C4300", "alignSelf": "flex-start"}}>
{"Needs reply"}
</span>
</>) : null}
</div>
<p style={{"margin": "10px 0 0"}}>
{s1?.r?.text}
</p>
{s1?.r?.hasReply ? (<>
<div style={{"marginTop": "12px", "background": "#F1F6F8", "borderRadius": "12px", "padding": "12px 14px"}}>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "14px"}}>
{"Your reply"}
</p>
<p style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{s1?.r?.reply}
</p>
</div>
</>) : null}
{s1?.r?.editing ? (<>
<div style={{"marginTop": "12px"}}>
<label className={"muted"} style={{"display": "block", "fontSize": "14px", "fontWeight": "700", "marginBottom": "6px"}}>
{"Public reply to "}{s1?.r?.first}
</label>
<textarea className={"inp"} rows={"3"} value={s1?.r?.draft} onChange={s1?.r?.setDraft} />
<div style={{"display": "flex", "gap": "8px", "justifyContent": "flex-end", "marginTop": "8px"}}>
<button type={"button"} className={"btn btn-g"} onClick={s1?.r?.cancel}>
{"Cancel"}
</button>
<button type={"button"} className={"btn btn-p"} onClick={s1?.r?.post}>
{"Post reply"}
</button>
</div>
</div>
</>) : null}
{s1?.r?.canReply ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s1?.r?.start} style={{"marginTop": "12px"}}>
{"Reply"}
</button>
</>) : null}
</article>
</Fragment>); })}
</div>
    </>
  );
}
