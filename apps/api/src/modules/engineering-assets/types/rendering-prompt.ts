export interface RenderingPrompt {

    instructions: string;

    referenceImages: string[];

    negativeInstructions?: string;

    metadata: {

        promptVersion: string;

        assetType: string;

        renderStyle: string;

        outputFormat: string;

    };

}