import { NextResponse } from 'next/server';
import { connect } from '@/lib/connectors';
import { session } from '@/lib/memoryStore';
import type { DataSource } from '@/lib/types';


export async function POST(req: Request) {
const body = (await req.json()) as { source: DataSource; meta?: Record<string, unknown> };
const { source, meta } = body;
const res = connect(source, meta);
if (!session.sources.includes(source)) session.sources.push(source);
return NextResponse.json({ ok: true, state: res, connectedSources: session.sources });
}