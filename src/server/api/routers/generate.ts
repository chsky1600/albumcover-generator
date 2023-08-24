import { TRPCError } from '@trpc/server';
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// import OpenAI from "openai";
// import { env } from '~/env.mjs';

// const openai = new OpenAI({
//     apiKey: env.DALLE_API_KEY,
// });


export const generateRouter = createTRPCRouter({
    generateCover: protectedProcedure.input(
        z.object({
            prompt: z.string(),
        })
    )
    .mutation(async({ctx, input}) => {
        // console.log("generated:", input.prompt);
        const {count} = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits: {
                    gte: 1
                },
            },
            data: {
                credits: {
                    decrement: 1
                },
            },
        });

        if (count <= 0) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'insufficient number of credits for request',
            })


        }

        // const response = await openai.createImage({
        //     prompt: "a white siamese cat",
        //     n: 1,
        //     size: "1024x1024",
        //   });
        //   image_url = response.data.data[0].url;
        
        console.log({count});
        return {
            message: "success",
        };
    }),
});
