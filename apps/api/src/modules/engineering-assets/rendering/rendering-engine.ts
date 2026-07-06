import type {
    AIProvider,
} from "../../../services/ai/ai-provider.js";

import type {
    MasterGarmentRepresentation,
} from "../types/master-garment-representation.js";

import type {
    RenderingResult,
} from "../types/rendering-result.js";

import {
    RenderPlanner,
} from "./render-planner.js";

import {
    RenderGraph,
} from "./render-graph.js";

import {
    MasterFlatRenderingService,
} from "./master-flat-rendering.service.js";

import {
    SpecializedRenderingService,
} from "./specialized-rendering.service.js";

import type {
    RenderingRequest,
} from "../types/engineering-asset-rendering-request.js";

import {
    RenderedAssetPersistenceService,
} from "./rendered-asset-persistence.service.js";

import type {
    RenderedAssetDTO,
} from "../dto/rendered-asset.dto.js";

export class RenderingEngine {

    private readonly planner =
        new RenderPlanner();

    private readonly masterFlatRenderer: MasterFlatRenderingService;

    private readonly specializedRenderer: SpecializedRenderingService;

    private readonly persistenceService =
        new RenderedAssetPersistenceService();

    constructor(
        provider: AIProvider
    ) {

        this.masterFlatRenderer =
            new MasterFlatRenderingService(
                provider
            );

        this.specializedRenderer =
            new SpecializedRenderingService(
                provider
            );

    }

    async render(
        master: MasterGarmentRepresentation
    ): Promise<RenderingResult> {

        const nodes =
            this.planner.build(
                master
            );

        const graph =
            new RenderGraph(
                nodes
            );

        // Step 1: Generate the canonical Master Flat Sketch
        master.masterFlatSketch =
            await this.masterFlatRenderer.render(
                master
            );

        const renderedAssets: RenderedAssetDTO[] = [];

        for (const asset of master.engineeringAssets) {

            const renderingRequest: RenderingRequest = {

                asset,

                outputFormat: "PNG",

                renderStyle: "TECHNICAL_LINE_ART",

                promptVersion: "v2",

            };

            const response =
                await this.specializedRenderer.render(

                    master,

                    renderingRequest

                );

            const persisted =
                await this.persistenceService.persist(

                    asset.id,

                    response.renderedOutput

                );

            renderedAssets.push(

                ...persisted

            );

        }

        // Step 2
        // Specialized rendering will be integrated after
        // the Rendering Engine replaces the legacy
        // EngineeringAssetRenderingService.

        return {

            renderedAssets,

            completedNodes:
                graph.getNodes().map(
                    (node) => node.id
                ),

            failedNodes: [],

        };

    }

}