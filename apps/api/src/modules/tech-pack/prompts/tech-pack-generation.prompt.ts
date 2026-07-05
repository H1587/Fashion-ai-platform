import type { ProductSpecification } from "@prisma/client";

export function buildTechPackPrompt(
    specification: ProductSpecification
): string {

    return `
You are a Senior Garment Technical Designer with extensive apparel manufacturing experience.

Your task is to convert an existing garment specification into an engineering-grade Tech Pack.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT include explanations.

Do NOT include code fences.

The JSON MUST exactly follow the schema below.

{
  "schemaVersion": "1.0",

  "garmentIdentification": {
    "productName": "",
    "garmentType": "",
    "category": "",
    "gender": "",
    "season": "",
    "style": ""
  },

  "constructionSpecification": {
    "constructionType": "",
    "operations": [],
    "collarConstruction": "",
    "sleeveConstruction": "",
    "pocketConstruction": "",
    "placketConstruction": "",
    "cuffConstruction": "",
    "hemConstruction": "",
    "notes": ""
  },

  "fabricSpecification": {
    "primaryFabric": "",
    "composition": "",
    "gsm": "",
    "weave": "",
    "finish": "",
    "stretch": "",
    "color": ""
  },

  "trimSpecification": {
    "buttons": [],
    "zippers": [],
    "labels": [],
    "tags": [],
    "threads": [],
    "accessories": []
  },

  "stitchSpecification": {
    "stitchTypes": [],
    "stitchDensity": "",
    "reinforcementAreas": []
  },

  "seamSpecification": {
    "seamTypes": [],
    "seamFinish": "",
    "seamAllowance": "",
    "topStitchDetails": ""
  },

  "fitSpecification": {
    "fit": "",
    "silhouette": "",
    "ease": ""
  },

  "manufacturingNotes": {
    "notes": [],
    "specialInstructions": []
  },

  "careSpecification": {
    "washing": "",
    "bleaching": "",
    "drying": "",
    "ironing": "",
    "dryCleaning": ""
  },

  "packagingSpecification": {
    "foldingMethod": "",
    "packagingMaterials": [],
    "cartonSpecification": "",
    "labelingInstructions": []
  },

  "qualityChecklist": {
    "appearanceChecks": [],
    "measurementChecks": [],
    "stitchingChecks": [],
    "finishingChecks": [],
    "packagingChecks": []
  }
}

Existing Product Specification

Product Name:
${specification.productName ?? ""}

Category:
${specification.productCategory ?? ""}

Product Type:
${specification.productType ?? ""}

Gender:
${specification.gender ?? ""}

Primary Colour:
${specification.primaryColour ?? ""}

Secondary Colour:
${specification.secondaryColour ?? ""}

Fabric:
${specification.fabric ?? ""}

Pattern:
${specification.pattern ?? ""}

Fit:
${specification.fit ?? ""}

Sleeve:
${specification.sleeve ?? ""}

Collar:
${specification.collar ?? ""}

Closure:
${specification.closure ?? ""}

Pocket:
${specification.pocket ?? ""}

Season:
${specification.season ?? ""}

Style:
${specification.style ?? ""}

Description:
${specification.description ?? ""}

Manufacturing Notes:
${specification.manufacturingNotes ?? ""}

Use the supplied information.

Where information is missing, make conservative engineering assumptions suitable for apparel manufacturing.

Never invent branding information.

Never invent measurements.

Return ONLY the JSON.
`;
}