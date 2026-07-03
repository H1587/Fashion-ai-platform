import { z } from "zod";

export const updateDesignWizardSchema = z
    .object({
        productName: z.string().trim().min(1).optional(),
        productCategory: z.string().trim().min(1).optional(),
        productType: z.string().trim().min(1).optional(),

        gender: z.string().trim().min(1).optional(),

        primaryColour: z.string().trim().min(1).optional(),
        secondaryColour: z.string().trim().min(1).optional(),

        fabric: z.string().trim().min(1).optional(),
        pattern: z.string().trim().min(1).optional(),

        fit: z.string().trim().min(1).optional(),

        sleeve: z.string().trim().min(1).optional(),
        collar: z.string().trim().min(1).optional(),
        closure: z.string().trim().min(1).optional(),
        pocket: z.string().trim().min(1).optional(),

        season: z.string().trim().min(1).optional(),
        style: z.string().trim().min(1).optional(),

        description: z.string().trim().min(1).optional(),

        keyFeatures: z.unknown().optional(),

        manufacturingNotes: z.string().trim().min(1).optional(),
    })
    .strict();