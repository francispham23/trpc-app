import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  //? Doc: https://trpc.io/docs/server/data-transformers#using-superjson
  transformer: superjson,
});

//? Doc: https://trpc.io/docs/server/routers#defining-a-router
export const createTRPCRouter = t.router;

//? Doc: https://trpc.io/docs/server/procedures
export const publicProcedure = t.procedure;
