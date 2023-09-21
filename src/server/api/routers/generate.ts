import { TRPCError } from '@trpc/server';
import { z } from "zod";
import { env } from "~/env.mjs";
import AWS from "aws-sdk";

const s3 = new AWS.S3({ 
    credentials:{
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
    },
    region: "us-east-1"
});

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import OpenAI from "openai";
import { b64Image } from '~/data/b64image';

const openai = new OpenAI({
    apiKey: process.env.DALLE_API_KEY,
});

async function generateCover(prompt: string): Promise<string | undefined> {
    if (env.MOCK_DALLE=== "true") {
        return b64Image;
    } else {
        const response = await openai.images.generate({
            prompt: prompt,  
            size: "512x512",
            response_format: "b64_json"  
        });

        return response.data[0]?.b64_json!;
    }
}

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
        
        const base64EncodedImage = await generateCover(input.prompt);

        const icon = await ctx.prisma.icon.create({
            data: {
                prompt: input.prompt,
                userID: ctx.session.user.id,
            },
        });

        // TODO: dump to s3
        await s3
        .putObject({
            Bucket: "cover-gen",
            Body: Buffer.from(base64EncodedImage!, "base64"),
            Key: icon.id, //TODO: Generate a random ID
            ContentEncoding: "base64",
            ContentType: "image/gif",
        })
        .promise();

        return {
            imageUrl: base64EncodedImage,
        };
    }),
});
