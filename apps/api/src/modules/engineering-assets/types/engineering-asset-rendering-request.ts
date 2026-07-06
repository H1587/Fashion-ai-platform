import type {
    EngineeringAsset,
} from "@prisma/client";

import type {
    RenderStyle,
    RenderedAssetFormat,
} from "./rendered-asset.js";

export interface RenderingRequest {

    asset: EngineeringAsset;

    outputFormat: RenderedAssetFormat;

    renderStyle: RenderStyle;

    promptVersion: string;

}