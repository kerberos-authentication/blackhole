// -----------------------------
// /server/index.js
import { AutoRouter, json, error, cors } from 'itty-router';  // itty-router
import { jsonResponse } from './api/helpers/jsonResponse.js';
import { registerHandler, loginHandler } from './api/helpers/auth.js';
import { maybeRedirectToLang, detectLang, maybeAuthRedirect, redirectIfAuthedTryingToLogin } from './api/helpers/lang.js';

// Create a router instance
const router = AutoRouter();
// Static files handler for React build
const serveStaticFiles = (request) => {
  // Static file serving - default worker behavior (using [site] bucket config)
  return fetch(`./dist${request.url}`, { redirect: 'follow' });
};

// CORS configuration
const { preflight, corsify } = cors({
  origin: '*',
  credentials: true,
});

// Middleware: Handle OPTIONS requests (CORS preflight)
router.options('*', preflight);

// Middleware for language detection and redirection
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
router.post('/register', registerHandler);
router.post('/login', loginHandler);

// Catch-all for static files and SPA fallback
router.all('*', async (req) => {
  const path = req.url.split('?')[0]; // Ignore query params for routing

  // Serve static files (React build assets)
  if (path.startsWith('/assets/') || path.endsWith('.html')) {
    return serveStaticFiles(req);
  }

  // If no route matches, serve index.html (React Router SPA fallback)
  return fetch('./dist/index.html');
});

// Catch-all for undefined routes
router.all('*', () => jsonResponse({ message: 'Not Found' }, 404));

export default {
  fetch: (req) => router.handle(req),
};
