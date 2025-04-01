import { TRPCError } from "@trpc/server";
import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "./init";

import guitars from "@/data/example-guitars";

/**
 * guitarRouter handles the guitar-related routes.
 */
const guitarRouter = {
  list: publicProcedure.query(async () => guitars),
  byId: publicProcedure
    //? Doc: https://trpc.io/docs/server/validators#input-merging
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const guitar = guitars.find((guitar) => guitar.id === input.id);
      if (!guitar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Guitar with id ${input.id} not found`,
        });
      }
      return guitar;
    }),
} satisfies TRPCRouterRecord;

/**
 * trpcRouter handles the root TRPC router.
 */
export const trpcRouter = createTRPCRouter({
  guitars: guitarRouter,
});

/**
 * TRPCRouter is the type of the root TRPC router.
 */
export type TRPCRouter = typeof trpcRouter;
