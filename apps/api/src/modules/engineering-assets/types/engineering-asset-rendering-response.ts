import type {
    EngineeringAssetType,
} from "@prisma/client";

import type {
    RenderStyle,
    RenderedAssetFormat,
} from "./rendered-asset.js";

export interface RenderedEngineeringAssetResponse {

    assetType: EngineeringAssetType;

    format: RenderedAssetFormat;

    renderStyle: RenderStyle;

    /**
     * Provider-specific rendered output.
     *
     * Sprint 11B deliberately leaves the representation provider-agnostic.
     * Batch 1B will determine the concrete contents after the SDK capability
     * has been verified.
     */
    renderedOutput: string;

    /**
     * Optional provider metadata.
     *
     * Examples:
     * - model
     * - generation identifier
     * - provider-specific metadata
     */
    metadata?: Record<string, unknown>;
}

export interface EngineeringAssetRenderingResponse {

    schemaVersion: string;

    renderedAssets: RenderedEngineeringAssetResponse[];
}