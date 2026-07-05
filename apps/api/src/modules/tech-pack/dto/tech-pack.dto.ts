export interface GarmentIdentification {
    productName?: string;
    garmentType?: string;
    category?: string;
    gender?: string;
    season?: string;
    style?: string;
}

export interface ConstructionSpecification {
    constructionType?: string;
    operations?: string[];
    collarConstruction?: string;
    sleeveConstruction?: string;
    pocketConstruction?: string;
    placketConstruction?: string;
    cuffConstruction?: string;
    hemConstruction?: string;
    notes?: string;
}

export interface FabricSpecification {
    primaryFabric?: string;
    composition?: string;
    gsm?: string;
    weave?: string;
    finish?: string;
    stretch?: string;
    color?: string;
}

export interface TrimSpecification {
    buttons?: string[];
    zippers?: string[];
    labels?: string[];
    tags?: string[];
    threads?: string[];
    accessories?: string[];
}

export interface StitchSpecification {
    stitchTypes?: string[];
    stitchDensity?: string;
    reinforcementAreas?: string[];
}

export interface SeamSpecification {
    seamTypes?: string[];
    seamFinish?: string;
    seamAllowance?: string;
    topStitchDetails?: string;
}

export interface FitSpecification {
    fit?: string;
    silhouette?: string;
    ease?: string;
}

export interface ManufacturingNotes {
    notes?: string[];
    specialInstructions?: string[];
}

export interface CareSpecification {
    washing?: string;
    bleaching?: string;
    drying?: string;
    ironing?: string;
    dryCleaning?: string;
}

export interface PackagingSpecification {
    foldingMethod?: string;
    packagingMaterials?: string[];
    cartonSpecification?: string;
    labelingInstructions?: string[];
}

export interface QualityChecklist {
    appearanceChecks?: string[];
    measurementChecks?: string[];
    stitchingChecks?: string[];
    finishingChecks?: string[];
    packagingChecks?: string[];
}

export interface TechPackDTO {
    specificationId: string;

    title?: string;

    technicalDescription?: string;

    garmentIdentification?: GarmentIdentification;

    constructionSpecification?: ConstructionSpecification;

    fabricSpecification?: FabricSpecification;

    trimSpecification?: TrimSpecification;

    stitchSpecification?: StitchSpecification;

    seamSpecification?: SeamSpecification;

    fitSpecification?: FitSpecification;

    manufacturingNotes?: ManufacturingNotes;

    careSpecification?: CareSpecification;

    packagingSpecification?: PackagingSpecification;

    qualityChecklist?: QualityChecklist;

    revision?: number;
}