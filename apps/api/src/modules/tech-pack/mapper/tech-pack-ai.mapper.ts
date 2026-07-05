import type { TechPackDTO } from "../dto/tech-pack.dto.js";

import type {
    TechPackAIResponse,
} from "../types/tech-pack-ai-response.js";

export class TechPackAIMapper {
    static toTechPackDTO(
        specificationId: string,
        response: TechPackAIResponse
    ): TechPackDTO {

        return {
            specificationId,

            title:
                response.garmentIdentification.productName,

            technicalDescription: undefined,

            garmentIdentification:
                response.garmentIdentification,

            constructionSpecification:
                response.constructionSpecification,

            fabricSpecification:
                response.fabricSpecification,

            trimSpecification:
                response.trimSpecification,

            stitchSpecification:
                response.stitchSpecification,

            seamSpecification:
                response.seamSpecification,

            fitSpecification:
                response.fitSpecification,

            manufacturingNotes:
                response.manufacturingNotes,

            careSpecification:
                response.careSpecification,

            packagingSpecification:
                response.packagingSpecification,

            qualityChecklist:
                response.qualityChecklist,

            revision: 1,
        };
    }
}