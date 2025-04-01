import { TRPCError } from "@trpc/server";
import { z } from "zod";

import type { TRPCRouterRecord } from "@trpc/server";

import guitars from "../data/example-guitars";
import { createTRPCRouter, publicProcedure } from "./init";

const guitarRouter: TRPCRouterRecord = {
  list: publicProcedure.query(async () => guitars),
  byId: publicProcedure
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

export const trpcRouter = createTRPCRouter({
  guitar: guitarRouter,
});

export type TRPCRouter = typeof trpcRouter;
