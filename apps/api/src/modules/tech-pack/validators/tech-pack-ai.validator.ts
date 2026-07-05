import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                          Section Validators                                */
/* -------------------------------------------------------------------------- */

export const GarmentIdentificationResponseSchema = z.object({
    productName: z.string().optional(),
    garmentType: z.string().optional(),
    category: z.string().optional(),
    gender: z.string().optional(),
    season: z.string().optional(),
    style: z.string().optional(),
});

export const ConstructionSpecificationResponseSchema = z.object({
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

export const FabricSpecificationResponseSchema = z.object({
    primaryFabric: z.string().optional(),
    composition: z.string().optional(),
    gsm: z.string().optional(),
    weave: z.string().optional(),
    finish: z.string().optional(),
    stretch: z.string().optional(),
    color: z.string().optional(),
});

export const ButtonResponseSchema = z.object({
    type: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
});

export const ZipperResponseSchema = z.object({
    type: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
});

export const LabelResponseSchema = z.object({
    type: z.string().optional(),
    placement: z.string().optional(),
    material: z.string().optional(),
});

export const TagResponseSchema = z.object({
    type: z.string().optional(),
    attachment: z.string().optional(),
});

export const ThreadResponseSchema = z.object({
    type: z.string().optional(),
    ticket: z.string().optional(),
    color: z.string().optional(),
});

export const AccessoryResponseSchema = z.object({
    type: z.string().optional(),
    attachment: z.string().optional(),
    quantity: z.string().optional(),
});

export const TrimSpecificationResponseSchema = z.object({
    buttons: z.array(ButtonResponseSchema).optional(),
    zippers: z.array(ZipperResponseSchema).optional(),
    labels: z.array(LabelResponseSchema).optional(),
    tags: z.array(TagResponseSchema).optional(),
    threads: z.array(ThreadResponseSchema).optional(),
    accessories: z.array(AccessoryResponseSchema).optional(),
});

export const StitchSpecificationResponseSchema = z.object({
    stitchTypes: z.array(z.string()).optional(),
    stitchDensity: z.string().optional(),
    reinforcementAreas: z.array(z.string()).optional(),
});

export const SeamSpecificationResponseSchema = z.object({
    seamTypes: z.array(z.string()).optional(),
    seamFinish: z.string().optional(),
    seamAllowance: z.string().optional(),
    topStitchDetails: z.string().optional(),
});

export const FitSpecificationResponseSchema = z.object({
    fit: z.string().optional(),
    silhouette: z.string().optional(),
    ease: z.string().optional(),
});

export const ManufacturingNotesResponseSchema = z.object({
    notes: z.array(z.string()).optional(),
    specialInstructions: z.array(z.string()).optional(),
});

export const CareSpecificationResponseSchema = z.object({
    washing: z.string().optional(),
    bleaching: z.string().optional(),
    drying: z.string().optional(),
    ironing: z.string().optional(),
    dryCleaning: z.string().optional(),
});

export const PackagingSpecificationResponseSchema = z.object({
    foldingMethod: z.string().optional(),
    packagingMaterials: z.array(z.string()).optional(),
    cartonSpecification: z.string().optional(),
    labelingInstructions: z.array(z.string()).optional(),
});

export const QualityChecklistResponseSchema = z.object({
    appearanceChecks: z.array(z.string()).optional(),
    measurementChecks: z.array(z.string()).optional(),
    stitchingChecks: z.array(z.string()).optional(),
    finishingChecks: z.array(z.string()).optional(),
    packagingChecks: z.array(z.string()).optional(),
});

/* -------------------------------------------------------------------------- */
/*                         AI Response Validator                              */
/* -------------------------------------------------------------------------- */

export const TechPackAIResponseSchema = z.object({
    schemaVersion: z.string(),

    garmentIdentification:
        GarmentIdentificationResponseSchema,

    constructionSpecification:
        ConstructionSpecificationResponseSchema,

    fabricSpecification:
        FabricSpecificationResponseSchema,

    trimSpecification:
        TrimSpecificationResponseSchema,

    stitchSpecification:
        StitchSpecificationResponseSchema,

    seamSpecification:
        SeamSpecificationResponseSchema,

    fitSpecification:
        FitSpecificationResponseSchema,

    manufacturingNotes:
        ManufacturingNotesResponseSchema,

    careSpecification:
        CareSpecificationResponseSchema,

    packagingSpecification:
        PackagingSpecificationResponseSchema,

    qualityChecklist:
        QualityChecklistResponseSchema,
});

export type TechPackAIResponseDTO =
    z.infer<typeof TechPackAIResponseSchema>;