import type { ProductSpecification } from "@prisma/client";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackMapper {
    static fromProductSpecification(
        specification: ProductSpecification
    ): TechPackDTO {
        return {
            specificationId: specification.id,

            title: specification.productName ?? undefined,

            technicalDescription:
                specification.description ?? undefined,

            constructionDetails:
                specification.manufacturingNotes ?? undefined,

            fabricDetails:
                specification.fabric ?? undefined,

            trimDetails: undefined,

            measurementNotes: undefined,

            fitNotes: specification.fit ?? undefined,

            careInstructions: undefined,

            packagingInstructions: undefined,

            qualityNotes: undefined,

            revision: 1,
        };
    }
}