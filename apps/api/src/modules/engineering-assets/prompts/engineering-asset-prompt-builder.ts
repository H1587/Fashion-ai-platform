import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

import type {
    RenderingPrompt,
} from "../types/rendering-prompt.js";

export class EngineeringAssetPromptBuilder {

    buildMasterFlat(
        master: MasterGarmentRepresentation
    ): RenderingPrompt {

        const specification =
            master.productSpecification;

        return {

            instructions: `
You are a senior apparel technical illustrator.

Generate ONE canonical front flat sketch.

The uploaded garment is the source of truth.

This master flat sketch will become the parent of every future engineering illustration.

Do not redesign the garment.

Do not invent construction.

Do not invent garment components.

Do not add logos.

Do not add branding.

Do not add text.

Do not add dimensions.

Generate only black technical line art.

White background.

Orthographic front view.

Category:
${specification.productCategory ?? ""}

Type:
${specification.productType ?? ""}

Fabric:
${specification.fabric ?? ""}

Fit:
${specification.fit ?? ""}

Sleeve:
${specification.sleeve ?? ""}

Collar:
${specification.collar ?? ""}

Pocket:
${specification.pocket ?? ""}

Closure:
${specification.closure ?? ""}

Description:
${specification.description ?? ""}
`,

            referenceImages:
                master.referenceImages,

            metadata: {

                promptVersion: "v2",

                assetType: "MASTER_FLAT",

                renderStyle: "TECHNICAL_LINE_ART",

                outputFormat: "PNG",

            },

        };

    }

    build(
        master: MasterGarmentRepresentation,
        request: RenderingRequest
    ): RenderingPrompt {

        const specification =
            master.productSpecification;

        const asset =
            request.asset;

        return {

            instructions: `
Generate ONLY the following engineering illustration.

This illustration MUST match the previously generated Master Flat Sketch.

Never redesign the garment.

Never change proportions.

Never invent construction.

Asset Type:
${asset.assetType}

Title:
${asset.title ?? ""}

Description:
${asset.description ?? ""}

Engineering Data:
${JSON.stringify(asset.assetData)}

Category:
${specification.productCategory ?? ""}

Type:
${specification.productType ?? ""}
`,

            referenceImages:
                master.referenceImages,

            metadata: {

                promptVersion:
                    request.promptVersion,

                assetType:
                    asset.assetType,

                renderStyle:
                    request.renderStyle,

                outputFormat:
                    request.outputFormat,

            },

        };

    }

}