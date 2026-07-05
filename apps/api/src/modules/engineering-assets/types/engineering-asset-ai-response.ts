import type {
    EngineeringAssetType,
} from "../dto/engineering-asset.dto.js";

export interface EngineeringAssetResponse {
    assetType: EngineeringAssetType;

    title?: string;

    description?: string;

    assetData?: Record<string, unknown>;
}

export interface EngineeringAssetAIResponse {
    schemaVersion: string;

    assets: EngineeringAssetResponse[];
}