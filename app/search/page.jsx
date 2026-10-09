'use client';
// Generated from source/Search.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useEffect, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { guests: 6, len: 'half', area: 'all', cap: 'any', rating: 0, extras: [], types: [], priceMax: null, sort: 'rec', view: 'list', panel: false, sel: 'b1', loading: false };
  }
  upd(patch) {
    this.setState(Object.assign({}, patch, { loading: true }));
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ loading: false }), 450);
  }
  boats() {
    const P = {
      midday:  ['#CFE8F5', '#FFE7A3', '#8FB8A0', '#5E9478', '#3E8FB0'],
      morning: ['#E4F1F7', '#FFF1C4', '#A5C4B0', '#6E9D84', '#5BA3C0'],
      golden:  ['#FCE3C2', '#FFC94A', '#A3A982', '#6F8065', '#4C8DA8'],
      clear:   ['#BFE3F4', '#FFF6D6', '#86B39A', '#4F8A6C', '#2F7FA3']
    };
    const R = [
      ['b1', "24' Bennington Pontoon", 'Cornelius', 12, 350, 600, 4.9, 38, 1, 1, 1, 'tube sup mat cooler speaker', 'pontoon', 3.1, 60, 66, 'midday', '#0A6C7A'],
      ['b2', "22' MasterCraft XT22", 'Mooresville', 14, 525, 950, 4.8, 21, 1, 1, 1, 'tube wake skis speaker cooler', 'ski', 12.4, 70, 23, 'clear', '#C2410C'],
      ['b3', "25' Sun Tracker Party Barge", 'Davidson', 13, 395, 700, null, 0, 1, 1, 0, 'tube cooler speaker mat', 'pontoon', 6.0, 65, 54, 'morning', '#0F2A3D'],
      ['b4', "23' Barletta Tritoon", 'Huntersville', 12, 450, 800, 5.0, 12, 1, 0, 1, 'tube cooler speaker sup', 'pontoon', 4.2, 62, 81, 'golden', '#0A6C7A'],
      ['b5', "21' Malibu Wakesetter", 'Mooresville', 12, 560, 1000, 4.7, 44, 1, 0, 0, 'wake skis tube speaker', 'ski', 9.8, 57, 40, 'clear', '#0F2A3D'],
      ['b6', "20' Bennington S Pontoon", 'Denver', 10, 295, 520, 4.6, 9, 1, 1, 0, 'tube cooler fishing', 'pontoon', 7.5, 37, 63, 'morning', '#C2410C'],
      ['b7', "26' Harris Grand Mariner", 'Cornelius', 14, 575, 1050, 4.9, 63, 1, 0, 1, 'tube mat cooler speaker sup', 'pontoon', 2.6, 55, 71, 'golden', '#C2410C'],
      ['b8', "24' Avalon Catalina", 'Sherrills Ford', 12, 375, 650, null, 0, 1, 1, 0, 'tube cooler', 'pontoon', 14.0, 31, 26, 'midday', '#0F2A3D'],
      ['b9', "19' Yamaha AR190", 'Cornelius', 8, 340, 600, 4.8, 27, 0, 1, 1, 'tube wake skis', 'ski', 3.5, 66, 61, 'clear', '#C2410C'],
      ['b10', 'Sea-Doo GTX jet ski', 'Mooresville', 3, 180, 320, 4.5, 16, 0, 1, 1, '', 'jet', 11.0, 66, 30, 'morning', '#0A6C7A'],
      ['b11', "22' Sea Hunt Ultra 225", 'Huntersville', 9, 410, 720, 4.4, 8, 1, 1, 0, 'fishing cooler tube', 'center', 5.0, 58, 78, 'midday', '#0F2A3D'],
      ['b12', 'Catalina 25 sailboat', 'Davidson', 6, 300, 520, 4.9, 11, 1, 0, 0, 'cooler', 'sail', 6.4, 61, 49, 'golden', '#0A6C7A'],
      ['b13', "22' Sun Tracker Fishin' Barge", 'Denver', 8, 260, 450, 4.3, 19, 0, 1, 0, 'fishing cooler', 'pontoon', 8.1, 41, 58, 'morning', '#0F2A3D'],
      ['b14', "25' Bennington QX", 'Cornelius', 12, 650, 1150, 5.0, 7, 1, 0, 1, 'tube sup mat cooler speaker', 'pontoon', 2.9, 58, 67, 'clear', '#0A6C7A']
    ];
    if (this.remote) {
      return this.remote.map((r, i) => {
        const p = P[r.palette] || P.midday;
        return { id: r.id, title: r.title, area: r.area, guests: r.guests, half: r.half, full: r.full, rating: r.rating, reviews: r.reviews,
          captain: r.captain, self: r.self, instant: r.instant, extras: r.extras, type: r.type, dist: r.dist, x: r.x, y: r.y,
          sky: p[0], sun: p[1], hillFar: p[2], hillNear: p[3], water: p[4], accent: r.accent, boatX: 90 + (i * 23) % 80, sunX: i % 2 ? 80 : 320, order: i };
      });
    }
    return R.map((r, i) => {
      const p = P[r[16]];
      return { id: r[0], title: r[1], area: r[2], guests: r[3], half: r[4], full: r[5], rating: r[6], reviews: r[7],
        captain: !!r[8], self: !!r[9], instant: !!r[10], extras: r[11] ? r[11].split(' ') : [], type: r[12], dist: r[13], x: r[14], y: r[15],
        sky: p[0], sun: p[1], hillFar: p[2], hillNear: p[3], water: p[4], accent: r[17], boatX: 90 + (i * 23) % 80, sunX: i % 2 ? 80 : 320, order: i };
    });
  }
  match(b, f) {
    const price = f.len === 'half' ? b.half : b.full;
    if (b.guests < f.guests) return false;
    if (f.area !== 'all' && b.area !== f.area) return false;
    if (f.cap === 'captain' && !b.captain) return false;
    if (f.cap === 'self' && !b.self) return false;
    if (f.rating && b.rating !== null && b.rating < f.rating) return false;
    if (f.extras.some(x => b.extras.indexOf(x) < 0)) return false;
    if (f.types.length && f.types.indexOf(b.type) < 0) return false;
    if (f.priceMax !== null && price > f.priceMax) return false;
    return true;
  }
  renderVals() {
    const s = this.state;
    const all = this.boats();
    const EX = { tube: 'Tube with rope', wake: 'Wakeboard', skis: 'Water skis', sup: 'Paddleboard', mat: 'Floating mat', cooler: 'Cooler with ice', speaker: 'Bluetooth speaker', fishing: 'Fishing gear' };
    const TY = { pontoon: 'Pontoon', ski: 'Ski / wake', center: 'Center console', sail: 'Sailboat', jet: 'Jet ski' };
    const floor = s.len === 'half' ? 150 : 300, ceil = s.len === 'half' ? 700 : 1200;
    const count = f => all.filter(b => this.match(b, f)).length;
    let res = all.filter(b => this.match(b, s));
    const pr = b => s.len === 'half' ? b.half : b.full;
    if (s.sort === 'plo') res = res.slice().sort((a, b) => pr(a) - pr(b));
    if (s.sort === 'phi') res = res.slice().sort((a, b) => pr(b) - pr(a));
    if (s.sort === 'rating') res = res.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (s.sort === 'dist') res = res.slice().sort((a, b) => a.dist - b.dist);
    const results = res.map(b => Object.assign({}, b, { price: pr(b), per: s.len === 'half' ? 'half day' : 'full day', hasRating: b.rating !== null, isNew: b.rating === null, rating: b.rating !== null ? b.rating.toFixed(1) : '' }));

    const chips = [];
    if (s.area !== 'all') chips.push({ label: s.area, patch: { area: 'all' } });
    if (s.cap === 'captain') chips.push({ label: 'Captain available', patch: { cap: 'any' } });
    if (s.cap === 'self') chips.push({ label: 'Self-drive', patch: { cap: 'any' } });
    if (s.rating) chips.push({ label: s.rating + '+ stars', patch: { rating: 0 } });
    if (s.priceMax !== null) chips.push({ label: 'Up to $' + s.priceMax, patch: { priceMax: null } });
    s.extras.forEach(x => chips.push({ label: EX[x], patch: { extras: s.extras.filter(y => y !== x) } }));
    s.types.forEach(t => chips.push({ label: TY[t], patch: { types: s.types.filter(y => y !== t) } }));
    const chipsOut = chips.map(c => ({ label: c.label, remove: () => this.upd(c.patch) }));
    const suggest = chips.map(c => ({ label: 'Remove “' + c.label + '”', n: count(Object.assign({}, s, c.patch)), apply: () => this.upd(c.patch) }))
      .concat([{ label: 'Lower to ' + Math.max(1, s.guests - 2) + ' guests', n: count(Object.assign({}, s, { guests: Math.max(1, s.guests - 2) })), apply: () => this.upd({ guests: Math.max(1, s.guests - 2) }) }])
      .filter(t => t.n > 0).sort((a, b) => b.n - a.n).slice(0, 3);

    const on = (a) => a ? { border: '2px solid #0F2A3D', bg: '#0F2A3D', fg: '#FFFFFF', pressed: 'true' } : { border: '1px solid #7B8F9B', bg: '#FFFFFF', fg: '#0F2A3D', pressed: 'false' };
    const quick = [
      Object.assign({ label: 'Captain available', toggle: () => this.upd({ cap: s.cap === 'captain' ? 'any' : 'captain' }) }, on(s.cap === 'captain')),
      Object.assign({ label: 'Self-drive', toggle: () => this.upd({ cap: s.cap === 'self' ? 'any' : 'self' }) }, on(s.cap === 'self')),
      Object.assign({ label: '4.5+ stars', toggle: () => this.upd({ rating: s.rating === 4.5 ? 0 : 4.5 }) }, on(s.rating === 4.5)),
      Object.assign({ label: 'Tube with rope', toggle: () => this.upd({ extras: s.extras.indexOf('tube') >= 0 ? s.extras.filter(x => x !== 'tube') : s.extras.concat('tube') }) }, on(s.extras.indexOf('tube') >= 0)),
      Object.assign({ label: 'Pontoon', toggle: () => this.upd({ types: s.types.indexOf('pontoon') >= 0 ? s.types.filter(x => x !== 'pontoon') : s.types.concat('pontoon') }) }, on(s.types.indexOf('pontoon') >= 0))
    ];
    const areas = ['all', 'Cornelius', 'Davidson', 'Huntersville', 'Mooresville', 'Denver', 'Sherrills Ford'].map(a => Object.assign({ label: a === 'all' ? 'All areas' : a, pick: () => this.upd({ area: a }) }, on(s.area === a)));
    const ratings = [[0, 'Any'], [4, '4+ ★'], [4.5, '4.5+ ★']].map(([v, l]) => ({ label: l, checked: s.rating === v, border: s.rating === v ? '2px solid #0A6C7A' : '1px solid #C9D6DD', bg: s.rating === v ? '#E3F2F4' : '#FFFFFF', pick: () => this.upd({ rating: v }) }));
    const caps = [['any', 'Either', 'Show all boats'], ['captain', 'Captain available', 'A licensed captain drives'], ['self', 'Self-drive', 'Age and boater education rules apply']].map(([v, l, sub]) => ({ label: l, sub, checked: s.cap === v, pick: () => this.upd({ cap: v }) }));
    const extras = Object.keys(EX).map(k => ({ label: EX[k], checked: s.extras.indexOf(k) >= 0, toggle: () => this.upd({ extras: s.extras.indexOf(k) >= 0 ? s.extras.filter(x => x !== k) : s.extras.concat(k) }) }));
    const types = Object.keys(TY).map(k => Object.assign({ label: TY[k], toggle: () => this.upd({ types: s.types.indexOf(k) >= 0 ? s.types.filter(x => x !== k) : s.types.concat(k) }) }, on(s.types.indexOf(k) >= 0)));

    const pins = results.map(b => ({ x: b.x, y: b.y, price: b.price, label: b.title + ', from $' + b.price, bg: s.sel === b.id ? '#0F2A3D' : '#FFFFFF', fg: s.sel === b.id ? '#FFFFFF' : '#0F2A3D', z: s.sel === b.id ? 4 : 2, pick: () => this.setState({ sel: b.id }) }));
    const selB = results.find(b => b.id === s.sel);
    const n = results.length;
    const isMap = s.view === 'map';
    return {
      guests: s.guests,
      incG: () => this.upd({ guests: Math.min(20, s.guests + 1) }),
      decG: () => this.upd({ guests: Math.max(1, s.guests - 1) }),
      quick, chips: chipsOut, hasActive: chips.length > 0, activeCount: chips.length,
      clearAll: () => this.upd({ area: 'all', cap: 'any', rating: 0, extras: [], types: [], priceMax: null }),
      countLabel: n === 1 ? '1 boat' : n + ' boats',
      lengthLabel: s.len === 'half' ? 'Half-day' : 'Full-day', lengthTitle: s.len === 'half' ? 'Half-day' : 'Full-day',
      halfPressed: s.len === 'half' ? 'true' : 'false', fullPressed: s.len === 'full' ? 'true' : 'false',
      halfBg: s.len === 'half' ? '#FFFFFF' : 'transparent', fullBg: s.len === 'full' ? '#FFFFFF' : 'transparent',
      setHalf: () => this.upd({ len: 'half', priceMax: null }), setFull: () => this.upd({ len: 'full', priceMax: null }),
      sort: s.sort, setSort: (e) => this.upd({ sort: e.target.value }),
      loading: s.loading, showEmpty: !s.loading && n === 0, showList: !s.loading && n > 0,
      results, suggest, skeletons: [1, 2, 3, 4],
      pins, hasSel: !!selB, sel: selB ? { id: selB.id, x: selB.x, y: selB.y, title: selB.title, area: selB.area, guests: selB.guests, price: selB.price, per: selB.per } : {},
      listCls: isMap ? 'off' : '', mapCls: isMap ? 'on' : '',
      listPressed: isMap ? 'false' : 'true', mapPressed: isMap ? 'true' : 'false',
      listBtnBg: isMap ? 'transparent' : '#FFFFFF', listBtnFg: isMap ? '#FFFFFF' : '#0F2A3D',
      mapBtnBg: isMap ? '#FFFFFF' : 'transparent', mapBtnFg: isMap ? '#0F2A3D' : '#FFFFFF',
      showListView: () => this.setState({ view: 'list' }), showMapView: () => this.setState({ view: 'map' }),
      panel: s.panel, openPanel: () => this.setState({ panel: true }), closePanel: () => this.setState({ panel: false }),
      areas, ratings, caps, extras, types,
      priceFloor: floor, priceCeil: ceil, priceMaxVal: s.priceMax === null ? ceil : s.priceMax,
      setMax: (e) => { const v = Number(e.target.value); this.upd({ priceMax: v >= ceil ? null : v }); }
    };
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{min-height:48px;padding:0 22px;font-size:16px}\n.btn-s{background:#fff;color:#0F2A3D;border:2px solid #0F2A3D}\n.btn-s:hover{background:#EEF4F7}\n.btn-sm{min-height:44px;padding:0 16px;font-size:15px}\n.pill{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;white-space:nowrap}\n.inp{width:100%;min-height:48px;border:1px solid #7B8F9B;border-radius:12px;padding:0 14px;background:#fff;font-size:16px;color:#0F2A3D}\n.tag{display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:600;border-radius:8px;padding:4px 9px}\n.sec{padding:22px 0;border-bottom:1px solid #DCE5EA}\n.sec h3,.sec legend{margin:0 0 12px;font-size:18px;font-weight:700;padding:0}\nfieldset{border:0;margin:0;padding:0;min-width:0}\n.opt{display:flex;align-items:center;gap:10px;min-height:48px;font-size:15px;cursor:pointer}\n.opt input{width:20px;height:20px;accent-color:#0A6C7A;margin:0;flex:none}\n.map{flex:1 1 520px;min-width:0;position:sticky;top:0;height:880px;background:#E7EFE3;overflow:hidden;border-left:1px solid #DCE5EA}\n.mtoggle{display:none}\n@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}\n.sk{background:#E1E9EE;border-radius:8px;animation:pulse 1.4s ease-in-out infinite}\n@media (prefers-reduced-motion: reduce){.sk{animation:none}}\n@media (max-width:900px){.map{display:none;position:relative;height:640px;flex-basis:100%;border-left:0}.map.on{display:block}.list.off{display:none}.mtoggle{display:flex}.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  useEffect(() => {
    fetch('/api/boats').then((r) => (r.ok ? r.json() : null)).then((j) => {
      if (j?.boats?.length) { ref.current.remote = j.boats; ref.current.setState({}); }
    }).catch(() => {});
  }, []);
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Lundro search results · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"minHeight": "100%", "background": "#F6F9FA", "fontFamily": "'Fellix','Figtree', system-ui, sans-serif", "color": "#0F2A3D", "fontSize": "16px", "lineHeight": "1.45"}}>
<header style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA", "padding": "12px 24px", "display": "flex", "flexWrap": "wrap", "alignItems": "center", "gap": "12px 24px"}}>
<Link href={"/"} aria-label={"Lundro home"} style={{"display": "flex", "alignItems": "center", "gap": "10px", "textDecoration": "none", "color": "#0F2A3D"}}>
<img src="/brand/lundro-logo-horizontal.png" alt="Lundro boat rentals" style={{ height: 44, width: "auto", display: "block" }} />
</Link>
<form role={"search"} aria-label={"Search boats"} style={{"flex": "1 1 480px", "maxWidth": "760px", "display": "flex", "flexWrap": "wrap", "alignItems": "center", "gap": "4px", "background": "#FFFFFF", "border": "1px solid #7B8F9B", "borderRadius": "28px", "padding": "4px 4px 4px 8px", "boxShadow": "0 2px 10px rgba(15, 42, 61, 0.08)"}}>
<label style={{"flex": "1.3 1 150px", "display": "flex", "flexDirection": "column", "padding": "4px 12px"}}>
<span style={{"fontSize": "12px", "fontWeight": "700", "letterSpacing": ".04em", "textTransform": "uppercase", "color": "#3D5160"}}>
{"Lake"}
</span>
<select aria-label={"Lake"} style={{"border": "0", "background": "transparent", "fontWeight": "600", "fontSize": "16px", "padding": "0", "minHeight": "26px"}}>
<option>
{"Lake Norman, NC"}
</option>
</select>
</label>
<label style={{"flex": "1 1 140px", "display": "flex", "flexDirection": "column", "padding": "4px 12px", "borderLeft": "1px solid #DCE5EA"}}>
<span style={{"fontSize": "12px", "fontWeight": "700", "letterSpacing": ".04em", "textTransform": "uppercase", "color": "#3D5160"}}>
{"Date"}
</span>
<input type={"date"} value={"2027-06-12"} style={{"border": "0", "background": "transparent", "fontWeight": "600", "fontSize": "16px", "padding": "0", "minHeight": "26px"}} />
</label>
<div style={{"flex": "1 1 150px", "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "4px", "padding": "0 4px 0 12px", "borderLeft": "1px solid #DCE5EA"}}>
<span style={{"display": "flex", "flexDirection": "column"}}>
<span style={{"fontSize": "12px", "fontWeight": "700", "letterSpacing": ".04em", "textTransform": "uppercase", "color": "#3D5160"}}>
{"Guests"}
</span>
<span aria-live={"polite"} style={{"fontWeight": "600"}}>
{s0?.guests}{" guests"}
</span>
</span>
<span style={{"display": "flex"}}>
<button type={"button"} aria-label={"Fewer guests"} onClick={s0?.decG} style={{"width": "40px", "height": "40px", "border": "1px solid #C9D6DD", "borderRadius": "50%", "background": "#fff", "cursor": "pointer"}}>
{"−"}
</button>
<button type={"button"} aria-label={"More guests"} onClick={s0?.incG} style={{"width": "40px", "height": "40px", "border": "1px solid #C9D6DD", "borderRadius": "50%", "background": "#fff", "cursor": "pointer", "marginLeft": "4px"}}>
{"+"}
</button>
</span>
</div>
</form>
<nav aria-label={"Account"} style={{"marginLeft": "auto", "display": "flex", "gap": "6px", "alignItems": "center"}}>
<Link href={"/owner/signup"} className={"hide-sm"} style={{"fontWeight": "600", "color": "#0F2A3D", "textDecoration": "none", "padding": "12px"}}>
{"List your boat"}
</Link>
<Link href={"/owner"} className={"btn btn-g btn-sm"}>
{"Log in"}
</Link>
</nav>
</header>
<div role={"toolbar"} aria-label={"Quick filters"} style={{"background": "#FFFFFF", "borderBottom": "1px solid #DCE5EA", "padding": "10px 24px", "display": "flex", "gap": "8px", "overflowX": "auto"}}>
<button type={"button"} className={"pill"} onClick={s0?.openPanel} style={{"border": "2px solid #0F2A3D", "background": "#fff", "fontWeight": "700", "flex": "none"}}>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M4 7h10M18 7h2M4 17h4M12 17h8"} />
<circle cx={"16"} cy={"7"} r={"2"} />
<circle cx={"10"} cy={"17"} r={"2"} />
</svg>
{"\nFilters"}
{s0?.hasActive ? (<>
<span style={{"background": "#0F2A3D", "color": "#fff", "fontSize": "12px", "borderRadius": "999px", "minWidth": "22px", "height": "22px", "display": "inline-grid", "placeItems": "center"}}>
{s0?.activeCount}
</span>
</>) : null}
</button>
{(s0?.quick || []).map((__it, __k) => { const s1 = { ...s0, "q": __it }; return (<Fragment key={__k}>
<button type={"button"} className={"pill"} aria-pressed={s1?.q?.pressed} onClick={s1?.q?.toggle} style={{"flex": "none", "border": s1?.q?.border, "background": s1?.q?.bg, "color": s1?.q?.fg}}>
{s1?.q?.label}
</button>
</Fragment>); })}
<span style={{"flex": "1 0 8px"}} />
<div role={"group"} aria-label={"Show prices for"} style={{"flex": "none", "display": "flex", "background": "#E8EFF2", "borderRadius": "999px", "padding": "4px"}}>
<button type={"button"} aria-pressed={s0?.halfPressed} onClick={s0?.setHalf} style={{"border": "0", "background": s0?.halfBg, "fontWeight": "700", "fontSize": "14px", "padding": "0 14px", "minHeight": "36px", "borderRadius": "999px", "cursor": "pointer"}}>
{"Half day"}
</button>
<button type={"button"} aria-pressed={s0?.fullPressed} onClick={s0?.setFull} style={{"border": "0", "background": s0?.fullBg, "fontWeight": "700", "fontSize": "14px", "padding": "0 14px", "minHeight": "36px", "borderRadius": "999px", "cursor": "pointer"}}>
{"Full day"}
</button>
</div>
</div>
<main style={{"display": "flex", "flexWrap": "wrap", "alignItems": "flex-start"}}>
<section className={`list ${s0?.listCls ?? ""}`} aria-labelledby={"res-h"} style={{"flex": "1 1 720px", "minWidth": "0", "padding": "24px 24px 120px"}}>
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<h1 id={"res-h"} className={"disp"} aria-live={"polite"} style={{"margin": "0", "fontSize": "30px", "fontWeight": "700"}}>
{s0?.countLabel}{" on Lake Norman"}
</h1>
<p className={"muted"} style={{"margin": "4px 0 0"}}>
{"Available Sat, Jun 12 · fit "}{s0?.guests}{" or more guests · "}{s0?.lengthLabel}{" prices"}
</p>
</div>
<div style={{"display": "flex", "alignItems": "center", "gap": "8px"}}>
<label htmlFor={"sort"} style={{"fontWeight": "600", "color": "#3D5160"}}>
{"Sort"}
</label>
<select id={"sort"} className={"inp"} onChange={s0?.setSort} value={s0?.sort} style={{"width": "auto", "fontWeight": "600"}}>
<option value={"rec"}>
{"Recommended"}
</option>
<option value={"plo"}>
{"Price: low to high"}
</option>
<option value={"phi"}>
{"Price: high to low"}
</option>
<option value={"rating"}>
{"Rating"}
</option>
<option value={"dist"}>
{"Distance"}
</option>
</select>
</div>
</div>
{s0?.hasActive ? (<>
<div style={{"display": "flex", "flexWrap": "wrap", "alignItems": "center", "gap": "8px", "marginTop": "16px"}}>
{(s0?.chips || []).map((__it, __k) => { const s1 = { ...s0, "c": __it }; return (<Fragment key={__k}>
<span style={{"display": "inline-flex", "alignItems": "center", "background": "#E3F2F4", "color": "#0B4F59", "fontSize": "14px", "fontWeight": "600", "borderRadius": "999px", "padding": "0 2px 0 14px", "minHeight": "40px"}}>
{s1?.c?.label}
<button type={"button"} aria-label={`Remove filter ${s1?.c?.label ?? ""}`} onClick={s1?.c?.remove} style={{"border": "0", "background": "transparent", "color": "#0B4F59", "width": "36px", "height": "36px", "borderRadius": "50%", "cursor": "pointer", "display": "grid", "placeItems": "center"}}>
<svg width={"14"} height={"14"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.6"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M6 6l12 12M18 6L6 18"} />
</svg>
</button>
</span>
</Fragment>); })}
<button type={"button"} onClick={s0?.clearAll} style={{"border": "0", "background": "transparent", "color": "#0A6C7A", "fontWeight": "700", "padding": "8px", "cursor": "pointer", "textDecoration": "underline"}}>
{"Clear all"}
</button>
</div>
</>) : null}
{s0?.loading ? (<>
<div role={"status"} aria-label={"Loading boats"} style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(280px, 1fr))", "gap": "32px 20px", "marginTop": "24px"}}>
{(s0?.skeletons || []).map((__it, __k) => { const s1 = { ...s0, "s": __it }; return (<Fragment key={__k}>
<div style={{"display": "flex", "flexDirection": "column", "gap": "10px"}}>
<div className={"sk"} style={{"aspectRatio": "4 / 3", "borderRadius": "18px"}} />
<div className={"sk"} style={{"height": "20px", "width": "70%"}} />
<div className={"sk"} style={{"height": "14px", "width": "45%"}} />
<div className={"sk"} style={{"height": "18px", "width": "50%"}} />
</div>
</Fragment>); })}
</div>
</>) : null}
{s0?.showEmpty ? (<>
<div style={{"marginTop": "32px", "background": "#FFFFFF", "border": "1px solid #DCE5EA", "borderRadius": "22px", "padding": "32px", "textAlign": "center", "maxWidth": "560px", "marginLeft": "auto", "marginRight": "auto"}}>
<svg width={"96"} height={"72"} viewBox={"0 0 120 88"} aria-hidden={"true"}>
<ellipse cx={"60"} cy={"74"} rx={"54"} ry={"10"} fill={"#D7ECF4"} />
<path d={"M60 8 L60 62"} stroke={"#0F2A3D"} strokeWidth={"2.5"} />
<rect x={"44"} y={"40"} width={"32"} height={"26"} rx={"13"} fill={"#FFFFFF"} stroke={"#0F2A3D"} strokeWidth={"2.5"} />
<rect x={"44"} y={"49"} width={"32"} height={"8"} fill={"#E8613C"} />
<circle cx={"60"} cy={"10"} r={"5"} fill={"#FFC94A"} stroke={"#0F2A3D"} strokeWidth={"2.5"} />
</svg>
<h2 className={"disp"} style={{"margin": "12px 0 0", "fontSize": "24px"}}>
{"No boats match every filter"}
</h2>
<p className={"muted"} style={{"margin": "6px 0 0"}}>
{"Loosen one of these to see more boats:"}
</p>
<ul style={{"listStyle": "none", "padding": "0", "margin": "18px 0 0", "display": "flex", "flexDirection": "column", "gap": "8px", "textAlign": "left"}}>
{(s0?.suggest || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<li>
<button type={"button"} onClick={s1?.t?.apply} style={{"width": "100%", "display": "flex", "alignItems": "center", "justifyContent": "space-between", "gap": "12px", "border": "1px solid #C9D6DD", "background": "#fff", "borderRadius": "14px", "padding": "12px 16px", "minHeight": "56px", "cursor": "pointer", "textAlign": "left"}}>
<span>
<span style={{"display": "block", "fontWeight": "700"}}>
{s1?.t?.label}
</span>
<span style={{"display": "block", "fontSize": "14px", "fontWeight": "600", "color": "#0B4F59"}}>
{"Show "}{s1?.t?.n}{" boats"}
</span>
</span>
<svg width={"18"} height={"18"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M9 6l6 6-6 6"} />
</svg>
</button>
</li>
</Fragment>); })}
</ul>
<button type={"button"} className={"btn btn-s"} onClick={s0?.clearAll} style={{"marginTop": "18px"}}>
{"Clear all filters"}
</button>
</div>
</>) : null}
{s0?.showList ? (<>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(auto-fill, minmax(280px, 1fr))", "gap": "32px 20px", "marginTop": "24px"}}>
{(s0?.results || []).map((__it, __k) => { const s1 = { ...s0, "item": __it }; return (<Fragment key={__k}>
<article style={{"position": "relative"}}>
<Link href={`/boat?id=${s1?.item?.id}`} style={{"display": "flex", "flexDirection": "column", "gap": "12px", "textDecoration": "none", "color": "#0F2A3D"}}>
<span style={{"position": "relative", "display": "block", "borderRadius": "18px", "overflow": "hidden", "aspectRatio": "4 / 3"}}>
<svg viewBox={"0 0 400 300"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "display": "block"}}>
<rect width={"400"} height={"300"} fill={s1?.item?.sky} />
<circle cx={s1?.item?.sunX} cy={"62"} r={"24"} fill={s1?.item?.sun} />
<path d={"M0 150 Q50 118 110 136 T230 126 T330 132 T400 124 V176 H0 Z"} fill={s1?.item?.hillFar} />
<path d={"M0 168 Q90 146 180 162 T400 156 V186 H0 Z"} fill={s1?.item?.hillNear} />
<rect y={"182"} width={"400"} height={"118"} fill={s1?.item?.water} />
<rect x={"40"} y={"210"} width={"70"} height={"3"} rx={"1.5"} fill={"#FFFFFF"} opacity={"0.35"} />
<rect x={"290"} y={"236"} width={"80"} height={"3"} rx={"1.5"} fill={"#FFFFFF"} opacity={"0.3"} />
<g transform={`translate(${s1?.item?.boatX ?? ""} 0)`}>
<rect x={"6"} y={"242"} width={"148"} height={"6"} rx={"3"} fill={"#000000"} opacity={"0.1"} />
<rect x={"0"} y={"232"} width={"160"} height={"8"} rx={"4"} fill={"#B8C4CC"} />
<rect x={"4"} y={"212"} width={"152"} height={"20"} rx={"4"} fill={"#FFFFFF"} />
<rect x={"4"} y={"221"} width={"152"} height={"3"} fill={s1?.item?.accent} />
<rect x={"38"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<rect x={"118"} y={"186"} width={"2.5"} height={"26"} fill={"#5B6B77"} />
<path d={"M30 187 H128 Q124 177 79 177 Q34 177 30 187 Z"} fill={s1?.item?.accent} />
</g>
</svg>
<span aria-hidden={"true"} style={{"position": "absolute", "bottom": "12px", "left": "0", "right": "0", "display": "flex", "justifyContent": "center", "gap": "6px"}}>
<span style={{"width": "8px", "height": "8px", "borderRadius": "50%", "background": "#fff"}} />
<span style={{"width": "6px", "height": "6px", "marginTop": "1px", "borderRadius": "50%", "background": "rgba(255,255,255,.65)"}} />
<span style={{"width": "6px", "height": "6px", "marginTop": "1px", "borderRadius": "50%", "background": "rgba(255,255,255,.65)"}} />
<span style={{"width": "6px", "height": "6px", "marginTop": "1px", "borderRadius": "50%", "background": "rgba(255,255,255,.65)"}} />
</span>
</span>
<span style={{"display": "flex", "flexDirection": "column", "gap": "2px"}}>
<span style={{"display": "flex", "justifyContent": "space-between", "gap": "10px", "alignItems": "flex-start"}}>
<span className={"disp"} style={{"fontSize": "19px", "fontWeight": "600", "lineHeight": "1.25"}}>
{s1?.item?.title}
</span>
{s1?.item?.hasRating ? (<>
<span style={{"display": "inline-flex", "alignItems": "center", "gap": "4px", "fontWeight": "700", "fontSize": "15px", "whiteSpace": "nowrap"}}>
<svg width={"15"} height={"15"} viewBox={"0 0 24 24"} fill={"#E39B0B"} aria-hidden={"true"}>
<path d={"M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"} />
</svg>
{s1?.item?.rating}{" "}
<span className={"muted"} style={{"fontWeight": "500"}}>
{"("}{s1?.item?.reviews}{")"}
</span>
</span>
</>) : null}
{s1?.item?.isNew ? (<>
<span style={{"background": "#FFEDE3", "color": "#9A3412", "fontSize": "13px", "fontWeight": "700", "borderRadius": "999px", "padding": "3px 10px"}}>
{"New"}
</span>
</>) : null}
</span>
<span className={"muted"} style={{"fontSize": "15px"}}>
{"Lake Norman · "}{s1?.item?.area}
</span>
<span className={"muted"} style={{"fontSize": "15px"}}>
{"Up to "}{s1?.item?.guests}{" guests"}
</span>
<span style={{"marginTop": "4px"}}>
{"From "}
<strong style={{"fontSize": "18px"}}>
{"$"}{s1?.item?.price}
</strong>
{" "}
<span className={"muted"}>
{"/ "}{s1?.item?.per}
</span>
</span>
<span style={{"display": "flex", "flexWrap": "wrap", "gap": "6px", "marginTop": "8px"}}>
{s1?.item?.captain ? (<>
<span className={"tag"} style={{"background": "#E3F2F4", "color": "#0B4F59"}}>
{"Captain available"}
</span>
</>) : null}
{s1?.item?.self ? (<>
<span className={"tag"} style={{"background": "#F3EEE3", "color": "#5E4513"}}>
{"Self-drive"}
</span>
</>) : null}
{s1?.item?.instant ? (<>
<span className={"tag"} style={{"background": "#FFF1C7", "color": "#5C4300"}}>
<svg width={"13"} height={"13"} viewBox={"0 0 24 24"} fill={"currentColor"} aria-hidden={"true"}>
<path d={"M13 2L4 14h7l-1 8 9-12h-7z"} />
</svg>
{"Instant book"}
</span>
</>) : null}
</span>
</span>
</Link>
<button type={"button"} aria-label={`Save ${s1?.item?.title ?? ""}`} style={{"position": "absolute", "top": "12px", "right": "12px", "width": "44px", "height": "44px", "borderRadius": "50%", "border": "0", "background": "rgba(255,255,255,.94)", "display": "grid", "placeItems": "center", "cursor": "pointer", "boxShadow": "0 1px 4px rgba(15,42,61,.18)"}}>
<svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinejoin={"round"} aria-hidden={"true"}>
<path d={"M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"} />
</svg>
</button>
</article>
</Fragment>); })}
</div>
</>) : null}
</section>
<aside className={`map ${s0?.mapCls ?? ""}`} aria-label={"Map of results"}>
<svg viewBox={"0 0 600 900"} preserveAspectRatio={"xMidYMid slice"} aria-hidden={"true"} style={{"position": "absolute", "inset": "0", "width": "100%", "height": "100%", "display": "block"}}>
<rect width={"600"} height={"900"} fill={"#E7EFE3"} />
<rect x={"40"} y={"380"} width={"110"} height={"80"} rx={"24"} fill={"#D5E6CC"} />
<rect x={"450"} y={"660"} width={"120"} height={"90"} rx={"24"} fill={"#D5E6CC"} />
<path d={"M525 0 C512 200 532 400 516 600 S502 800 512 900"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"8"} />
<path d={"M0 262 C150 250 250 300 600 290"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"6"} />
<path d={"M0 612 C200 618 350 646 600 626"} fill={"none"} stroke={"#FFFFFF"} strokeWidth={"6"} />
<path d={"M300 40 C320 90 340 120 330 170 C360 190 420 180 450 210 C420 230 370 225 350 250 C365 300 400 320 430 360 C400 375 360 350 345 370 C350 420 380 450 420 470 C440 480 470 470 480 495 C450 510 400 500 375 520 C380 570 400 610 390 660 C385 720 395 780 360 850 C340 820 330 780 320 740 C290 720 240 730 200 715 C230 695 280 690 300 670 C295 620 270 590 230 580 C190 575 160 590 130 570 C165 550 220 555 255 540 C270 500 260 460 230 440 C200 430 170 445 150 420 C180 405 230 410 260 395 C275 350 270 300 250 270 C230 250 200 255 185 235 C215 220 260 230 285 215 C295 160 280 100 300 40 Z"} fill={"#B9DCEB"} stroke={"#9CC9DE"} strokeWidth={"2"} />
<text x={"292"} y={"470"} fill={"#2C6A84"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"17"} fontStyle={"italic"} fontWeight={"600"} transform={"rotate(-80 292 470)"}>
{"Lake Norman"}
</text>
<text x={"452"} y={"252"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Mooresville"}
</text>
<text x={"440"} y={"440"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Davidson"}
</text>
<text x={"420"} y={"600"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Cornelius"}
</text>
<text x={"420"} y={"790"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Huntersville"}
</text>
<text x={"96"} y={"650"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Denver"}
</text>
<text x={"96"} y={"210"} fill={"#3D5160"} fontFamily={"Fellix, Figtree, sans-serif"} fontSize={"15"} fontWeight={"600"}>
{"Sherrills Ford"}
</text>
</svg>
{(s0?.pins || []).map((__it, __k) => { const s1 = { ...s0, "p": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-label={s1?.p?.label} onClick={s1?.p?.pick} style={{"position": "absolute", "left": `${s1?.p?.x ?? ""}%`, "top": `${s1?.p?.y ?? ""}%`, "transform": "translate(-50%, -50%)", "border": "2px solid #FFFFFF", "background": s1?.p?.bg, "color": s1?.p?.fg, "fontWeight": "700", "fontSize": "14px", "padding": "0 12px", "minHeight": "36px", "borderRadius": "999px", "boxShadow": "0 2px 8px rgba(15,42,61,.28)", "cursor": "pointer", "zIndex": s1?.p?.z}}>
{"$"}{s1?.p?.price}
</button>
</Fragment>); })}
{s0?.hasSel ? (<>
<Link href={`/boat?id=${s0?.sel?.id}`} style={{"position": "absolute", "left": `${s0?.sel?.x ?? ""}%`, "top": `${s0?.sel?.y ?? ""}%`, "transform": "translate(-50%, -100%)", "marginTop": "-26px", "width": "270px", "background": "#fff", "borderRadius": "16px", "boxShadow": "0 8px 28px rgba(15,42,61,.28)", "textDecoration": "none", "color": "#0F2A3D", "padding": "12px 14px", "zIndex": "5", "display": "block"}}>
<span style={{"display": "block", "fontWeight": "700"}}>
{s0?.sel?.title}
</span>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{s0?.sel?.area}{" · Up to "}{s0?.sel?.guests}{" guests"}
</span>
<span style={{"display": "block", "fontSize": "14px", "marginTop": "4px"}}>
{"From "}
<strong>
{"$"}{s0?.sel?.price}
</strong>
{" / "}{s0?.sel?.per}{" · "}
<span style={{"color": "#0A6C7A", "fontWeight": "700"}}>
{"View boat"}
</span>
</span>
</Link>
</>) : null}
<p style={{"position": "absolute", "left": "16px", "bottom": "16px", "right": "16px", "margin": "0", "maxWidth": "360px", "background": "rgba(255,255,255,.95)", "borderRadius": "12px", "padding": "10px 14px", "fontSize": "13px", "color": "#3D5160"}}>
{"Pins show each boat's pickup marina. The exact address is shared after booking."}
</p>
</aside>
</main>
<div className={"mtoggle"} role={"group"} aria-label={"View results as"} style={{"position": "fixed", "left": "50%", "bottom": "20px", "transform": "translateX(-50%)", "background": "#0F2A3D", "borderRadius": "999px", "padding": "4px", "boxShadow": "0 6px 20px rgba(15,42,61,.35)", "zIndex": "20"}}>
<button type={"button"} aria-pressed={s0?.listPressed} onClick={s0?.showListView} style={{"border": "0", "background": s0?.listBtnBg, "color": s0?.listBtnFg, "fontWeight": "700", "padding": "0 20px", "minHeight": "44px", "borderRadius": "999px", "cursor": "pointer"}}>
{"List"}
</button>
<button type={"button"} aria-pressed={s0?.mapPressed} onClick={s0?.showMapView} style={{"border": "0", "background": s0?.mapBtnBg, "color": s0?.mapBtnFg, "fontWeight": "700", "padding": "0 20px", "minHeight": "44px", "borderRadius": "999px", "cursor": "pointer"}}>
{"Map"}
</button>
</div>
{s0?.panel ? (<>
<div style={{"position": "fixed", "inset": "0", "background": "rgba(15,42,61,.55)", "zIndex": "30", "display": "flex", "alignItems": "flex-end", "justifyContent": "center"}}>
<div role={"dialog"} aria-modal={"true"} aria-labelledby={"flt-h"} style={{"background": "#fff", "width": "100%", "maxWidth": "640px", "maxHeight": "92%", "borderRadius": "24px 24px 0 0", "display": "flex", "flexDirection": "column"}}>
<div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "padding": "10px 8px", "borderBottom": "1px solid #DCE5EA"}}>
<button type={"button"} aria-label={"Close filters"} onClick={s0?.closePanel} style={{"width": "44px", "height": "44px", "border": "0", "background": "transparent", "borderRadius": "50%", "cursor": "pointer", "display": "grid", "placeItems": "center"}}>
<svg width={"20"} height={"20"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2.4"} strokeLinecap={"round"} aria-hidden={"true"}>
<path d={"M6 6l12 12M18 6L6 18"} />
</svg>
</button>
<h2 id={"flt-h"} className={"disp"} style={{"margin": "0", "fontSize": "20px"}}>
{"Filters"}
</h2>
<span style={{"width": "44px"}} />
</div>
<div style={{"overflowY": "auto", "padding": "0 24px"}}>
<div className={"sec"}>
<h3>
{"Area"}
</h3>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "8px"}}>
{(s0?.areas || []).map((__it, __k) => { const s1 = { ...s0, "a": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.a?.pressed} onClick={s1?.a?.pick} className={"pill"} style={{"border": s1?.a?.border, "background": s1?.a?.bg, "color": s1?.a?.fg}}>
{s1?.a?.label}
</button>
</Fragment>); })}
</div>
<div style={{"display": "flex", "gap": "8px", "marginTop": "14px", "alignItems": "flex-end", "flexWrap": "wrap"}}>
<label style={{"flex": "0 0 110px", "fontSize": "14px", "fontWeight": "600", "color": "#3D5160"}}>
{"Or within"}
<select className={"inp"} style={{"marginTop": "6px"}}>
<option>
{"10 mi"}
</option>
<option>
{"25 mi"}
</option>
<option>
{"50 mi"}
</option>
</select>
</label>
<label style={{"flex": "1 1 200px", "fontSize": "14px", "fontWeight": "600", "color": "#3D5160"}}>
{"of a city, ZIP or address"}
<input className={"inp"} type={"text"} placeholder={"e.g. Charlotte or 28031"} style={{"marginTop": "6px"}} />
</label>
</div>
</div>
<div className={"sec"}>
<h3>
{s0?.lengthTitle}{" price"}
</h3>
<p className={"muted"} style={{"margin": "-6px 0 10px", "fontSize": "14px"}}>
{"Boat price only, before extras, fees and tax. Switch half or full day from the bar above."}
</p>
<label style={{"display": "block", "fontWeight": "600"}}>
{"Up to "}
<strong>
{"$"}{s0?.priceMaxVal}
</strong>
<input type={"range"} min={s0?.priceFloor} max={s0?.priceCeil} step={"10"} value={s0?.priceMaxVal} onChange={s0?.setMax} style={{"width": "100%", "accentColor": "#0A6C7A", "height": "32px", "marginTop": "6px"}} />
</label>
<div className={"muted"} style={{"display": "flex", "justifyContent": "space-between", "fontSize": "13px"}}>
<span>
{"$"}{s0?.priceFloor}
</span>
<span>
{"$"}{s0?.priceCeil}{"+"}
</span>
</div>
</div>
<fieldset className={"sec"}>
<legend>
{"Rating"}
</legend>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap"}}>
{(s0?.ratings || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<label className={"opt"} style={{"border": s1?.r?.border, "background": s1?.r?.bg, "borderRadius": "12px", "padding": "0 16px", "flex": "1 1 90px"}}>
<input type={"radio"} name={"rating"} checked={s1?.r?.checked} onChange={s1?.r?.pick} />
{s1?.r?.label}
</label>
</Fragment>); })}
</div>
<p className={"muted"} style={{"margin": "10px 0 0", "fontSize": "14px"}}>
{"New boats without reviews still show, marked “New”."}
</p>
</fieldset>
<fieldset className={"sec"}>
<legend>
{"Captain or self-drive"}
</legend>
{(s0?.caps || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<label className={"opt"}>
<input type={"radio"} name={"cap"} checked={s1?.r?.checked} onChange={s1?.r?.pick} />
<span>
{s1?.r?.label}
<span className={"muted"} style={{"display": "block", "fontSize": "14px"}}>
{s1?.r?.sub}
</span>
</span>
</label>
</Fragment>); })}
</fieldset>
<fieldset className={"sec"}>
<legend>
{"Extras"}
</legend>
<p className={"muted"} style={{"margin": "-6px 0 6px", "fontSize": "14px"}}>
{"Boats must offer every extra you pick."}
</p>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "0 12px"}}>
{(s0?.extras || []).map((__it, __k) => { const s1 = { ...s0, "x": __it }; return (<Fragment key={__k}>
<label className={"opt"}>
<input type={"checkbox"} checked={s1?.x?.checked} onChange={s1?.x?.toggle} />
{s1?.x?.label}
</label>
</Fragment>); })}
</div>
</fieldset>
<div className={"sec"} style={{"borderBottom": "0"}}>
<h3>
{"Boat type"}
</h3>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "8px"}}>
{(s0?.types || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<button type={"button"} aria-pressed={s1?.t?.pressed} onClick={s1?.t?.toggle} className={"pill"} style={{"border": s1?.t?.border, "background": s1?.t?.bg, "color": s1?.t?.fg}}>
{s1?.t?.label}
</button>
</Fragment>); })}
</div>
</div>
</div>
<div style={{"display": "flex", "alignItems": "center", "gap": "16px", "padding": "14px 24px", "borderTop": "1px solid #DCE5EA"}}>
<button type={"button"} onClick={s0?.clearAll} style={{"border": "0", "background": "transparent", "fontWeight": "700", "textDecoration": "underline", "minHeight": "48px", "cursor": "pointer"}}>
{"Clear all"}
</button>
<button type={"button"} className={"btn btn-p"} aria-live={"polite"} onClick={s0?.closePanel} style={{"flex": "1", "borderRadius": "14px", "minHeight": "54px"}}>
{"Show "}{s0?.countLabel}
</button>
</div>
</div>
</div>
</>) : null}
</div>
    </>
  );
}
