import {z} from "zod";

export const createReviewSchema = z.object({

    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Must be a valid user ID"),

    spotifyAlbumId: z.string().trim().min(1).max(100),

    rating: z.number().int().min(1).max(5),

    text: z.string().trim().min(1).max(1000),

    listenedAt: z.iso.datetime().transform((value) => new Date(value)),

});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;