'use client';
// Generated from source/Dash-Extras.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { sel: 'hour', saved: false, addOpen: false, addTab: 'cat', cus: { name: '' },
      ex: [
        { id: 'tube', name: 'Tube with rope', src: 'Water activities', price: 40, per: 'per booking', qty: 2, tax: 'Gear rental (state + county + transit)', desc: '1 to 2 riders, tow rope included', on: { B: 1, M: 1, H: 1 }, ov: {} },
        { id: 'sup', name: 'Paddleboard', src: 'Water activities', price: 25, per: 'per item', qty: 2, tax: 'Gear rental (state + county + transit)', desc: 'Inflatable, with paddle', on: { B: 1, H: 1 }, ov: {} },
        { id: 'mat', name: 'Floating mat', src: 'Water activities', price: 35, per: 'per booking', qty: 1, tax: 'Gear rental (state + county + transit)', desc: '18 ft lily pad', on: { B: 1, H: 1 }, ov: {} },
        { id: 'wake', name: 'Wakeboard', src: 'Water activities', price: 30, per: 'per booking', qty: 2, tax: 'Gear rental (state + county + transit)', desc: 'Adult and youth bindings', on: { M: 1 }, ov: {} },
        { id: 'cooler', name: 'Cooler with ice', src: 'Comfort', price: 20, per: 'per booking', qty: 3, tax: 'Gear rental (state + county + transit)', desc: '70 qt, filled at pickup', on: { B: 1, M: 1, H: 1 }, ov: {} },
        { id: 'speaker', name: 'Bluetooth speaker', src: 'Comfort', price: 15, per: 'per booking', qty: 2, tax: 'Gear rental (state + county + transit)', desc: 'Waterproof', on: { B: 1, M: 1 }, ov: {} },
        { id: 'hour', name: 'Extra hour', src: 'Time', price: 85, per: 'per hour', qty: '—', tax: 'Boat time (3% state)', desc: 'Add time to the trip', on: { B: 1, M: 1, H: 1 }, ov: { M: '130', H: '140' } },
        { id: 'water', name: 'Bottled water (24 pack)', src: 'Food and drinks', price: 12, per: 'per item', qty: 6, tax: 'Food and drinks (pending NCDOR guidance)', desc: 'Cold, waiting on board', on: { H: 1 }, ov: {} },
        { id: 'photo', name: 'Sunset photo package', src: 'Custom', price: 45, per: 'per booking', qty: 1, tax: 'Service (pending NCDOR guidance)', desc: 'Captain takes photos, sent same day', on: { H: 1 }, ov: {} }
      ] };
  }
  renderVals() {
    const s = this.state;
    const BOATS = [['B', "24' Bennington Pontoon"], ['M', "22' MasterCraft XT22"], ['H', "26' Harris Grand Mariner"]];
    const updEx = (id, fn) => this.setState({ ex: this.state.ex.map(e => e.id === id ? fn(e) : e), saved: false });
    const rows = s.ex.map(e => {
      const custom = e.src === 'Custom';
      return { name: e.name, source: custom ? 'Custom' : 'Catalog · ' + e.src, srcBg: custom ? '#F3EEE3' : '#E3F2F4', srcFg: custom ? '#5E4513' : '#0B4F59',
        price: e.price, per: e.per, qty: e.qty, tax: e.tax, used: Object.keys(e.on).filter(k => e.on[k]).length,
        rowBg: s.sel === e.id ? '#F0FAFB' : 'transparent', pick: () => this.setState({ sel: e.id, saved: false }) };
    });
    const x = s.ex.find(e => e.id === s.sel) || s.ex[0];
    const sel = { name: x.name, source: x.src === 'Custom' ? 'Custom extra' : 'Lundro catalog · ' + x.src, desc: x.desc, price: x.price, per: x.per, qty: x.qty, tax: x.tax, catalog: x.src !== 'Custom',
      boats: BOATS.map(([k, name]) => ({ name, on: !!x.on[k], off: !x.on[k], override: x.ov[k] || '',
        toggle: () => updEx(x.id, e => Object.assign({}, e, { on: Object.assign({}, e.on, { [k]: !e.on[k] }) })),
        setOverride: ev => updEx(x.id, e => Object.assign({}, e, { ov: Object.assign({}, e.ov, { [k]: ev.target.value }) })) })) };
    const have = s.ex.map(e => e.name);
    const CAT = [['Water activities', ['Tube with rope', 'Wakeboard', 'Water skis', 'Kneeboard', 'Paddleboard', 'Floating mat']], ['Comfort', ['Cooler with ice', 'Towels', 'Bluetooth speaker', 'Floating chairs']], ['Food and drinks', ['Bottled water (24 pack)', 'Sodas', 'Snack package']], ['Fishing', ['Rods and reels', 'Tackle box', 'Bait']], ['Party', ['Birthday package', 'Decorations']], ['Family', ['Child life jackets', 'Infant life jackets', 'Water toys']], ['Time', ['Extra hour', 'Sunset extension', 'Full-day upgrade']], ['Services', ['Fuel package', 'Cleaning']]];
    const catalog = CAT.map(([cat, items]) => ({ cat, items: items.map(label => ({ label: have.indexOf(label) >= 0 ? '✓ ' + label : '+ ' + label, have: have.indexOf(label) >= 0,
      add: () => { const id = 'n' + Date.now(); this.setState({ ex: this.state.ex.concat({ id, name: label, src: cat, price: 20, per: 'per booking', qty: 1, tax: cat === 'Time' ? 'Boat time (3% state)' : (cat === 'Food and drinks' || cat === 'Services' ? 'Pending NCDOR guidance' : 'Gear rental (state + county + transit)'), desc: '', on: {}, ov: {} }), sel: id, addOpen: false }); } })) }));
    return ({
      rows, sel, saved: s.saved, save: () => this.setState({ saved: true }),
      addOpen: s.addOpen, openAdd: () => this.setState({ addOpen: true }), closeAdd: () => this.setState({ addOpen: false }),
      isCat: s.addTab === 'cat', isCus: s.addTab === 'cus', tabCat: () => this.setState({ addTab: 'cat' }), tabCus: () => this.setState({ addTab: 'cus' }),
      tabCatSel: s.addTab === 'cat' ? 'true' : 'false', tabCusSel: s.addTab === 'cus' ? 'true' : 'false', tabCatLine: s.addTab === 'cat' ? '#0A6C7A' : 'transparent', tabCusLine: s.addTab === 'cus' ? '#0A6C7A' : 'transparent',
      catalog, cus: s.cus, setCusName: e => this.setState({ cus: { name: e.target.value } }),
      addCustom: () => { const id = 'c' + Date.now(); this.setState({ ex: s.ex.concat({ id, name: s.cus.name || 'New custom extra', src: 'Custom', price: 0, per: 'per booking', qty: 1, tax: 'Gear rental (state + county + transit)', desc: '', on: {}, ov: {} }), sel: id, addOpen: false, cus: { name: '' } }); }
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.btn-g:disabled{opacity:.45;cursor:not-allowed}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:20px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\n.inp:disabled{background:#F1F6F8;color:#3D5160}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\ntable{width:100%;border-collapse:collapse;font-size:15px}\nth{text-align:left;font-size:13px;color:#3D5160;font-weight:700;padding:10px 12px;border-bottom:1px solid #DCE5EA;white-space:nowrap}\ntd{padding:10px 12px;border-bottom:1px solid #EEF2F4;vertical-align:middle}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Extras library · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<div style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "flex-end", "gap": "12px"}}>
<div>
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Extras library"}
</h1>
<p className={"muted"} style={{"margin": "2px 0 0", "maxWidth": "620px"}}>
{"Create each extra once, then switch it on for any boat. Catalog extras show up in renter search filters; custom extras show on your boat pages only."}
</p>
</div>
<button type={"button"} className={"btn btn-p"} onClick={s0?.openAdd}>
{"+ Add extra"}
</button>
</div>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "20px", "alignItems": "flex-start"}}>
<section className={"card"} style={{"flex": "999 1 560px", "minWidth": "0", "padding": "8px 8px 4px"}} aria-label={"Your extras"}>
<div style={{"overflowX": "auto"}}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Extra"}
</th>
<th scope={"col"}>
{"Price"}
</th>
<th scope={"col"} className={"hide-sm"}>
{"Qty"}
</th>
<th scope={"col"} className={"hide-sm"}>
{"Tax category"}
</th>
<th scope={"col"}>
{"Boats"}
</th>
</tr>
</thead>
<tbody>
{(s0?.rows || []).map((__it, __k) => { const s1 = { ...s0, "r": __it }; return (<Fragment key={__k}>
<tr style={{"background": s1?.r?.rowBg}}>
<td>
<button type={"button"} onClick={s1?.r?.pick} aria-label={`Edit ${s1?.r?.name ?? ""}`} style={{"border": "0", "background": "transparent", "padding": "4px 0", "textAlign": "left", "cursor": "pointer", "minHeight": "44px"}}>
<strong style={{"display": "block", "color": "#0A6C7A", "textDecoration": "underline"}}>
{s1?.r?.name}
</strong>
<span className={"badge"} style={{"background": s1?.r?.srcBg, "color": s1?.r?.srcFg, "marginTop": "2px"}}>
{s1?.r?.source}
</span>
</button>
</td>
<td style={{"whiteSpace": "nowrap"}}>
<strong>
{"$"}{s1?.r?.price}
</strong>
{" "}
<span className={"muted"} style={{"fontSize": "13px"}}>
{s1?.r?.per}
</span>
</td>
<td className={"hide-sm"}>
{s1?.r?.qty}
</td>
<td className={"hide-sm"} style={{"fontSize": "14px"}}>
{s1?.r?.tax}
</td>
<td>
{s1?.r?.used}{" of 3"}
</td>
</tr>
</Fragment>); })}
</tbody>
</table>
</div>
</section>
<aside className={"card"} aria-labelledby={"ed-h"} style={{"flex": "1 1 340px", "minWidth": "0"}}>
<h2 id={"ed-h"} className={"disp"} style={{"margin": "0", "fontSize": "22px"}}>
{s0?.sel?.name}
</h2>
<p className={"muted"} style={{"margin": "2px 0 0", "fontSize": "14px"}}>
{s0?.sel?.source}
</p>
<div style={{"display": "flex", "flexDirection": "column", "gap": "12px", "marginTop": "14px"}}>
<div>
<label htmlFor={"e-desc"} className={"lbl"}>
{"Short description"}
</label>
<input id={"e-desc"} className={"inp"} value={s0?.sel?.desc} />
</div>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "10px"}}>
<div>
<label htmlFor={"e-price"} className={"lbl"}>
{"Default price"}
</label>
<input id={"e-price"} className={"inp"} value={`\$${s0?.sel?.price ?? ""}`} />
</div>
<div>
<label htmlFor={"e-per"} className={"lbl"}>
{"Pricing"}
</label>
<select id={"e-per"} className={"inp"}>
<option>
{s0?.sel?.per}
</option>
<option>
{"per booking"}
</option>
<option>
{"per hour"}
</option>
<option>
{"per person"}
</option>
<option>
{"per item"}
</option>
</select>
</div>
</div>
<div>
<label htmlFor={"e-qty"} className={"lbl"}>
{"Quantity you own"}
</label>
<input id={"e-qty"} className={"inp"} value={s0?.sel?.qty} />
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "13px"}}>
{"Renters can't book more than this across boats at the same time."}
</p>
</div>
<div>
<label htmlFor={"e-tax"} className={"lbl"}>
{"Tax category"}
</label>
<select id={"e-tax"} className={"inp"} disabled={s0?.sel?.catalog}>
<option>
{s0?.sel?.tax}
</option>
<option>
{"Gear rental (state + county + transit)"}
</option>
<option>
{"Boat time (3% state)"}
</option>
<option>
{"Service (pending NCDOR guidance)"}
</option>
</select>
{s0?.sel?.catalog ? (<>
<p className={"muted"} style={{"margin": "4px 0 0", "fontSize": "13px"}}>
{"Set by Lundro for catalog extras."}
</p>
</>) : null}
</div>
</div>
<h3 style={{"margin": "18px 0 6px", "fontSize": "16px"}}>
{"Offer on these boats"}
</h3>
<ul style={{"listStyle": "none", "margin": "0", "padding": "0"}}>
{(s0?.sel?.boats || []).map((__it, __k) => { const s1 = { ...s0, "b": __it }; return (<Fragment key={__k}>
<li style={{"display": "flex", "alignItems": "center", "gap": "10px", "padding": "8px 0", "borderTop": "1px solid #EEF2F4", "flexWrap": "wrap"}}>
<label style={{"flex": "1 1 180px", "display": "flex", "gap": "10px", "alignItems": "center", "minHeight": "44px", "cursor": "pointer"}}>
<input type={"checkbox"} checked={s1?.b?.on} onChange={s1?.b?.toggle} style={{"width": "20px", "height": "20px", "accentColor": "#0A6C7A"}} />
{s1?.b?.name}
</label>
<label style={{"display": "flex", "alignItems": "center", "gap": "6px", "fontSize": "13px", "color": "#3D5160"}}>
{"Override"}
<input className={"inp"} placeholder={`\$${s1?.sel?.price ?? ""}`} value={s1?.b?.override} onChange={s1?.b?.setOverride} disabled={s1?.b?.off} style={{"width": "88px"}} />
</label>
</li>
</Fragment>); })}
</ul>
{s0?.saved ? (<>
<p role={"status"} style={{"margin": "12px 0 0", "color": "#14532D", "fontWeight": "700"}}>
{"✓ Saved"}
</p>
</>) : null}
<button type={"button"} className={"btn btn-p"} onClick={s0?.save} style={{"width": "100%", "marginTop": "14px"}}>
{"Save changes"}
</button>
</aside>
</div>
{s0?.addOpen ? (<>
<div style={{"position": "fixed", "inset": "0", "background": "rgba(15,42,61,.55)", "zIndex": "40", "display": "flex", "alignItems": "center", "justifyContent": "center", "padding": "16px"}}>
<div role={"dialog"} aria-modal={"true"} aria-labelledby={"add-h"} style={{"background": "#fff", "borderRadius": "22px", "padding": "24px", "width": "100%", "maxWidth": "640px", "maxHeight": "90%", "overflowY": "auto"}}>
<div style={{"display": "flex", "justifyContent": "space-between", "alignItems": "center"}}>
<h2 id={"add-h"} className={"disp"} style={{"margin": "0", "fontSize": "24px"}}>
{"Add an extra"}
</h2>
<button type={"button"} aria-label={"Close"} onClick={s0?.closeAdd} style={{"width": "44px", "height": "44px", "border": "0", "background": "transparent", "borderRadius": "50%", "cursor": "pointer", "fontSize": "22px"}}>
{"×"}
</button>
</div>
<div role={"tablist"} style={{"display": "flex", "gap": "6px", "marginTop": "12px", "borderBottom": "1px solid #DCE5EA"}}>
<button type={"button"} role={"tab"} aria-selected={s0?.tabCatSel} onClick={s0?.tabCat} style={{"border": "0", "background": "transparent", "minHeight": "44px", "padding": "0 12px", "fontWeight": "700", "borderBottom": `3px solid ${s0?.tabCatLine ?? ""}`, "cursor": "pointer"}}>
{"From Lundro catalog"}
</button>
<button type={"button"} role={"tab"} aria-selected={s0?.tabCusSel} onClick={s0?.tabCus} style={{"border": "0", "background": "transparent", "minHeight": "44px", "padding": "0 12px", "fontWeight": "700", "borderBottom": `3px solid ${s0?.tabCusLine ?? ""}`, "cursor": "pointer"}}>
{"Custom extra"}
</button>
</div>
{s0?.isCat ? (<>
{(s0?.catalog || []).map((__it, __k) => { const s1 = { ...s0, "c": __it }; return (<Fragment key={__k}>
<div style={{"marginTop": "14px"}}>
<p style={{"margin": "0 0 6px", "fontWeight": "700", "fontSize": "14px", "color": "#3D5160"}}>
{s1?.c?.cat}
</p>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "6px"}}>
{(s1?.c?.items || []).map((__it, __k) => { const s2 = { ...s1, "i": __it }; return (<Fragment key={__k}>
<button type={"button"} className={"btn btn-g"} onClick={s2?.i?.add} disabled={s2?.i?.have}>
{s2?.i?.label}
</button>
</Fragment>); })}
</div>
</div>
</Fragment>); })}
<p className={"muted"} style={{"margin": "16px 0 0", "fontSize": "13px"}}>
{"Alcohol can't be sold as an extra. Use house rules to allow guests to bring their own."}
</p>
</>) : null}
{s0?.isCus ? (<>
<div style={{"display": "flex", "flexDirection": "column", "gap": "12px", "marginTop": "14px"}}>
<div>
<label htmlFor={"cu-n"} className={"lbl"}>
{"Name"}
</label>
<input id={"cu-n"} className={"inp"} value={s0?.cus?.name} onChange={s0?.setCusName} placeholder={"e.g. Sunset photo package"} />
</div>
<div style={{"display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gap": "10px"}}>
<div>
<label htmlFor={"cu-p"} className={"lbl"}>
{"Price"}
</label>
<input id={"cu-p"} className={"inp"} placeholder={"$0"} />
</div>
<div>
<label htmlFor={"cu-t"} className={"lbl"}>
{"Pricing"}
</label>
<select id={"cu-t"} className={"inp"}>
<option>
{"per booking"}
</option>
<option>
{"per hour"}
</option>
<option>
{"per person"}
</option>
<option>
{"per item"}
</option>
</select>
</div>
</div>
<div>
<label htmlFor={"cu-x"} className={"lbl"}>
{"Tax category"}
</label>
<select id={"cu-x"} className={"inp"}>
<option>
{"Gear rental (state + county + transit)"}
</option>
<option>
{"Boat time (3% state)"}
</option>
<option>
{"Service (pending NCDOR guidance)"}
</option>
</select>
</div>
<p className={"muted"} style={{"margin": "0", "fontSize": "13px"}}>
{"Custom extras appear on your boat pages but not as search filters."}
</p>
<button type={"button"} className={"btn btn-p"} onClick={s0?.addCustom}>
{"Add to library"}
</button>
</div>
</>) : null}
</div>
</div>
</>) : null}
    </>
  );
}
