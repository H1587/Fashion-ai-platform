import { z } from "zod";

import {
    EngineeringAssetType,
} from "../dto/engineering-asset.dto.js";

export const EngineeringAssetResponseSchema = z.object({
    assetType: z.nativeEnum(
        EngineeringAssetType
    ),

    title: z.string().optional(),

    description: z.string().optional(),

    assetData: z.record(
        z.string(),
        z.unknown()
    ).optional(),
});

export const EngineeringAssetAIResponseSchema = z.object({
    schemaVersion: z.string(),

    assets: z.array(
        EngineeringAssetResponseSchema
    ),
});

export type EngineeringAssetAIResponseDTO =
    z.infer<
        typeof EngineeringAssetAIResponseSchema
    >;