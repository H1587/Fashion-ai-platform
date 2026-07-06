import { GoogleGenAI } from "@google/genai";

import type {
    AIProvider,
    AnalyzeImageRequest,
    AnalyzeImageResponse,
    GenerateImageRequest,
    GenerateImageResponse,
} from "./ai-provider.js";

export class GeminiProvider implements AIProvider {

    private readonly client: GoogleGenAI;

    private readonly model: string;

    private readonly imageModel: string;

    constructor() {

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not configured.");
        }

        this.client = new GoogleGenAI({
            apiKey,
        });

        this.model =
            process.env.GEMINI_MODEL ??
            "gemini-2.5-flash";

        this.imageModel =
            process.env.GEMINI_IMAGE_MODEL ??
            "imagen-4.0-generate-001";
    }

    async analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {

        const response =
            await this.client.models.generateContent({
                model: this.model,
                contents: [
                    {
                        text: request.prompt,
                    },
                    {
                        inlineData: {
                            mimeType: request.mimeType,
                            data: request.imageBase64,
                        },
                    },
                ],
            });

        return {
            rawResponse: response,
            text: response.text ?? "",
        };
    }

    async generateText(
        prompt: string
    ): Promise<AnalyzeImageResponse> {

        const response =
            await this.client.models.generateContent({
                model: this.model,
                contents: [
                    {
                        text: prompt,
                    },
                ],
            });

        return {
            rawResponse: response,
            text: response.text ?? "",
        };
    }

    async generateImage(
        request: GenerateImageRequest
    ): Promise<GenerateImageResponse> {

        const response =
            await this.client.models.generateImages({

                model: this.imageModel,

                prompt: request.prompt.instructions,

                config: {
                    numberOfImages: 1,
                },

            });

        return {

            rawResponse: response,

            renderedOutput: {

                schemaVersion: "v1",

                renderedAssets: [

                    {

                        assetType: request.assetType,

                        format: "PNG",

                        renderStyle: "TECHNICAL_LINE_ART",

                        renderedOutput:
                            response.generatedImages?.[0]?.image?.imageBytes ?? "",

                        metadata: {

                            provider: "google-imagen",

                            model: this.imageModel,

                        },

                    },

                ],

            },

        };

    }

}