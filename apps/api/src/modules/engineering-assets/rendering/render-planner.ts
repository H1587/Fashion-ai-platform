import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

export interface RenderNode {

    id: string;

    assetType: string;

    dependsOn: string[];

    priority: number;

    renderer: string;

    request?: RenderingRequest;

    status:
    | "PENDING"
    | "READY"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED";

}

export class RenderPlanner {

    build(
        master: MasterGarmentRepresentation
    ): RenderNode[] {

        const nodes: RenderNode[] = [];

        nodes.push({

            id: "master-flat",

            assetType: "MASTER_FLAT",

            dependsOn: [],

            priority: 1,

            renderer:
                "MASTER_FLAT_RENDERER",

            status:
                "PENDING",

        });

        for (const asset of master.engineeringAssets) {

            nodes.push({

                id: asset.id,

                assetType: asset.assetType,

                dependsOn: [

                    "master-flat",

                ],

                priority: 2,

                renderer:
                    "SPECIALIZED_RENDERER",

                status:
                    "PENDING",

                request: {

                    asset,

                    outputFormat: "PNG",

                    renderStyle: "TECHNICAL_LINE_ART",

                    promptVersion: "v2",

                },

            });
        }

        return nodes;

    }

}