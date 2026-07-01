import { z } from "zod";

export const uploadImageSchema = z.object({
    projectId: z.string().min(1, "Project ID is required."),
});

export type UploadImageInput = z.infer<typeof uploadImageSchema>;