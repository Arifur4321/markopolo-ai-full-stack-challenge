'use client';
import { useEffect, useRef, useState } from 'react';

type Chunk = { type: 'meta' | 'decision' | 'done' | 'error'; payload?: any };

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [channels, setChannels] = useState<string[]>(['email', 'sms', 'whatsapp', 'ads']);
  const [loading, setLoading] = useState(false);
  const streamRef = useRef<EventSource | null>(null);

  function toggle(ch: string) {
    setChannels((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]));
  }

  function startStream() {
    if (streamRef.current) streamRef.current.close();
    setMessages([]);
    setLoading(true);
    const es = new EventSource(`/api/stream?channels=${channels.join(',')}`);
    streamRef.current = es;

    es.onmessage = (e) => {
      const data = JSON.parse(e.data) as Chunk;
      setMessages((m) => [...m, data]);
      if (data.type === 'done' || data.type === 'error') {
        setLoading(false);
        es.close();
      }
    };
    es.onerror = () => {
      setLoading(false);
      es.close();
    };
  }

  useEffect(() => () => streamRef.current?.close(), []);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div>
        <strong>Channels</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {['email', 'sms', 'whatsapp', 'ads'].map((c) => (
            <label key={c} style={{ border: '1px solid #d1d5db', padding: '6px 10px', borderRadius: 6 }}>
              <input
                type="checkbox"
                checked={channels.includes(c)}
                onChange={() => toggle(c)}
                style={{ marginRight: 6 }}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={startStream}
        disabled={loading}
        style={{ width: 200, padding: '8px 12px', borderRadius: 8, background: '#111827', color: 'white' }}
      >
        {loading ? 'Streaming…' : 'Generate Plan'}
      </button>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
        <strong>Stream</strong>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, marginTop: 8 }}>
{JSON.stringify(messages, null, 2)}
        </pre>
      </div>
    </div>
  );
}
