import { serve } from "https://deno.land/std@0.119.0/http/server.ts";

//HTTP servers need a handler function. This function is called for every request that comes in. It must return a `Response`. The handler function can be asynchronous (it may return a `Promise`).
function handler(_req: Request): Response {
    console.log('entra al servidor ')
  return new Response("Hello, World!");
}

// To start the server on the default port, call `serve` with the handler.
console.log("Listening on http://localhost:8000");
serve(handler);