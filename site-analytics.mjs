import fs from 'node:fs';

export const analyticsConfig = JSON.parse(fs.readFileSync(new URL('./site-analytics.config.json', import.meta.url), 'utf8'));
export const publicAnalyticsTypes = new Set(['home', 'about', 'research', 'teaching', 'writing', 'media', 'resources', 'collaborate', 'contact', 'skills-lab', 'mobility', 'notes', 'privacy']);

// Keep the dashboard snippet intact inside an inert template. Never execute arbitrary snippet code.
export function validateAnalyticsConfig(config) {
  if (typeof config.enabled !== 'boolean' || config.hostname !== 'yutakwing.github.io') throw new Error('Invalid public analytics configuration');
  if (config.snippet === null) {
    if (config.enabled) throw new Error('CLOUDFLARE WEB ANALYTICS TOKEN REQUIRED');
    return;
  }
  if (typeof config.snippet !== 'string') throw new Error('Expected the dashboard JS snippet');
  if (/<\/template/i.test(config.snippet)) throw new Error('Snippet cannot close its inert template');
  const cleaned = config.snippet.replace(/<!--[\s\S]*?-->/g, '').trim();
  const match = cleaned.match(/^<script\s+([^>]+)>\s*<\/script>$/i);
  if (!match) throw new Error('Expected one external Cloudflare script, without inline code');
  const attrs = new Map();
  const remainder = match[1].replace(/([\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g, (_,name,a,b) => {
    name=name.toLowerCase();
    if (!['src','defer','async','data-cf-beacon','integrity','crossorigin'].includes(name) || attrs.has(name)) throw new Error('Unsupported or duplicate snippet attribute');
    attrs.set(name,a??b??''); return '';
  });
  if (remainder.trim()) throw new Error('Unsupported snippet syntax');
  const src = new URL(attrs.get('src'));
  if (src.origin !== 'https://static.cloudflareinsights.com' || src.pathname !== '/beacon.min.js' || src.username || src.password || src.hash) throw new Error('Unexpected analytics script source');
  if (!attrs.has('defer') && !attrs.has('async')) throw new Error('Beacon must be non-blocking');
  const data = JSON.parse(attrs.get('data-cf-beacon'));
  if (typeof data.token !== 'string' || !data.token.trim()) throw new Error('CLOUDFLARE WEB ANALYTICS TOKEN REQUIRED');
  // Additional dashboard-managed options are preserved, not invented by this integration.
}
validateAnalyticsConfig(analyticsConfig);

export function renderSiteAnalytics({prefix, pageType, isActivity = false}, config = analyticsConfig) {
  if (isActivity || !publicAnalyticsTypes.has(pageType)) return '';
  validateAnalyticsConfig(config);
  return `${config.enabled ? `<template id="site-analytics-snippet">${config.snippet}</template>` : '<!-- ACTIVATION PENDING — CLOUDFLARE WEB ANALYTICS SNIPPET REQUIRED -->'}
    <script src="${prefix}/assets/js/site-analytics.js?v=20260919" data-site-analytics-enabled="${config.enabled}" defer></script>`;
}

export const privacyDescription = 'How public website analytics, educational activity statistics, student progress and third-party services are kept separate.';
export function privacyBody(localeKey) {
  return `<article class="post-article" lang="en"><header class="post-header"><p class="eyebrow">Public website</p><h1>Privacy and website analytics</h1><p class="post-standfirst">${privacyDescription}</p></header>
  ${localeKey === 'en' ? '' : '<p class="translation-note">TRANSLATION REQUIRED — this privacy statement is currently available in English.</p>'}
  <div class="post-content">
  <h2>Public website analytics</h2>
  <p>${analyticsConfig.enabled ? 'Cloudflare Web Analytics is enabled for eligible public portfolio and article pages, to understand aggregate readership and real-user performance.' : 'Cloudflare Web Analytics is prepared but not activated. The public website currently sends no data through this integration.'}</p>
  <p>When activated, this integration loads Cloudflare’s official script on selected public pages. It does not create a visitor account, use browser storage to identify visitors or link readership to student records. Cloudflare describes its Web Analytics service as cookie-free. Requests to an external service still involve ordinary network information; this is not a claim of absolute anonymity.</p>
  <p>Student login, dashboard, activity pages, tracked URLs and local previews are excluded from this public analytics integration. Pages with query parameters are also excluded. It does not send scores, hints, student identifiers, authentication tokens or chatbot messages.</p>
  <h2>Educational activities and student progress</h2>
  <p>Existing game statistics are a separate system. They record activity views, starts, hints and completion durations using temporary run/event identifiers. These are not joined to public website analytics. Coverage varies by activity.</p>
  <p>Signing in for tracked learning uses a separate authenticated service to save learning progress. Excluding those pages from public Web Analytics does not mean that authenticated progress or existing game statistics stop working.</p>
  <h2>Other services and preferences</h2>
  <p>Embedded YouTube media, the Zapier tutor, external fonts and links involve other services with their own privacy practices. Loading an embed may contact its provider before playback. Tutor content is handled by the tutor provider when used. The contact form sends the information you submit through FormSubmit to respond to your enquiry. Please do not include patient details or confidential student information.</p>
  <p>The site also stores preferences such as your chosen theme. Those existing preferences are not used as public analytics identifiers.</p>
  <h2>Further information</h2>
  <p>Read <a href="https://developers.cloudflare.com/web-analytics/about/">Cloudflare’s Web Analytics overview</a> and its <a href="https://developers.cloudflare.com/speed/observatory/rum-beacon/">RUM data and privacy documentation</a>. For questions about this website, use the <a href="./contact.html">contact page</a>.</p>
  </div></article>`;
}
