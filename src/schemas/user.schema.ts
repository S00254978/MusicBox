import {z} from "zod";

export const createUserSchema = z.object({
    username: z.string().trim().min(3).max(30),
    email: z.string().email().trim().toLowerCase(),
   
});

export type CreateUserInput = z.infer<typeof createUserSchema>;