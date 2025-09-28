import type { DataSource } from './types';


// Lightly used in this demo; replace with Redis/Upstash for multi‑instance
export const session: { sources: DataSource[] } = { sources: [] };