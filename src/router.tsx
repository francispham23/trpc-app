import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";

// Create a new router instance. Doc: https://tanstack.com/router/latest/docs/framework/react/examples/with-trpc-react-query
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
      //? Doc: https://tanstack.com/router/latest/docs/framework/react/api/router/RouterOptionsType#wrap-property
      Wrap: (props: { children: React.ReactNode }) => (
        <TanstackQuery.Provider>{props.children}</TanstackQuery.Provider>
      ),
    }),
    TanstackQuery.getContext().queryClient
  );

  return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
