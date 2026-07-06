import type {
    EngineeringAssetRenderingResponseDTO,
} from "../validators/engineering-asset-rendering.validator.js";

import {
    EngineeringAssetRenderingResponseSchema,
} from "../validators/engineering-asset-rendering.validator.js";

export class EngineeringAssetRenderingParser {

    static parse(
        response: string
    ): EngineeringAssetRenderingResponseDTO {

        const parsed =
            JSON.parse(response);

        return EngineeringAssetRenderingResponseSchema.parse(
            parsed
        );
    }

}