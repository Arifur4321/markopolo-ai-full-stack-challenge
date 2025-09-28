import type { DataSource, ConnectorState, AudienceProfile } from './types';  //mocks


const state: Record<DataSource, ConnectorState> = {
website: { connected: false },
shopify: { connected: false },
facebook_page: { connected: false },
};


export function connect(source: DataSource, meta?: Record<string, unknown>) {
state[source] = { connected: true, meta };
return state[source];
}


export function isConnected(source: DataSource) {
return !!state[source]?.connected;
}


// Generate mock audience samples based on available connectors
export function sampleAudiences(): AudienceProfile[] {
const audiences: AudienceProfile[] = [];


if (state.website.connected)
audiences.push({
id: 'recent_site_visitors_7d',
size: 1240,
traits: { recency: '7d', intent: 'browse', device: 'mobile' },
});


if (state.shopify.connected)
audiences.push({
id: 'abandoned_checkout_3d',
size: 180,
traits: { recency: '3d', value: 'high', cartItems: 2 },
});


if (state.facebook_page.connected)
audiences.push({
id: 'fb_engagers_30d',
size: 5200,
traits: { recency: '30d', interest: 'brand', engagement: 'high' },
});


// Fallback if nothing connected
if (audiences.length === 0)
audiences.push({ id: 'all_users', size: 10000, traits: {} });


return audiences;
}



// -----------------------------------------------------------------------------
//  OPTIONAL: REAL API EXAMPLES (for production use)
// Everything below is **commented out** and not used in this challenge.
// It shows how you'd replace the dummy logic above with live API calls.
// -----------------------------------------------------------------------------

/*
import 'dotenv/config';

// Example: Shopify Admin API
// You would fetch real abandoned checkout data using Shopify API tokens
// stored in `.env.local`:
//
// SHOPIFY_SHOP_DOMAIN=your-shop.myshopify.com
// SHOPIFY_ADMIN_TOKEN=shpat_xxxxxxxxxxxxxxxxxx
//
export async function fetchShopifyAudience(): Promise<AudienceProfile | null> {
  if (!state.shopify.connected) return null;

  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN!;
  const token = process.env.SHOPIFY_ADMIN_TOKEN!;

  const res = await fetch(
    `https://${shopDomain}/admin/api/2024-07/checkouts.json?limit=50`,
    {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.error('Shopify API error', await res.text());
    return null;
  }

  const data = await res.json();
  const abandonedCount = data.checkouts?.length || 0;

  return {
    id: 'abandoned_checkout_3d',
    size: abandonedCount,
    traits: { recency: '3d', value: 'high' },
  };
}

// Example: Facebook Graph API
// Fetch engagement metrics from a Page using a long-lived access token
//
// FB_PAGE_ID=1234567890
// FB_PAGE_ACCESS_TOKEN=EAABxxxxxxxxxxxx
//
export async function fetchFacebookAudience(): Promise<AudienceProfile | null> {
  if (!state.facebook_page.connected) return null;

  const pageId = process.env.FB_PAGE_ID!;
  const token = process.env.FB_PAGE_ACCESS_TOKEN!;

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${pageId}/insights/page_engaged_users?access_token=${token}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Facebook API error', await res.text());
    return null;
  }

  const data = await res.json();
  const engagedUsers = data.data?.[0]?.values?.[0]?.value || 0;

  return {
    id: 'fb_engagers_30d',
    size: engagedUsers,
    traits: { recency: '30d', engagement: 'high' },
  };
}

// Example: Website / Pixel ingestion
// You could collect visitor events into a database or Redis stream
// and query recent visitors here instead of returning dummy numbers.
export async function fetchWebsiteAudience(): Promise<AudienceProfile | null> {
  if (!state.website.connected) return null;

  // Imagine this hitting a PostgreSQL or Redis DB with real analytics data
  const recentVisitors = 1523; // ← Replace with DB query result

  return {
    id: 'recent_site_visitors_7d',
    size: recentVisitors,
    traits: { recency: '7d', intent: 'browse' },
  };
}
*/

/*
 Summary:
- The code above is **not required** to pass the challenge.
- It only shows *how you would replace* the dummy data with real API calls
  once you have credentials.
- For this submission, the default `sampleAudiences()` function is enough.
*/