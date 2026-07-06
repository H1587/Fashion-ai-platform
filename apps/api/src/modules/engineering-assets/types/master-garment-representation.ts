import type {
    Image,
    ProductSpecification,
    TechPack,
    EngineeringAsset,
} from "@prisma/client";

export interface MasterFlatSketch {

    prompt?: string;

    image?: string;

    provider?: string;

    providerModel?: string;

    promptVersion?: string;

}

export interface MasterGarmentRepresentation {

    images: Image[];

    /**
     * Canonical reference images used by the Rendering Engine.
     *
     * Sprint 11B:
     * - Contains the uploaded garment image.
     *
     * Sprint 11C:
     * - May contain a Composite Reference Sheet generated
     *   from the complete Image Set.
     */
    referenceImages: string[];

    productSpecification: ProductSpecification;

    techPack: TechPack;

    engineeringAssets: EngineeringAsset[];

    masterFlatSketch?: MasterFlatSketch;

    renderingContext: {

        promptVersion: string;

        renderStyle: string;

        outputFormat: string;

    };

}