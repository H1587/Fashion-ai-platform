import type {
    RenderingPrompt,
} from "../../modules/engineering-assets/types/rendering-prompt.js";

import type {
    EngineeringAssetRenderingResponse,
} from "../../modules/engineering-assets/types/engineering-asset-rendering-response.js";

export interface AnalyzeImageRequest {
    imageBase64: string;
    mimeType: string;
    prompt: string;
}

export interface AnalyzeImageResponse {
    rawResponse: unknown;
    text: string;
}

/**
 * Sprint 11B
 *
 * Provider-agnostic image generation request.
 *
 * The prompt is intentionally generic. Rendering-specific
 * contracts remain owned by the Engineering Assets module.
 */

import type {
    EngineeringAssetType,
} from "@prisma/client";

export interface GenerateImageRequest {

    assetType: EngineeringAssetType;

    prompt: RenderingPrompt;

}

/**
 * Sprint 11B
 *
 * Provider-agnostic image generation response.
 *
 * The concrete representation of the rendered output is left
 * opaque to the provider interface. Downstream rendering
 * parsers are responsible for interpreting provider-specific
 * responses.
 */
export interface GenerateImageResponse {

    rawResponse: unknown;

    renderedOutput:
    EngineeringAssetRenderingResponse;

}

export interface AIProvider {
    analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse>;

    generateText(
        prompt: string
    ): Promise<AnalyzeImageResponse>;

    generateImage(
        request: GenerateImageRequest
    ): Promise<GenerateImageResponse>;
}