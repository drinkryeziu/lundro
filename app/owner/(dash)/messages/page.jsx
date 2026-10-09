'use client';
// Generated from source/Dash-Messages.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { sel: 'hannah', draft: '', read: { hannah: true }, th: {
      hannah: { name: 'Hannah K.', ctx: "Request · 22' MasterCraft XT22 · Sun, Jun 20", booked: false, av: '#FFE3B3', time: '9:42 AM', msgs: [['r', 'Hi! Is the wakeboard included or an extra? We have 2 beginners in the group.', 'Today 9:40 AM'], ['r', 'Also, can we start at 1:00 instead of 1:30?', 'Today 9:42 AM']] },
      marcus: { name: 'Marcus L.', ctx: "Request · 26' Harris Grand Mariner · Sat, Jun 19", booked: false, av: '#CDE7EC', time: '8:15 AM', msgs: [['r', 'Planning my dad’s 60th. Can we bring our dog? She’s calm and has her own life jacket.', 'Today 8:15 AM']] },
      taylor: { name: 'Taylor R.', ctx: "Confirmed · 24' Bennington Pontoon · Sat, Jun 12", booked: true, av: '#D7EDD9', time: 'Yesterday', msgs: [['o', 'Thanks for booking, Taylor! Captain Mike will meet you at dock B at 8:45.', 'Wed 4:10 PM'], ['r', 'Perfect. Is there parking for 3 cars?', 'Wed 6:02 PM'], ['o', 'Yes, the gravel lot has plenty of spaces marked "Rental guests".', 'Wed 6:30 PM']] },
      alicia: { name: 'Alicia M.', ctx: "On the water now · 24' Bennington Pontoon", booked: true, av: '#E3D7F5', time: '9:05 AM', msgs: [['r', 'We’re at the marina, see Captain Mike now. Thanks!', 'Today 9:05 AM']] }
    } };
  }
  renderVals() {
    const s = this.state;
    const ids = ['hannah', 'marcus', 'taylor', 'alicia'];
    const threads = ids.map(id => {
      const t = s.th[id], last = t.msgs[t.msgs.length - 1], unread = !s.read[id] && last[0] === 'r';
      return { name: t.name, context: t.ctx, time: t.time, init: t.name[0] + t.name.split(' ')[1][0], av: t.av, preview: (last[0] === 'o' ? 'You: ' : '') + last[1],
        unread, weight: unread ? 700 : 500, prevFg: unread ? '#0F2A3D' : '#4A5F6E', bg: s.sel === id ? '#E3F2F4' : '#fff', cur: s.sel === id ? 'true' : 'false',
        pick: () => this.setState({ sel: id, read: Object.assign({}, s.read, { [id]: true }), draft: '' }) };
    });
    const t = s.th[s.sel];
    const cur = { name: t.name, first: t.name.split(' ')[0], context: t.ctx,
      note: t.booked ? 'Booking confirmed: you and the renter can now see each other’s phone and email.' : 'Phone numbers, emails and links are hidden until the booking is confirmed. Keep payments on Lundro.',
      noteBg: t.booked ? '#DDF3E4' : '#FFF8E1', noteFg: t.booked ? '#14532D' : '#5C4300',
      msgs: t.msgs.map(([who, text, meta]) => ({ text, meta: (who === 'o' ? 'You · ' : t.name.split(' ')[0] + ' · ') + meta, align: who === 'o' ? 'flex-end' : 'flex-start', tAlign: who === 'o' ? 'right' : 'left', bg: who === 'o' ? '#0A6C7A' : '#FFFFFF', fg: who === 'o' ? '#FFFFFF' : '#0F2A3D' })) };
    const Q = t.booked ? ['See you at dock B!', 'Parking is in the gravel lot.', 'Running 10 minutes behind?'] : ['Yes, that works!', 'The wakeboard is a $30 extra.', 'Pets are welcome on this boat.'];
    const send = () => {
      let text = s.draft.trim();
      if (!text) return;
      let hidden = false;
      if (!t.booked) { const r = text.replace(/(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}|[^\s@]+@[^\s@]+\.[^\s@]+/g, '[hidden until booked]'); hidden = r !== text; text = r; }
      const msgs = t.msgs.concat([['o', text, 'Just now' + (hidden ? ' · contact info hidden' : '')]]);
      this.setState({ draft: '', th: Object.assign({}, s.th, { [s.sel]: Object.assign({}, t, { msgs, time: 'Now' }) }) });
    };
    return ({
      threads, cur, draft: s.draft, setDraft: e => this.setState({ draft: e.target.value }), send,
      quick: Q.map(label => ({ label, use: () => this.setState({ draft: label }) }))
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:14px;padding:12px 14px;background:#fff;font-size:16px;color:#0F2A3D;resize:none}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner messages · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Messages"}
</h1>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "0", "marginTop": "18px", "background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "20px", "overflow": "hidden", "minHeight": "640px"}}>
<section aria-label={"Conversations"} style={{"flex": "1 1 300px", "minWidth": "0", "borderRight": "1px solid #DCE5EA"}}>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.threads || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<li>
<button type={"button"} onClick={s1?.t?.pick} aria-current={s1?.t?.cur} style={{"width": "100%", "display": "flex", "gap": "12px", "textAlign": "left", "border": "0", "borderBottom": "1px solid #EEF2F4", "background": s1?.t?.bg, "padding": "14px 16px", "cursor": "pointer", "minHeight": "72px"}}>
<span aria-hidden={"true"} style={{"flex": "none", "width": "44px", "height": "44px", "borderRadius": "50%", "background": s1?.t?.av, "display": "grid", "placeItems": "center", "fontWeight": "700"}}>
{s1?.t?.init}
</span>
<span style={{"flex": "1", "minWidth": "0"}}>
<span style={{"display": "flex", "justifyContent": "space-between", "gap": "8px"}}>
<strong style={{"fontWeight": s1?.t?.weight}}>
{s1?.t?.name}
</strong>
<span className={"muted"} style={{"fontSize": "13px", "whiteSpace": "nowrap"}}>
{s1?.t?.time}
</span>
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{s1?.t?.context}
</span>
<span style={{"display": "block", "fontSize": "14px", "whiteSpace": "nowrap", "overflow": "hidden", "textOverflow": "ellipsis", "color": s1?.t?.prevFg, "fontWeight": s1?.t?.weight}}>
{s1?.t?.preview}
</span>
</span>
{s1?.t?.unread ? (<>
<span aria-label={"Unread"} style={{"flex": "none", "width": "10px", "height": "10px", "borderRadius": "50%", "background": "#0A6C7A", "marginTop": "6px"}} />
</>) : null}
</button>
</li>
</Fragment>); })}
</ul>
</section>
<section aria-labelledby={"th-h"} style={{"flex": "999 1 420px", "minWidth": "0", "display": "flex", "flexDirection": "column"}}>
<header style={{"padding": "14px 18px", "borderBottom": "1px solid #DCE5EA", "display": "flex", "justifyContent": "space-between", "alignItems": "center", "gap": "10px", "flexWrap": "wrap"}}>
<div>
<h2 id={"th-h"} style={{"margin": "0", "fontSize": "18px"}}>
{s0?.cur?.name}
</h2>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{s0?.cur?.context}
</p>
</div>
<Link href={"/owner/bookings"} className={"btn btn-g"}>
{"View booking"}
</Link>
</header>
<p style={{"margin": "0", "padding": "10px 18px", "background": s0?.cur?.noteBg, "color": s0?.cur?.noteFg, "fontSize": "14px", "fontWeight": "600"}}>
{s0?.cur?.note}
</p>
<div aria-live={"polite"} style={{"flex": "1", "padding": "18px", "display": "flex", "flexDirection": "column", "gap": "10px", "background": "#FAFCFD"}}>
{(s0?.cur?.msgs || []).map((__it, __k) => { const s1 = { ...s0, "m": __it }; return (<Fragment key={__k}>
<div style={{"alignSelf": s1?.m?.align, "maxWidth": "78%"}}>
<p style={{"margin": "0", "background": s1?.m?.bg, "color": s1?.m?.fg, "borderRadius": "16px", "padding": "10px 14px", "fontSize": "15px"}}>
{s1?.m?.text}
</p>
<p className={"muted"} style={{"margin": "3px 4px 0", "fontSize": "12px", "textAlign": s1?.m?.tAlign}}>
{s1?.m?.meta}
</p>
</div>
</Fragment>); })}
</div>
<div style={{"padding": "12px 18px 16px", "borderTop": "1px solid #DCE5EA"}}>
<div style={{"display": "flex", "gap": "6px", "flexWrap": "wrap", "marginBottom": "10px"}}>
{(s0?.quick || []).map((__it, __k) => { const s1 = { ...s0, "q": __it }; return (<Fragment key={__k}>
<button type={"button"} onClick={s1?.q?.use} style={{"minHeight": "36px", "padding": "0 12px", "borderRadius": "999px", "border": "1px solid #C9D6DD", "background": "#fff", "fontSize": "14px", "cursor": "pointer"}}>
{s1?.q?.label}
</button>
</Fragment>); })}
</div>
<div style={{"display": "flex", "gap": "8px", "alignItems": "flex-end"}}>
<label style={{"flex": "1"}}>
<span style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Message "}{s0?.cur?.first}
</span>
<textarea className={"inp"} rows={"2"} placeholder={"Write a message…"} value={s0?.draft} onChange={s0?.setDraft} />
</label>
<button type={"button"} className={"btn btn-p"} onClick={s0?.send} style={{"minHeight": "52px"}}>
{"Send"}
</button>
</div>
</div>
</section>
</div>
    </>
  );
}
