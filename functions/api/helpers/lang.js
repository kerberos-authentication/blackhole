// /functions/api/helpers/lang.js
// ---------------------------------------------------------------------------
// Language detection + redirection helpers.
// - supportedLangs: languages we allow in the URL prefix.
// - redirectablePaths: top-level paths that must have a language prefix.
// - redirectableURL: base folders that also need language prefix (/games/*)
// ---------------------------------------------------------------------------

export const supportedLangs = ['en', 'fa'];

// Root-level pages that should be prefixed with /:lang
export const redirectablePaths = new Set(['/', '/login', '/register', '/games']);

// Sub-folder bases that also require a /:lang prefix
export const redirectableURL = new Set(['/games', '/dashboard']);

// Detect language from Cookie first, then Accept-Language, else fallback to 'fa'
export function detectLang(req) {
  // 1) Try cookie: lang=xx
  const cookie = req.headers.get('cookie') || '';
  const cookieLang = cookie.match(/(?:^|;\s*)lang=(\w{2})/)?.[1];
  if (cookieLang && supportedLangs.includes(cookieLang)) return cookieLang;

  // 2) Try Accept-Language header
  const accept = req.headers.get('accept-language') || '';
  const candidates = accept.split(',').map(s => s.split(';')[0].trim());
  const found = candidates.find(lc => supportedLangs.includes(lc));
  if (found) return found;

  // 3) Fallback
  return 'fa';
}

// Should this path be language-prefixed?
export function needsLangPrefix(pathname) {
  // Normalize (ensure leading slash, no trailing slash logic needed)
  const path = pathname || '/';

  // If it is exactly '/', it needs prefix.
  if (path === '/') return true;

  // Check against explicit redirectable paths (root-level)
  if (redirectablePaths.has(path)) return true;

  // Check for any redirectableURL base (subfolders like /games/*, /dashboard/*)
  for (const base of redirectableURL) {
    if (path === base || path.startsWith(base + '/')) return true;
  }
  return false;
}

// Middleware-like helper: if path misses lang prefix for a monitored path,
// return a redirect Response to `/<lang><originalPath>`. Otherwise return null.
export function maybeRedirectToLang(req) {
  const url = new URL(req.url);

  // If it's not an HTML navigation (e.g., API, image, CSS) we don't redirect.
  const accept = req.headers.get('accept') || '';
  if (!accept.includes('text/html')) return null;

  // Split the path
  const parts = url.pathname.split('/').filter(Boolean); // e.g. ['en','login'] or ['games','123']
  const first = parts[0]; // potential lang code

  // If the path is monitored and missing a correct prefix, redirect
  if (needsLangPrefix(url.pathname) && !supportedLangs.includes(first)) {
    const lang = detectLang(req);
    const target = `/${lang}${url.pathname}`;
    return new Response(null, { status: 302, headers: { Location: target } });
  }

  return null; // No redirect required
}
