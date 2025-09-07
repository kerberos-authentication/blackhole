// src/entry-client.jsx
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router';
import { Router } from "./Router";
import "./index.css";
import { Suspense } from "react";
import './components/utils/i18n'; // 👈 import once for client

const initialUser = window.__INITIAL_USER__;

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



hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <Suspense fallback={ <div className="translate-y-1/2"><Spinner /></div> }>
  <Router user={initialUser} />
</Suspense>

  </BrowserRouter>
);


/* 
<Routes>
      {routes.map(({ path, element }, i) => (
        <Route key={i} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>

 */

