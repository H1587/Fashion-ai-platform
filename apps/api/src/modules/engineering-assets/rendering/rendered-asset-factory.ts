import type {
    EngineeringAssetRenderingResponse,
} from "../types/engineering-asset-rendering-response.js";

import {
    EngineeringAssetRenderingMapper,
} from "../mapper/engineering-asset-rendering.mapper.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

export class RenderedAssetFactory {

    static create(

        engineeringAssetId: string,

        response: EngineeringAssetRenderingResponse

    ): RenderedAssetDTO[] {

        return EngineeringAssetRenderingMapper.toDTOs(

            engineeringAssetId,

            response

        );

    }

}