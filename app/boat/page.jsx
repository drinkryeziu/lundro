'use client';
// Generated from source/Boat.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { bid: 'b1', bd: null, len: 'half', time: '9:00 AM', saved: false, lb: false, ph: 0, msg: false, sent: false }; }
  renderVals() {
    const s = this.state;
    const pals = [
      { sky: '#CFE8F5', sun: '#FFE7A3', hillFar: '#8FB8A0', hillNear: '#5E9478', water: '#3E8FB0', boatX: 120, sunX: 320 },
      { sky: '#FCE3C2', sun: '#FFC94A', hillFar: '#A3A982', hillNear: '#6F8065', water: '#4C8DA8', boatX: 40, sunX: 90 },
      { sky: '#E4F1F7', sun: '#FFF1C4', hillFar: '#A5C4B0', hillNear: '#6E9D84', water: '#5BA3C0', boatX: 200, sunX: 300 },
      { sky: '#BFE3F4', sun: '#FFF6D6', hillFar: '#86B39A', hillNear: '#4F8A6C', water: '#2F7FA3', boatX: 150, sunX: 70 },
      { sky: '#F6D9C9', sun: '#FFC94A', hillFar: '#9AA58A', hillNear: '#617660', water: '#456F8C', boatX: 90, sunX: 330 }
    ];
    const gallery = pals.map((p, i) => Object.assign({}, p, { n: i + 1, cls: i === 0 ? '' : 'small', row: i === 0 ? 'span 2' : 'auto', open: () => this.setState({ lb: true, ph: i }) }));
    const times = s.len === 'half' ? ['9:00 AM', '1:30 PM'] : ['9:00 AM'];
    const time = times.indexOf(s.time) >= 0 ? s.time : times[0];
    const hp = s.bd?.half ?? 350, fp = s.bd?.full ?? 600;
    const price = s.len === 'half' ? hp : fp;
    const ic = {
      tube: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      board: 'M7 20L17 4M9 20h-3M18 4h-3',
      cool: 'M4 9h16v10H4zM4 9l2-4h12l2 4M10 13h4',
      spk: 'M7 4h10v16H7zM12 15a2 2 0 1 0 0-.1M12 8h.01',
      clock: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM12 8v4l3 2',
      mat: 'M3 10h18v5H3zM6 10v5M18 10v5'
    };
    return {
      bid: s.bid, bd: s.bd,
      gallery, openFirst: () => this.setState({ lb: true, ph: 0 }),
      lightbox: s.lb, lb: pals[s.ph % 5], photoN: s.ph + 1,
      closeLb: () => this.setState({ lb: false }),
      nextPh: () => this.setState({ ph: (s.ph + 1) % 14 }), prevPh: () => this.setState({ ph: (s.ph + 13) % 14 }),
      savedPressed: s.saved ? 'true' : 'false', heartFill: s.saved ? '#C2410C' : 'none', saveLabel: s.saved ? 'Saved' : 'Save',
      toggleSave: () => this.setState({ saved: !s.saved }),
      price, lenLabel: s.len === 'half' ? 'half day' : 'full day', hours: s.len === 'half' ? '4 hrs' : '8 hrs', timeLabel: time,
      lens: [['half', 'Half day', '4 hrs', hp], ['full', 'Full day', '8 hrs', fp]].map(([v, l, h, p]) => ({ label: l, hours: h, price: p, checked: s.len === v, border: s.len === v ? '2px solid #0A6C7A' : '1px solid #C9D6DD', bg: s.len === v ? '#E3F2F4' : '#fff', pick: () => this.setState({ len: v }) })),
      times: times.map(t => ({ label: t, pressed: t === time ? 'true' : 'false', border: t === time ? '2px solid #0F2A3D' : '1px solid #7B8F9B', bg: t === time ? '#0F2A3D' : '#fff', fg: t === time ? '#fff' : '#0F2A3D', pick: () => this.setState({ time: t }) })),
      extras: [
        { name: 'Tube with rope', desc: '1 to 2 riders, tow rope included', price: 40, per: 'per booking', icon: ic.tube },
        { name: 'Paddleboard', desc: 'Inflatable, with paddle', price: 25, per: 'each', icon: ic.board },
        { name: 'Floating mat', desc: '18 ft lily pad for the swim stop', price: 35, per: 'per booking', icon: ic.mat },
        { name: 'Cooler with ice', desc: '70 qt, filled with ice at pickup', price: 20, per: 'per booking', icon: ic.cool },
        { name: 'Bluetooth speaker', desc: 'Waterproof, extra to the boat stereo', price: 15, per: 'per booking', icon: ic.spk },
        { name: 'Extra hour', desc: 'Add time to your trip', price: 85, per: 'per hour', icon: ic.clock }
      ],
      safety: ['12 adult life jackets', '4 child life jackets', 'Fire extinguisher', 'Throwable flotation device', 'Horn (sound device)', 'First aid kit'],
      reviews: [
        { name: 'Alicia M.', date: 'May 2027', stars: 5, starText: '★★★★★', text: 'Spotless boat and a super easy pickup. The floating mat was a hit with the kids.', hasReply: true, reply: 'Thanks Alicia, come back soon!' },
        { name: 'Derek P.', date: 'May 2027', stars: 5, starText: '★★★★★', text: 'Captain Mike knew all the quiet coves. Worth every penny for a birthday trip.', hasReply: false, reply: '' },
        { name: 'Priya S.', date: 'Apr 2027', stars: 4, starText: '★★★★☆', text: 'Great boat. Fuel top-off at the end took a while, but the owner was quick to help.', hasReply: true, reply: 'Thanks Priya, we have since added a second fuel attendant on weekends.' },
        { name: 'Tom W.', date: 'Sep 2026', stars: 5, starText: '★★★★★', text: 'Plenty of shade and seating for 10 of us. Booking was clear, no surprise fees.', hasReply: false, reply: '' }
      ],
      msg: s.msg, msgSent: s.sent, msgNotSent: !s.sent,
      openMsg: () => this.setState({ msg: true, sent: false }), closeMsg: () => this.setState({ msg: false }), sendMsg: () => this.setState({ sent: true })
    };
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.btn-s{background:#fff;color:#0F2A3D;border:2px solid #0F2A3D}\n.btn-s:hover{background:#EEF4F7;color:#0F2A3D}\n.btn-sm{min-height:44px;padding:0 16px;font-size:15px}\n.nav-a{color:#0F2A3D;text-decoration:none;font-weight:600;padding:12px 14px;border-radius:999px}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:12px;padding:0 14px;background:#fff;font-size:16px;color:#0F2A3D}\ntextarea.inp{padding:12px 14px;min-height:110px}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.wrap{max-width:1200px;margin:0 auto;padding:0 24px}\n.blk{padding:32px 0;border-bottom:1px solid #DCE5EA}\n.blk h2{margin:0 0 16px;font-family:'Bricolage Grotesque',sans-serif;font-size:24px;letter-spacing:-0.02em}\n.row{display:flex;justify-content:space-between;gap:16px;padding:12px 0;border-bottom:1px solid #EEF2F4}\n.badge{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;border-radius:999px;padding:5px 11px}\n.mbar{display:none}\n@media (max-width:860px){.hide-sm{display:none!important}.wrap{padding:0 16px}.mbar{display:flex}.gal{grid-template-columns:1fr!important;grid-template-rows:auto!important}.gal .small{display:none}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id') || 'b1';
    ref.current.setState({ bid: id });
    fetch('/api/boats/' + id).then((r) => (r.ok ? r.json() : null)).then((j) => { if (j) ref.current.setState({ bd: j.boat }); }).catch(() => {});
  }, []);
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>24' Bennington Pontoon on Lake Norman · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#F6F9FA", "fontFamily": "'Figtree', system-ui, sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.5"}}>
<header style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA"}}>
<div className={"wrap"} style={{"display": "flex", "alignItems": "center", "gap": "12px", "minHeight": "72px", "flexWrap": "wrap"}}>
<Link href={"/"} aria-label={"Lundro home"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#0F2A3D"}}>
<svg width={"36"} height={"36"} viewBox={"0 0 36 36"} aria-hidden={"true"}>
<circle cx={"18"} cy={"18"} r={"18"} fill={"#0A6C7A"} />
<circle cx={"24"} cy={"12"} r={"4"} fill={"#FFC94A"} />
<path d={"M7 21c3-3 5-3 8 0s5 3 8 0 5-3 6-1"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"2.4"} strokeLinecap={"round"} />
<path d={"M9 26c2.5-2 4.5-2 7 0s4.5 2 7 0"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"2.4"} strokeLinecap={"round"} opacity={"0.7"} />
</svg>
<span className={"disp"} style={{"fontWeight": "700", "fontSize": "26px"}}>
{"Lundro"}
</span>
</Link>
<nav aria-label={"Main"} style={{"marginLeft": "auto", "display": "flex", "alignItems": "center", "gap": "4px"}}>
<Link href={"/search"} className={"nav-a hide-sm"}>
{"Back to results"}
</Link>
<Link href={"/owner"} className={"btn btn-g btn-sm"}>
{"Log in"}
</Link>
</nav>
</div>
</header>
<main className={"wrap"} style={{"paddingTop": "20px", "paddingBottom": "120px"}}>
<nav aria-label={"Breadcrumb"} style={{"fontSize": "14px"}}>
<Link href={"/lake-norman"}>
{"Lake Norman"}
</Link>
{" "}
<span aria-hidden={"true"} className={"muted"}>
{"/"}
</span>
{" "}
<Link href={"/search"}>
{"Cornelius"}
</Link>
{" "}
<span aria-hidden={"true"} className={"muted"}>
{"/"}
</span>
{" "}
<span aria-current={"page"}>
{s0?.bd?.title ?? "24' Bennington Pontoon"}
</span>
</nav>
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px", "marginTop": "12px"}}>
<div>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "38px", "lineHeight": "1.1"}}>
{s0?.bd?.title ?? "24' Bennington Pontoon"}
</h1>
<p style={{"margin": "8px 0 0", "display": "flex", "flexWrap": "wrap", "alignItems": "center", "gap": "8px 14px", "fontSize": "15px"}}>
<span style={{"display": "inline-flex", "alignItems": "center", "gap": "4px", "fontWeight": "700"}}>
<svg width={"16"} height={"16"} viewBox={"0 0 24 24"} fill={"#E39B0B"} aria-hidden={"true"}>
<path d={"M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"} />
</svg>
{"4.9 "}
<a href={"#reviews"} style={{"fontWeight": "600"}}>
{"38 reviews"}
</a>
</span>
<span className={"muted"}>
{"Lake Norman · Cornelius"}
</span>
<span className={"badge"} style={{"background": "#DDF3E4", "color": "#14532D"}}>
{"✓ Verified owner"}
</span>
<span className={"badge"} style={{"background": "#E3F2F4", "color": "#0B4F59"}}>
{"Insured"}
</span>
<span className={"badge"} style={{"background": "#FFF1C7", "color": "#5C4300"}}>
{"Instant book"}
</span>
</p>
</div>
<div style={{"display": "flex", "gap": "8px"}}>
<button type={"button"} className={"btn btn-g btn-sm"} aria-pressed={s0?.savedPressed} onClick={s0?.toggleSave}>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={s0?.heartFill} stroke={"currentColor"} strokeWidth={"2"} aria-hidden={"true"}>
<path d={"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"} />
</svg>
{s0?.saveLabel}
</button>
<button type={"button"} className={"btn btn-g btn-sm"}>
{"Share"}
</button>
</div>
</div>
<div className={"gal"} style={{"display": "grid", "gridTemplateColumns": "2fr 1fr 1fr", "gridTemplateRows": "220px 220px", "gap": "8px", "marginTop": "20px", "borderRadius": "22px", "overflow": "hidden", "position": "relative"}}>
{(s0?.gallery || []).map((__it, __k) => { const s1 = { ...s0, "g": __it }; return (<Fragment key={__k}>
<button type={"button"} className={s1?.g?.cls} aria-label={`Open photo ${s1?.g?.n ?? ""} of 14`} onClick={s1?.g?.open} style={{"position": "relative", "border": "0", "padding": "0", "cursor": "pointer", "gridRow": s1?.g?.row, "minHeight": "220px", "background": s1?.g?.water}}>
<svg viewBox={"0 0 400 300"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"400"} height={"300"} fill={s1?.g?.sky} />
<circle cx={s1?.g?.sunX} cy={"62"} r={"24"} fill={s1?.g?.sun} />
<path d={"M0 150 Q50 118 110 136 T230 126 T330 132 T400 124 V176 H0 Z"} fill={s1?.g?.hillFar} />
<path d={"M0 168 Q90 146 180 162 T400 156 V186 H0 Z"} fill={s1?.g?.hillNear} />
<rect y={"182"} width={"400"} height={"118"} fill={s1?.g?.water} />
<g transform={`translate(${s1?.g?.boatX ?? ""} 0)`}>
<rect x={"0"} y={"232"} width={"160"} height={"8"} rx={"4"} fill={"#B8C4CC"} />
<rect x={"4"} y={"212"} width={"152"} height={"20"} rx={"4"} fill={"#FFFFFF"} />
<rect x={"4"} y={"221"} width={"152"} height={"3"} fill={"#0A6C7A"} />
<rect x={"38"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<rect x={"118"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<path d={"M30 187 H128 Q124 177 79 177 Q34 177 30 187 Z"} fill={"#0A6C7A"} />
</g>
</svg>
</button>
</Fragment>); })}
<button type={"button"} className={"btn btn-g btn-sm"} onClick={s0?.openFirst} style={{"position": "absolute", "right": "16px", "bottom": "16px", "boxShadow": "0 2px 8px rgba(15,42,61,.2)"}}>
{"Show all 14 photos"}
</button>
</div>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "40px", "alignItems": "flex-start", "marginTop": "8px"}}>
<div style={{"flex": "999 1 560px", "minWidth": "0"}}>
<section className={"blk"} aria-label={"Key facts"}>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(140px, 1fr))", "gap": "16px"}}>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{"Guests"}
</p>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"Up to 12"}
</p>
</div>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{"Boat type"}
</p>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"Pontoon"}
</p>
</div>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{"Length"}
</p>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"24 ft"}
</p>
</div>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{"Engine"}
</p>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"150 hp"}
</p>
</div>
<div>
<p className={"muted"} style={{"margin": "0", "fontSize": "14px"}}>
{"Drive"}
</p>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"Captain or self"}
</p>
</div>
</div>
</section>
<section className={"blk"} aria-labelledby={"about-h"}>
<h2 id={"about-h"}>
{"About this boat"}
</h2>
<p style={{"margin": "0", "maxWidth": "680px"}}>
{"A roomy tritoon with plush lounge seating, a Bimini top for shade and a swim ladder at the back. Great for family days, birthdays and sunset cruises out of Cornelius. Plenty of space for coolers, and a Bluetooth stereo is on board."}
</p>
</section>
<section className={"blk"} aria-labelledby={"drive-h"}>
<h2 id={"drive-h"}>
{"Captain or self-drive"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(260px, 1fr))", "gap": "16px"}}>
<div style={{"background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "16px", "padding": "18px"}}>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "17px"}}>
{"Add a captain · $50 / hour"}
</p>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"A USCG-licensed captain drives, so no boater education card is needed. Add it at checkout."}
</p>
</div>
<div style={{"background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "16px", "padding": "18px"}}>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "17px"}}>
{"Drive it yourself"}
</p>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Driver must be 25 or older. If born on or after Jan 1, 1988, bring your NC boater education card."}
</p>
</div>
</div>
</section>
<section className={"blk"} aria-labelledby={"extras-h"}>
<h2 id={"extras-h"}>
{"Extras you can add"}
</h2>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(260px, 1fr))", "gap": "12px"}}>
{(s0?.extras || []).map((__it, __k) => { const s1 = { ...s0, "x": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "gap": "12px", "alignItems": "center", "background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "14px", "padding": "12px"}}>
<span style={{"flex": "none", "width": "44px", "height": "44px", "borderRadius": "12px", "background": "#E3F2F4", "color": "#0B4F59", "display": "grid", "placeItems": "center"}}>
<svg width={"22"} height={"22"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={s1?.x?.icon} />
</svg>
</span>
<span style={{"flex": "1", "minWidth": "0"}}>
<span style={{"display": "block", "fontWeight": "700"}}>
{s1?.x?.name}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.x?.desc}
</span>
</span>
<span style={{"fontWeight": "700", "whiteSpace": "nowrap", "fontSize": "15px"}}>
{"$"}{s1?.x?.price}{" "}
<span className={"muted"} style={{"fontWeight": "500", "fontSize": "13px"}}>
{s1?.x?.per}
</span>
</span>
</li>
</Fragment>); })}
</ul>
</section>
<section className={"blk"} aria-labelledby={"specs-h"}>
<h2 id={"specs-h"}>
{"Specs"}
</h2>
<div style={{"maxWidth": "560px"}}>
<div className={"row"}>
<span className={"muted"}>
{"Make and model"}
</span>
<strong>
{"Bennington 24 LSR"}
</strong>
</div>
<div className={"row"}>
<span className={"muted"}>
{"Year"}
</span>
<strong>
{"2022"}
</strong>
</div>
<div className={"row"}>
<span className={"muted"}>
{"Length"}
</span>
<strong>
{"24 ft"}
</strong>
</div>
<div className={"row"}>
<span className={"muted"}>
{"Max passengers (capacity plate)"}
</span>
<strong>
{"12"}
</strong>
</div>
<div className={"row"}>
<span className={"muted"}>
{"Engine"}
</span>
<strong>
{"Yamaha 150 hp outboard"}
</strong>
</div>
</div>
</section>
<section className={"blk"} aria-labelledby={"where-h"}>
<h2 id={"where-h"}>
{"Where you'll pick up"}
</h2>
<div style={{"position": "relative", "height": "280px", "borderRadius": "18px", "overflow": "hidden", "background": "#E7EFE3"}}>
<svg viewBox={"0 0 800 280"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"800"} height={"280"} fill={"#E7EFE3"} />
<path d={"M300 0 C340 50 330 90 380 110 C430 130 470 120 500 150 C460 170 420 165 400 190 C410 230 430 260 420 280 H240 C260 250 270 220 250 200 C220 190 190 200 170 180 C210 165 250 170 270 150 C290 100 280 50 300 0 Z"} fill={"#B9DCEB"} />
<path d={"M600 0 C590 100 610 200 600 280"} stroke={"#fff"} strokeWidth={"8"} fill={"none"} />
<circle cx={"430"} cy={"160"} r={"70"} fill={"#0A6C7A"} opacity={"0.18"} stroke={"#0A6C7A"} strokeWidth={"2"} />
<text x={"520"} y={"120"} fill={"#3D5160"} fontFamily={"Figtree, sans-serif"} fontSize={"16"} fontWeight={"600"}>
{"Cornelius"}
</text>
</svg>
</div>
<p style={{"margin": "12px 0 0"}}>
<strong>
{"Marina in Cornelius, Lake Norman."}
</strong>
{" "}
<span className={"muted"}>
{"Approximate area shown. You'll get the exact address, slip number and parking notes after booking."}
</span>
</p>
</section>
<section className={"blk"} aria-labelledby={"pol-h"}>
<h2 id={"pol-h"}>
{"Policies"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(240px, 1fr))", "gap": "20px"}}>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Cancellation: Moderate"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Full refund, tax included, up to 5 days before your trip. 50% after that."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Weather"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"If the owner cancels for storms or high wind, you get a full refund or a free reschedule."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Fuel"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Leaves full. You pay for fuel used, charged after the trip at the marina rate."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Security deposit: $500"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"A hold on your card, released within 3 days after the trip if there's no damage."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"House rules"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Pets welcome · No smoking · BYOB allowed, no glass"}
</p>
</div>
</div>
</section>
<section className={"blk"} aria-labelledby={"safe-h"}>
<h2 id={"safe-h"}>
{"Safety equipment on board"}
</h2>
<ul style={{"margin": "0", "padding": "0", "listStyle": "none", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(220px, 1fr))", "gap": "10px"}}>
{(s0?.safety || []).map((__it, __k) => { const s1 = { ...s0, "s": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "gap": "10px", "alignItems": "center"}}>
<svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"#14532D"} strokeWidth={"2.6"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M5 12l5 5 9-10"} />
</svg>
{s1?.s}
</li>
</Fragment>); })}
</ul>
</section>
<section id={"reviews"} className={"blk"} aria-labelledby={"rev-h"}>
<h2 id={"rev-h"} style={{"display": "flex", "alignItems": "center", "gap": "8px"}}>
<svg width={"22"} height={"22"} viewBox={"0 0 24 24"} fill={"#E39B0B"} aria-hidden={"true"}>
<path d={"M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"} />
</svg>
{"4.9 · 38 reviews"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(280px, 1fr))", "gap": "20px"}}>
{(s0?.reviews || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<article style={{"background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "16px", "padding": "18px"}}>
<p style={{"margin": "0", "display": "flex", "justifyContent": "space-between"}}>
<strong>
{s1?.r?.name}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.r?.date}
</span>
</p>
<p style={{"margin": "2px 0 0", "color": "#B26B00", "fontSize": "14px"}} aria-label={`${s1?.r?.stars ?? ""} out of 5 stars`}>
{s1?.r?.starText}
</p>
<p style={{"margin": "8px 0 0", "fontSize": "15px"}}>
{s1?.r?.text}
</p>
{s1?.r?.hasReply ? (<>
<p style={{"margin": "10px 0 0", "padding": "10px 12px", "background": "#F1F6F8", "borderRadius": "10px", "fontSize": "14px"}}>
<strong>
{"Response from Cove & Co."}
</strong>
{" "}{s1?.r?.reply}
</p>
</>) : null}
</article>
</Fragment>); })}
</div>
<button type={"button"} className={"btn btn-s"} style={{"marginTop": "20px"}}>
{"Show all 38 reviews"}
</button>
</section>
<section className={"blk"} aria-labelledby={"owner-h"} style={{"borderBottom": "0"}}>
<h2 id={"owner-h"}>
{"Your host"}
</h2>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "alignItems": "center", "background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "18px", "padding": "20px"}}>
<span aria-hidden={"true"} className={"disp"} style={{"flex": "none", "width": "64px", "height": "64px", "borderRadius": "16px", "background": "#0F2A3D", "color": "#FFC94A", "display": "grid", "placeItems": "center", "fontWeight": "700", "fontSize": "22px"}}>
{"C&C"}
</span>
<div style={{"flex": "1 1 240px"}}>
<p style={{"margin": "0", "fontWeight": "700", "fontSize": "18px"}}>
{"Cove & Co. Boat Rentals"}
</p>
<p className={"muted"} style={{"margin": "2px 0 0", "fontSize": "15px"}}>
{"★ 4.9 owner rating · 3 years hosting · 3 boats on Lundro · Usually replies within an hour"}
</p>
<p style={{"margin": "8px 0 0", "display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
<span className={"badge"} style={{"background": "#DDF3E4", "color": "#14532D"}}>
{"✓ Verified owner"}
</span>
<span className={"badge"} style={{"background": "#E3F2F4", "color": "#0B4F59"}}>
{"Insured"}
</span>
</p>
</div>
<button type={"button"} className={"btn btn-s"} onClick={s0?.openMsg}>
{"Message the owner"}
</button>
</div>
</section>
</div>
<aside aria-label={"Book this boat"} style={{"flex": "1 1 340px", "minWidth": "0", "position": "sticky", "top": "20px", "marginTop": "32px"}}>
<div style={{"background": "#fff", "border": "1px solid #DCE5EA", "borderRadius": "22px", "padding": "22px", "boxShadow": "0 8px 28px rgba(15,42,61,.10)"}}>
<p style={{"margin": "0"}}>
<span className={"disp"} style={{"fontSize": "28px", "fontWeight": "700"}}>
{"$"}{s0?.price}
</span>
{" "}
<span className={"muted"}>
{"/ "}{s0?.lenLabel}
</span>
</p>
<div style={{"marginTop": "16px"}}>
<label htmlFor={"b-date"} className={"lbl"}>
{"Date"}
</label>
<input id={"b-date"} type={"date"} className={"inp"} value={"2027-06-12"} />
</div>
<fieldset style={{"border": "0", "padding": "0", "margin": "16px 0 0"}}>
<legend className={"lbl"} style={{"padding": "0"}}>
{"Trip length"}
</legend>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "8px"}}>
{(s0?.lens || []).map((__it, __k) => { const s1 = { ...s0, "l": __it }; return (<Fragment key={__k}>
<label style={{"display": "flex", "flexDirection": "column", "border": s1?.l?.border, "background": s1?.l?.bg, "borderRadius": "12px", "padding": "10px 12px", "cursor": "pointer"}}>
<span style={{"display": "flex", "gap": "8px", "alignItems": "center", "fontWeight": "700"}}>
<input type={"radio"} name={"len"} checked={s1?.l?.checked} onChange={s1?.l?.pick} style={{"accentColor": "#0A6C7A", "width": "18px", "height": "18px", "margin": "0"}} />
{s1?.l?.label}
</span>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.l?.hours}{" · $"}{s1?.l?.price}
</span>
</label>
</Fragment>); })}
</div>
</fieldset>
<fieldset style={{"border": "0", "padding": "0", "margin": "16px 0 0"}}>
<legend className={"lbl"} style={{"padding": "0"}}>
{"Start time"}
</legend>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "8px"}}>
{(s0?.times || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.t?.pressed} onClick={s1?.t?.pick} style={{"minHeight": "44px", "padding": "0 16px", "borderRadius": "999px", "border": s1?.t?.border, "background": s1?.t?.bg, "color": s1?.t?.fg, "fontWeight": "700", "cursor": "pointer"}}>
{s1?.t?.label}
</button>
</Fragment>); })}
</div>
</fieldset>
<div style={{"marginTop": "16px"}}>
<label htmlFor={"b-guests"} className={"lbl"}>
{"Guests"}
</label>
<select id={"b-guests"} className={"inp"}>
<option>
{"6 guests"}
</option>
<option>
{"8 guests"}
</option>
<option>
{"10 guests"}
</option>
<option>
{"12 guests"}
</option>
</select>
</div>
<Link href={`/checkout?boat=${s0?.bid}`} className={"btn btn-p"} style={{"width": "100%", "marginTop": "20px", "minHeight": "54px", "fontSize": "17px"}}>
{"Reserve"}
</Link>
<p className={"muted"} style={{"margin": "10px 0 0", "textAlign": "center", "fontSize": "14px"}}>
{"You won't be charged yet. Extras, captain, fees and tax are added on the next step."}
</p>
<div style={{"marginTop": "14px", "paddingTop": "14px", "borderTop": "1px solid #DCE5EA", "fontSize": "15px"}}>
<div style={{"display": "flex", "justifyContent": "space-between"}}>
<span>
{"Boat · "}{s0?.lenLabel}{" ("}{s0?.hours}{")"}
</span>
<span>
{"$"}{s0?.price}
</span>
</div>
<div className={"muted"} style={{"display": "flex", "justifyContent": "space-between", "marginTop": "4px"}}>
<span>
{"Security deposit (hold)"}
</span>
<span>
{"$500"}
</span>
</div>
</div>
</div>
</aside>
</div>
</main>
<div className={"mbar"} style={{"position": "fixed", "left": "0", "right": "0", "bottom": "0", "background": "#fff", "borderTop": "1px solid #DCE5EA", "padding": "12px 16px", "alignItems": "center", "justifyContent": "space-between", "gap": "12px", "zIndex": "20"}}>
<span>
<strong style={{"fontSize": "18px"}}>
{"$"}{s0?.price}
</strong>
{" "}
<span className={"muted"}>
{"/ "}{s0?.lenLabel}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{"Sat, Jun 12 · "}{s0?.timeLabel}
</span>
</span>
<Link href={`/checkout?boat=${s0?.bid}`} className={"btn btn-p"}>
{"Reserve"}
</Link>
</div>
{s0?.lightbox ? (<>
<div role={"dialog"} aria-modal={"true"} aria-label={`Photo ${s0?.photoN ?? ""} of 14`} style={{"position": "fixed", "inset": "0", "background": "rgba(8,22,33,.92)", "zIndex": "40", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "padding": "24px"}}>
<button type={"button"} aria-label={"Close photos"} onClick={s0?.closeLb} style={{"position": "absolute", "top": "16px", "right": "16px", "width": "48px", "height": "48px", "borderRadius": "50%", "border": "0", "background": "#fff", "cursor": "pointer", "display": "grid", "placeItems": "center"}}>
<svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M6 6l12 12M18 6L6 18"} />
</svg>
</button>
<div style={{"width": "100%", "maxWidth": "900px", "aspectRatio": "4 / 3", "borderRadius": "16px", "overflow": "hidden", "position": "relative"}}>
<svg viewBox={"0 0 400 300"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"400"} height={"300"} fill={s0?.lb?.sky} />
<circle cx={s0?.lb?.sunX} cy={"62"} r={"24"} fill={s0?.lb?.sun} />
<path d={"M0 150 Q50 118 110 136 T230 126 T330 132 T400 124 V176 H0 Z"} fill={s0?.lb?.hillFar} />
<path d={"M0 168 Q90 146 180 162 T400 156 V186 H0 Z"} fill={s0?.lb?.hillNear} />
<rect y={"182"} width={"400"} height={"118"} fill={s0?.lb?.water} />
<g transform={`translate(${s0?.lb?.boatX ?? ""} 0)`}>
<rect x={"0"} y={"232"} width={"160"} height={"8"} rx={"4"} fill={"#B8C4CC"} />
<rect x={"4"} y={"212"} width={"152"} height={"20"} rx={"4"} fill={"#FFFFFF"} />
<rect x={"4"} y={"221"} width={"152"} height={"3"} fill={"#0A6C7A"} />
<path d={"M30 187 H128 Q124 177 79 177 Q34 177 30 187 Z"} fill={"#0A6C7A"} />
</g>
</svg>
</div>
<div style={{"display": "flex", "alignItems": "center", "gap": "16px", "marginTop": "16px", "color": "#fff"}}>
<button type={"button"} aria-label={"Previous photo"} onClick={s0?.prevPh} style={{"width": "48px", "height": "48px", "borderRadius": "50%", "border": "0", "background": "#fff", "cursor": "pointer"}}>
{"‹"}
</button>
<span style={{"fontWeight": "700"}}>
{s0?.photoN}{" / 14"}
</span>
<button type={"button"} aria-label={"Next photo"} onClick={s0?.nextPh} style={{"width": "48px", "height": "48px", "borderRadius": "50%", "border": "0", "background": "#fff", "cursor": "pointer"}}>
{"›"}
</button>
</div>
</div>
</>) : null}
{s0?.msg ? (<>
<div style={{"position": "fixed", "inset": "0", "background": "rgba(15,42,61,.55)", "zIndex": "40", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "16px"}}>
<div role={"dialog"} aria-modal={"true"} aria-labelledby={"msg-h"} style={{"background": "#fff", "borderRadius": "22px", "padding": "24px", "width": "100%", "maxWidth": "520px"}}>
{s0?.msgNotSent ? (<>
<h2 id={"msg-h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Message Cove & Co."}
</h2>
<p className={"muted"} style={{"margin": "6px 0 0", "fontSize": "15px"}}>
{"Ask about the boat or your plans. Phone numbers and emails stay hidden until you book."}
</p>
<label htmlFor={"msg-t"} className={"lbl"} style={{"marginTop": "16px"}}>
{"Your message"}
</label>
<textarea id={"msg-t"} className={"inp"} placeholder={"Hi! We're a group of 8 celebrating a birthday on June 12..."} />
<div style={{"display": "flex", "justifyContent": "flex-end", "gap": "8px", "marginTop": "16px"}}>
<button type={"button"} className={"btn btn-g"} onClick={s0?.closeMsg}>
{"Cancel"}
</button>
<button type={"button"} className={"btn btn-p"} onClick={s0?.sendMsg}>
{"Send message"}
</button>
</div>
</>) : null}
{s0?.msgSent ? (<>
<h2 className={"disp"} role={"status"} style={{"margin": "0", "fontSize": "24px"}}>
{"Message sent"}
</h2>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{"Cove & Co. usually replies within an hour. We'll email you when they do."}
</p>
<div style={{"display": "flex", "justifyContent": "flex-end", "marginTop": "16px"}}>
<button type={"button"} className={"btn btn-p"} onClick={s0?.closeMsg}>
{"Done"}
</button>
</div>
</>) : null}
</div>
</div>
</>) : null}
</div>
    </>
  );
}
