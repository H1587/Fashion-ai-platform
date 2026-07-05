export interface GarmentIdentificationResponse {
    productName?: string;
    garmentType?: string;
    category?: string;
    gender?: string;
    season?: string;
    style?: string;
}

export interface ConstructionSpecificationResponse {
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

export interface FabricSpecificationResponse {
    primaryFabric?: string;
    composition?: string;
    gsm?: string;
    weave?: string;
    finish?: string;
    stretch?: string;
    color?: string;
}

export interface ButtonResponse {
    type?: string;
    size?: string;
    color?: string;
}

export interface ZipperResponse {
    type?: string;
    size?: string;
    color?: string;
}

export interface LabelResponse {
    type?: string;
    placement?: string;
    material?: string;
}

export interface TagResponse {
    type?: string;
    attachment?: string;
}

export interface ThreadResponse {
    type?: string;
    ticket?: string;
    color?: string;
}

export interface AccessoryResponse {
    type?: string;
    attachment?: string;
    quantity?: string;
}

export interface TrimSpecificationResponse {
    buttons?: ButtonResponse[];
    zippers?: ZipperResponse[];
    labels?: LabelResponse[];
    tags?: TagResponse[];
    threads?: ThreadResponse[];
    accessories?: AccessoryResponse[];
}

export interface StitchSpecificationResponse {
    stitchTypes?: string[];
    stitchDensity?: string;
    reinforcementAreas?: string[];
}

export interface SeamSpecificationResponse {
    seamTypes?: string[];
    seamFinish?: string;
    seamAllowance?: string;
    topStitchDetails?: string;
}

export interface FitSpecificationResponse {
    fit?: string;
    silhouette?: string;
    ease?: string;
}

export interface ManufacturingNotesResponse {
    notes?: string[];
    specialInstructions?: string[];
}

export interface CareSpecificationResponse {
    washing?: string;
    bleaching?: string;
    drying?: string;
    ironing?: string;
    dryCleaning?: string;
}

export interface PackagingSpecificationResponse {
    foldingMethod?: string;
    packagingMaterials?: string[];
    cartonSpecification?: string;
    labelingInstructions?: string[];
}

export interface QualityChecklistResponse {
    appearanceChecks?: string[];
    measurementChecks?: string[];
    stitchingChecks?: string[];
    finishingChecks?: string[];
    packagingChecks?: string[];
}

export interface TechPackAIResponse {
    schemaVersion: string;

    garmentIdentification: GarmentIdentificationResponse;

    constructionSpecification: ConstructionSpecificationResponse;

    fabricSpecification: FabricSpecificationResponse;

    trimSpecification: TrimSpecificationResponse;

    stitchSpecification: StitchSpecificationResponse;

    seamSpecification: SeamSpecificationResponse;

    fitSpecification: FitSpecificationResponse;

    manufacturingNotes: ManufacturingNotesResponse;

    careSpecification: CareSpecificationResponse;

    packagingSpecification: PackagingSpecificationResponse;

    qualityChecklist: QualityChecklistResponse;
}