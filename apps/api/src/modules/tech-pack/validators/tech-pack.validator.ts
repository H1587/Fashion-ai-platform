import { z } from "zod";

export const TechPackSchema = z.object({
    specificationId: z.string().min(1),

    title: z.string().optional(),

    technicalDescription: z.string().optional(),

    constructionDetails: z.string().optional(),

    fabricDetails: z.string().optional(),

    trimDetails: z.string().optional(),

    measurementNotes: z.string().optional(),

    fitNotes: z.string().optional(),

    careInstructions: z.string().optional(),

    packagingInstructions: z.string().optional(),

    qualityNotes: z.string().optional(),

    revision: z.number().int().positive().optional(),
});

export const UpdateTechPackSchema =
    TechPackSchema
        .omit({
            specificationId: true,
        })
        .partial()
        .refine(
            (data) =>
                Object.keys(data).length > 0,
            {
                message:
                    "At least one field must be provided for update.",
            }
        );

export type TechPackSchema = z.infer<
    typeof TechPackSchema
>;

export type UpdateTechPackSchema = z.infer<
    typeof UpdateTechPackSchema
>;