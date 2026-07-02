import { z } from "zod";

export const ProductSpecificationSchema = z.object({
    imageId: z.string().min(1),

    analysisId: z.string().min(1),

    productName: z.string().optional(),
    productCategory: z.string().optional(),
    productType: z.string().optional(),

    gender: z.string().optional(),

    primaryColour: z.string().optional(),
    secondaryColour: z.string().optional(),

    fabric: z.string().optional(),
    pattern: z.string().optional(),

    fit: z.string().optional(),

    sleeve: z.string().optional(),
    collar: z.string().optional(),
    closure: z.string().optional(),
    pocket: z.string().optional(),

    season: z.string().optional(),
    style: z.string().optional(),

    description: z.string().optional(),

    keyFeatures: z.array(z.string()).optional(),

    manufacturingNotes: z.string().optional(),
});

export type ProductSpecificationSchema = z.infer<
    typeof ProductSpecificationSchema
>;