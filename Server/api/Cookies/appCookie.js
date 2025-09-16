// /Server/api/Cookies/appCookie.js
// ---------------------------------------------------------------------------
// Cookie helpers for auth gate + UX:
// - setAuthCookie: returns headers to set an httpOnly session cookie
// - clearAuthCookie: returns headers to clear the cookie
// - getAuthFromRequest: read cookie and return { userId } or null
// - isAuthenticated: true/false based on cookie presence
//
// IMPORTANT: You can swap the cookie value for a signed JWT or session-id.
// For demo: we store a simple userId (do not do this in production).
// ---------------------------------------------------------------------------
// /Server/api/Cookies/appCookie.js
const COOKIE_NAME = 'sid';          // session cookie name
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setAuthCookie(userId) {
  // NOTE: Set 'Secure' only if served over HTTPS.
  const cookie = `${COOKIE_NAME}=${encodeURIComponent(userId)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
  return { 'Set-Cookie': cookie };
}

export function clearAuthCookie() {
  const cookie = `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
  return { 'Set-Cookie': cookie };
}

export function getAuthFromRequest(req) {
  const cookie = req.headers.get('cookie') || '';
  const raw = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  const value = raw?.[1] ? decodeURIComponent(raw[1]) : null;

  // If you use JWT, verify & decode here.
  // For demo: treat non-empty as userId
  if (!value) return null;
  return { userId: value };
}

export function isAuthenticated(req) {
  return !!getAuthFromRequest(req);
}

// Paths that require authentication
export const protectedPaths = new Set(['/games', '/dashboard', '/statistics', '/users']);

// If a path is protected and user isn't authenticated, redirect to /:lang/login
export function maybeAuthRedirect(req, lang) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Is it a protected base path (exact or any subpath)?
  for (const base of protectedPaths) {
    if (path === base || path.startsWith(base + '/')) {
      if (!isAuthenticated(req)) {
        return new Response(null, {
          status: 302,
          headers: { Location: `/${lang}/login` },
        });
      }
      break;
    }
  }

  return null;
}

// If already authenticated, prevent visiting /login (redirect to /:lang/dashboard)
export function redirectIfAuthedTryingToLogin(req, lang) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Only for GET /login (without lang) or /:lang/login
  if (path === '/login' || path.match(/^\/\w{2}\/login$/)) {
    if (isAuthenticated(req)) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/${lang}/dashboard` },
      });
    }
  }
  return null;
}
