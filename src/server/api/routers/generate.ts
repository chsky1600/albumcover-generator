import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
    generateCover: publicProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(({ctx, input}) => {
        console.log("generated:", input.prompt);
        return {
            message: "success",
        };
    }),
});