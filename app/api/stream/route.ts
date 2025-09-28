import { planStream } from '@/lib/engine';
import type { Channel } from '@/lib/types';


export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const channels = (searchParams.get('channels')?.split(',') ?? []) as Channel[];


const stream = new ReadableStream({
async start(controller) {
const encoder = new TextEncoder();
try {
for await (const chunk of planStream(channels)) {
controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
}
} catch (e) {
controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', payload: String(e) })}\n\n`));
} finally {
controller.close();
}
},
});


return new Response(stream, {
headers: {
'Content-Type': 'text/event-stream',
'Cache-Control': 'no-cache, no-transform',
Connection: 'keep-alive',
'Access-Control-Allow-Origin': '*',
},
});
}