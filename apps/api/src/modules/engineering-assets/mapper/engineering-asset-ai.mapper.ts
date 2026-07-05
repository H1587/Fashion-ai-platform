import type {
    EngineeringAssetDTO,
} from "../dto/engineering-asset.dto.js";

import type {
    EngineeringAssetAIResponse,
} from "../types/engineering-asset-ai-response.js";

export class EngineeringAssetAIMapper {

    static toDTOs(
        techPackId: string,
        response: EngineeringAssetAIResponse
    ): EngineeringAssetDTO[] {

        return response.assets.map(
            (asset) => ({
                techPackId,

                assetType:
                    asset.assetType,

                title:
                    asset.title,

                description:
                    asset.description,

                assetData:
                    asset.assetData,

                revision: 1,
            })
        );
    }

}