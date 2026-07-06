import type {
    EngineeringAsset,
} from "@prisma/client";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

export function buildEngineeringAssetRenderingPrompt(
    request: RenderingRequest
): string {

    const asset: EngineeringAsset = request.asset;

    return `
You are an apparel technical illustrator.

Generate a clean manufacturing-ready technical line drawing.

Do not redesign the garment.
Do not invent features.
Do not add branding.
Do not add annotations.
White background only.

Asset Type:
${asset.assetType}

Title:
${asset.title}

Description:
${asset.description}

Engineering Data:
${JSON.stringify(asset.assetData)}

Output Format:
${request.outputFormat}

Render Style:
${request.renderStyle}

Generate a single engineering illustration.
`;
}