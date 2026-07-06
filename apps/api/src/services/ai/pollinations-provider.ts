import type {
    AnalyzeImageRequest,
    AnalyzeImageResponse,
    AIProvider,
    GenerateImageRequest,
    GenerateImageResponse,
} from "./ai-provider.js";

import {
    GeminiProvider,
} from "./gemini-provider.js";

export class PollinationsProvider implements AIProvider {

    private readonly gemini =
        new GeminiProvider();

    async analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {

        return this.gemini.analyzeImage(
            request
        );

    }

    async generateText(
        prompt: string
    ): Promise<AnalyzeImageResponse> {

        return this.gemini.generateText(
            prompt
        );

    }

    async generateImage(
        request: GenerateImageRequest
    ): Promise<GenerateImageResponse> {

        const accountId =
            process.env.CLOUDFLARE_ACCOUNT_ID;

        const apiToken =
            process.env.CLOUDFLARE_API_TOKEN;

        if (!accountId || !apiToken) {
            throw new Error(
                "Cloudflare Workers AI credentials are not configured."
            );
        }

        const response =
            await fetch(
                `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: request.prompt.instructions,
                    }),
                }
            );

        if (!response.ok) {

            throw new Error(
                await response.text()
            );

        }

        const json =
            await response.json();

        const base64Image =
            json.result?.image;

        if (!base64Image) {
            throw new Error(
                "Cloudflare did not return an image."
            );
        }

        const imageBuffer =
            Buffer.from(
                base64Image,
                "base64"
            );

        return {

            rawResponse: json,

            renderedOutput: {

                schemaVersion: "v1",

                renderedAssets: [

                    {

                        assetType: request.assetType,

                        format: "JPEG",

                        renderStyle:
                            "TECHNICAL_LINE_ART",

                        renderedOutput:
                            base64Image,

                        metadata: {

                            provider:
                                "cloudflare-workers-ai",

                            model:
                                "@cf/black-forest-labs/flux-1-schnell",

                        },

                    },

                ],

            },

        };

    }

}