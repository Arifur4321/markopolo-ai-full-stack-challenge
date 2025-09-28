//(heuristics → streamed JSON)

import { sampleAudiences } from './connectors';
import { ALL_CHANNELS, buildMessagePlan } from './channels';
import type { CampaignDecision, Channel, StreamChunk } from './types';


export async function* planStream(
channels: Channel[],
): AsyncGenerator<StreamChunk> {
const selected = channels.length ? channels : ALL_CHANNELS;


// 1) meta header
yield { type: 'meta', payload: { channels: selected, startedAt: new Date().toISOString() } };


// 2) compute audiences
const audiences = sampleAudiences();
for (const audience of audiences) {
// tiny delay to simulate streaming
await new Promise((r) => setTimeout(r, 400));


const messages = selected.map((c) => buildMessagePlan(c, audience.id));
const decision: CampaignDecision = {
audience,
messages,
rationale: rationaleFor(audience),
};


yield { type: 'decision', payload: decision };
}


// 3) done
yield { type: 'done' };
}


function rationaleFor(aud: { id: string; traits: Record<string, unknown> }) {

if (aud.id.includes('abandoned_checkout'))
return 'High purchase intent – short‑form nudges (SMS/WA) within minutes, plus email with cart details.';
if (aud.id.includes('recent_site_visitors'))
return 'Warm traffic – email within 10 minutes; light retargeting ads in next hour to reinforce recall.';
if (aud.id.includes('fb_engagers'))
return 'High engagement – brand storytelling via WhatsApp + broad ads; follow up email for depth.';
return 'Default multi‑channel orchestration.';
}