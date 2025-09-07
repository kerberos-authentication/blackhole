// /server/api/helpers/jsonResponse.js
// itty-router expects every route handler to return a `Response` object
// so let's create a helper to easily send JSON responses.

// /Server/api/helpers/jsonResponse.js
// ---------------------------------------------------------------------------
// itty-router handlers must RETURN a Web Response object.
// This helper makes returning JSON ergonomic and consistent.
// ---------------------------------------------------------------------------
export function jsonResponse(data, status = 200, extraHeaders = {}) {
  // Always stringify a plain JS object to JSON
  const body = JSON.stringify(data);

  // Construct a standards-compliant Response (undici / WHATWG)
  // IMPORTANT: status must be 200..599 (avoid the "RangeError" you saw).
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'application/json',
 'Access-Control-Allow-Origin': '*',  // 👈 allow frontend //frontend is running on localhost:5173 and backend on localhost:8000
                                        // , it must send CORS headers in response
      ...extraHeaders,
    },
  });
}


// export const jsonResponse = (data, status = 200, extraHeaders = {}) => {
//   return new Response(JSON.stringify(data), {
//     status,
//     headers: {
//       'Content-Type': 'application/json',
//       ...extraHeaders
//     }
//   });
// };