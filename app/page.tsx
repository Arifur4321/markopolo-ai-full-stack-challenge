import ConnectorPicker from '@/components/ConnectorPicker';
import Chat from '@/components/Chat';


export default function Page() {
return (
<main style={{ maxWidth: 980, margin: '40px auto', padding: 16 }}>
<h1 style={{ fontSize: 28, marginBottom: 6 }}>Perplexity‑style Campaign Planner</h1>
<p style={{ color: '#4b5563', marginBottom: 16 }}>Connect data sources, pick channels, and stream a JSON campaign plan.</p>
<div style={{ display: 'grid', gap: 16 }}>
<ConnectorPicker />
<Chat />
</div>
</main>
);
}