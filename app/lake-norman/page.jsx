'use client';
// Generated from source/Lake.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) { super(p); this.state = { open: 0 }; }
  renderVals() {
    const faqsRaw = [
      ['How does pickup work?', 'Each boat has a pickup marina shown on the map. Once your booking is confirmed you get the exact address, parking notes and the owner’s contact details.'],
      ['Do I need a boating license?', 'Not if you book a captain. To drive yourself, you must meet the owner’s minimum age, and in NC anyone born on or after Jan 1, 1988 needs a boater education card.'],
      ['What does the price include?', 'The boat for your chosen half or full day. Extras, a captain, the Lundro service fee and NC sales tax are all itemized before you pay. The security deposit is a hold, not a charge.'],
      ['What happens if the weather is bad?', 'Each owner sets a weather policy, shown on the boat page. If the owner cancels for weather, you get a full refund, tax included.'],
      ['Can I cancel?', 'Each boat has a Flexible, Moderate or Strict cancellation policy. Refunds include the tax you paid.']
    ];
    const faqs = faqsRaw.map(([q, a], i) => {
      const open = this.state.open === i;
      return { q, a, open, expanded: open ? 'true' : 'false', rot: open ? '180deg' : '0deg',
        toggle: () => this.setState({ open: open ? -1 : i }) };
    });
    return {
      faqs,
      areas: [{ name: 'Cornelius', count: 4 }, { name: 'Mooresville', count: 3 }, { name: 'Davidson', count: 2 }, { name: 'Huntersville', count: 2 }, { name: 'Denver', count: 2 }, { name: 'Sherrills Ford', count: 1 }],
      types: [
        { name: 'Pontoons', desc: 'Roomy and easy for families', from: 260 },
        { name: 'Ski and wake boats', desc: 'For tubing, skiing and surfing', from: 340 },
        { name: 'Center consoles', desc: 'Fishing and cruising', from: 410 },
        { name: 'Sailboats', desc: 'Quiet days, captain included', from: 300 },
        { name: 'Jet skis', desc: '1 to 3 riders', from: 180 }
      ],
      boats: [
        { title: "26' Harris Grand Mariner", area: 'Cornelius', guests: 14, half: 575, rating: '4.9', reviews: 63, sky: '#FCE3C2', sun: '#FFC94A', hillFar: '#A3A982', hillNear: '#6F8065', water: '#4C8DA8', accent: '#C2410C', boatX: 110, sunX: 310 },
        { title: "24' Bennington Pontoon", area: 'Cornelius', guests: 12, half: 350, rating: '4.9', reviews: 38, sky: '#CFE8F5', sun: '#FFE7A3', hillFar: '#8FB8A0', hillNear: '#5E9478', water: '#3E8FB0', accent: '#0A6C7A', boatX: 120, sunX: 320 },
        { title: "21' Malibu Wakesetter", area: 'Mooresville', guests: 12, half: 560, rating: '4.7', reviews: 44, sky: '#BFE3F4', sun: '#FFF6D6', hillFar: '#86B39A', hillNear: '#4F8A6C', water: '#2F7FA3', accent: '#0F2A3D', boatX: 90, sunX: 330 }
      ]
    };
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.btn-sm{min-height:44px;padding:0 16px;font-size:15px}\n.nav-a{color:#0F2A3D;text-decoration:none;font-weight:600;padding:12px 14px;border-radius:999px}\n.nav-a:hover{background:#EEF4F7;color:#0F2A3D}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:12px;padding:0 14px;background:#fff;font-size:16px;color:#0F2A3D}\n.lbl{display:block;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#3D5160;margin-bottom:6px}\n.wrap{max-width:1200px;margin:0 auto;padding:0 24px}\n.tile{display:flex;flex-direction:column;gap:2px;background:#fff;border:1px solid #DCE5EA;border-radius:16px;padding:18px 20px;text-decoration:none;color:#0F2A3D}\n.tile:hover{border-color:#0A6C7A;color:#0F2A3D}\n.foot a{color:#CDE7EC;text-decoration:none}\n.foot a:hover{color:#fff;text-decoration:underline}\n@media (max-width:760px){.hide-sm{display:none!important}.wrap{padding:0 16px}.hero-h{font-size:36px!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Boat rentals on Lake Norman · Lundro</title>
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
<nav aria-label={"Main"} style={{"marginLeft": "auto", "display": "flex", "alignItems": "center", "gap": "4px", "flexWrap": "wrap"}}>
<Link href={"/lake-norman"} className={"nav-a hide-sm"} aria-current={"page"}>
{"Lake Norman"}
</Link>
<Link href={"/owner/signup"} className={"nav-a"}>
{"List your boat"}
</Link>
<Link href={"/owner"} className={"btn btn-g btn-sm"}>
{"Log in"}
</Link>
</nav>
</div>
</header>
<section style={{"background": "#0F2A3D", "color": "#FFFFFF", "position": "relative", "overflow": "hidden"}}>
<svg viewBox={"0 0 1440 460"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%"}}>
<rect width={"1440"} height={"460"} fill={"#0F2A3D"} />
<path d={"M980 -20 C1010 60 1040 100 1030 160 C1080 180 1160 170 1200 210 C1150 235 1090 225 1070 255 C1090 310 1140 330 1180 370 C1140 390 1090 365 1070 390 C1080 430 1100 450 1090 480 H900 C920 450 930 420 900 400 C860 395 830 410 800 390 C840 370 880 375 905 360 C925 310 920 260 895 235 C870 215 835 220 815 200 C850 185 905 195 935 180 C950 120 960 60 980 -20 Z"} fill={"#1E5A78"} />
</svg>
<div className={"wrap"} style={{"position": "relative", "paddingTop": "28px", "paddingBottom": "56px"}}>
<nav aria-label={"Breadcrumb"} style={{"fontSize": "14px"}}>
<Link href={"/"} style={{"color": "#CDE7EC"}}>
{"Home"}
</Link>
{" "}
<span aria-hidden={"true"} style={{"color": "#9FB7C4"}}>
{"/"}
</span>
{" "}
<span>
{"North Carolina"}
</span>
{" "}
<span aria-hidden={"true"} style={{"color": "#9FB7C4"}}>
{"/"}
</span>
{" "}
<span aria-current={"page"}>
{"Lake Norman"}
</span>
</nav>
<h1 className={"disp hero-h"} style={{"margin": "20px 0 0", "fontSize": "54px", "lineHeight": "1.05", "fontWeight": "700", "maxWidth": "720px"}}>
{"Boat rentals on Lake Norman"}
</h1>
<p style={{"margin": "14px 0 0", "fontSize": "19px", "maxWidth": "620px", "color": "#D6E4EA"}}>
{"Pontoons, ski and wake boats, center consoles and sailboats from verified owners around North Carolina's largest man-made lake, just north of Charlotte."}
</p>
<form role={"search"} aria-label={"Search Lake Norman boats"} style={{"marginTop": "28px", "background": "#FFFFFF", "color": "#0F2A3D", "borderRadius": "20px", "padding": "14px", "display": "flex", "flexWrap": "wrap", "gap": "12px", "alignItems": "flex-end", "maxWidth": "760px"}}>
<div style={{"flex": "1 1 180px"}}>
<label htmlFor={"l-date"} className={"lbl"}>
{"Date"}
</label>
<input id={"l-date"} type={"date"} className={"inp"} value={"2027-06-12"} />
</div>
<div style={{"flex": "1 1 140px"}}>
<label htmlFor={"l-guests"} className={"lbl"}>
{"Guests"}
</label>
<select id={"l-guests"} className={"inp"}>
<option>
{"2 guests"}
</option>
<option>
{"4 guests"}
</option>
<option selected={true}>
{"6 guests"}
</option>
<option>
{"8 guests"}
</option>
<option>
{"10 guests"}
</option>
<option>
{"12+ guests"}
</option>
</select>
</div>
<Link href={"/search"} className={"btn btn-p"} style={{"minHeight": "50px"}}>
{"See available boats"}
</Link>
</form>
</div>
</section>
<section aria-labelledby={"areas-h"} className={"wrap"} style={{"paddingTop": "56px"}}>
<h2 id={"areas-h"} className={"disp"} style={{"margin": "0", "fontSize": "30px", "fontWeight": "700"}}>
{"Rent by area"}
</h2>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{"Boats are picked up at marinas around the lake. The exact pickup address is shared after booking."}
</p>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "12px", "marginTop": "20px"}}>
{(s0?.areas || []).map((__it, __k) => { const s1 = { ...s0, "a": __it }; return (<Fragment key={__k}>
<Link href={"/search"} className={"tile"}>
<span style={{"fontWeight": "700", "fontSize": "17px"}}>
{s1?.a?.name}
</span>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.a?.count}{" boats"}
</span>
</Link>
</Fragment>); })}
</div>
</section>
<section aria-labelledby={"types-h"} className={"wrap"} style={{"paddingTop": "56px"}}>
<h2 id={"types-h"} className={"disp"} style={{"margin": "0", "fontSize": "30px", "fontWeight": "700"}}>
{"Boats on Lake Norman"}
</h2>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(200px, 1fr))", "gap": "12px", "marginTop": "20px"}}>
{(s0?.types || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<Link href={"/search"} className={"tile"}>
<span style={{"fontWeight": "700", "fontSize": "17px"}}>
{s1?.t?.name}
</span>
<span className={"muted"} style={{"fontSize": "14px"}}>
{s1?.t?.desc}
</span>
<span style={{"marginTop": "8px", "fontSize": "15px"}}>
{"From "}
<strong>
{"$"}{s1?.t?.from}
</strong>
{" / half day"}
</span>
</Link>
</Fragment>); })}
</div>
</section>
<section aria-labelledby={"top-h"} className={"wrap"} style={{"paddingTop": "56px"}}>
<div style={{"display": "flex", "flexWrap": "wrap", "alignItems": "flex-end", "justifyContent": "space-between", "gap": "12px"}}>
<h2 id={"top-h"} className={"disp"} style={{"margin": "0", "fontSize": "30px", "fontWeight": "700"}}>
{"Top-rated on Lake Norman"}
</h2>
<Link href={"/search"} style={{"fontWeight": "700", "padding": "10px 0"}}>
{"See all 14 boats"}
</Link>
</div>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(260px, 1fr))", "gap": "24px 20px", "marginTop": "20px"}}>
{(s0?.boats || []).map((__it, __k) => { const s1 = { ...s0, "item": __it }; return (<Fragment key={__k}>
<Link href={"/boat"} style={{"display": "flex", "flexDirection": "column", "gap": "12px", "textDecoration": "none", "color": "#0F2A3D"}}>
<span style={{"position": "relative", "display": "block", "borderRadius": "18px", "overflow": "hidden", "aspectRatio": "4 / 3"}}>
<svg viewBox={"0 0 400 300"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "display": "block"}}>
<rect width={"400"} height={"300"} fill={s1?.item?.sky} />
<circle cx={s1?.item?.sunX} cy={"62"} r={"24"} fill={s1?.item?.sun} />
<path d={"M0 150 Q50 118 110 136 T230 126 T330 132 T400 124 V176 H0 Z"} fill={s1?.item?.hillFar} />
<path d={"M0 168 Q90 146 180 162 T400 156 V186 H0 Z"} fill={s1?.item?.hillNear} />
<rect y={"182"} width={"400"} height={"118"} fill={s1?.item?.water} />
<g transform={`translate(${s1?.item?.boatX ?? ""} 0)`}>
<rect x={"0"} y={"232"} width={"160"} height={"8"} rx={"4"} fill={"#B8C4CC"} />
<rect x={"4"} y={"212"} width={"152"} height={"20"} rx={"4"} fill={"#FFFFFF"} />
<rect x={"4"} y={"221"} width={"152"} height={"3"} fill={s1?.item?.accent} />
<rect x={"38"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<rect x={"118"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<path d={"M30 187 H128 Q124 177 79 177 Q34 177 30 187 Z"} fill={s1?.item?.accent} />
</g>
</svg>
</span>
<span style={{"display": "flex", "flexDirection": "column", "gap": "2px"}}>
<span style={{"display": "flex", "justifyContent": "space-between", "gap": "10px"}}>
<span className={"disp"} style={{"fontSize": "19px", "fontWeight": "600"}}>
{s1?.item?.title}
</span>
<span style={{"fontWeight": "700", "whiteSpace": "nowrap"}}>
{"★ "}{s1?.item?.rating}{" "}
<span className={"muted"} style={{"fontWeight": "500"}}>
{"("}{s1?.item?.reviews}{")"}
</span>
</span>
</span>
<span className={"muted"} style={{"fontSize": "15px"}}>
{"Lake Norman · "}{s1?.item?.area}{" · Up to "}{s1?.item?.guests}{" guests"}
</span>
<span style={{"marginTop": "4px"}}>
{"From "}
<strong style={{"fontSize": "18px"}}>
{"$"}{s1?.item?.half}
</strong>
{" "}
<span className={"muted"}>
{"/ half day"}
</span>
</span>
</span>
</Link>
</Fragment>); })}
</div>
</section>
<section aria-labelledby={"know-h"} className={"wrap"} style={{"paddingTop": "56px"}}>
<div style={{"background": "#FFFFFF", "border": "1px solid #DCE5EA", "borderRadius": "22px", "padding": "28px", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(260px, 1fr))", "gap": "24px"}}>
<div>
<h2 id={"know-h"} className={"disp"} style={{"margin": "0", "fontSize": "26px", "fontWeight": "700"}}>
{"Good to know before you go"}
</h2>
<p className={"muted"} style={{"margin": "8px 0 0"}}>
{"Owners set their own age and experience rules. Each boat page lists them."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Boater education"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"In North Carolina, anyone born on or after January 1, 1988 needs a boater education card to drive a boat with a 10 hp or larger motor. Book a captain and you don't need one."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Life jackets for kids"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Children under 13 must wear a life jacket while the boat is moving. Owners list adult and child life jacket counts."}
</p>
</div>
<div>
<h3 style={{"margin": "0", "fontSize": "17px"}}>
{"Drinks on board"}
</h3>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "15px"}}>
{"Lundro doesn't sell alcohol. Some owners allow you to bring your own; check the house rules."}
</p>
</div>
</div>
</section>
<section aria-labelledby={"faq-h"} className={"wrap"} style={{"paddingTop": "56px", "maxWidth": "880px"}}>
<h2 id={"faq-h"} className={"disp"} style={{"margin": "0", "fontSize": "30px", "fontWeight": "700"}}>
{"Lake Norman boat rental questions"}
</h2>
<div style={{"marginTop": "16px", "borderTop": "1px solid #DCE5EA"}}>
{(s0?.faqs || []).map((__it, __k) => { const s1 = { ...s0, "f": __it }; return (<Fragment key={__k}>
<div style={{"borderBottom": "1px solid #DCE5EA"}}>
<h3 style={{"margin": "0"}}>
<button type={"button"} aria-expanded={s1?.f?.expanded} onClick={s1?.f?.toggle} style={{"width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "16px", "border": "0", "background": "transparent", "textAlign": "left", "fontSize": "17px", "fontWeight": "700", "padding": "18px 0", "minHeight": "56px", "cursor": "pointer", "color": "#0F2A3D"}}>
{s1?.f?.q}
<svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"} style={{"flex": "none", "transform": `rotate(${s1?.f?.rot ?? ""})`}}>
<path d={"M6 9l6 6 6-6"} />
</svg>
</button>
</h3>
{s1?.f?.open ? (<>
<p className={"muted"} style={{"margin": "0 0 18px", "maxWidth": "720px"}}>
{s1?.f?.a}
</p>
</>) : null}
</div>
</Fragment>); })}
</div>
</section>
<footer className={"foot"} style={{"background": "#0F2A3D", "color": "#FFFFFF", "marginTop": "72px"}}>
<div className={"wrap"} style={{"paddingTop": "40px", "paddingBottom": "40px", "display": "grid", "gridTemplateColumns": "repeat(auto-fit, minmax(180px, 1fr))", "gap": "24px", "fontSize": "15px"}}>
<div>
<p className={"disp"} style={{"margin": "0", "fontSize": "22px", "fontWeight": "700"}}>
{"Lundro"}
</p>
<p style={{"margin": "6px 0 0", "color": "#B9CCD6"}}>
{"Boat rentals on North Carolina lakes."}
</p>
</div>
<nav aria-label={"Renters"}>
<p style={{"margin": "0 0 8px", "fontWeight": "700"}}>
{"Renters"}
</p>
<p style={{"margin": "4px 0"}}>
<Link href={"/lake-norman"}>
{"Boat rentals on Lake Norman"}
</Link>
</p>
<p style={{"margin": "4px 0"}}>
<Link href={"/search"}>
{"Search boats"}
</Link>
</p>
</nav>
<nav aria-label={"Owners"}>
<p style={{"margin": "0 0 8px", "fontWeight": "700"}}>
{"Owners"}
</p>
<p style={{"margin": "4px 0"}}>
<Link href={"/owner/signup"}>
{"List your boat"}
</Link>
</p>
<p style={{"margin": "4px 0"}}>
<Link href={"/owner"}>
{"Owner dashboard"}
</Link>
</p>
</nav>
<nav aria-label={"Lundro"}>
<p style={{"margin": "0 0 8px", "fontWeight": "700"}}>
{"Lundro"}
</p>
<p style={{"margin": "4px 0"}}>
<Link href={"/admin/review"}>
{"Admin console"}
</Link>
</p>
<p style={{"margin": "4px 0"}}>
<a href={"#"}>
{"Help center"}
</a>
</p>
</nav>
</div>
</footer>
</div>
    </>
  );
}
