import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;