export interface AnalyzeImageRequest {
    imageBase64: string;
    mimeType: string;
    prompt: string;
}

export interface AnalyzeImageResponse {
    rawResponse: unknown;
    text: string;
}

export interface AIProvider {
    analyzeImage(
        request: AnalyzeImageRequest
    ): Promise<AnalyzeImageResponse>;
}