import type {
    AIProvider,
} from "../../../services/ai/ai-provider.js";

import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    MasterFlatSketch,
} from "../types/master-garment-representation.js";

import {
    EngineeringAssetPromptBuilder,
} from "../prompts/engineering-asset-prompt-builder.js";

import {
    EngineeringAssetType,
} from "../dto/engineering-asset.dto.js";

export class MasterFlatRenderer {

    constructor(
        private readonly provider: AIProvider
    ) { }

    async render(
        master: MasterGarmentRepresentation
    ): Promise<MasterFlatSketch> {

        const promptBuilder =
            new EngineeringAssetPromptBuilder();

        const prompt =
            promptBuilder.buildMasterFlat(
                master
            );

        const response =
            await this.provider.generateImage({

                assetType: EngineeringAssetType.FLAT_SKETCH,
                prompt,

            });

        const rendered =
            response.renderedOutput
                .renderedAssets[0];

        if (!rendered) {

            throw new Error(
                "Master Flat generation failed."
            );

        }

        return {

            prompt:
                prompt.instructions,

            image:
                rendered.renderedOutput,

            provider:
                rendered.metadata?.provider as string,

            providerModel:
                rendered.metadata?.model as string,

            promptVersion:
                prompt.metadata.promptVersion,

        };

    }

}