import type {
    EngineeringAssetRenderingResponse,
    RenderedEngineeringAssetResponse,
} from "../types/engineering-asset-rendering-response.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";



export class EngineeringAssetRenderingMapper {

    static toDTOs(
        engineeringAssetId: string,
        response: EngineeringAssetRenderingResponse
    ): RenderedAssetDTO[] {

        return response.renderedAssets.map(
            (asset) => ({

                engineeringAssetId,

                format: asset.format,

                mimeType: `image/${asset.format.toLowerCase()}`,

                promptVersion: "v1",

                provider:
                    asset.metadata?.provider as string | undefined,

                providerModel:
                    asset.metadata?.model as string | undefined,

                providerMetadata: asset.metadata,

                revision: 1,

            })
        );
    }

}