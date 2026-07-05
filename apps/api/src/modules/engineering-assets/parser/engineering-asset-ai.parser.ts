import {
    EngineeringAssetAIResponseSchema,
} from "../validators/engineering-asset-ai.validator.js";

import type {
    EngineeringAssetAIResponse,
} from "../types/engineering-asset-ai-response.js";

import {
    EngineeringAssetType,
} from "../dto/engineering-asset.dto.js";

export class EngineeringAssetAIParser {

    private static clean(
        response: string
    ): string {

        return response
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/\s*```$/, "")
            .trim();
    }

    static parse(
        response: string
    ): EngineeringAssetAIResponse {

        const cleaned =
            this.clean(response);

        const parsed =
            JSON.parse(cleaned);

        const validated =
            EngineeringAssetAIResponseSchema.parse(
                parsed
            );

        const requiredAssetTypes: EngineeringAssetType[] = [
            EngineeringAssetType.FLAT_SKETCH,
            EngineeringAssetType.TECHNICAL_SKETCH,
            EngineeringAssetType.COLLAR_DETAIL,
            EngineeringAssetType.SLEEVE_DETAIL,
            EngineeringAssetType.POCKET_DETAIL,
            EngineeringAssetType.PLACKET_DETAIL,
            EngineeringAssetType.BUTTON_DETAIL,
            EngineeringAssetType.CONSTRUCTION_ILLUSTRATION,
            EngineeringAssetType.REFERENCE_IMAGE,
        ];

        const returnedAssetTypes =
            validated.assets.map(
                asset => asset.assetType
            );

        for (const assetType of requiredAssetTypes) {

            if (!returnedAssetTypes.includes(assetType)) {

                throw new Error(
                    `Missing required engineering asset: ${assetType}`
                );

            }

        }

        if (
            validated.assets.length !==
            requiredAssetTypes.length
        ) {

            throw new Error(
                `Expected exactly ${requiredAssetTypes.length} engineering assets but received ${validated.assets.length}.`
            );

        }

        return validated;
    }

}