import superjson from "superjson";
import { QueryClient } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";

import { TRPCProvider } from "@/trpc/react";
import type { TRPCRouter } from "@/trpc/router";

const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: { serializeData: superjson.serialize },
    hydrate: { deserializeData: superjson.deserialize },
  },
});

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
}

//? Doc: https://trpc.io/docs/client/vanilla/setup#3-initialize-the-trpc-client
export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    //? Doc: https://trpc.io/docs/client/links/httpBatchStreamLink
    httpBatchStreamLink({
      transformer: superjson,
      url: getUrl(),
    }),
  ],
});

//? Doc: https://trpc.io/docs/client/tanstack-react-query/setup#3b-setup-without-react-context
const serverHelpers = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient,
});

export function getContext() {
  return {
    queryClient,
    trpc: serverHelpers,
  };
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
}
