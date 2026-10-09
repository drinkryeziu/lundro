'use client';
// Generated from source/Dash-Settings.dc.html by tools/convert.mjs. Edit the source or this file; logic is unchanged.
import { Fragment, useReducer, useRef } from 'react';
import Link from 'next/link';
import { DCLogic } from '@/lib/dc';

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = { tab: 'profile', saved: false, name: 'Cove & Co. Boat Rentals', inv: { email: '', role: 'Manager' }, invErr: false,
      team: [
        { name: 'Jordan Hale', email: 'jordan@coveandco.example', role: 'Owner', access: 'Everything' },
        { name: 'Sara Lin', email: 'sara@coveandco.example', role: 'Manager', access: 'Bookings, calendar, messages, boats' },
        { name: 'Mike R.', email: 'mike@coveandco.example', role: 'Captain', access: 'Own trips and calendar' }
      ],
      nt: { req: [1, 1], conf: [1, 0], msg: [1, 1], exp: [1, 1], pay: [1, 0], rev: [1, 0] } };
  }
  renderVals() {
    const s = this.state;
    const T = [['profile', 'Company profile'], ['payout', 'Payout method'], ['team', 'Team members'], ['notif', 'Notifications']];
    const RC = { Owner: ['#0F2A3D', '#fff'], Manager: ['#E3F2F4', '#0B4F59'], Captain: ['#FFF1C7', '#5C4300'], 'Dock staff': ['#E8EFF2', '#3D5160'], Invited: ['#F3EEE3', '#5E4513'] };
    const NT = [['req', 'New booking request', 'You have 24 hours to reply'], ['conf', 'Booking confirmed or cancelled', ''], ['msg', 'New message from a renter', ''], ['exp', 'Document expiring', '30 days before. Email is always on.'], ['pay', 'Payout sent', ''], ['rev', 'New review', '']];
    const flip = (k, i) => () => { const v = s.nt[k].slice(); v[i] = v[i] ? 0 : 1; this.setState({ nt: Object.assign({}, s.nt, { [k]: v }), saved: false }); };
    return ({
      tabsList: T.map(([k, label]) => ({ label, sel: s.tab === k ? 'true' : 'false', fg: s.tab === k ? '#0F2A3D' : '#4A5F6E', line: s.tab === k ? '#0A6C7A' : 'transparent', pick: () => this.setState({ tab: k, saved: false }) })),
      tProfile: s.tab === 'profile', tPayout: s.tab === 'payout', tTeam: s.tab === 'team', tNotif: s.tab === 'notif',
      saved: s.saved, save: () => this.setState({ saved: true }),
      p: { name: s.name }, setName: e => this.setState({ name: e.target.value, saved: false }),
      team: s.team.map((m, i) => { const rc = RC[m.invited ? 'Invited' : m.role]; return { name: m.name, email: m.email, role: m.invited ? m.role + ' · invite sent' : m.role, access: m.access, bg: rc[0], fg: rc[1], removable: m.role !== 'Owner', remove: () => this.setState({ team: s.team.filter((_, j) => j !== i) }) }; }),
      inv: s.inv, invErr: s.invErr,
      setInvEmail: e => this.setState({ inv: Object.assign({}, this.state.inv, { email: e.target.value }), invErr: false }),
      setInvRole: e => this.setState({ inv: Object.assign({}, this.state.inv, { role: e.target.value }) }),
      invite: () => {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.inv.email)) { this.setState({ invErr: true }); return; }
        const acc = { Manager: 'Bookings, calendar, messages, boats', Captain: 'Own trips and calendar', 'Dock staff': 'Today’s trips and check-in' }[s.inv.role];
        this.setState({ team: s.team.concat({ name: s.inv.email.split('@')[0], email: s.inv.email, role: s.inv.role, access: acc, invited: true }), inv: { email: '', role: s.inv.role } });
      },
      notif: NT.map(([k, label, sub]) => ({ label, sub, email: !!s.nt[k][0], sms: !!s.nt[k][1], locked: k === 'exp', tEmail: flip(k, 0), tSms: flip(k, 1) }))
    });
  }
}

const DEFAULT_PROPS = {};
const CSS = "\n.btn{padding:0 16px}\n.card{background:#fff;border:1px solid #DCE5EA;border-radius:18px;padding:22px}\n.card h2{margin:0 0 4px;font-size:19px}\n.inp{width:100%;min-height:44px;border:1px solid #7B8F9B;border-radius:12px;padding:0 12px;background:#fff;font-size:16px;color:#0F2A3D}\ntextarea.inp{padding:10px 12px;min-height:90px}\n.inp:disabled{background:#F1F6F8;color:#3D5160}\n.lbl{display:block;font-size:14px;font-weight:700;color:#3D5160;margin-bottom:6px}\n.g2{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}\n.badge{display:inline-flex;align-items:center;font-size:12px;font-weight:700;border-radius:999px;padding:3px 9px;white-space:nowrap}\ntable{width:100%;border-collapse:collapse;font-size:15px}\nth{text-align:left;font-size:13px;color:#3D5160;font-weight:700;padding:10px 8px;border-bottom:1px solid #DCE5EA}\ntd{padding:10px 8px;border-bottom:1px solid #EEF2F4}\n@media (max-width:860px){.hide-sm{display:none!important}}\n";

export default function Page() {
  const [, force] = useReducer((x) => x + 1, 0);
  const ref = useRef(null);
  if (!ref.current) ref.current = new Component({ ...DEFAULT_PROPS });
  ref.current._update = force;
  const s0 = ref.current.renderVals();
  return (
    <>
      <title>Owner settings · Lundro</title>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
<h1 className={"disp"} style={{"margin": "0", "fontSize": "32px"}}>
{"Settings"}
</h1>
<div role={"tablist"} aria-label={"Settings sections"} style={{"display": "flex", "gap": "6px", "marginTop": "16px", "borderBottom": "1px solid #DCE5EA", "overflowX": "auto"}}>
{(s0?.tabsList || []).map((__it, __k) => { const s1 = { ...s0, "t": __it }; return (<Fragment key={__k}>
<button type={"button"} role={"tab"} aria-selected={s1?.t?.sel} onClick={s1?.t?.pick} style={{"border": "0", "background": "transparent", "minHeight": "48px", "padding": "0 14px", "fontWeight": "700", "color": s1?.t?.fg, "borderBottom": `3px solid ${s1?.t?.line ?? ""}`, "cursor": "pointer", "whiteSpace": "nowrap"}}>
{s1?.t?.label}
</button>
</Fragment>); })}
</div>
{s0?.saved ? (<>
<p role={"status"} style={{"margin": "16px 0 0", "background": "#DDF3E4", "color": "#14532D", "borderRadius": "12px", "padding": "10px 14px", "fontWeight": "700"}}>
{"✓ Changes saved"}
</p>
</>) : null}
{s0?.tProfile ? (<>
<div style={{"display": "flex", "flexWrap": "wrap", "gap": "20px", "marginTop": "18px", "alignItems": "flex-start"}}>
<section className={"card"} style={{"flex": "999 1 480px", "minWidth": "0"}} aria-labelledby={"pub-h"}>
<h2 id={"pub-h"}>
{"Public profile"}
</h2>
<p className={"muted"} style={{"margin": "0 0 14px", "fontSize": "14px"}}>
{"Shown on your boat pages."}
</p>
<div className={"g2"}>
<div>
<label htmlFor={"s-dba"} className={"lbl"}>
{"Display name"}
</label>
<input id={"s-dba"} className={"inp"} value={s0?.p?.name} onChange={s0?.setName} />
</div>
<div>
<label htmlFor={"s-web"} className={"lbl"}>
{"Website"}
</label>
<input id={"s-web"} className={"inp"} value={"coveandco.example"} />
</div>
<div style={{"gridColumn": "1 / -1"}}>
<label htmlFor={"s-desc"} className={"lbl"}>
{"Business description"}
</label>
<textarea id={"s-desc"} className={"inp"} defaultValue={"Family-run rental fleet on Lake Norman since 2023. Clean boats, friendly captains, easy pickup in Cornelius."} />
</div>
<div>
<label htmlFor={"s-hrs"} className={"lbl"}>
{"Business hours"}
</label>
<input id={"s-hrs"} className={"inp"} value={"Daily 8 AM – 7 PM (Apr–Oct)"} />
</div>
<div>
<label htmlFor={"s-sup"} className={"lbl"}>
{"Support contact (shown after booking)"}
</label>
<input id={"s-sup"} className={"inp"} value={"help@coveandco.example"} />
</div>
</div>
<h2 style={{"marginTop": "22px"}}>
{"Private business details"}
</h2>
<p className={"muted"} style={{"margin": "0 0 14px", "fontSize": "14px"}}>
{"Verified. Contact Lundro support to change these."}
</p>
<div className={"g2"}>
<div>
<label htmlFor={"s-legal"} className={"lbl"}>
{"Legal name"}
</label>
<input id={"s-legal"} className={"inp"} value={"Cove and Co Boat Rentals LLC"} disabled={true} />
</div>
<div>
<label htmlFor={"s-ent"} className={"lbl"}>
{"Entity · state"}
</label>
<input id={"s-ent"} className={"inp"} value={"LLC · North Carolina"} disabled={true} />
</div>
<div>
<label htmlFor={"s-reg"} className={"lbl"}>
{"NC SOS registration no."}
</label>
<input id={"s-reg"} className={"inp"} value={"2318804"} disabled={true} />
</div>
</div>
<button type={"button"} className={"btn btn-p"} onClick={s0?.save} style={{"marginTop": "18px"}}>
{"Save changes"}
</button>
</section>
<aside className={"card"} style={{"flex": "1 1 280px", "minWidth": "0"}} aria-label={"Preview"}>
<p className={"muted"} style={{"margin": "0 0 10px", "fontSize": "13px", "fontWeight": "700", "letterSpacing": ".05em", "textTransform": "uppercase"}}>
{"Renters see"}
</p>
<div style={{"display": "flex", "gap": "12px", "alignItems": "center"}}>
<span aria-hidden={"true"} className={"disp"} style={{"width": "52px", "height": "52px", "borderRadius": "14px", "background": "#0F2A3D", "color": "#FFC94A", "display": "grid", "placeItems": "center", "fontWeight": "700"}}>
{"C&C"}
</span>
<span>
<strong style={{"display": "block"}}>
{s0?.p?.name}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{"★ 4.9 · 3 years hosting"}
</span>
</span>
</div>
<p style={{"margin": "10px 0 0", "display": "flex", "gap": "6px", "flexWrap": "wrap"}}>
<span className={"badge"} style={{"background": "#DDF3E4", "color": "#14532D"}}>
{"✓ Verified owner"}
</span>
<span className={"badge"} style={{"background": "#E3F2F4", "color": "#0B4F59"}}>
{"Insured"}
</span>
</p>
<p className={"muted"} style={{"margin": "12px 0 0", "fontSize": "14px"}}>
{"Your phone, email and address are never shown."}
</p>
</aside>
</div>
</>) : null}
{s0?.tPayout ? (<>
<section className={"card"} style={{"marginTop": "18px", "maxWidth": "720px"}} aria-labelledby={"po-h"}>
<h2 id={"po-h"}>
{"Payout method"}
</h2>
<p className={"muted"} style={{"margin": "0 0 14px", "fontSize": "14px"}}>
{"Managed securely by Stripe. Lundro never stores your bank details."}
</p>
<div style={{"display": "flex", "gap": "14px", "alignItems": "center", "border": "1px solid #DCE5EA", "borderRadius": "14px", "padding": "14px", "flexWrap": "wrap"}}>
<span aria-hidden={"true"} style={{"width": "44px", "height": "44px", "borderRadius": "12px", "background": "#E3F2F4", "color": "#0B4F59", "display": "grid", "placeItems": "center"}}>
<svg width={"22"} height={"22"} viewBox={"0 0 24 24"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"} strokeLinecap={"round"}>
<path d={"M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18"} />
</svg>
</span>
<span style={{"flex": "1 1 200px"}}>
<strong style={{"display": "block"}}>
{"Bank account ending 6789"}
</strong>
<span className={"muted"} style={{"fontSize": "14px"}}>
{"Cove and Co Boat Rentals LLC · Verified"}
</span>
</span>
<button type={"button"} className={"btn btn-g"}>
{"Update in Stripe"}
</button>
</div>
<div className={"g2"} style={{"marginTop": "16px"}}>
<div>
<p className={"lbl"}>
{"Payout schedule"}
</p>
<p style={{"margin": "0"}}>
{"2 business days after each trip ends"}
</p>
</div>
<div>
<p className={"lbl"}>
{"Tax ID"}
</p>
<p style={{"margin": "0"}}>
{"EIN ending 4402 · on file with Stripe"}
</p>
</div>
<div>
<p className={"lbl"}>
{"Tax forms"}
</p>
<p style={{"margin": "0"}}>
{"Annual 1099-K available in Stripe"}
</p>
</div>
<div>
<p className={"lbl"}>
{"Sales tax"}
</p>
<p style={{"margin": "0"}}>
{"Collected and remitted by Lundro. You don't file NC sales tax on Lundro bookings."}
</p>
</div>
</div>
</section>
</>) : null}
{s0?.tTeam ? (<>
<section className={"card"} style={{"marginTop": "18px"}} aria-labelledby={"tm-h"}>
<h2 id={"tm-h"}>
{"Team members"}
</h2>
<p className={"muted"} style={{"margin": "0 0 14px", "fontSize": "14px"}}>
{"Give captains and staff their own login."}
</p>
<div style={{"overflowX": "auto"}}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"Name"}
</th>
<th scope={"col"}>
{"Role"}
</th>
<th scope={"col"} className={"hide-sm"}>
{"Can access"}
</th>
<th scope={"col"}>
<span style={{"position": "absolute", "width": "1px", "height": "1px", "overflow": "hidden"}}>
{"Actions"}
</span>
</th>
</tr>
</thead>
<tbody>
{(s0?.team || []).map((__it, __k) => { const s1 = { ...s0, "m": __it }; return (<Fragment key={__k}>
<tr>
<td>
<strong>
{s1?.m?.name}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{s1?.m?.email}
</span>
</td>
<td>
<span className={"badge"} style={{"background": s1?.m?.bg, "color": s1?.m?.fg}}>
{s1?.m?.role}
</span>
</td>
<td className={"hide-sm muted"} style={{"fontSize": "14px"}}>
{s1?.m?.access}
</td>
<td style={{"textAlign": "right"}}>
{s1?.m?.removable ? (<>
<button type={"button"} className={"btn btn-g"} onClick={s1?.m?.remove} aria-label={`Remove ${s1?.m?.name ?? ""}`}>
{"Remove"}
</button>
</>) : null}
</td>
</tr>
</Fragment>); })}
</tbody>
</table>
</div>
<h3 style={{"margin": "20px 0 8px", "fontSize": "16px"}}>
{"Invite someone"}
</h3>
<div style={{"display": "flex", "gap": "8px", "flexWrap": "wrap", "alignItems": "flex-end"}}>
<div style={{"flex": "1 1 240px"}}>
<label htmlFor={"inv-e"} className={"lbl"}>
{"Email"}
</label>
<input id={"inv-e"} type={"email"} className={"inp"} value={s0?.inv?.email} onChange={s0?.setInvEmail} placeholder={"name@example.com"} />
</div>
<div style={{"flex": "0 1 200px"}}>
<label htmlFor={"inv-r"} className={"lbl"}>
{"Role"}
</label>
<select id={"inv-r"} className={"inp"} value={s0?.inv?.role} onChange={s0?.setInvRole}>
<option>
{"Manager"}
</option>
<option>
{"Captain"}
</option>
<option>
{"Dock staff"}
</option>
</select>
</div>
<button type={"button"} className={"btn btn-p"} onClick={s0?.invite}>
{"Send invite"}
</button>
</div>
{s0?.invErr ? (<>
<p role={"alert"} style={{"margin": "8px 0 0", "color": "#B42318", "fontWeight": "600", "fontSize": "14px"}}>
{"Enter a valid email address."}
</p>
</>) : null}
</section>
</>) : null}
{s0?.tNotif ? (<>
<section className={"card"} style={{"marginTop": "18px", "maxWidth": "760px"}} aria-labelledby={"nt-h"}>
<h2 id={"nt-h"}>
{"Notifications"}
</h2>
<p className={"muted"} style={{"margin": "0 0 10px", "fontSize": "14px"}}>
{"Sent to jordan@coveandco.example and (704) 555-0142."}
</p>
<div style={{"overflowX": "auto"}}>
<table>
<thead>
<tr>
<th scope={"col"}>
{"When"}
</th>
<th scope={"col"}>
{"Email"}
</th>
<th scope={"col"}>
{"Text"}
</th>
</tr>
</thead>
<tbody>
{(s0?.notif || []).map((__it, __k) => { const s1 = { ...s0, "n": __it }; return (<Fragment key={__k}>
<tr>
<td>
<strong>
{s1?.n?.label}
</strong>
<span className={"muted"} style={{"display": "block", "fontSize": "13px"}}>
{s1?.n?.sub}
</span>
</td>
<td>
<input type={"checkbox"} checked={s1?.n?.email} onChange={s1?.n?.tEmail} disabled={s1?.n?.locked} aria-label={`${s1?.n?.label ?? ""} by email`} style={{"width": "22px", "height": "22px", "accentColor": "#0A6C7A"}} />
</td>
<td>
<input type={"checkbox"} checked={s1?.n?.sms} onChange={s1?.n?.tSms} aria-label={`${s1?.n?.label ?? ""} by text`} style={{"width": "22px", "height": "22px", "accentColor": "#0A6C7A"}} />
</td>
</tr>
</Fragment>); })}
</tbody>
</table>
</div>
<button type={"button"} className={"btn btn-p"} onClick={s0?.save} style={{"marginTop": "16px"}}>
{"Save preferences"}
</button>
</section>
</>) : null}
    </>
  );
}
