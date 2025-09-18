// src/server.jsx
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Router } from './Router';
import "./index.css";
import { Suspense } from 'react';

import { pageModules } from './routes.js'; // <- your Vite glob

import i18n from './components/utils/i18n';  // 👈 server-safe (no LanguageDetector)// Must be same instance used in app

import { getAuthFromRequest } from '../functions/api/Cookies/appCookie.js';
import {findUserByEmail} from '../functions/api/models/user.model.js';
import { connectDB } from '../functions/api/config/db.js';

const Spinner = () => (
  <div className="flex justify-center items-center p-4">
    <svg
      className="animate-spin h-5 w-5 text-indigo-500"
        fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

export async function renderServerApp(url, lang = 'en',req) {
  // ✅ Preload all dynamically imported page modules
  await Promise.all(
    Object.values(pageModules).map((load) =>
      load().catch((err) => {
        console.warn('Failed to preload a route:', err);
      })
    )
  );
     // Manually set language on server
        await i18n.changeLanguage(lang);
await connectDB();
let user =null;
try {     const userId = getAuthFromRequest(req);
  if(userId) { user = await findUserByEmail(env, email); console.log(user," is fetched"); }//User.findById(userId).select('-password');
  else console.log("There is not a successful login.");
  
} catch (err) { console.wan('Failed to fetch user : ', err.message); 
  
}
  let html = renderToString(
    <StaticRouter location={url}>
      <Suspense fallback={<div className="translate-y-1/2"><Spinner /></div>}>
        <Router user={user} />
      </Suspense>
    </StaticRouter>
  );
  html = template
  .replace('<!--ssr-outlet-->', appHtml)
  .replace(
    '</body>',
    `<script>window.__INITIAL_USER__ = ${JSON.stringify(user)};</script></body>`
  );

  return html;
}

/*
 export async function renderServerApp(url) {
  await Promise.all(Object.values(pageModules).map(load => load()));
  const html = renderToString(
    <StaticRouter location={url}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
    </StaticRouter>
  );
  return html;
} */





    /*  router.get('*', (req) => {
       const appHtml = renderToString(<App />);
       return new Response(`
         <!DOCTYPE html>
         <html>
           <head>
             <title>SSR App</title>
           </head>
           <body>
             <div id="root">${appHtml}</div>
             <script type="module" src="/src/index.jsx"></script>
           </body>
         </html>
       `, {
         headers: { 'content-type': 'text/html' },
       });
     });

     export default async function handleRequest(request) {
       return router.handle(request);
     }
 */