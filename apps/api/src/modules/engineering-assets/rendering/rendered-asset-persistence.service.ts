import type {
    EngineeringAssetRenderingResponse,
} from "../types/engineering-asset-rendering-response.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

import {
    RenderedAssetFactory,
} from "./rendered-asset-factory.js";

import {
    RenderedAssetStorageService,
} from "../service/rendered-asset-storage.service.js";

export class RenderedAssetPersistenceService {

    private readonly storage =
        new RenderedAssetStorageService();

    async persist(

        engineeringAssetId: string,

        response: EngineeringAssetRenderingResponse

    ): Promise<RenderedAssetDTO[]> {

        const assets =
            RenderedAssetFactory.create(

                engineeringAssetId,

                response

            );

        for (let i = 0; i < assets.length; i++) {

            const dto =
                assets[i];

            const rendered =
                response.renderedAssets[i];

            if (!dto || !rendered) {
                continue;
            }

            const saved =
                await this.storage.saveImage(

                    rendered.renderedOutput,

                    rendered.format.toLowerCase()

                );

            dto.filename =
                saved.filename;

            dto.storageLocation =
                saved.storageLocation;

        }

        return assets;

    }

}