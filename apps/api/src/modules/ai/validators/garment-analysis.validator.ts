import { z } from "zod";

export const garmentAnalysisSchema = z.object({
    garmentCategory: z.string(),
    garmentType: z.string(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    pattern: z.string(),
    sleeveType: z.string(),
    collarType: z.string(),
    fit: z.string(),
    closureType: z.string(),
    pocketType: z.string(),
    fabricGuess: z.string(),
    gender: z.string(),
    season: z.string(),
    style: z.string(),
    confidence: z.number(),
});

export type GarmentAnalysisDTO = z.infer<typeof garmentAnalysisSchema>;