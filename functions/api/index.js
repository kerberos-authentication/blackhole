// /functions/index.js
// -----------------------------
// CLOUDLFARE WORKER ENTRY
// -----------------------------
import { AutoRouter, cors } from 'itty-router';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

// -----------------------------
// LOCAL HELPERS
// -----------------------------
import { registerHandler, loginHandler } from './helpers/auth.js';
import { jsonResponse } from './helpers/jsonResponse.js';
import { detectLang, maybeRedirectToLang } from './helpers/lang.js';
import { maybeAuthRedirect, redirectIfAuthedTryingToLogin } from './Cookies/appCookie.js';

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
  finally: [corsify], // always attach CORS headers
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
router.post('/register', (req, env) => registerHandler(req, env));
router.post('/login', (req, env) => loginHandler(req, env));

// Example test JSON
router.get('/json', () => jsonResponse({ status: 'ok⏪' }, 200));

// -----------------------------
// SPA ROUTES / STATIC ASSETS
// -----------------------------
router.all('*', async (req, env, ctx) => {
  try {
    // Serve static assets automatically
    return await getAssetFromKV({ request: req }, { env, ctx });
  } catch {
    // If not a static asset, fallback to index.html for SPA routes
    try {
      return await getAssetFromKV(
        { request: new Request(`${new URL(req.url).origin}/index.html`, req) },
        { env, ctx }
      );
    } catch {
      return new Response('💥 Not Found', { status: 404 });
    }
  }
});

// -----------------------------
// EXPORT WORKER
// -----------------------------
export async function onRequest(context) {
  try {
    return await router.fetch(context.request, context.env, context.executionCtx);
  } catch (err) {
    // fallback to index.html / static assets
    try {
      return await getAssetFromKV({ request: context.request }, { env: context.env, ctx: context.executionCtx });
    } catch {
      return new Response('💥 Not Found', { status: 404 });
    }
  }
}


// /functions/index.js
/* import { AutoRouter, cors, json } from 'itty-router';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import { registerHandler, loginHandler } from './helpers/auth.js';
import { jsonResponse } from './helpers/jsonResponse.js';
import {
  detectLang,
  maybeRedirectToLang,
} from './helpers/lang.js';
import {
  maybeAuthRedirect,
  redirectIfAuthedTryingToLogin,
} from './Cookies/appCookie.js';

// CORS setup
const { preflight, corsify } = cors({
  origin: true,
  credentials: true,
});

// Router setup
const router = AutoRouter({
  base: '/',
  finally: [corsify],
});

router.options('*', preflight);

// Language & Auth Guards
router.all('*', (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });

  const redirect = maybeRedirectToLang(req);
  if (redirect) return redirect;

  const lang = detectLang(req);
  const maybeBlock = maybeAuthRedirect(req, lang);
  if (maybeBlock) return maybeBlock;

  const maybeSkipLogin = redirectIfAuthedTryingToLogin(req, lang);
  if (maybeSkipLogin) return maybeSkipLogin;
});

// API routes
router.post('/register', (req, env) => registerHandler(req, env));
router.post('/login', (req, env) => loginHandler(req, env));
router.get('/json', () => jsonResponse({ status: '0k⏪' }, 200));

// SPA catch-all paths
const spaPaths = ['/', '/login', '/register', '/games', '/dashboard'];

// Export Cloudflare Pages function
export async function onRequest(context) {
  const { request, env, executionCtx } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // First try router
  try {
    return await router.fetch(request, env, executionCtx);
  } catch (err) {
    // If router fails, try SPA catch-all
    const isSpaRoute = spaPaths.some(
      (base) => pathname === base || pathname.startsWith(base + '/')
    );

    if (isSpaRoute) {
      try {
        return await getAssetFromKV(
          { request },
          { env, ctx: executionCtx }
        );
      } catch {
        return new Response('💥 index.html not found', { status: 500 });
      }
    }

    // Fallback 404
    return new Response('💥 Not Found', { status: 404 });
  }
}
 */
// -----------------------------
// EXPORT WORKER HANDLER
// -----------------------------
//export default {
//  async fetch(request, env, ctx) {
/* export async function onRequest(context) {   // context has { request, env, params, executionCtx }
    try {
      // Try router first
      return await router.fetch(context.request, context.env, context.executionCtx);
    } catch (err) {
      // Fallback to asset handler
      try {
        return await getAssetFromKV({ context.request }, { context.env, context.executionCtx });
      } catch {
        return new Response('💥 Not Found', { status: 404 });
      }
    }
  //},
}; */
// /functions/index.js