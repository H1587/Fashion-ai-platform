import { GoogleGenAI } from "@google/genai";

import type {
    AIProvider,
    AnalyzeImageRequest,
    AnalyzeImageResponse,
} from "./ai-provider.js";

export class GeminiProvider implements AIProvider {
    private readonly client: GoogleGenAI;
    private readonly model: string;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not configured.");
        }

        this.client = new GoogleGenAI({
            apiKey,
        });

        this.model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
    }

    async analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse> {

        const response = await this.client.models.generateContent({
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
}