import type { Channel, MessagePlan } from './types';


export const ALL_CHANNELS: Channel[] = ['email', 'sms', 'whatsapp', 'ads'];


export function buildMessagePlan(
channel: Channel,
audienceId: string,
now = new Date(),
): MessagePlan {
const baseSend = new Date(now);
// simple staggering by channel for realism
const offsetMinutes = { email: 10, sms: 2, whatsapp: 5, ads: 1 }[channel] ?? 0;
baseSend.setMinutes(baseSend.getMinutes() + offsetMinutes);


const template =
channel === 'email'
? `email_template:welcome_back_${audienceId}`
: channel === 'sms'
? `sms_template:reminder_${audienceId}`
: channel === 'whatsapp'
? `wa_template:personal_touch_${audienceId}`
: `ads_creative:retarget_${audienceId}`;


return { channel, template, sendAt: baseSend.toISOString() };
}