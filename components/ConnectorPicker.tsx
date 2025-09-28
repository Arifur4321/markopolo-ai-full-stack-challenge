'use client';
import { useState } from 'react';


type Option = { id: 'website' | 'shopify' | 'facebook_page'; label: string; };
const OPTIONS: Option[] = [
{ id: 'website', label: 'Website' },
{ id: 'shopify', label: 'Shopify' },
{ id: 'facebook_page', label: 'Facebook Page' },
];


export default function ConnectorPicker() {
const [connected, setConnected] = useState<string[]>([]);


async function connect(source: Option['id']) {
const res = await fetch('/api/connect', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ source }),
}).then((r) => r.json());
setConnected(res.connectedSources);
}


return (
<div style={{ border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
<strong>Data Sources</strong>
<div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
{OPTIONS.map((o) => (
<button key={o.id} onClick={() => connect(o.id)}
style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: connected.includes(o.id) ? '#ecfeff' : 'white' }}>
{connected.includes(o.id) ? '✅ ' : ''}{o.label}
</button>
))}
</div>
</div>
);
}