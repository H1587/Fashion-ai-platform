import type { ImageAnalysis } from "@prisma/client";

import type { ProductSpecificationDTO } from "../dto/product-specification.dto.js";

export class SpecificationMapper {
    static toProductSpecification(
        analysis: ImageAnalysis
    ): ProductSpecificationDTO {
        return {
            imageId: analysis.imageId,
            analysisId: analysis.id,

            productCategory: analysis.garmentCategory ?? undefined,
            productType: analysis.garmentType ?? undefined,

            gender: analysis.gender ?? undefined,

            primaryColour: analysis.primaryColor ?? undefined,
            secondaryColour: analysis.secondaryColor ?? undefined,

            fabric: analysis.fabricGuess ?? undefined,

            pattern: analysis.pattern ?? undefined,

            fit: analysis.fit ?? undefined,

            sleeve: analysis.sleeveType ?? undefined,

            collar: analysis.collarType ?? undefined,

            closure: analysis.closureType ?? undefined,

            pocket: analysis.pocketType ?? undefined,

            season: analysis.season ?? undefined,

            style: analysis.style ?? undefined,

            productName: undefined,

            description: undefined,

            keyFeatures: [],

            manufacturingNotes: undefined,
        };
    }
}