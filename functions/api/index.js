// /functions/index.js
import { AutoRouter, cors } from 'itty-router';
import { jsonResponse } from './helpers/jsonResponse.js';
import { registerHandler, loginHandler } from './helpers/auth.js';
import { detectLang, maybeRedirectToLang } from './helpers/lang.js';
import { maybeAuthRedirect, redirectIfAuthedTryingToLogin } from './Cookies/appCookie.js';

// -----------------------------
// CORS setup
// -----------------------------
const { preflight, corsify } = cors({
  origin: true,
  credentials: true,
});

// -----------------------------
// Router setup
// -----------------------------
const router = AutoRouter({ base: '/', finally: [corsify] });

// -----------------------------
// OPTIONS preflight
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
// API Routes
// -----------------------------
router.post('/register', (req, env) => registerHandler(req, env));
router.post('/login', (req, env) => loginHandler(req, env));
router.get('/json', () => jsonResponse({ status: 'ok' }));

// -----------------------------
// SPA / Static Assets
// -----------------------------
const spaPaths = ['/', '/login', '/register', '/games', '/dashboard'];

// -----------------------------
// Cloudflare Pages Function
// -----------------------------
export async function onRequest(context) {
  const { request, env, executionCtx } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // -----------------------------
  // API routes first
  // -----------------------------
  const apiRoutes = ['/register', '/login', '/json'];
  if (apiRoutes.some((base) => pathname === base)) {
    try {
      return await router.fetch(request, env, executionCtx);
    } catch (err) {
      return jsonResponse({ error: 'API request failed', details: err.message }, 500);
    }
  }

  // -----------------------------
  // SPA routes
  // -----------------------------
  const isSpaRoute = spaPaths.some(
    (base) => pathname === base || pathname.startsWith(base + '/')
  );

  if (isSpaRoute || pathname.includes('.')) {
    // Serve static assets automatically:
    // - JS, CSS, images, fonts, etc. are served from /dist
    try {
      // Cloudflare Pages automatically serves files in the "publish" folder.
      // If the request matches a file, it will be served; otherwise, fallback to index.html
      return await fetch(new Request(request.url));
    } catch (err) {
      return jsonResponse({ error: 'Static file not found', details: err.message }, 404);
    }
  }

  // -----------------------------
  // Fallback: SPA index.html for client-side routing
  // -----------------------------
  try {
    return await fetch(new Request(`${url.origin}/index.html`, request));
  } catch (err) {
    return jsonResponse({ error: 'index.html not found', details: err.message }, 500);
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