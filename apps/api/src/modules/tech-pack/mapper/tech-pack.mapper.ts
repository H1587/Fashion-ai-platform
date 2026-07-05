import type { ProductSpecification } from "@prisma/client";

import type { TechPackDTO } from "../dto/tech-pack.dto.js";

export class TechPackMapper {
    static fromProductSpecification(
        specification: ProductSpecification
    ): TechPackDTO {
        return {
            specificationId: specification.id,

            title:
                specification.productName ?? undefined,

            technicalDescription:
                specification.description ?? undefined,

            garmentIdentification: {
                productName:
                    specification.productName ?? undefined,

                garmentType:
                    specification.productType ?? undefined,

                category:
                    specification.productCategory ?? undefined,

                gender:
                    specification.gender ?? undefined,

                season:
                    specification.season ?? undefined,

                style:
                    specification.style ?? undefined,
            },

            constructionSpecification: {
                notes:
                    specification.manufacturingNotes ?? undefined,
            },

            fabricSpecification: {
                primaryFabric:
                    specification.fabric ?? undefined,

                color:
                    specification.primaryColour ?? undefined,
            },

            fitSpecification: {
                fit:
                    specification.fit ?? undefined,
            },

            trimSpecification: undefined,

            stitchSpecification: undefined,

            seamSpecification: undefined,

            manufacturingNotes: undefined,

            careSpecification: undefined,

            packagingSpecification: undefined,

            qualityChecklist: undefined,

            revision: 1,
        };
    }
}