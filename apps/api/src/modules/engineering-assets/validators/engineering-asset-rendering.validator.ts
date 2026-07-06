import { z } from "zod";

import {
    EngineeringAssetType,
} from "../dto/engineering-asset.dto.js";

export const RenderedEngineeringAssetResponseSchema = z.object({
    assetType: z.nativeEnum(
        EngineeringAssetType
    ),

    format: z.enum([
        "PNG",
        "JPEG",
        "SVG",
    ]),

    renderStyle: z.enum([
        "TECHNICAL_LINE_ART",
        "FLAT_SKETCH",
        "DETAIL_ILLUSTRATION",
    ]),

    renderedOutput: z.unknown(),

    metadata: z.record(
        z.string(),
        z.unknown()
    ).optional(),
});

export const EngineeringAssetRenderingResponseSchema = z.object({
    schemaVersion: z.string(),

    renderedAssets: z.array(
        RenderedEngineeringAssetResponseSchema
    ),
});

export type EngineeringAssetRenderingResponseDTO =
    z.infer<
        typeof EngineeringAssetRenderingResponseSchema
    >;