import OpenAI from "openai";

import type {
    AIProvider,
    AnalyzeImageRequest,
    AnalyzeImageResponse,
    GenerateImageRequest,
    GenerateImageResponse,
} from "./ai-provider.js";

export class QwenProvider implements AIProvider {

    private readonly client: OpenAI;

    constructor() {

        const apiKey =
            process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            throw new Error(
                "OPENROUTER_API_KEY is not configured."
            );
        }

        this.client = new OpenAI({

            apiKey,

            baseURL:
                "https://openrouter.ai/api/v1",

        });

    }

    async analyzeImage(
        _request: AnalyzeImageRequest,
    ): Promise<AnalyzeImageResponse> {

        throw new Error(
            "QwenProvider.analyzeImage() is not implemented."
        );

    }

    async generateText(
        _prompt: string,
    ): Promise<AnalyzeImageResponse> {

        throw new Error(
            "QwenProvider.generateText() is not implemented."
        );

    }

    async generateImage(
        request: GenerateImageRequest,
    ): Promise<GenerateImageResponse> {

        const prompt = [
            request.prompt.instructions,
            request.prompt.negativeInstructions
                ? `Negative instructions: ${request.prompt.negativeInstructions}`
                : undefined,
        ]
            .filter(Boolean)
            .join("\n\n");

        const response =
            await this.client.images.generate({

                model: "qwen/qwen-image",

                prompt,

                size: "1024x1024",

            });

        const image =
            response.data?.[0];

        if (!image?.b64_json) {
            throw new Error(
                "Qwen image generation returned no image."
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

                            provider: "openrouter",

                            model: "qwen/qwen-image",

                        },

                    },

                ],

            },

        };

    }

}

