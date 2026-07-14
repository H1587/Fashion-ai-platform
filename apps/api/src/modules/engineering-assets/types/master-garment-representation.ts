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

    /**
     * Source images that define the canonical garment.
     *
     * These originate from the Composite Reference Builder,
     * but the intermediate ImageSet and CompositeReferenceSheet
     * are not retained by the representation.
     */
    images: Image[];

    /**
     * Canonical reference images consumed by rendering providers.
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