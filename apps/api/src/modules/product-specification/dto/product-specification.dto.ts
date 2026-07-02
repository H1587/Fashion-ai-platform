export interface ProductSpecificationDTO {
    imageId: string;
    analysisId: string;

    productName?: string;
    productCategory?: string;
    productType?: string;

    gender?: string;

    primaryColour?: string;
    secondaryColour?: string;

    fabric?: string;
    pattern?: string;

    fit?: string;

    sleeve?: string;
    collar?: string;
    closure?: string;
    pocket?: string;

    season?: string;
    style?: string;

    description?: string;

    keyFeatures?: string[];

    manufacturingNotes?: string;
}