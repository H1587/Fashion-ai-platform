import type {
  TechPack,
} from "@prisma/client";

export function buildEngineeringAssetPrompt(
  techPack: TechPack
): string {

  return `
You are a Senior Apparel Technical Designer with extensive garment engineering experience.

Your task is to derive Engineering Assets from the supplied Engineering Model.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return code fences.

Do NOT include explanations.

The JSON MUST exactly match the following schema.

{
  "schemaVersion": "1.0",
  "assets": [
    {
      "assetType": "FLAT_SKETCH",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "TECHNICAL_SKETCH",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "COLLAR_DETAIL",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "SLEEVE_DETAIL",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "POCKET_DETAIL",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "PLACKET_DETAIL",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "BUTTON_DETAIL",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "CONSTRUCTION_ILLUSTRATION",
      "title": "",
      "description": "",
      "assetData": {}
    },
    {
      "assetType": "REFERENCE_IMAGE",
      "title": "",
      "description": "",
      "assetData": {}
    }
  ]
}

Asset Types MUST use ONLY these values:

FLAT_SKETCH
TECHNICAL_SKETCH
COLLAR_DETAIL
SLEEVE_DETAIL
POCKET_DETAIL
PLACKET_DETAIL
BUTTON_DETAIL
CONSTRUCTION_ILLUSTRATION
REFERENCE_IMAGE

Never invent new asset types.

Do NOT output values such as:

ProductOverview
ConstructionSpecification
FabricSpecification
TrimSpecification
StitchSpecification
SeamSpecification
FitSpecification
ManufacturingGuidelines
CareInstructions
PackagingInstructions
QualityControlChecklist

Engineering Assets describe visual engineering artefacts.

Each assetData object should contain structured information describing that engineering asset, suitable for later rendering by downstream systems.

Do NOT generate image URLs.

Do NOT generate binary image data.

Do NOT generate SVG.

Do NOT generate Base64.

Do NOT generate Markdown.

Engineering Model

${JSON.stringify(techPack, null, 2)}

Generate EXACTLY one Engineering Asset for EACH of the following asset types.

The response MUST contain exactly 9 assets.

The assetType values MUST be:

FLAT_SKETCH
TECHNICAL_SKETCH
COLLAR_DETAIL
SLEEVE_DETAIL
POCKET_DETAIL
PLACKET_DETAIL
BUTTON_DETAIL
CONSTRUCTION_ILLUSTRATION
REFERENCE_IMAGE

Rules:

- Every asset type must appear exactly once.
- Do not omit any asset type.
- Do not invent additional asset types.
- Do not duplicate asset types.
- If the Engineering Model contains limited information for an asset, generate the asset using conservative apparel engineering assumptions.
- REFERENCE_IMAGE represents a manufacturing reference describing the intended visual appearance of the garment. It is metadata only and must not contain URLs, binary image data, SVG, or Base64.

Return ONLY valid JSON.
`;
}