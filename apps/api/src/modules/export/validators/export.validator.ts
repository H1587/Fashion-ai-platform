import { z } from "zod";

export const ExportSchema = z.object({
    techPackId: z.string().min(1),

    format: z.enum([
        "pdf",
        "docx",
    ]),
});

export type ExportSchema = z.infer<
    typeof ExportSchema
>;