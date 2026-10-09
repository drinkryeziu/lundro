'use client';
// Generated from source/Dash-Overview.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { dec: {} }; }
  renderVals() {
    const s = this.state;
    const empty = !!this.props.newOwner;
    const R = [
      ['r1', 'Marcus L.', 12, "26' Harris Grand Mariner", 'Sat, Jun 19 · Full day · 9:00 AM', 'Captain', '$1,296.25', 'Respond within 18 hrs', false],
      ['r2', 'Hannah K.', 8, "22' MasterCraft XT22", 'Sun, Jun 20 · Half day · 1:30 PM', 'Self-drive · boater card ✓', '$480.25', 'Respond within 21 hrs', false],
      ['r3', 'Dana W. · NC Dept. of Environmental Quality', 10, "24' Bennington Pontoon", 'Fri, Jun 25 · Half day · 9:00 AM', 'Captain', '$484.50', 'Respond within 23 hrs', true]
    ];
    const requests = R.map(([id, who, guests, boat, when, mode, payout, due, exempt]) => {
      const d = s.dec[id];
      const setD = v => this.setState({ dec: Object.assign({}, s.dec, { [id]: v }) });
      return { who, guests, boat, when, mode, payout, due, exempt, open: !d, decided: !!d,
        decText: d === 'a' ? '✓ Accepted. The renter has been notified.' : 'Declined. The renter was not charged.', decColor: d === 'a' ? '#14532D' : '#8E1B13',
        accept: () => setD('a'), decline: () => setD('d'), undo: () => setD(null) };
    });
    const pendingCount = requests.filter(r => r.open).length;
    return ({
      empty, full: !empty, requests, pendingCount, noRequests: pendingCount === 0 && false,
      alerts: [
        { title: 'Insurance expires in 21 days.', body: "22' MasterCraft XT22 · Jul 1. Upload a new certificate so it isn't paused.", cta: 'Upload', bg: '#FFF8E1', line: '#F3D27A', dot: '#7A5A00' },
        { title: 'Paused automatically.', body: "20' Sea Ray SPX · insurance expired May 31.", cta: 'Fix now', bg: '#FEF3F2', line: '#F4B4AE', dot: '#B42318' },
        { title: 'Additional info required.', body: "21' Bayliner Element · the name on the registration doesn't match your ID.", cta: 'Review', bg: '#FEF3F2', line: '#F4B4AE', dot: '#B42318' }
      ],
      today: [
        { time: '9:00 AM', len: 'Half day', boat: "24' Bennington Pontoon", who: 'Alicia M.', guests: 9, mode: 'Captain Mike R.', status: 'Checked in', sBg: '#DDF3E4', sFg: '#14532D' },
        { time: '1:30 PM', len: 'Half day', boat: "22' MasterCraft XT22", who: 'Ben T.', guests: 6, mode: 'Self-drive', status: 'Upcoming', sBg: '#E3F2F4', sFg: '#0B4F59' }
      ],
      upcoming: [
        { day: 'Sat, Jun 12', boat: "24' Bennington Pontoon", who: 'Taylor R.' },
        { day: 'Sat, Jun 12', boat: "26' Harris Grand Mariner", who: 'Devon S.' },
        { day: 'Sun, Jun 13', boat: "22' MasterCraft XT22", who: 'Chris P.' }
      ]
    });
  }
}

const DEFAULT_PROPS = {"newOwner":false};
const CSS = "\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.card h2{margin:0;font-size:18px}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner dashboard overview · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<p className={"muted"} style={{"margin": "0", "fontWeight": "600"}}>
{"Thursday, June 10"}
</p>
<h1 className={"disp"} style={{"margin": "2px 0 0", "fontSize": "32px"}}>
{"Good morning, Jordan"}
</h1>
</div>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
<Link href={"/owner/calendar"} className={"btn btn-g"}>
{"Block dates"}
</Link>
<Link href={"/owner/signup"} className={"btn btn-p"}>
{"+ Add a boat"}
</Link>
</div>
</div>
{s0?.empty ? (<>
<section className={"card"} style={{"marginTop": "24px", "textAlign": "center", "padding": "48px 24px"}}>
<svg width={"120"} height={"80"} viewBox={"0 0 120 80"} aria-hidden={"true"}>
<ellipse cx={"60"} cy={"68"} rx={"56"} ry={"10"} fill={"#D7ECF4"} />
<rect x={"22"} y={"44"} width={"76"} height={"12"} rx={"4"} fill={"#fff"} stroke={"#0F2A3D"} strokeWidth={"2.5"} />
<rect x={"20"} y={"56"} width={"80"} height={"5"} rx={"2.5"} fill={"#9FB1BC"} />
<path d={"M34 44 V28 M86 44 V28 M30 28 H90"} stroke={"#0F2A3D"} strokeWidth={"2.5"} fill={"none"} />
</svg>
<h2 className={"disp"} style={{"fontSize": "26px", "marginTop": "12px"}}>
{"Your dock is empty"}
</h2>
<p className={"muted"} style={{"margin": "8px auto 0", "maxWidth": "460px"}}>
{"Add your first boat to start getting bookings. You can save a draft and finish later."}
</p>
<Link href={"/owner/signup"} className={"btn btn-p"} style={{"marginTop": "18px", "minHeight": "48px"}}>
{"Add your first boat"}
</Link>
</section>
</>) : null}
{s0?.full ? (<>
<section aria-label={"Alerts"} style={{"display": "flex", "flexDirection": "column", "gap": "10px", "marginTop": "20px"}}>
{(s0?.alerts || []).map((__it, __k) => { const s1 = { ...s0, "a": __it }; return (<Fragment key={__k}>
<div role={"alert"} style={{"display": "flex", "alignItems": "center", "gap": "14px", "flexWrap": "wrap", "background": s1?.a?.bg, "border": `1px solid ${s1?.a?.line ?? ""}`, "borderRadius": "14px", "padding": "12px 16px"}}>
<span aria-hidden={"true"} style={{"width": "32px", "height": "32px", "borderRadius": "50%", "background": s1?.a?.dot, "color": "#fff", "display": "grid", "placeItems": "center", "fontWeight": "700", "flex": "none"}}>
{"!"}
</span>
<span style={{"flex": "1 1 280px"}}>
<strong>
{s1?.a?.title}
</strong>
{" "}
<span style={{"color": "#1F3B4F"}}>
{s1?.a?.body}
</span>
</span>
<Link href={"/owner/verification"} className={"btn btn-g"} style={{"background": "#fff"}}>
{s1?.a?.cta}
</Link>
</div>
</Fragment>); })}
</section>
<section aria-label={"This month"} style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(190px, 1fr))", "gap": "14px", "marginTop": "20px"}}>
<Link href={"/owner/earnings"} className={"card"} style={{"textDecoration": "none", "color": "#0F2A3D"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Earnings in June so far"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px", "fontWeight": "700"}}>
{"$5,449"}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"After commission · next payout Mon"}
</p>
</Link>
<Link href={"/owner/bookings"} className={"card"} style={{"textDecoration": "none", "color": "#0F2A3D"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Trips next 7 days"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px", "fontWeight": "700"}}>
{"6"}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Across 3 live boats"}
</p>
</Link>
<Link href={"/owner/bookings"} className={"card"} style={{"textDecoration": "none", "color": "#0F2A3D"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Requests waiting"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px", "fontWeight": "700"}}>
{s0?.pendingCount}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Reply within 24 hours"}
</p>
</Link>
<Link href={"/owner/reviews"} className={"card"} style={{"textDecoration": "none", "color": "#0F2A3D"}}>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px", "fontWeight": "600"}}>
{"Owner rating"}
</p>
<p className={"disp"} style={{"margin": "4px 0 0", "fontSize": "30px", "fontWeight": "700"}}>
{"4.9 ★"}
</p>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"2 reviews need a reply"}
</p>
</Link>
</section>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "20px", "alignItems": "flex-start"}}>
<section className={"card"} aria-labelledby={"req-h"} style={{"flex": "1 1 420px", "minWidth": "0"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
<h2 id={"req-h"}>
{"Booking requests"}
</h2>
<Link href={"/owner/bookings"} style={{"fontWeight": "700", "fontSize": "15px", "padding": "8px 0"}}>
{"All bookings"}
</Link>
</div>
{s0?.noRequests ? (<>
<p className={"muted"} style={{"margin": "16px 0 0"}}>
{"You're all caught up. New requests will show here."}
</p>
</>) : null}
<ul style={{"listStyle": "none", "margin": "8px 0 0", "padding": "0"}}>
{(s0?.requests || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<li style={{"padding": "14px 0", "borderTop": "1px solid #EEF2F4"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "gap": "12px", "flexWrap": "wrap"}}>
<span>
<strong>
{s1?.r?.who}
</strong>
{" "}
<span className={"muted"}>
{"· "}{s1?.r?.guests}{" guests"}
</span>
<span style={{"display": "block", "fontSize": "15px"}}>
{s1?.r?.boat}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.r?.when}{" · "}{s1?.r?.mode}
</span>
{s1?.r?.exempt ? (<>
<span className={"badge"} style={{"background": "#FFF1C7", "color": "#5C4300", "marginTop": "4px"}}>
{"Tax-exempt · pending Lundro review"}
</span>
</>) : null}
</span>
<span style={{"textAlign": "right"}}>
<strong>
{s1?.r?.payout}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{"your payout"}
</span>
<span style={{"display": "block", "fontSize": "13px", "color": "#9A3412", "fontWeight": "600"}}>
{s1?.r?.due}
</span>
</span>
</div>
{s1?.r?.open ? (<>
<div style={{"display": "flex", "gap": "8px", "marginTop": "10px"}}>
<button type={"button"} className={"btn btn-p"} onClick={s1?.r?.accept}>
{"Accept"}
</button>
<button type={"button"} className={"btn btn-g"} onClick={s1?.r?.decline}>
{"Decline"}
</button>
<Link href={"/owner/messages"} className={"btn btn-g"}>
{"Message"}
</Link>
</div>
</>) : null}
{s1?.r?.decided ? (<>
<p role={"status"} style={{"margin": "10px 0 0", "fontWeight": "700", "color": s1?.r?.decColor}}>
{s1?.r?.decText}{" "}
<button type={"button"} onClick={s1?.r?.undo} style={{"border": "0", "background": "transparent", "color": "#0A6C7A", "fontWeight": "700", "textDecoration": "underline", "cursor": "pointer", "minHeight": "32px"}}>
{"Undo"}
</button>
</p>
</>) : null}
</li>
</Fragment>); })}
</ul>
</section>
<section className={"card"} aria-labelledby={"today-h"} style={{"flex": "1 1 380px", "minWidth": "0"}}>
<h2 id={"today-h"}>
{"Today on the water"}
</h2>
<ul style={{"listStyle": "none", "margin": "8px 0 0", "padding": "0"}}>
{(s0?.today || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "gap": "14px", "padding": "14px 0", "borderTop": "1px solid #EEF2F4"}}>
<span style={{"flex": "none", "width": "64px", "textAlign": "center", "background": "#E3F2F4", "color": "#0B4F59", "borderRadius": "12px", "padding": "8px 0", "fontWeight": "700", "fontSize": "14px", "lineHeight": "1.2"}}>
{s1?.t?.time}
<span style={{"display": "block", "fontWeight": "500", "fontSize": "12px"}}>
{s1?.t?.len}
</span>
</span>
<span style={{"flex": "1", "minWidth": "0"}}>
<strong style={{"display": "block"}}>
{s1?.t?.boat}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.t?.who}{" · "}{s1?.t?.guests}{" guests · "}{s1?.t?.mode}
</span>
<span className={"badge"} style={{"background": s1?.t?.sBg, "color": s1?.t?.sFg, "marginTop": "4px"}}>
{s1?.t?.status}
</span>
</span>
</li>
</Fragment>); })}
</ul>
<h2 style={{"marginTop": "18px"}}>
{"Coming up"}
</h2>
<ul style={{"listStyle": "none", "margin": "8px 0 0", "padding": "0"}}>
{(s0?.upcoming || []).map((__it, __k) => { const s1 = { ...s0, "u": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "justifyContent": "space-between", "gap": "10px", "padding": "10px 0", "borderTop": "1px solid #EEF2F4", "fontSize": "15px"}}>
<span>
<strong>
{s1?.u?.day}
</strong>
{" · "}{s1?.u?.boat}
</span>
<span className={"muted"}>
{s1?.u?.who}
</span>
</li>
</Fragment>); })}
</ul>
<Link href={"/owner/calendar"} style={{"display": "inline-block", "marginTop": "8px", "fontWeight": "700", "padding": "8px 0"}}>
{"Open calendar"}
</Link>
</section>
</div>
</>) : null}
    </>
  );
}
