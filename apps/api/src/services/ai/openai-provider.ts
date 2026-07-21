import OpenAI from "openai";

import type {
    AIProvider,
    AnalyzeImageRequest,
    AnalyzeImageResponse,
    GenerateImageRequest,
    GenerateImageResponse,
} from "./ai-provider.js";

export class OpenAIProvider implements AIProvider {

    private readonly client: OpenAI;

    constructor() {

        const apiKey =
            process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OPENAI_API_KEY is not configured."
            );
        }

        this.client =
            new OpenAI({
                apiKey,
            });

    }

    async analyzeImage(
        _request: AnalyzeImageRequest,
    ): Promise<AnalyzeImageResponse> {

        throw new Error(
            "OpenAIProvider.analyzeImage() is not implemented."
        );

    }

    async generateText(
        _prompt: string,
    ): Promise<AnalyzeImageResponse> {

        throw new Error(
            "OpenAIProvider.generateText() is not implemented."
        );

    }

    async generateImage(
        request: GenerateImageRequest,
    ): Promise<GenerateImageResponse> {

        const response =
            await this.client.images.generate({
                model: "gpt-image-1",
                prompt: [
                    request.prompt.instructions,
                    request.prompt.negativeInstructions
                        ? `Negative instructions: ${request.prompt.negativeInstructions}`
                        : undefined,
                ].filter(Boolean).join("\n\n"),
                size: "1024x1024",
            });

        const image =
            response.data?.[0];

        if (!image?.b64_json) {
            throw new Error(
                "OpenAI image generation returned no image."
            );
        }

        return {

            rawResponse: response,

            renderedOutput: {

                schemaVersion: "1.0",

                renderedAssets: [

                    {

                        assetType: request.assetType,

                        format: "PNG",

                        renderStyle: "FLAT_SKETCH",

                        renderedOutput: image.b64_json,

                        metadata: {

                            provider: "openai",

                            model: "gpt-image-1",

                            revisedPrompt:
                                image.revised_prompt,

                        },

                    },

                ],

            },

        };

    }

}
