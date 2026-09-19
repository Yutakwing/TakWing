// Public portfolio only. No storage, custom events, identifiers or game/student API access.
(() => {
  'use strict';
  try {
    const loader = document.currentScript;
    if (loader?.dataset.siteAnalyticsEnabled !== 'true' || navigator.webdriver) return;
    const current = new URL(location.href);
    const origin = 'https://yutakwing.github.io';
    const publicPath = pathname => /^\/TakWing\/(?:zh-hant\/|zh-hans\/)?(?:|(?:index|about|research|teaching|writing|media|resources|collaborate|contact|skills-lab|mobility|notes|privacy)\.html|posts\/[a-z0-9-]+\.html)$/.test(pathname);
    // Exact origin/base allowlisting also excludes localhost, LAN previews, test hosts and other projects.
    if (current.origin !== origin || !publicPath(current.pathname) || current.search) return;
    if (current.hash && !document.getElementById(decodeURIComponent(current.hash.slice(1)))) return;
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      // Avoid forwarding query-state or student/activity origins through the vendor's referrer field.
      if (referrer.search || referrer.hash || (referrer.origin === origin && !publicPath(referrer.pathname))) return;
    }
    if (document.querySelector('script[data-cf-beacon], script[src^="https://static.cloudflareinsights.com/"]')) return;
    const source = document.getElementById('site-analytics-snippet')?.content.querySelector('script');
    if (!source) return;
    const src = new URL(source.getAttribute('src'));
    if (src.origin !== 'https://static.cloudflareinsights.com' || src.pathname !== '/beacon.min.js' || src.username || src.password) return;
    const beacon = document.createElement('script');
    for (const attribute of source.attributes) beacon.setAttribute(attribute.name, attribute.value);
    // A dynamically inserted external script is non-blocking; preserve all dashboard-supplied attributes.
    document.body.appendChild(beacon);
  } catch {
    // Malformed/missing configuration or unsupported environments must not affect the website.
  }
})();
