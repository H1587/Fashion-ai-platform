import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                              Section Schemas                               */
/* -------------------------------------------------------------------------- */

export const GarmentIdentificationSchema = z.object({
    productName: z.string().optional(),
    garmentType: z.string().optional(),
    category: z.string().optional(),
    gender: z.string().optional(),
    season: z.string().optional(),
    style: z.string().optional(),
});

export const ConstructionSpecificationSchema = z.object({
    constructionType: z.string().optional(),
    operations: z.array(z.string()).optional(),
    collarConstruction: z.string().optional(),
    sleeveConstruction: z.string().optional(),
    pocketConstruction: z.string().optional(),
    placketConstruction: z.string().optional(),
    cuffConstruction: z.string().optional(),
    hemConstruction: z.string().optional(),
    notes: z.string().optional(),
});

export const FabricSpecificationSchema = z.object({
    primaryFabric: z.string().optional(),
    composition: z.string().optional(),
    gsm: z.string().optional(),
    weave: z.string().optional(),
    finish: z.string().optional(),
    stretch: z.string().optional(),
    color: z.string().optional(),
});

export const TrimSpecificationSchema = z.object({
    buttons: z.array(z.string()).optional(),
    zippers: z.array(z.string()).optional(),
    labels: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    threads: z.array(z.string()).optional(),
    accessories: z.array(z.string()).optional(),
});

export const StitchSpecificationSchema = z.object({
    stitchTypes: z.array(z.string()).optional(),
    stitchDensity: z.string().optional(),
    reinforcementAreas: z.array(z.string()).optional(),
});

export const SeamSpecificationSchema = z.object({
    seamTypes: z.array(z.string()).optional(),
    seamFinish: z.string().optional(),
    seamAllowance: z.string().optional(),
    topStitchDetails: z.string().optional(),
});

export const FitSpecificationSchema = z.object({
    fit: z.string().optional(),
    silhouette: z.string().optional(),
    ease: z.string().optional(),
});

export const ManufacturingNotesSchema = z.object({
    notes: z.array(z.string()).optional(),
    specialInstructions: z.array(z.string()).optional(),
});

export const CareSpecificationSchema = z.object({
    washing: z.string().optional(),
    bleaching: z.string().optional(),
    drying: z.string().optional(),
    ironing: z.string().optional(),
    dryCleaning: z.string().optional(),
});

export const PackagingSpecificationSchema = z.object({
    foldingMethod: z.string().optional(),
    packagingMaterials: z.array(z.string()).optional(),
    cartonSpecification: z.string().optional(),
    labelingInstructions: z.array(z.string()).optional(),
});

export const QualityChecklistSchema = z.object({
    appearanceChecks: z.array(z.string()).optional(),
    measurementChecks: z.array(z.string()).optional(),
    stitchingChecks: z.array(z.string()).optional(),
    finishingChecks: z.array(z.string()).optional(),
    packagingChecks: z.array(z.string()).optional(),
});

/* -------------------------------------------------------------------------- */
/*                              Tech Pack Schema                              */
/* -------------------------------------------------------------------------- */

export const TechPackSchema = z.object({
    specificationId: z.string().min(1),

    title: z.string().optional(),

    technicalDescription: z.string().optional(),

    garmentIdentification:
        GarmentIdentificationSchema.optional(),

    constructionSpecification:
        ConstructionSpecificationSchema.optional(),

    fabricSpecification:
        FabricSpecificationSchema.optional(),

    trimSpecification:
        TrimSpecificationSchema.optional(),

    stitchSpecification:
        StitchSpecificationSchema.optional(),

    seamSpecification:
        SeamSpecificationSchema.optional(),

    fitSpecification:
        FitSpecificationSchema.optional(),

    manufacturingNotes:
        ManufacturingNotesSchema.optional(),

    careSpecification:
        CareSpecificationSchema.optional(),

    packagingSpecification:
        PackagingSpecificationSchema.optional(),

    qualityChecklist:
        QualityChecklistSchema.optional(),

    revision: z.number().int().positive().optional(),
});

export const UpdateTechPackSchema =
    TechPackSchema
        .omit({
            specificationId: true,
        })
        .partial()
        .refine(
            (data) => Object.keys(data).length > 0,
            {
                message:
                    "At least one field must be provided for update.",
            }
        );

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type TechPackSchema = z.infer<
    typeof TechPackSchema
>;

export type UpdateTechPackSchema = z.infer<
    typeof UpdateTechPackSchema
>;

export type GarmentIdentificationSchema = z.infer<
    typeof GarmentIdentificationSchema
>;

export type ConstructionSpecificationSchema = z.infer<
    typeof ConstructionSpecificationSchema
>;

export type FabricSpecificationSchema = z.infer<
    typeof FabricSpecificationSchema
>;

export type TrimSpecificationSchema = z.infer<
    typeof TrimSpecificationSchema
>;

export type StitchSpecificationSchema = z.infer<
    typeof StitchSpecificationSchema
>;

export type SeamSpecificationSchema = z.infer<
    typeof SeamSpecificationSchema
>;

export type FitSpecificationSchema = z.infer<
    typeof FitSpecificationSchema
>;

export type ManufacturingNotesSchema = z.infer<
    typeof ManufacturingNotesSchema
>;

export type CareSpecificationSchema = z.infer<
    typeof CareSpecificationSchema
>;

export type PackagingSpecificationSchema = z.infer<
    typeof PackagingSpecificationSchema
>;

export type QualityChecklistSchema = z.infer<
    typeof QualityChecklistSchema
>;