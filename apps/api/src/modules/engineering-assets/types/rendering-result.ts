import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

export interface RenderingResult {

    renderedAssets: RenderedAssetDTO[];

    completedNodes: string[];

    failedNodes: string[];

}