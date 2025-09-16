// /Server/index.js
// -----------------------------
// CLOUDLFARE WORKER ENTRY
// -----------------------------
import { AutoRouter, cors, json } from 'itty-router';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// -----------------------------
// LOCAL HELPERS (do not lose!)
// -----------------------------
import { registerHandler, loginHandler } from './api/helpers/auth.js';
import { jsonResponse } from './api/helpers/jsonResponse.js';
import {
  detectLang,
  maybeRedirectToLang,
} from './api/helpers/lang.js';
import {
  maybeAuthRedirect,
  redirectIfAuthedTryingToLogin,
} from './api/Cookies/appCookie.js';

// -----------------------------
// CORS CONFIG
// -----------------------------
const { preflight, corsify } = cors({
  origin: true,
  credentials: true,
});

// -----------------------------
// ROUTER SETUP
// -----------------------------
const router = AutoRouter({
  base: '/',
  finally: [corsify], // always attach CORS
});

// -----------------------------
// OPTIONS (CORS Preflight)
// -----------------------------
router.options('*', preflight);

// -----------------------------
// Language & Auth Guards
// -----------------------------
router.all('*', (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });

  // Language prefix enforcement
  const redirect = maybeRedirectToLang(req);
  if (redirect) return redirect;

  // Auth checks
  const lang = detectLang(req);
  const maybeBlock = maybeAuthRedirect(req, lang);
  if (maybeBlock) return maybeBlock;

  const maybeSkipLogin = redirectIfAuthedTryingToLogin(req, lang);
  if (maybeSkipLogin) return maybeSkipLogin;
});

// -----------------------------
// API ROUTES
// -----------------------------
router.post('/register', registerHandler);
router.post('/login', loginHandler);

// Example test JSON
router.get('/json', () => jsonResponse({ status: '0k⏪' }, 200));

// -----------------------------
// Catch-all: serve SPA routes
// -----------------------------
// Important paths: '/', '/login', '/register', '/games/*', '/dashboard/*'
router.all('*', async (req, env, ctx) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Paths that should load the React app (SPA entry)
  const spaPaths = [
    '/',
    '/login',
    '/register',
    '/games',
    '/dashboard',
  ];

  const isSpaRoute = spaPaths.some((base) =>
    pathname === base || pathname.startsWith(base + '/')
  );

  if (isSpaRoute) {
    try {
      // Serve index.html from __STATIC_CONTENT
      return await getAssetFromKV(
        { request: new Request(`${url.origin}/index.html`, req) },
        { env, ctx }
      );
    } catch (err) {
      return new Response('💥 index.html not found', { status: 500 });
    }
  }

  // If not SPA route, fallback 404
  return new Response('💥 Not Found', { status: 404 });
});

// -----------------------------
// EXPORT WORKER HANDLER
// -----------------------------
export default {
  async fetch(request, env, ctx) {
    try {
      // Try router first
      return await router.fetch(request, env, ctx);
    } catch (err) {
      // Fallback to asset handler
      try {
        return await getAssetFromKV({ request }, { env, ctx });
      } catch {
        return new Response('💥 Not Found', { status: 404 });
      }
    }
  },
};
