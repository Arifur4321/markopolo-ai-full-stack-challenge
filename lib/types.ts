export type DataSource = 'website' | 'shopify' | 'facebook_page';
export type Channel = 'email' | 'sms' | 'whatsapp' | 'ads';


export interface ConnectorState {
connected: boolean;
meta?: Record<string, unknown>;
}


export interface AudienceProfile {
id: string; // audience segment id
size: number; // number of users
traits: Record<string, unknown>; // device, geo, interests, recency
}


export interface MessagePlan {
channel: Channel;
template: string; // textual template or creative id
sendAt: string; // ISO timestamp – planned send time
}


export interface CampaignDecision {
audience: AudienceProfile;
messages: MessagePlan[]; // one per channel selected
rationale: string; // explanation for selection
}


export interface StreamChunk {
type: 'meta' | 'decision' | 'done' | 'error';
payload?: unknown;
}