import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { trpcRouter } from "@/trpc/router";

/**
 * handler handles the TRPC requests(Eg. Created API Endpoint: http://localhost:3000/api/trpc/guitars.list).
 */
function handler({ request }: { request: Request }) {
  //? Doc: https://trpc.io/docs/server/adapters/fetch#solidstart
  return fetchRequestHandler({
    req: request,
    router: trpcRouter,
    endpoint: "/api/trpc",
  });
}

/**
 * APIRoute handles the "/api/trpc" route for TRPC requests.
 */
export const APIRoute = createAPIFileRoute("/api/trpc/$")({
  GET: handler,
  POST: handler,
});
