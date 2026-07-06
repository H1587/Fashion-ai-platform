import type {
    AIProvider,
} from "../../../services/ai/ai-provider.js";

import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

import {
    EngineeringAssetPromptBuilder,
} from "../prompts/engineering-asset-prompt-builder.js";

export class SpecializedRenderingService {

    constructor(
        private readonly provider: AIProvider
    ) { }

    async render(
        master: MasterGarmentRepresentation,
        request: RenderingRequest
    ) {

        if (!master.masterFlatSketch) {

            throw new Error(
                "Master Flat Sketch has not been generated."
            );

        }

        const promptBuilder =
            new EngineeringAssetPromptBuilder();

        const prompt =
            promptBuilder.build(
                master,
                request
            );

        return this.provider.generateImage({

            assetType:
                request.asset.assetType,

            prompt,

        });

    }

}