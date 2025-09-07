// /Server/index.js
// ---------------------------------------------------------------------------
// Single Node HTTP server using itty-router.
// - Serves static files from /public (if you want that).
// - Applies CORS for API routes.
// - Enforces language prefix + auth guards (redirects).
// - Wires /register and /login to auth handlers (NO self fetch).
// - Converts Web Response -> Node response safely.
// - Fixes Node's "duplex" requirement when constructing Request with a body.
// ---------------------------------------------------------------------------
// /Server/index.js
// -----------------------------
// CORE IMPORTS
// -----------------------------
import http from 'http'; // Node.js HTTP server
import path from 'path'; // Path utilities
import { fileURLToPath } from 'url'; // Convert import.meta.url → __dirname
import serveStatic from 'serve-static'; // Middleware for serving static files

import { AutoRouter, json, error, cors } from 'itty-router';  // itty-router
// Local helpers
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
// SERVER CONFIG
// -----------------------------
const HOST = 'localhost';
const PORT = 8000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// -----------------------------
// STATIC FILE MIDDLEWARE
// -----------------------------
// Serve everything under /public folder
//   e.g.  /public/logo.png → http://localhost:8000/logo.png
const staticMiddleware = serveStatic(path.join(__dirname, '../public'), {
  index: false,     // do not auto-serve index.html
  fallthrough: true // let router handle if not found
});
// -----------------------------
// CORS CONFIG
// -----------------------------
// cors() from itty-router provides:
//   - preflight() : handles OPTIONS requests
//   - corsify(resp): attaches CORS headers to responses , → attaches Access-Control-* headers to any Response  
// cors() helper gives:
//   - preflight(req) → returns a Response for OPTIONS requests 
const { preflight, corsify } = cors({
  origin: true,       // reflect whatever Origin was sent
  // in itty-router v5, the origin option is evaluated at router setup time, not per request,
  //  so req is actually undefined there. //origin: (req) => req.headers.get('origin') || '*', // allow current origin or *
  credentials: true, // allow cookies/auth headers
});   //  When CORS is involved ->Browsers send OPTIONS before POST/PUT/DELETE
// -----------------------------
// ROUTER SETUP
// -----------------------------
const router = AutoRouter({
  base: '/',
  finally: [
    (res, req) => corsify(res, req),  // ✅ last step, inject CORS headers
  ],
});
// Handle OPTIONS automatically
router.options('*', preflight)

// 1) Handle OPTIONS automatically (important for preflight!)
//router.all('*', preflight);
// PROBLEM: 
//   Browser sends OPTIONS (CORS preflight) before POST /register.
//   If OPTIONS is not answered correctly, browser never sends POST.
//   Earlier code mistakenly called preflight() immediately, without req.
//   That made req = undefined -> crash ("cannot read properties of undefined").
//
// FIX:
//   Pass the handler reference: router.options('*', preflight);
//   Now itty-router will call preflight(req) properly.

// 1) Handle OPTIONS (preflight) for all routes
//       router.options('*', preflight);
/* You correctly added: router.options('*', preflight); but in itty-router v5 :
 The preflight helper returns a Response — you still need to send it back with sendWebResponse.
Right now your code swallows it (you return nothing).
Change this block:  router.options('*', preflight);     To ->

                                        // 1) Handle OPTIONS (CORS preflight) for all routes
                                              router.options('*', (req) => {
                                                console.log("⏪ Handling preflight (OPTIONS) for:", req.url);
                                                return preflight(req); // return the Response
                                              });
                                              ⚡ Why This Works

  router.options('*', preflight) just registers the function.

  But if you don’t return its response, router.handle(request) will give undefined.

  That means your downstream code still reaches the 404 fallback, and the browser never sees the Access-Control-Allow-* headers.

  With return preflight(req) you explicitly send a valid preflight response (204 No Content + CORS headers).

  After that, the browser will happily send the real POST /register.
*/
// 1) Handle OPTIONS (CORS preflight) for all routes// Handle OPTIONS (CORS preflight) requests
// Browser sends this automatically before any POST/PUT/DELETE request
// If we don't respond, the browser never sends the real request.  

// 1) Handle OPTIONS (preflight) for all routes
// Browsers send OPTIONS before POST/PUT/DELETE when CORS is involved
router.all('*', (req) => {
  if (req.method === 'OPTIONS') {
    console.log("⏪ Handling preflight (OPTIONS) for:", req.url);
    return preflight(req); // ✅ Respond with 204 + CORS headers  always return a Response
    // return the Response//And since you return preflight(req),
  //  your server responds with 204 No Content + CORS headers → browser continues with POST /register.                                                       
                            // return; // don’t redirect preflights  // no redirect on preflight
  }
});
// 2) Middleware: enforce language prefix (GET navigation only)  
// 2) Language middleware (skip OPTIONS)
// Only redirect GET navigation, Not preflight
router.all('*', (req) => {
  if (req.method === 'OPTIONS')  return new Response(null, { status: 204 }); // safe no-op response
     //  return; Skip OPTIONS // return; is dangerous, because return; means undefined.
     //Replace with:
  const redirect = maybeRedirectToLang(req);
  if (redirect) return redirect; // enforce /en, /fa, etc.
});
// 3) Auth middleware (skip OPTIONS automatically because nothing returns)
router.all('*', (req) => {
  const lang = detectLang(req);

  // Block mechanism access if user not logged in
  const maybeBlock = maybeAuthRedirect(req, lang);
  if (maybeBlock) return maybeBlock;

  // Prevent logged-in users from hitting /login again
  const maybeSkipLogin = redirectIfAuthedTryingToLogin(req, lang);
  if (maybeSkipLogin) return maybeSkipLogin;
});
// 4) API ROUTES
router.post('/register', registerHandler);  // signup
router.post('/login',    loginHandler);     // login

// 5) 404 fallback
router.all('*', () => new Response('💥 Not Found', { status: 404 }));
// -----------------------------
// HELPER: Convert Web Response → Node.js Response
// -----------------------------
async function sendWebResponse(nodeRes, webResp) {
  //That means this line blew up: Object.fromEntries(webResp.headers.entries()  👉 webResp is undefined.
//So router.fetch(...) didn’t give you a Response.
  // Copy status + headers from Fetch Response
  nodeRes.writeHead(webResp.status, Object.fromEntries(webResp.headers.entries()));
  // if no body, end
  if (!webResp.body) return nodeRes.end();
// Otherwise stream buffer
  const buf = Buffer.from(await webResp.arrayBuffer());
  nodeRes.end(buf);
}
// & ) Example JSON test route
router.get('/json', () => jsonResponse({ status: '0k⏪' }, 200));
// -----------------------------
// CREATE HTTP SERVER
// -----------------------------
http.createServer((req, res) => {
  console.log("➡️ Incoming:", req.method, req.url);
  // 1) Try static files first ... serving from /public
  staticMiddleware(req, res, (err) => {
    if (err) {
      console.error("Static middleware error:", err);
      res.writeHead(500);
      return res.end("Static server error");
    }
    // 2) If not static file,, hand to itty-router   // 2) AutoRouter
    (async () => {
      console.log("⚡ Passing to router👍:", req.method, req.url);
      try { 
        console.log('Router-Fetch Try-process started... according to desire -: ');
        //WHATWG (Web Hypertext Application Technology Working Group)
        // Wrap Node req into WHATWG Request (Fetch API Request)
//The Fetch Standard, maintained by the WHATWG, provides a powerful and flexible mechanism for making network requests
//  in web applications. The core components of this standard are Request and Response objects.
        const request = new Request(new URL(req.url, `http://${req.headers.host}`), { 
          method: req.method,
          headers: req.headers,
          // Only attach body if method has one
          body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
          duplex: ['GET', 'HEAD'].includes(req.method) ? undefined : 'half',
        });
         console.log('Router-Fetch added a header -: ');
        // Route request  //In itty-router v5, router.fetch(req) always returns either: 1)a Response object (good ✅), or
          const response = await router.fetch(request); // use WHATWG Request
let finalResponse = response || new Response('💥 Not Found', { status: 404 });

// Always attach CORS headers
finalResponse = corsify(finalResponse, request);
                                                            //2)undefined if no route matched ❌
  // const response = router.fetch(req).then(json)//router.fetch(req) already returns a Response (or undefined if no match).
  //     .catch(error)// It chained .then(json) which tries to parse the Response into JSON (not needed).
  //     .then((req, res) => corsify(req, res)); //It chained .then((req, res) => corsify(req, res)), but that callback signature is wrong.    
  // Fallback if router returned nothing
  console.log('Router-Fetch examined and handled the header -: ');
        if (!response) response = new Response('💥 Not Found', { status: 404 }); // ✅ Prevent undefined response from killing corsify
  //Rule : Always (apply)attach CORS headers
     //   response = corsify(response); //When you immediately run: response = corsify(response);
// but response is undefined, itty-router tries to do .clone() on it → boom 💥.

        console.log('CORS headers to an HTTP response succeded... according to desire (-: ');
    // Problem was bellow !  I Removed double-send (no second sendWebResponse).   
        // let ittyResp = await router.handle(request);
        //     let resp = ittyResp || new Response('Not found', { status: 404 });
        //     let   corsed = corsify(resp);
        //       await sendWebResponse(res, corsed);
//         // Ensure fallback
//         if (ittyResp) {
//   console.log("← router response:", ittyResp.status, Object.fromEntries(ittyResp.headers.entries()));
// } else {
//   console.log("← router returned null for", req.method, req.url);
//   ittyResp = new Response('💥 Not Found', { status: 404 });
// }
//      //   if (!ittyResp) ittyResp = new Response('💥 Not Found', { status: 404 });
//         // ALWAYS attach CORS headers
//          corsed = corsify(ittyResp);
//         // Send back
//         await sendWebResponse(res, corsed);
//       } catch (err) {
//         console.error('Router error:', err);
//         res.writeHead(500, { 'Content-Type': 'text/plain' });
//         res.end('Internal Server Error!');
//       }
//     })();
//   });
// }).listen(PORT, HOST, () => {
//   console.log(`✅ Server running at http://${HOST}:${PORT}`);
// });

/*   🔍 What’s wrong?
You are calling router.handle(request) once, storing the response in ittyResp.
You send a response (await sendWebResponse(res, corsed)).
Then later, you check again (if (ittyResp) { ... } else { ... }), and send a second time.
⚠️ This double-send logic is broken: Node cannot send headers twice → the request silently dies.
Also, corsify is applied twice, which isn’t needed. */
        //Solved : Send once  
 // Send back to Node  
        await sendWebResponse(res, response);// Send to Node
        console.log('Router Try-process succeded... according to desire (-: ');
      } catch (err) {
        console.error('💥Router error:❌', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('⚠️Internal Server Error!');
      }
    })();
  });
}).listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT} 🙏`);
});


//router.all('*', preflight) runs first → ensures OPTIONS requests always succeed.
//This will answer OPTIONS /register with status 204 and correct headers.

//Every response is passed through corsify() so your frontend can make requests without being blocked.

//Clarified comments at each step so you know why each block is there.
// //---------------------------------------------------------------------------
// I see what’s happening — your frontend calls /register with a POST request, but before it does that, the browser always sends an OPTIONS request (called a CORS preflight).

// 👉 If your server does not return the correct response to that OPTIONS request, the browser will never send the real POST, which is why you’re stuck on "loading…".

// You already had router.all('*', preflight) from itty-router’s CORS helper, but the way it’s wired right now might not properly answer OPTIONS /register.

/* -------------------------------------------------------------------------

II) "Resources on demand" (CPU/RAM) — quick guidance:

- Inside a single Node process you cannot "assign CPU/RAM per route".
- What you *can* do:
  1) Run multiple processes (PM2 cluster mode or Node's cluster) to use multiple CPU cores.
  2) Use worker_threads or a job queue (BullMQ, RabbitMQ) for CPU-heavy work.
  3) Set memory limits / auto-restarts (e.g., PM2: max_memory_restart).
  4) Horizontal scale behind a load balancer (Docker/K8s/VMs) to add capacity "on demand".
  5) Cache aggressively (Redis) and throttle/rate-limit hot endpoints.

Those are deployment/runtime concerns rather than per-route code changes.
-------------------------------------------------------------------------- */
