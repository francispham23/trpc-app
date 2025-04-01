import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { TRPCRouter } from "@/trpc/router";

//? Doc: https://trpc.io/docs/client/tanstack-react-query/server-components#4-create-a-trpc-client-for-client-components
export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();
